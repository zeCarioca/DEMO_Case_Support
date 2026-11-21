#!/usr/bin/env python3
"""Build ZCTA to CBSA spatial mapping using GeoPandas, Pyogrio, and EPSG:5070."""

import argparse
import glob
import os
import sys
from typing import Optional, Tuple
import geopandas as gpd
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session

# Import Base and models from local schema
from schema import Base, Newspaper, ZctaToCbsa


def find_file(base_dir: str, pattern: str) -> str:
    matches = glob.glob(os.path.join(base_dir, "**", pattern), recursive=True)
    if not matches:
        matches = glob.glob(os.path.join(base_dir, pattern))
    if not matches:
        raise FileNotFoundError(f"No file matching '{pattern}' in {base_dir}")
    return matches[0]


def detect_zcta_column(columns: list) -> str:
    for col in ["ZCTA5CE20", "ZCTA5CE10", "GEOID20", "GEOID10", "ZCTA5"]:
        if col in columns:
            return col
    raise KeyError(f"No ZCTA key found in columns: {columns}")


def run_spatial_pipeline(
    data_dir: str,
    db_url: str,
    sample_limit: Optional[int] = None
) -> pd.DataFrame:
    print(f"=== GeoPandas Spatial Ingestion Pipeline ===")
    print(f"Source Directory: {data_dir}")
    print(f"Database Target: {db_url}")

    # 1. Locate shapefiles
    cbsa_path = find_file(data_dir, "*cbsa*500k*.shp")
    zcta_path = find_file(data_dir, "*zcta*500k*.shp")
    print(f"CBSA Shapefile: {os.path.basename(cbsa_path)}")
    print(f"ZCTA Shapefile: {os.path.basename(zcta_path)}")

    # 2. Inspect & Load CBSA shapefile (filter M1 Metro and M2 Micro)
    cbsa_cols = ["CBSAFP", "NAME", "LSAD", "geometry"]
    print(f"Loading CBSA shapefile with pyogrio (columns: {cbsa_cols})...")
    cbsa_gdf = gpd.read_file(cbsa_path, engine="pyogrio", columns=cbsa_cols)
    cbsa_gdf = cbsa_gdf[cbsa_gdf["LSAD"].isin(["M1", "M2"])].copy()
    cbsa_gdf["CBSAFP"] = cbsa_gdf["CBSAFP"].astype(str).str.zfill(5)
    print(f"Loaded {len(cbsa_gdf)} active CBSA regions (M1/M2).")

    # 3. Inspect & Load ZCTA shapefile
    # Discover ZCTA key first
    meta_zcta = gpd.read_file(zcta_path, engine="pyogrio", read_geometry=False, rows=2)
    zcta_key = detect_zcta_column(meta_zcta.columns.tolist())
    print(f"Detected ZCTA key: '{zcta_key}'")

    zcta_cols = [zcta_key, "geometry"]
    print(f"Loading ZCTA shapefile with pyogrio (pruned columns: {zcta_cols})...")
    if sample_limit:
        print(f"Applying sample limit: {sample_limit} rows")
        zcta_gdf = gpd.read_file(zcta_path, engine="pyogrio", columns=zcta_cols, rows=sample_limit)
    else:
        zcta_gdf = gpd.read_file(zcta_path, engine="pyogrio", columns=zcta_cols)

    zcta_gdf[zcta_key] = zcta_gdf[zcta_key].astype(str).str.zfill(5)
    print(f"Loaded {len(zcta_gdf)} ZCTAs.")

    # 4. Project ZCTA and CBSA to EPSG:5070 (NAD83 / Conus Albers Equal Area)
    print("Projecting ZCTA and CBSA to EPSG:5070 (Conus Albers Equal Area)...")
    zcta_5070 = zcta_gdf[[zcta_key, "geometry"]].to_crs(epsg=5070)
    cbsa_5070 = cbsa_gdf.to_crs(epsg=5070)

    # 5. Compute Centroids in EPSG:5070, then reproject to WGS84 (EPSG:4326)
    print("Computing centroids in EPSG:5070 and reprojecting to WGS84 (EPSG:4326)...")
    centroids_5070 = zcta_5070.geometry.centroid
    centroids_wgs84 = centroids_5070.to_crs(epsg=4326)
    zcta_gdf["latitude"] = centroids_wgs84.y.round(6)
    zcta_gdf["longitude"] = centroids_wgs84.x.round(6)

    # 6. Spatial Overlay: Largest-Area Overlap Resolution
    print("Executing spatial intersection overlay (gpd.overlay)...")
    intersections = gpd.overlay(zcta_5070, cbsa_5070, how="intersection")
    intersections["overlap_area_sq_km"] = (intersections.geometry.area / 1_000_000.0).round(4)

    # Sort descending by area and deduplicate per ZCTA to keep the majority CBSA
    print("Resolving primary CBSA per ZCTA via largest-area overlap...")
    primary_cbsa = (
        intersections.sort_values("overlap_area_sq_km", ascending=False)
        .drop_duplicates(subset=[zcta_key])
        [[zcta_key, "CBSAFP", "NAME", "LSAD", "overlap_area_sq_km"]]
    )

    # 7. Retain Rural ZCTAs: Left-merge back to base ZCTA dataset
    print("Merging with base ZCTA to retain rural areas (CBSAFP = None)...")
    flat_mapping = zcta_gdf[[zcta_key, "latitude", "longitude"]].merge(
        primary_cbsa,
        on=zcta_key,
        how="left"
    )

    # Format into standard relational columns
    flat_mapping = flat_mapping.rename(columns={
        zcta_key: "zip_code",
        "CBSAFP": "cbsa_code",
        "NAME": "cbsa_name",
        "LSAD": "lsad_type"
    })

    # Drop polygon geometry completely
    flat_df = pd.DataFrame(flat_mapping[[
        "zip_code",
        "cbsa_code",
        "cbsa_name",
        "lsad_type",
        "overlap_area_sq_km",
        "latitude",
        "longitude"
    ]])

    print(f"Pre-computation complete. Total rows: {len(flat_df)}")
    metro_count = flat_df[flat_df["lsad_type"] == "M1"].shape[0]
    micro_count = flat_df[flat_df["lsad_type"] == "M2"].shape[0]
    rural_count = flat_df[flat_df["cbsa_code"].isna()].shape[0]
    print(f"Summary: {metro_count} Metro (M1), {micro_count} Micro (M2), {rural_count} Rural/Non-CBSA")

    # 8. Export to Database
    print(f"Exporting to database '{db_url}'...")
    engine = create_engine(db_url)
    Base.metadata.create_all(engine)

    with engine.begin() as conn:
        conn.execute(text("DELETE FROM zcta_to_cbsa;"))
        flat_df.to_sql("zcta_to_cbsa", conn, if_exists="append", index=False, chunksize=5000)
        print("Inserted records into 'zcta_to_cbsa'.")

    # 9. Tag Newspapers with CBSAFP
    tag_newspapers_with_cbsa(engine)

    return flat_df


def tag_newspapers_with_cbsa(engine) -> None:
    print("Tagging existing newspaper records with CBSAFP...")
    with engine.begin() as conn:
        # Match newspaper headquarters_zip against zcta_to_cbsa
        result = conn.execute(text("""
            UPDATE newspapers
            SET cbsa_code = COALESCE(cbsa_code, (
                    SELECT z.cbsa_code
                    FROM zcta_to_cbsa z
                    WHERE z.zip_code = newspapers.headquarters_zip
                      AND z.cbsa_code IS NOT NULL
                )),
                latitude = COALESCE(latitude, (
                    SELECT z.latitude
                    FROM zcta_to_cbsa z
                    WHERE z.zip_code = newspapers.headquarters_zip
                )),
                longitude = COALESCE(longitude, (
                    SELECT z.longitude
                    FROM zcta_to_cbsa z
                    WHERE z.zip_code = newspapers.headquarters_zip
                ))
            WHERE headquarters_zip IS NOT NULL;
        """))
        print(f"Updated newspaper CBSA and coordinates tags.")


def main():
    parser = argparse.ArgumentParser(description="Build ZCTA-to-CBSA mapping table.")
    parser.add_argument("--data-dir", default=r"C:\Users\mateu\Downloads\cb", help="Directory containing shapefiles")
    parser.add_argument("--db-url", default="sqlite:///newspaper_db.sqlite", help="Target SQLAlchemy DB URL")
    parser.add_argument("--sample", type=int, default=None, help="Optional sample limit for testing")
    args = parser.parse_args()

    run_spatial_pipeline(args.data_dir, args.db_url, args.sample)


if __name__ == "__main__":
    main()
