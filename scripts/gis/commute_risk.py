"""Commute Distance & DOL PERM Risk Assessment Utility.

Calculates Great Circle (Haversine) distance, road circuity driving distance,
and evaluates Department of Labor (DOL) 20 CFR § 656.3 / § 656.17 commuting risk.
"""

from enum import Enum
import math
from typing import Optional
from pydantic import BaseModel, Field


CIRCUITY_FACTOR_DEFAULT: float = 1.25


class CommuteRiskLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class CommuteAssessment(BaseModel):
    """Pydantic schema representing DOL PERM commute distance & risk evaluation."""
    straight_line_miles: float = Field(..., description="Great-circle distance between centroids")
    estimated_driving_miles: float = Field(..., description="Driving distance accounting for road circuity")
    circuity_factor: float = Field(default=CIRCUITY_FACTOR_DEFAULT, description="Circuity multiplier (default: 1.25)")
    risk_level: CommuteRiskLevel = Field(..., description="DOL audit risk level (LOW, MEDIUM, HIGH)")
    dol_rationale: str = Field(..., description="Statutory audit rationale under 20 CFR § 656.3 and § 656.17")


def calculate_haversine_distance_miles(
    lat1: float, lon1: float, lat2: float, lon2: float
) -> float:
    """Calculate Great Circle distance in statute miles between two WGS84 coordinates."""
    r_miles = 3958.8
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = (
        math.sin(delta_phi / 2.0) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2
    )
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return round(r_miles * c, 2)


def calculate_estimated_driving_miles(
    straight_line_miles: float, circuity_factor: float = CIRCUITY_FACTOR_DEFAULT
) -> float:
    """Estimate road driving distance from straight-line miles using a winding circuity factor."""
    return round(straight_line_miles * circuity_factor, 1)


def evaluate_dol_commute_risk(
    job_lat: float,
    job_lon: float,
    paper_lat: float,
    paper_lon: float,
    job_cbsa: Optional[str] = None,
    paper_cbsa: Optional[str] = None,
    cbsa_type: Optional[str] = None,
    is_tier2_rural_fallback: bool = False,
    circuity_factor: float = CIRCUITY_FACTOR_DEFAULT,
) -> CommuteAssessment:
    """Evaluate DOL PERM commuting compliance risk under 20 CFR § 656.3 & § 656.17.

    Rules:
    - LOW Risk:
      A. Same MSA (job_cbsa == paper_cbsa, cbsa_type == 'M1') AND estimated_driving_miles <= 75.0.
      B. Micro (M2) or Rural (None), AND estimated_driving_miles <= 35.0.
    - MEDIUM Risk:
      35.0 < estimated_driving_miles <= 55.0 OR same MSA where estimated_driving_miles > 75.0.
    - HIGH Risk:
      estimated_driving_miles > 55.0 (including any Tier 2 Rural Fallback).
    """
    straight_line = calculate_haversine_distance_miles(job_lat, job_lon, paper_lat, paper_lon)
    driving_miles = calculate_estimated_driving_miles(straight_line, circuity_factor)

    # Condition 1: Same Metropolitan Statistical Area (M1)
    is_same_msa = (
        job_cbsa is not None
        and paper_cbsa is not None
        and job_cbsa == paper_cbsa
        and (cbsa_type == "M1" or cbsa_type == "METROPOLITAN")
    )

    if is_same_msa:
        if driving_miles <= 75.0:
            return CommuteAssessment(
                straight_line_miles=straight_line,
                estimated_driving_miles=driving_miles,
                circuity_factor=circuity_factor,
                risk_level=CommuteRiskLevel.LOW,
                dol_rationale=(
                    "Both ZIP codes fall within the same Metropolitan Statistical Area, "
                    "which is per se within normal commuting distance under 20 CFR 656.3."
                ),
            )
        else:
            return CommuteAssessment(
                straight_line_miles=straight_line,
                estimated_driving_miles=driving_miles,
                circuity_factor=circuity_factor,
                risk_level=CommuteRiskLevel.MEDIUM,
                dol_rationale=(
                    f"Estimated commute ({driving_miles:.1f} mi) approaches the upper 50-mile threshold "
                    "in 20 CFR 656.3. Verify that this newspaper has general circulation inside the "
                    "job site's specific county."
                ),
            )

    # Condition 2: Explicit Tier 2 Rural Fallback or Over 55 Driving Miles -> HIGH
    if is_tier2_rural_fallback or driving_miles > 55.0:
        return CommuteAssessment(
            straight_line_miles=straight_line,
            estimated_driving_miles=driving_miles,
            circuity_factor=circuity_factor,
            risk_level=CommuteRiskLevel.HIGH,
            dol_rationale=(
                f"Newspaper headquarters is ~{driving_miles:.1f} miles away, exceeding normal "
                "commuting distance (20 CFR 656.3). Under 20 CFR 656.17(e)(1)(i)(B)(2), verify if a "
                "closer local/weekly rural paper exists, or document audit proof that this regional "
                "paper has the widest circulation inside the target rural county."
            ),
        )

    # Condition 3: Inside Micropolitan (M2) or Rural, driving_miles <= 35.0 -> LOW
    if driving_miles <= 35.0:
        return CommuteAssessment(
            straight_line_miles=straight_line,
            estimated_driving_miles=driving_miles,
            circuity_factor=circuity_factor,
            risk_level=CommuteRiskLevel.LOW,
            dol_rationale=(
                f"Estimated commute ({driving_miles:.1f} mi) is well within the 20-50 mile "
                "DOL normal commuting distance standard."
            ),
        )

    # Condition 4: 35.0 < driving_miles <= 55.0 -> MEDIUM
    return CommuteAssessment(
        straight_line_miles=straight_line,
        estimated_driving_miles=driving_miles,
        circuity_factor=circuity_factor,
        risk_level=CommuteRiskLevel.MEDIUM,
        dol_rationale=(
            f"Estimated commute ({driving_miles:.1f} mi) approaches the upper 50-mile threshold "
            "in 20 CFR 656.3. Verify that this newspaper has general circulation inside the "
            "job site's specific county."
        ),
    )
