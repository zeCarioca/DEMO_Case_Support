import React, { useState } from 'react';
import { ExternalLink, Copy, Check, X, ShieldAlert, Newspaper, Mail, MapPin } from 'lucide-react';
import { SundayNewspaperInfo, NewspaperSearchResult } from './types.js';
import { PermResolutionAuditBox } from './PermResolutionAuditBox.js';

interface SelectedNewspaperCardProps {
  newspaper: SundayNewspaperInfo;
  searchResult?: NewspaperSearchResult | null;
  onClose: () => void;
  onSelectAlternative?: (paper: SundayNewspaperInfo) => void;
  allStatePapers?: SundayNewspaperInfo[];
}

export const SelectedNewspaperCard: React.FC<SelectedNewspaperCardProps> = ({
  newspaper,
  searchResult,
  onClose,
  onSelectAlternative,
  allStatePapers = []
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const perm = searchResult?.permResolution;
    const resolutionDetails = perm
      ? `Estratégia DOL: ${perm.resolution_strategy.matched_via}
Fundamentação: ${perm.resolution_strategy.legal_citation}
CBSA: ${perm.worksite.cbsa_code ? `${perm.worksite.cbsa_code} — ${perm.worksite.cbsa_name}` : 'Não-Metropolitano (Rural)'}
Condado: ${perm.worksite.county_name || ''} (FIPS: ${perm.worksite.county_fips || 'N/A'})
Prazo Ad: ${perm.recommended_newspaper.ad_deadline}
Tiragem Dominical: ${perm.recommended_newspaper.sunday_circulation.toLocaleString()}
Classificação de Risco: ${perm.recommended_newspaper.compliance_tier}`
      : `Regulamentação: 20 CFR § 656.17(e) — 2 edições dominicais de circulação geral na AIE.`;

    const textToCopy = `PERM Sunday Newspaper Recommendation:
Jornal: ${newspaper.name}
Estado: ${newspaper.stateName} (${newspaper.stateCode})
Área de Emprego Pretendida (AIE): ${newspaper.metroArea}
Condados Atendidos: ${newspaper.countiesCovered.join(', ')}
Classificados / Legal Notices: ${newspaper.classifiedsEmail || newspaper.websiteUrl}
${resolutionDetails}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };


  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-contrast)',
        borderLeft: '4px solid var(--accent)',
        padding: '1.25rem',
        marginTop: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}
    >
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#ffffff',
                backgroundColor: 'var(--accent)',
                padding: '0.15rem 0.45rem'
              }}
            >
              {newspaper.stateCode}
            </span>

            {searchResult && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-text)',
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '0.15rem 0.45rem',
                  border: '1px solid var(--border)'
                }}
              >
                <MapPin size={11} />
                <span>Correspondência: {searchResult.matchedLocation}</span>
              </span>
            )}

            <span
              style={{
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-tertiary)',
                backgroundColor: 'var(--bg-subtle)',
                padding: '0.15rem 0.45rem',
                border: '1px solid var(--border)'
              }}
            >
              {newspaper.circulationTier}
            </span>
          </div>

          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              margin: '0.2rem 0'
            }}
          >
            {newspaper.name}
          </h3>

          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Área de Intended Employment (AIE): <strong>{newspaper.metroArea}</strong> ({newspaper.primaryCity})
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.15rem' }}>
            Condados cobertos: {newspaper.countiesCovered.join(', ')}
            {newspaper.estimatedSundayCirculation && ` • Tiragem dominical estimada: ${newspaper.estimatedSundayCirculation}`}
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            padding: '0.2rem'
          }}
          title="Fechar painel do jornal"
        >
          <X size={16} />
        </button>
      </div>

      {/* 2-Tier Hierarchical PERM Audit Box (or fallback compliance box) */}
      {searchResult?.permResolution ? (
        <PermResolutionAuditBox resolution={searchResult.permResolution} />
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem',
            backgroundColor: 'var(--bg-page)',
            padding: '0.75rem 0.85rem',
            border: '1px solid var(--border)'
          }}
        >
          <ShieldAlert size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Requisito PERM (20 CFR § 656.17(e)):</strong> O anúncio impresso deve ser veiculado em{' '}
            <strong>2 edições dominicais distintas</strong> no periódico de maior circulação geral da área do emprego.
            Exigir do departamento de classificados a emissão de <em>Electronic Tear Sheet</em> completa com cabeçalho contendo data, página e o nome do jornal para instruir o Audit File.
          </div>
        </div>
      )}

      {/* Alternative options in this state if available */}
      {allStatePapers.length > 1 && (
        <div style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>
            Outras praças em {newspaper.stateName}:
          </span>
          {allStatePapers
            .filter((p) => p.id !== newspaper.id)
            .map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectAlternative?.(p)}
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: '0.6875rem',
                  padding: '0.2rem 0.45rem',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                {p.name} ({p.primaryCity})
              </button>
            ))}
        </div>
      )}

      {/* Footer Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--border)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
          {newspaper.classifiedsEmail && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              <Mail size={12} />
              <span>{newspaper.classifiedsEmail}</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              color: copied ? 'var(--accent-text)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? 'Copiado!' : 'Copiar Diretrizes'}</span>
          </button>

          <a
            href={newspaper.classifiedsUrl || newspaper.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
              border: 'none',
              padding: '0.35rem 0.85rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <Newspaper size={13} />
            <span>Acessar {newspaper.name}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
