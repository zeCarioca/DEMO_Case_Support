"""Refactored Newspaper Lookup Service.
Pure indexed database query engine with CBSA resolution, 2-tier rural fallback, and DOL risk assessment.
"""

import re
from typing import Any, Dict, List, Optional
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from commute_risk import (
    calculate_haversine_distance_miles,
    calculate_estimated_driving_miles,
    evaluate_dol_commute_risk,
    CommuteRiskLevel,
)
from rural_fallback import resolve_rural_2tier_fallback
from schema import Newspaper, USPSDirectory, ZctaToCbsa


class NewspaperLookupService:
    def __init__(self, session: Session):
        self.session = session

    def resolve_zip(self, raw_zip: str) -> Dict[str, Any]:
        """Resolve highest-circulation newspaper for a 5-digit ZIP code.

        Returns resolution strategy, top newspaper, commute assessment, and alternatives.
        """
        # 1. Validate Input (Strict 5-digit numeric)
        cleaned_zip = (raw_zip or "").strip()
        if not re.fullmatch(r"^\d{5}$", cleaned_zip):
            raise ValueError(f"Invalid ZIP code '{raw_zip}'. Input must be exactly 5 numeric digits.")

        resolved_zip = cleaned_zip
        is_po_box = False

        # 2. Check ZCTA-to-CBSA pre-computed mapping
        mapping = self.session.scalars(
            select(ZctaToCbsa).where(ZctaToCbsa.zip_code == cleaned_zip)
        ).first()

        # 3. Handle PO Box / Non-ZCTA ZIPs via secondary directory
        if not mapping:
            po_entry = self.session.scalars(
                select(USPSDirectory).where(USPSDirectory.zip_code == cleaned_zip)
            ).first()
            if po_entry:
                resolved_zip = po_entry.parent_zcta
                is_po_box = True
                mapping = self.session.scalars(
                    select(ZctaToCbsa).where(ZctaToCbsa.zip_code == resolved_zip)
                ).first()

        if not mapping:
            raise KeyError(f"ZIP code '{cleaned_zip}' is not recognized in Census ZCTA or USPS directories.")

        # 4. Check if ZIP maps to a CBSA (M1 Metro or M2 Micro)
        if mapping.cbsa_code:
            return self._resolve_cbsa_match(
                input_zip=cleaned_zip,
                resolved_zip=resolved_zip,
                is_po_box=is_po_box,
                mapping=mapping,
            )

        # 5. Rural / Non-CBSA 2-Tier Fallback
        return resolve_rural_2tier_fallback(
            session=self.session,
            input_zip=cleaned_zip,
            resolved_zip=resolved_zip,
            is_po_box=is_po_box,
            mapping=mapping,
            format_paper_fn=self._format_paper_dict,
        )

    def _resolve_cbsa_match(
        self,
        input_zip: str,
        resolved_zip: str,
        is_po_box: bool,
        mapping: ZctaToCbsa,
    ) -> Dict[str, Any]:
        """Resolve top newspaper within a Metropolitan or Micropolitan area."""
        area_type = "Metropolitan" if mapping.lsad_type == "M1" else "Micropolitan"

        # Query newspapers for this CBSA, sorted by Sunday circulation DESC
        papers = self.session.scalars(
            select(Newspaper)
            .where(
                Newspaper.cbsa_code == mapping.cbsa_code,
                Newspaper.has_sunday_print_edition == True,
            )
            .order_by(
                desc(Newspaper.is_primary_metro_daily),
                desc(Newspaper.sunday_circulation),
                desc(Newspaper.weekday_circulation),
            )
        ).all()

        if not papers:
            # Fallback to weekday publications in the same CBSA
            papers = self.session.scalars(
                select(Newspaper)
                .where(Newspaper.cbsa_code == mapping.cbsa_code)
                .order_by(desc(Newspaper.weekday_circulation))
            ).all()

        if not papers:
            raise LookupError(
                f"No newspapers found registered for {area_type} CBSA {mapping.cbsa_code} ({mapping.cbsa_name})."
            )

        top_paper = papers[0]

        # Evaluate commute assessment if coordinates exist
        commute_assessment = None
        closest_alt = None
        straight_mi = None
        drive_mi = None

        if (
            mapping.latitude is not None
            and mapping.longitude is not None
            and top_paper.latitude is not None
            and top_paper.longitude is not None
        ):
            assessment = evaluate_dol_commute_risk(
                job_lat=mapping.latitude,
                job_lon=mapping.longitude,
                paper_lat=top_paper.latitude,
                paper_lon=top_paper.longitude,
                job_cbsa=mapping.cbsa_code,
                paper_cbsa=top_paper.cbsa_code,
                cbsa_type=mapping.lsad_type,
            )
            commute_assessment = assessment.model_dump()
            straight_mi = assessment.straight_line_miles
            drive_mi = assessment.estimated_driving_miles

            if assessment.risk_level == CommuteRiskLevel.HIGH:
                closest_alt = self._find_closest_alternative(
                    mapping.latitude, mapping.longitude, exclude_id=top_paper.id
                )

        alternatives = [self._format_paper_dict(p) for p in papers[1:5]]

        result = {
            "status": "SUCCESS",
            "input_zip": input_zip,
            "resolved_zip": resolved_zip,
            "is_po_box_fallback": is_po_box,
            "metadata": {
                "matched_via": "CBSA_BOUNDARY",
                "area_type": area_type,
                "lsad_code": mapping.lsad_type,
                "cbsa_code": mapping.cbsa_code,
                "cbsa_name": mapping.cbsa_name,
                "is_rural_exception": False,
                "legal_basis": "20 CFR § 656.3 (Normal commuting area deemed within full statistical area)",
            },
            "recommended_newspaper": self._format_paper_dict(top_paper, straight_mi, drive_mi),
            "commute_assessment": commute_assessment,
            "alternatives": alternatives,
        }

        if closest_alt:
            result["closest_alternative_newspaper"] = closest_alt

        return result

    def _find_closest_alternative(
        self, lat: float, lon: float, exclude_id: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        papers = self.session.scalars(
            select(Newspaper).where(
                Newspaper.latitude.is_not(None),
                Newspaper.longitude.is_not(None),
            )
        ).all()
        if not papers:
            return None
        filtered = [p for p in papers if p.id != exclude_id] if exclude_id else papers
        if not filtered:
            return None
        candidates = []
        for p in filtered:
            s_mi = calculate_haversine_distance_miles(lat, lon, p.latitude, p.longitude)
            d_mi = calculate_estimated_driving_miles(s_mi)
            candidates.append((p, s_mi, d_mi))
        candidates.sort(key=lambda x: x[2])
        closest = candidates[0]
        return self._format_paper_dict(closest[0], closest[1], closest[2])

    def _format_paper_dict(
        self,
        paper: Newspaper,
        straight_line_miles: Optional[float] = None,
        estimated_driving_miles: Optional[float] = None,
    ) -> Dict[str, Any]:
        data = {
            "id": paper.id,
            "name": paper.name,
            "cbsa_code": paper.cbsa_code,
            "headquarters_city": paper.headquarters_city,
            "headquarters_state": paper.headquarters_state,
            "headquarters_zip": paper.headquarters_zip,
            "sunday_circulation": paper.sunday_circulation,
            "weekday_circulation": paper.weekday_circulation,
            "is_primary_metro_daily": paper.is_primary_metro_daily,
            "has_sunday_print_edition": paper.has_sunday_print_edition,
            "latitude": paper.latitude,
            "longitude": paper.longitude,
        }
        if straight_line_miles is not None:
            data["straight_line_miles"] = straight_line_miles
        if estimated_driving_miles is not None:
            data["estimated_driving_miles"] = estimated_driving_miles
        return data
