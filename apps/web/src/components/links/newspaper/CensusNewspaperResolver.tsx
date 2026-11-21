import React, { useState } from 'react';
import { Search, Loader2, Sparkles, MapPin, AlertCircle } from 'lucide-react';
import { PermResolutionResponse } from '@case-support/shared-types';
import { RecommendedNewspaperCard } from './RecommendedNewspaperCard.js';
import { PermAuditMemoBox } from './PermAuditMemoBox.js';
import { AlternativeNewspapersList } from './AlternativeNewspapersList.js';
import { CensusAreaClassificationBanner } from './CensusAreaClassificationBanner.js';
import { resolveLocalPermNewspaper } from './censusLocalResolver.js';
import { PRESET_ZIPS } from './resolverPresets.js';

export const CensusNewspaperResolver: React.FC = () => {
  const [zipInput, setZipInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolution, setResolution] = useState<PermResolutionResponse | null>(null);

  const executeResolution = async (zipCode: string) => {
    const cleanZip = zipCode.trim();
    if (!cleanZip) return;

    if (!/^\d{5}$/.test(cleanZip)) {
      setError('O CEP deve conter exatamente 5 dígitos numéricos (ex: 10001).');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let resolvedData: PermResolutionResponse | null = null;

      // 1. Attempt backend API first (when running with local Fastify backend)
      try {
        const response = await fetch('/api/newspapers/resolve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ zip_code: cleanZip })
        });

        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            resolvedData = await response.json();
          }
        }
      } catch {
        // Backend offline or on static Vercel host - fall through to client-side resolver
      }

      // 2. Client-side database resolution fallback (guarantees 100% US nationwide coverage offline/Vercel)
      if (!resolvedData) {
        resolvedData = resolveLocalPermNewspaper(cleanZip);
      }

      if (!resolvedData) {
        throw new Error(`Não foi possível determinar o jornal dominical para o CEP ${cleanZip}.`);
      }

      setResolution(resolvedData);
    } catch (err: any) {
      setError(err?.message || 'Falha ao resolver o periódico para este CEP.');
      setResolution(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeResolution(zipInput);
  };

  const handleSelectPreset = (zip: string) => {
    setZipInput(zip);
    executeResolution(zip);
  };

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-level-1)'
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              backgroundColor: 'var(--sticker-blue-bg)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border)',
              padding: '0.15rem 0.55rem'
            }}
          >
            Motor Censitário DOL 20 CFR § 656
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>•</span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
            Census Bureau Cartographic Boundary Files (ZCTA & CBSA)
          </span>
        </div>

        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: '0.2rem 0' }}>
          Determinador Oficial de Jornal PERM por CEP
        </h2>

        {/* Active Live Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            margin: '0.35rem 0',
            padding: '0.25rem 0.65rem',
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: 'var(--radius-sm, 4px)',
            color: '#065f46',
            fontSize: '0.75rem',
            fontWeight: 600
          }}
        >
          <Sparkles size={13} style={{ color: '#059669' }} />
          <span>Ativo: Cobertura Nacional 100% dos CEPs dos EUA (20 CFR § 656)</span>
        </div>

        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '780px' }}>
          Determina instantaneamente se o local de trabalho está em Área Metropolitana (MSA), Micropolitana (μSA) ou Exceção Rural, retornando o periódico de maior circulação com fundamentação para o ETA-9089.
        </p>
      </div>

      {/* Input Form & Quick Presets */}
      <div style={{ marginBottom: '1.5rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-subtle)',
              border: error ? '1px solid var(--color-danger, #e53935)' : '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '0.45rem 0.85rem',
              gap: '0.5rem',
              minWidth: '260px'
            }}
          >
            <MapPin size={16} color="var(--text-tertiary)" />
            <input
              type="text"
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="Digite o CEP (5 dígitos, ex: 10001)..."
              maxLength={5}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                width: '100%'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || zipInput.length !== 5}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 1.1rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: isLoading || zipInput.length !== 5 ? 'not-allowed' : 'pointer',
              opacity: isLoading || zipInput.length !== 5 ? 0.6 : 1,
              transition: 'all 0.15s ease'
            }}
          >
            {isLoading ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
            <span>Resolver Jornal</span>
          </button>
        </form>

        {/* Quick Test Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            Testar casos rápidos:
          </span>
          {PRESET_ZIPS.map((p) => (
            <button
              key={p.zip}
              type="button"
              onClick={() => handleSelectPreset(p.zip)}
              style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-pill)',
                padding: '0.2rem 0.55rem',
                fontSize: '0.6875rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            backgroundColor: 'rgba(229, 57, 53, 0.08)',
            border: '1px solid var(--color-danger, #e53935)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            color: 'var(--color-danger, #e53935)',
            fontSize: '0.8125rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Resolution Details */}
      {resolution && (
        <div style={{ marginTop: '1.25rem' }}>
          <CensusAreaClassificationBanner worksite={resolution.worksite} />

          <RecommendedNewspaperCard
            newspaper={resolution.recommended_newspaper}
            commuteAssessment={resolution.commute_assessment}
            closestAlternative={resolution.closest_alternative_newspaper}
          />

          <PermAuditMemoBox resolution={resolution} />

          <AlternativeNewspapersList alternatives={resolution.alternatives} />
        </div>
      )}
    </section>
  );
};
