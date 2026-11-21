import type {
  PermResolutionRequest,
  PermResolutionResponse,
  PermNewspaperResult,
  ResolutionStrategy,
  WorksiteLocation,
  CommuteAssessment
} from '@case-support/shared-types';
import { calculateHaversineDistanceMiles } from './haversine.js';
import { lookupWorksiteLocation } from './cbsaDatabase.js';
import { NEWSPAPER_CATALOG } from './newspaperCatalog.js';
import type { CatalogNewspaper } from './newspaperCatalog.js';

function evaluateDolCommuteRisk(params: {
  straightLineMiles: number;
  circuityFactor?: number;
  isSameMsa?: boolean;
  isTier2Rural?: boolean;
}): CommuteAssessment {
  const circuity = params.circuityFactor || 1.25;
  const drivingMiles = Math.round(params.straightLineMiles * circuity * 10) / 10;
  const straight = Math.round(params.straightLineMiles * 10) / 10;

  if (params.isSameMsa) {
    if (drivingMiles <= 75.0) {
      return {
        straight_line_miles: straight,
        estimated_driving_miles: drivingMiles,
        circuity_factor: circuity,
        risk_level: 'LOW',
        dol_rationale: 'Both ZIP codes fall within the same Metropolitan Statistical Area, which is per se within normal commuting distance under 20 CFR 656.3.'
      };
    }
    return {
      straight_line_miles: straight,
      estimated_driving_miles: drivingMiles,
      circuity_factor: circuity,
      risk_level: 'MEDIUM',
      dol_rationale: `Estimated commute (${drivingMiles.toFixed(1)} mi) approaches the upper 50-mile threshold in 20 CFR 656.3. Verify that this newspaper has general circulation inside the job site's specific county.`
    };
  }

  if (params.isTier2Rural || drivingMiles > 55.0) {
    return {
      straight_line_miles: straight,
      estimated_driving_miles: drivingMiles,
      circuity_factor: circuity,
      risk_level: 'HIGH',
      dol_rationale: `Newspaper headquarters is ~${drivingMiles.toFixed(1)} miles away, exceeding normal commuting distance (20 CFR 656.3). Under 20 CFR 656.17(e)(1)(i)(B)(2), verify if a closer local/weekly rural paper exists, or document audit proof that this regional paper has the widest circulation inside the target rural county.`
    };
  }

  if (drivingMiles <= 35.0) {
    return {
      straight_line_miles: straight,
      estimated_driving_miles: drivingMiles,
      circuity_factor: circuity,
      risk_level: 'LOW',
      dol_rationale: `Estimated commute (${drivingMiles.toFixed(1)} mi) is well within the 20-50 mile DOL normal commuting distance standard.`
    };
  }

  return {
    straight_line_miles: straight,
    estimated_driving_miles: drivingMiles,
    circuity_factor: circuity,
    risk_level: 'MEDIUM',
    dol_rationale: `Estimated commute (${drivingMiles.toFixed(1)} mi) approaches the upper 50-mile threshold in 20 CFR 656.3. Verify that this newspaper has general circulation inside the job site's specific county.`
  };
}

function mapCatalogToResult(paper: CatalogNewspaper): PermNewspaperResult {
  return {
    id: paper.id,
    name: paper.name,
    sunday_circulation: paper.sunday_circulation,
    is_primary_metro_daily: paper.is_primary_metro_daily,
    has_sunday_print_edition: paper.has_sunday_print_edition,
    compliance_tier: paper.compliance_tier,
    ad_deadline: paper.ad_deadline,
    website_url: paper.website_url,
    classifieds_email: paper.classifieds_email,
    headquarters_state: paper.headquarters_state,
    headquarters_city: paper.headquarters_city,
    primary_cbsa_code: paper.cbsa_codes[0],
    counties_covered: paper.counties_covered
  };
}

export function resolveNewspaperForLocation(input: PermResolutionRequest): PermResolutionResponse {
  // Step 1: Resolve worksite geographic identity (CBSA, County FIPS, Coords)
  const worksite: WorksiteLocation = lookupWorksiteLocation(input);

  // -------------------------------------------------------------
  // TIER 1: CBSA / MSA Precedence (Urban & Suburban)
  // -------------------------------------------------------------
  if (worksite.cbsa_code) {
    const cbsaPapers = NEWSPAPER_CATALOG.filter(
      (p) => p.cbsa_codes.includes(worksite.cbsa_code!) && p.has_sunday_print_edition
    );

    if (cbsaPapers.length > 0) {
      // Sort: primary metro daily first, then highest Sunday circulation
      cbsaPapers.sort((a, b) => {
        if (a.is_primary_metro_daily !== b.is_primary_metro_daily) {
          return a.is_primary_metro_daily ? -1 : 1;
        }
        return b.sunday_circulation - a.sunday_circulation;
      });

      const recommended = cbsaPapers[0];
      const alternatives = cbsaPapers.slice(1).map(mapCatalogToResult);
      const isCrossState = Boolean(worksite.state && recommended.headquarters_state !== worksite.state);

      const isMicro = worksite.area_type === 'MICROPOLITAN';
      const areaLabel = isMicro ? 'Micropolitan Statistical Area (μSA)' : 'Metropolitan Statistical Area (MSA)';
      let note = `Worksite is within the ${worksite.cbsa_name || worksite.cbsa_code} ${areaLabel}. Under 20 CFR § 656.3, normal commuting distance encompasses the full statistical area without distance limitation.`;
      if (worksite.is_po_box_fallback && worksite.resolved_zip) {
        note += ` Worksite ZIP ${worksite.zip} is a USPS PO Box facility resolved to parent physical ZCTA ${worksite.resolved_zip}.`;
      }

      const strategy: ResolutionStrategy = {
        matched_via: 'CBSA_BOUNDARY',
        is_rural_exception: false,
        cross_state_notice: isCrossState,
        legal_basis: isMicro ? '20 CFR § 656.3 (Normal commuting distance within μSA)' : '20 CFR § 656.3 (Normal commuting distance deemed within full MSA)',
        legal_citation: '20 CFR § 656.17(e)(1)(i)(B)(1)',
        compliance_note: note
      };

      let commuteAssessment: CommuteAssessment | undefined;
      if (worksite.coordinates && recommended.coordinates) {
        const straight = calculateHaversineDistanceMiles(
          worksite.coordinates.lat,
          worksite.coordinates.lng,
          recommended.coordinates.lat,
          recommended.coordinates.lng
        );
        commuteAssessment = evaluateDolCommuteRisk({
          straightLineMiles: straight,
          isSameMsa: worksite.area_type === 'METROPOLITAN'
        });
      }

      return {
        worksite,
        resolution_strategy: strategy,
        recommended_newspaper: mapCatalogToResult(recommended),
        commute_assessment: commuteAssessment,
        alternatives
      };
    }
  }

  // -------------------------------------------------------------
  // TIER 2: Non-Metro County Matching
  // -------------------------------------------------------------
  if (worksite.county_fips) {
    const countySundayPapers = NEWSPAPER_CATALOG.filter(
      (p) => p.county_fips_list.includes(worksite.county_fips!) && p.has_sunday_print_edition
    );

    if (countySundayPapers.length > 0) {
      countySundayPapers.sort((a, b) => b.sunday_circulation - a.sunday_circulation);
      const recommended = countySundayPapers[0];
      const alternatives = countySundayPapers.slice(1).map(mapCatalogToResult);
      const isCrossState = Boolean(worksite.state && recommended.headquarters_state !== worksite.state);

      const strategy: ResolutionStrategy = {
        matched_via: 'COUNTY',
        is_rural_exception: false,
        cross_state_notice: isCrossState,
        legal_basis: '20 CFR § 656.17(e)(1)(i)(B)(1) (Newspaper of general circulation in county of intended employment)',
        legal_citation: '20 CFR § 656.17(e)(1)(i)(B)(1)',
        compliance_note: `Worksite is located in ${worksite.county_name || 'non-metro county'}. The recommended newspaper has general circulation with an active Sunday print edition in this county.`
      };

      let commuteAssessment: CommuteAssessment | undefined;
      if (worksite.coordinates && recommended.coordinates) {
        const straight = calculateHaversineDistanceMiles(
          worksite.coordinates.lat,
          worksite.coordinates.lng,
          recommended.coordinates.lat,
          recommended.coordinates.lng
        );
        commuteAssessment = evaluateDolCommuteRisk({ straightLineMiles: straight });
      }

      return {
        worksite,
        resolution_strategy: strategy,
        recommended_newspaper: mapCatalogToResult(recommended),
        commute_assessment: commuteAssessment,
        alternatives
      };
    }
  }

  // -------------------------------------------------------------
  // TIER 3: Rural Fallback (Tier 1 <= 50 mi, Tier 2 > 50 mi)
  // -------------------------------------------------------------
  const MAX_RADIUS_MILES = 50;
  const worksiteCoords = worksite.coordinates || { lat: 30.3585, lng: -103.6613 };

  const allWithDist = NEWSPAPER_CATALOG.map((paper) => ({
    paper,
    distance: calculateHaversineDistanceMiles(
      worksiteCoords.lat,
      worksiteCoords.lng,
      paper.coordinates.lat,
      paper.coordinates.lng
    )
  }));

  const nearbyPapers = allWithDist.filter((e) => e.distance <= MAX_RADIUS_MILES);

  if (nearbyPapers.length > 0) {
    nearbyPapers.sort((a, b) => {
      const circA = Math.max(a.paper.sunday_circulation, a.paper.weekday_circulation);
      const circB = Math.max(b.paper.sunday_circulation, b.paper.weekday_circulation);
      return circB - circA;
    });

    const bestEntry = nearbyPapers[0];
    const isCrossState = Boolean(worksite.state && bestEntry.paper.headquarters_state !== worksite.state);

    const assessment = evaluateDolCommuteRisk({
      straightLineMiles: bestEntry.distance,
      isTier2Rural: false
    });

    const strategy: ResolutionStrategy = {
      matched_via: 'RURAL_FALLBACK_RADIUS',
      is_rural_exception: true,
      cross_state_notice: isCrossState,
      distance_miles: Math.round(bestEntry.distance * 10) / 10,
      legal_citation: '20 CFR § 656.17(e)(1)(i)(B)(2)',
      legal_basis: '20 CFR § 656.17(e)(1)(i)(B)(2) (Rural exception: local commuting radius under 50 miles)',
      compliance_note: 'No Sunday edition in area. Publication with widest circulation within 50 miles recommended.'
    };

    return {
      worksite,
      resolution_strategy: strategy,
      recommended_newspaper: mapCatalogToResult(bestEntry.paper),
      commute_assessment: assessment,
      alternatives: nearbyPapers.slice(1).map((e) => mapCatalogToResult(e.paper))
    };
  }

  // Tier 2: Extended Regional Fallback
  const closestPaper = [...allWithDist].sort((a, b) => a.distance - b.distance)[0];
  const targetState = closestPaper.paper.headquarters_state;
  const statePool = allWithDist.filter((p) => p.paper.headquarters_state === targetState);
  const regionalPool = statePool.length > 0 ? statePool : allWithDist;

  const topRegional = [...regionalPool].sort((a, b) => {
    const circA = Math.max(a.paper.sunday_circulation, a.paper.weekday_circulation);
    const circB = Math.max(b.paper.sunday_circulation, b.paper.weekday_circulation);
    return circB - circA;
  })[0];

  const assessment = evaluateDolCommuteRisk({
    straightLineMiles: topRegional.distance,
    isTier2Rural: true
  });

  const strategy: ResolutionStrategy = {
    matched_via: 'RURAL_FALLBACK_RADIUS',
    is_rural_exception: true,
    cross_state_notice: Boolean(worksite.state && topRegional.paper.headquarters_state !== worksite.state),
    distance_miles: Math.round(topRegional.distance * 10) / 10,
    legal_citation: '20 CFR § 656.17(e)(1)(i)(B)(2)',
    legal_basis: '20 CFR § 656.17(e)(1)(i)(B)(2) (Rural Tier 2 Extended regional fallback)',
    compliance_note: 'Worksite exceeds 50 driving miles. Top regional paper and closest local paper identified for audit.'
  };

  return {
    worksite,
    resolution_strategy: strategy,
    recommended_newspaper: mapCatalogToResult(topRegional.paper),
    commute_assessment: assessment,
    closest_alternative_newspaper: mapCatalogToResult(closestPaper.paper),
    alternatives: regionalPool.slice(1, 5).map((e) => mapCatalogToResult(e.paper))
  };
}
