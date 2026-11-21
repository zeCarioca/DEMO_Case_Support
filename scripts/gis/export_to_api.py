"""Export pre-computed Census ZCTA-to-CBSA mapping from SQLite to compact JSON for apps/api."""

import json
import os
import sqlite3

SQLITE_PATH = os.path.join(os.path.dirname(__file__), "newspaper_db.sqlite")
OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../apps/api/src/services/newspaper"))


def export_data():
    print(f"Connecting to {SQLITE_PATH}...")
    conn = sqlite3.connect(SQLITE_PATH)
    cursor = conn.cursor()

    # 1. Export CBSA Registry
    cursor.execute("""
        SELECT DISTINCT cbsa_code, cbsa_name, lsad_type
        FROM zcta_to_cbsa
        WHERE cbsa_code IS NOT NULL
        ORDER BY cbsa_code;
    """)
    cbsa_registry = {}
    for code, name, lsad in cursor.fetchall():
        cbsa_registry[code] = {
            "name": name,
            "lsad": lsad,
            "area_type": "METROPOLITAN" if lsad == "M1" else "MICROPOLITAN"
        }

    cbsa_out_path = os.path.join(OUT_DIR, "censusCbsaRegistry.json")
    with open(cbsa_out_path, "w", encoding="utf-8") as f:
        json.dump(cbsa_registry, f, indent=2, ensure_ascii=False)

    dist_dir = os.path.abspath(os.path.join(OUT_DIR, "../../../dist/services/newspaper"))
    if os.path.exists(dist_dir):
        with open(os.path.join(dist_dir, "censusCbsaRegistry.json"), "w", encoding="utf-8") as f:
            json.dump(cbsa_registry, f, indent=2, ensure_ascii=False)
    print(f"Exported {len(cbsa_registry)} CBSAs to {cbsa_out_path}")

    # 2. Export ZCTA to CBSA Compact Map
    cursor.execute("""
        SELECT zip_code, cbsa_code, latitude, longitude
        FROM zcta_to_cbsa
        ORDER BY zip_code;
    """)
    zcta_map = {}
    for zip_code, cbsa_code, lat, lon in cursor.fetchall():
        zcta_map[zip_code] = [
            cbsa_code,
            round(lat, 4) if lat is not None else None,
            round(lon, 4) if lon is not None else None
        ]

    zcta_out_path = os.path.join(OUT_DIR, "censusZctaMap.json")
    with open(zcta_out_path, "w", encoding="utf-8") as f:
        json.dump(zcta_map, f, separators=(",", ":"), ensure_ascii=False)
    if os.path.exists(dist_dir):
        with open(os.path.join(dist_dir, "censusZctaMap.json"), "w", encoding="utf-8") as f:
            json.dump(zcta_map, f, separators=(",", ":"), ensure_ascii=False)
    size_kb = os.path.getsize(zcta_out_path) / 1024
    print(f"Exported {len(zcta_map)} ZCTAs to {zcta_out_path} ({size_kb:.1f} KB)")


if __name__ == "__main__":
    export_data()
