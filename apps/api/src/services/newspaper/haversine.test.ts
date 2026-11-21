import { describe, it, expect } from 'vitest';
import { calculateHaversineDistanceMiles } from './haversine.js';
import { resolveNewspaperForLocation } from './resolutionEngine.js';

describe('Geospatial Haversine Distance & Census Resolution Engine', () => {
  it('calculates zero distance for identical coordinates', () => {
    const dist = calculateHaversineDistanceMiles(40.7128, -74.006, 40.7128, -74.006);
    expect(dist).toBe(0);
  });

  it('accurately calculates distance between known metropolitan hubs', () => {
    // New York (40.7128, -74.0060) to Boston (42.3601, -71.0589) ~ 190 miles
    const nyToBoston = calculateHaversineDistanceMiles(40.7128, -74.006, 42.3601, -71.0589);
    expect(nyToBoston).toBeGreaterThan(180);
    expect(nyToBoston).toBeLessThan(200);

    // Los Angeles (34.0522, -118.2437) to San Francisco (37.7749, -122.4194) ~ 347 miles
    const laToSf = calculateHaversineDistanceMiles(34.0522, -118.2437, 37.7749, -122.4194);
    expect(laToSf).toBeGreaterThan(340);
    expect(laToSf).toBeLessThan(360);
  });

  it('resolves primary newspapers and evaluates DOL commute risk for a metropolitan ZIP', () => {
    // 33139: Miami Beach, FL (Miami-Fort Lauderdale-Pompano Beach MSA)
    const result = resolveNewspaperForLocation({
      zip_code: '33139'
    });

    expect(result).toBeDefined();
    expect(result.worksite.state).toBe('FL');
    expect(result.recommended_newspaper).toBeDefined();
    expect(result.recommended_newspaper.name).toContain('Miami');
    expect(result.resolution_strategy.matched_via).toBe('CBSA_BOUNDARY');
  });

  it('handles rural or unknown ZIP codes with a compliant fallback strategy', () => {
    // 99999: Out-of-catalog test ZIP code
    const result = resolveNewspaperForLocation({
      zip_code: '99999'
    });

    expect(result).toBeDefined();
    expect(result.recommended_newspaper).toBeDefined();
    expect(result.resolution_strategy).toBeDefined();
  });
});
