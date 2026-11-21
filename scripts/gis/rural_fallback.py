"""2-Tier Rural Fallback Resolution for areas outside any CBSA."""

from typing import Any, Callable, Dict, Optional
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from commute_risk import (
    calculate_haversine_distance_miles,
    calculate_estimated_driving_miles,
    evaluate_dol_commute_risk,
    CommuteRiskLevel,
)
from schema import Newspaper, ZctaToCbsa


def resolve_rural_2tier_fallback(
    session: Session,
    input_zip: str,
    resolved_zip: str,
    is_po_box: bool,
    mapping: ZctaToCbsa,
    format_paper_fn: Callable[..., Dict[str, Any]],
) -> Dict[str, Any]:
    """Execute 2-tier rural newspaper fallback: Tier 1 (<= 50 driving mi) or Tier 2 (> 50 driving mi)."""
    lat, lon = mapping.latitude, mapping.longitude

    if lat is not None and lon is not None:
        papers = session.scalars(
            select(Newspaper).where(
                Newspaper.latitude.is_not(None),
                Newspaper.longitude.is_not(None),
            )
        ).all()

        candidates = []
        for paper in papers:
            straight_mi = calculate_haversine_distance_miles(lat, lon, paper.latitude, paper.longitude)
            drive_mi = calculate_estimated_driving_miles(straight_mi)
            candidates.append((paper, straight_mi, drive_mi))

        # Tier 1: Local Commuting Radius (<= 50.0 driving miles)
        tier1 = [c for c in candidates if c[2] <= 50.0]
        if tier1:
            tier1.sort(
                key=lambda x: (
                    max(x[0].sunday_circulation, x[0].weekday_circulation),
                    -x[2],
                ),
                reverse=True,
            )
            best_paper, straight_mi, drive_mi = tier1[0]
            assessment = evaluate_dol_commute_risk(
                job_lat=lat,
                job_lon=lon,
                paper_lat=best_paper.latitude,
                paper_lon=best_paper.longitude,
                job_cbsa=None,
                paper_cbsa=best_paper.cbsa_code,
                cbsa_type=None,
                is_tier2_rural_fallback=False,
            )

            res = {
                "status": "SUCCESS",
                "input_zip": input_zip,
                "resolved_zip": resolved_zip,
                "is_po_box_fallback": is_po_box,
                "metadata": {
                    "matched_via": "RURAL_FALLBACK_RADIUS",
                    "tier": "TIER_1_LOCAL",
                    "area_type": "Rural / Outside CBSA",
                    "cbsa_code": None,
                    "cbsa_name": None,
                    "is_rural_exception": True,
                    "distance_miles": straight_mi,
                    "straight_line_miles": straight_mi,
                    "estimated_driving_miles": drive_mi,
                    "legal_basis": "20 CFR § 656.17(e)(1)(i)(B)(2) (Rural exception: local commuting radius under 50 miles)",
                },
                "recommended_newspaper": format_paper_fn(best_paper, straight_mi, drive_mi),
                "commute_assessment": assessment.model_dump(),
                "alternatives": [format_paper_fn(c[0], c[1], c[2]) for c in tier1[1:5]],
            }
            if assessment.risk_level == CommuteRiskLevel.HIGH:
                closest = min(candidates, key=lambda c: c[2])
                res["closest_alternative_newspaper"] = format_paper_fn(closest[0], closest[1], closest[2])
            return res

        # Tier 2: Extended Regional Fallback (zero newspapers <= 50.0 driving miles)
        if candidates:
            # Sort by distance first to identify the local state and single closest newspaper
            sorted_by_dist = sorted(candidates, key=lambda x: x[2])
            closest_paper, c_straight_mi, c_drive_mi = sorted_by_dist[0]
            target_state = closest_paper.headquarters_state

            # Query the state's newspapers, falling back to all candidates if none found
            state_candidates = [c for c in candidates if c[0].headquarters_state == target_state]
            regional_pool = state_candidates if state_candidates else candidates

            sorted_by_circ = sorted(
                regional_pool,
                key=lambda x: (
                    max(x[0].sunday_circulation, x[0].weekday_circulation),
                    -x[2],
                ),
                reverse=True,
            )
            best_paper, straight_mi, drive_mi = sorted_by_circ[0]

            assessment = evaluate_dol_commute_risk(
                job_lat=lat,
                job_lon=lon,
                paper_lat=best_paper.latitude,
                paper_lon=best_paper.longitude,
                job_cbsa=None,
                paper_cbsa=best_paper.cbsa_code,
                cbsa_type=None,
                is_tier2_rural_fallback=True,
            )

            return {
                "status": "SUCCESS",
                "input_zip": input_zip,
                "resolved_zip": resolved_zip,
                "is_po_box_fallback": is_po_box,
                "metadata": {
                    "matched_via": "RURAL_TIER_2_REGIONAL",
                    "tier": "TIER_2_REGIONAL",
                    "area_type": "Rural / Outside CBSA",
                    "cbsa_code": None,
                    "cbsa_name": None,
                    "is_rural_exception": True,
                    "distance_miles": straight_mi,
                    "straight_line_miles": straight_mi,
                    "estimated_driving_miles": drive_mi,
                    "legal_basis": "20 CFR § 656.17(e)(1)(i)(B)(2) (Extended regional fallback: widest circulation with closest alternative)",
                },
                "recommended_newspaper": format_paper_fn(best_paper, straight_mi, drive_mi),
                "commute_assessment": assessment.model_dump(),
                "closest_alternative_newspaper": format_paper_fn(closest_paper, c_straight_mi, c_drive_mi),
                "alternatives": [format_paper_fn(c[0], c[1], c[2]) for c in sorted_by_dist[1:5]],
            }

    # Statewide fallback if coordinates missing
    state_paper = session.scalars(
        select(Newspaper).order_by(desc(Newspaper.sunday_circulation))
    ).first()

    if not state_paper:
        raise LookupError(f"No publication found for rural ZIP '{input_zip}'.")

    return {
        "status": "SUCCESS",
        "input_zip": input_zip,
        "resolved_zip": resolved_zip,
        "is_po_box_fallback": is_po_box,
        "metadata": {
            "matched_via": "STATEWIDE_RECORD",
            "tier": "TIER_2_REGIONAL",
            "area_type": "Rural / Outside CBSA",
            "cbsa_code": None,
            "cbsa_name": None,
            "is_rural_exception": True,
            "legal_basis": "20 CFR § 656.17(e)(1)(i)(B)(2) (Statewide publication of record)",
        },
        "recommended_newspaper": format_paper_fn(state_paper),
        "commute_assessment": {
            "straight_line_miles": 0.0,
            "estimated_driving_miles": 0.0,
            "circuity_factor": 1.25,
            "risk_level": CommuteRiskLevel.HIGH.value,
            "dol_rationale": "Centroid coordinates unavailable. Verify publication covers target county.",
        },
        "closest_alternative_newspaper": None,
        "alternatives": [],
    }
