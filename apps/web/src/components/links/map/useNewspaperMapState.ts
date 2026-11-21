import { useState, useCallback } from 'react';
import { SundayNewspaperInfo, NewspaperSearchResult, NewspaperCityMarker, HoveredStateCoord } from './types.js';
import { NEWSPAPER_CITY_MARKERS } from './newspaperCityCoords.js';
import { getNewspapersByState, searchSundayNewspaper } from './newspaperSearchUtils.js';
import { resolvePermNewspaperApi } from './newspaperResolutionApi.js';

interface UseNewspaperMapStateProps {
  syncCbsaForQuery: (q: string) => void;
  setActiveCbsaCode: (code: string | null) => void;
  clearCbsa: () => void;
  setHovered: React.Dispatch<React.SetStateAction<HoveredStateCoord | null>>;
  selectedNewspaper: SundayNewspaperInfo | null;
  setSelectedNewspaper: React.Dispatch<React.SetStateAction<SundayNewspaperInfo | null>>;
  activeNewspaperStateCode: string | null;
  setActiveNewspaperStateCode: React.Dispatch<React.SetStateAction<string | null>>;
  searchResult: NewspaperSearchResult | null;
  setSearchResult: React.Dispatch<React.SetStateAction<NewspaperSearchResult | null>>;
}

export function useNewspaperMapState({
  syncCbsaForQuery,
  setActiveCbsaCode,
  clearCbsa,
  setHovered,
  selectedNewspaper,
  setSelectedNewspaper,
  activeNewspaperStateCode,
  setActiveNewspaperStateCode,
  searchResult,
  setSearchResult
}: UseNewspaperMapStateProps) {
  const [newspaperSearch, setNewspaperSearch] = useState<string>('');
  const [activeCityId, setActiveCityId] = useState<string | null>(null);
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);

  const handleCityClick = useCallback(async (marker: NewspaperCityMarker) => {
    const papers = getNewspapersByState(marker.stateCode);
    const matchedPaper = papers.find((p) => p.id === marker.newspaperId || p.primaryCity.toLowerCase() === marker.city.toLowerCase()) || papers[0];

    if (matchedPaper) {
      setSelectedNewspaper(matchedPaper);
      setActiveNewspaperStateCode(marker.stateCode);
      setActiveCityId(marker.id);
      syncCbsaForQuery(marker.city);
      setSearchResult({
        query: marker.city,
        matchType: 'CITY',
        matchedLocation: `${marker.city}, ${marker.stateCode}`,
        newspaper: matchedPaper,
        allStatePapers: papers
      });

      const permRes = await resolvePermNewspaperApi(`${marker.city}, ${marker.stateCode}`);
      if (permRes) {
        const strat = permRes.permResolution?.resolution_strategy.matched_via;
        const isReliableMatch =
          permRes.newspaper.id === marker.newspaperId ||
          permRes.newspaper.stateCode === marker.stateCode ||
          strat === 'CBSA_BOUNDARY' ||
          strat === 'COUNTY';

        if (isReliableMatch) {
          setSearchResult(permRes);
          setSelectedNewspaper(permRes.newspaper);
        }
        if (permRes.permResolution?.worksite?.cbsa_code) {
          setActiveCbsaCode(permRes.permResolution.worksite.cbsa_code);
        }
      }
    }
  }, [syncCbsaForQuery, setActiveCbsaCode, setSelectedNewspaper, setActiveNewspaperStateCode, setSearchResult]);

  const handleCityMouseEnter = useCallback((marker: NewspaperCityMarker, e: React.MouseEvent) => {
    setHoveredCityId(marker.id);
    const papers = getNewspapersByState(marker.stateCode);
    const paper = papers.find((p) => p.id === marker.newspaperId) || papers[0];

    if (paper) {
      setHovered({
        code: marker.stateCode,
        name: paper.stateName,
        city: marker.city,
        newspaper: paper,
        x: e.clientX,
        y: e.clientY
      });
    }
  }, [setHovered]);

  const handleSearchExecute = useCallback(async (q: string) => {
    if (!q.trim()) {
      setSearchResult(null);
      setSelectedNewspaper(null);
      setActiveNewspaperStateCode(null);
      setActiveCityId(null);
      clearCbsa();
      return;
    }
    syncCbsaForQuery(q);
    const local = searchSundayNewspaper(q);
    if (local) {
      setSearchResult(local);
      setSelectedNewspaper(local.newspaper);
      setActiveNewspaperStateCode(local.newspaper.stateCode);
      const marker = NEWSPAPER_CITY_MARKERS.find(
        (m) => m.stateCode === local.newspaper.stateCode && m.city.toLowerCase() === local.newspaper.primaryCity.toLowerCase()
      );
      setActiveCityId(marker?.id || null);
    }

    const apiRes = await resolvePermNewspaperApi(q);
    if (apiRes) {
      setSearchResult(apiRes);
      setSelectedNewspaper(apiRes.newspaper);
      setActiveNewspaperStateCode(apiRes.newspaper.stateCode);
      if (apiRes.permResolution?.worksite?.cbsa_code) {
        setActiveCbsaCode(apiRes.permResolution.worksite.cbsa_code);
      }
      const marker = NEWSPAPER_CITY_MARKERS.find(
        (m) => m.stateCode === apiRes.newspaper.stateCode && m.city.toLowerCase() === apiRes.newspaper.primaryCity.toLowerCase()
      );
      setActiveCityId(marker?.id || null);
    }
  }, [syncCbsaForQuery, setActiveCbsaCode, clearCbsa, setSelectedNewspaper, setActiveNewspaperStateCode, setSearchResult]);

  const handleClear = useCallback(() => {
    setNewspaperSearch('');
    setSearchResult(null);
    setSelectedNewspaper(null);
    setActiveNewspaperStateCode(null);
    setActiveCityId(null);
    clearCbsa();
  }, [clearCbsa, setSelectedNewspaper, setActiveNewspaperStateCode, setSearchResult]);

  return {
    newspaperSearch,
    setNewspaperSearch,
    activeCityId,
    setActiveCityId,
    hoveredCityId,
    setHoveredCityId,
    handleCityClick,
    handleCityMouseEnter,
    handleSearchExecute,
    handleClear
  };
}
