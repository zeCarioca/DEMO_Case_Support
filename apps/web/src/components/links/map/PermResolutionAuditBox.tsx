import React from 'react';
import { ShieldCheck, AlertTriangle, MapPin, Scale, Clock, Award } from 'lucide-react';
import { PermResolutionResponse } from '@case-support/shared-types';

interface PermResolutionAuditBoxProps {
  resolution: PermResolutionResponse;
}

export const PermResolutionAuditBox: React.FC<PermResolutionAuditBoxProps> = ({ resolution }) => {
  const { worksite, resolution_strategy, recommended_newspaper } = resolution;

  const getStrategyBadge = () => {
    switch (resolution_strategy.matched_via) {
      case 'CBSA_BOUNDARY':
        return {
          label: 'Tier 1: CBSA / MSA Precedence',
          sublabel: 'Fronteira Metropolitana (20 CFR § 656.3)',
          color: '#10b981',
          bg: 'rgba(16, 185, 129, 0.1)'
        };
      case 'COUNTY':
        return {
          label: 'Tier 2: Non-Metro County Matching',
          sublabel: 'Condado Não-Metropolitano',
          color: '#3b82f6',
          bg: 'rgba(59, 130, 246, 0.1)'
        };
      case 'RURAL_FALLBACK_RADIUS':
        return {
          label: 'Tier 3: Rural Exception Fallback',
          sublabel: '20 CFR § 656.17(e)(1)(i)(B)(2)',
          color: '#f59e0b',
          bg: 'rgba(245, 158, 11, 0.1)'
        };
    }
  };

  const getComplianceTierBadge = (tier: string) => {
    switch (tier) {
      case 'LOW_RISK':
        return { label: 'Baixo Risco (Audit-Ready)', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' };
      case 'MEDIUM_RISK':
        return { label: 'Risco Médio (Monitorar)', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' };
      case 'REQUIRES_AFFIDAVIT':
        return { label: 'Requer Affidavit / Declaração', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' };
      default:
        return { label: tier, color: 'var(--text-secondary)', bg: 'var(--bg-subtle)' };
    }
  };

  const strategyBadge = getStrategyBadge();
  const complianceBadge = getComplianceTierBadge(recommended_newspaper.compliance_tier);

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-page)',
        border: '1px solid var(--border)',
        padding: '0.85rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}
    >
      {/* Top Bar: Strategy & Compliance Tier */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span
            style={{
              fontSize: '0.6875rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              padding: '0.2rem 0.5rem',
              color: strategyBadge.color,
              backgroundColor: strategyBadge.bg,
              border: `1px solid ${strategyBadge.color}40`,
              letterSpacing: '0.02em'
            }}
          >
            {strategyBadge.label}
          </span>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            {strategyBadge.sublabel}
          </span>
        </div>

        <span
          style={{
            fontSize: '0.6875rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            padding: '0.2rem 0.5rem',
            color: complianceBadge.color,
            backgroundColor: complianceBadge.bg,
            border: `1px solid ${complianceBadge.color}40`
          }}
        >
          {complianceBadge.label}
        </span>
      </div>

      {/* Cross-State Alert (20 CFR § 656.3) */}
      {resolution_strategy.cross_state_notice && (
        <div
          style={{
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.25)',
            padding: '0.65rem 0.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}
        >
          <MapPin size={15} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Aviso DOL (20 CFR § 656.3 — Normal Commuting Distance):</strong> O local de trabalho ({worksite.city}, {worksite.state}) e a sede da publicação ({recommended_newspaper.headquarters_state}) estão em estados vizinhos, porém pertencem integralmente à mesma Área Estatística Metropolitana ({worksite.cbsa_name || 'CBSA ' + worksite.cbsa_code}). A jurisprudência do DOL BALCA considera que fronteiras estaduais não fragmentam a AIE dentro do mesmo CBSA.
          </div>
        </div>
      )}

      {/* Rural Exception Alert (20 CFR § 656.17(e)(1)(i)(B)(2)) */}
      {resolution_strategy.is_rural_exception && (
        <div
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '0.65rem 0.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}
        >
          <AlertTriangle size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Exceção Rural Ativada (20 CFR § 656.17(e)(1)(i)(B)(2)):</strong> {resolution_strategy.compliance_note}
            {resolution_strategy.distance_miles !== undefined && (
              <span> Distância radial de busca: <strong>{resolution_strategy.distance_miles} milhas</strong>.</span>
            )}
          </div>
        </div>
      )}

      {/* Audit Readiness Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-subtle)',
          padding: '0.65rem',
          border: '1px solid var(--border)'
        }}
      >
        <div>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            Área Estatística (CBSA)
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.1rem' }}>
            {worksite.cbsa_code ? `${worksite.cbsa_code} — ${worksite.cbsa_name || 'Metropolitan Area'}` : 'Não-Metropolitano (Rural)'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            Condado & FIPS
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.1rem' }}>
            {worksite.county_name || 'Condado'} {worksite.county_fips ? `(FIPS: ${worksite.county_fips})` : ''}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            Prazo Limite (Ad Deadline)
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={12} color="var(--accent)" />
            <span>{recommended_newspaper.ad_deadline}</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            Fundamentação Jurídica
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Scale size={12} color="var(--accent)" />
            <span>{resolution_strategy.legal_citation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
