import { useState, useCallback } from 'react';
import { CbsaPolygonFeature, CbsaHoverInfo } from './cbsaTypes.js';
import { findCbsaForQuery, CBSA_MAP } from './cbsaPolygonData.js';
import { SundayNewspaperInfo, NewspaperSearchResult } from '../types.js';
import { getNewspapersByState, searchSundayNewspaper } from '../newspaperSearchUtils.js';
import { resolvePermNewspaperByCbsa } from '../newspaperResolutionApi.js';

interface UseCbsaMapInteractionProps {
  onSelectNewspaper: (paper: SundayNewspaperInfo) => void;
  onSelectStateCode: (code: string | null) => void;
  onSetSearchResult: (result: NewspaperSearchResult | null) => void;
}

export function useCbsaMapInteraction({
  onSelectNewspaper,
  onSelectStateCode,
  onSetSearchResult
}: UseCbsaMapInteractionProps) {
  const [activeCbsaCode, setActiveCbsaCode] = useState<string | null>(null);
  const [hoveredCbsa, setHoveredCbsa] = useState<CbsaHoverInfo | null>(null);

  const getRecommendedPaperForCbsa = useCallback((cbsa: CbsaPolygonFeature): SundayNewspaperInfo | undefined => {
    // 1. Try matching by primary city
    const localMatch = searchSundayNewspaper(cbsa.primaryCity);
    if (localMatch) return localMatch.newspaper;

    // 2. Try state's primary paper
    if (cbsa.states.length > 0) {
      const statePapers = getNewspapersByState(cbsa.states[0]);
      if (statePapers.length > 0) return statePapers[0];
    }
    return undefined;
  }, []);

  const handleCbsaClick = useCallback(async (cbsa: CbsaPolygonFeature) => {
    setActiveCbsaCode(cbsa.code);

    const primaryState = cbsa.states[0] || 'US';
    onSelectStateCode(primaryState);

    // Initial local paper match
    const initialPaper = getRecommendedPaperForCbsa(cbsa);
    if (initialPaper) {
      onSelectNewspaper(initialPaper);
      onSetSearchResult({
        query: `CBSA ${cbsa.code}`,
        matchType: 'CITY',
        matchedLocation: `${cbsa.name} (CBSA ${cbsa.code})`,
        newspaper: initialPaper,
        allStatePapers: getNewspapersByState(primaryState)
      });
    }

    // Call PERM resolution engine for this CBSA
    const permResult = await resolvePermNewspaperByCbsa(
      cbsa.code,
      cbsa.name,
      cbsa.primaryCity,
      primaryState
    );

    if (permResult) {
      onSetSearchResult(permResult);
      onSelectNewspaper(permResult.newspaper);
    }
  }, [getRecommendedPaperForCbsa, onSelectNewspaper, onSelectStateCode, onSetSearchResult]);

  const handleCbsaMouseEnter = useCallback((cbsa: CbsaPolygonFeature, e: React.MouseEvent) => {
    const paper = getRecommendedPaperForCbsa(cbsa);
    setHoveredCbsa({
      feature: cbsa,
      x: e.clientX,
      y: e.clientY,
      recommendedPaper: paper
    });
  }, [getRecommendedPaperForCbsa]);

  const handleCbsaMouseMove = useCallback((cbsa: CbsaPolygonFeature, e: React.MouseEvent) => {
    setHoveredCbsa((prev) => {
      if (!prev || prev.feature.code !== cbsa.code) {
        return {
          feature: cbsa,
          x: e.clientX,
          y: e.clientY,
          recommendedPaper: getRecommendedPaperForCbsa(cbsa)
        };
      }
      return { ...prev, x: e.clientX, y: e.clientY };
    });
  }, [getRecommendedPaperForCbsa]);

  const handleCbsaMouseLeave = useCallback(() => {
    setHoveredCbsa(null);
  }, []);

  const syncCbsaForQuery = useCallback((query: string): CbsaPolygonFeature | undefined => {
    const matched = findCbsaForQuery(query);
    if (matched) {
      setActiveCbsaCode(matched.code);
      return matched;
    }
    return undefined;
  }, []);

  const clearCbsa = useCallback(() => {
    setActiveCbsaCode(null);
    setHoveredCbsa(null);
  }, []);

  return {
    activeCbsaCode,
    hoveredCbsa,
    setActiveCbsaCode,
    handleCbsaClick,
    handleCbsaMouseEnter,
    handleCbsaMouseMove,
    handleCbsaMouseLeave,
    syncCbsaForQuery,
    clearCbsa,
    activeCbsaFeature: activeCbsaCode ? CBSA_MAP[activeCbsaCode] : undefined
  };
}
