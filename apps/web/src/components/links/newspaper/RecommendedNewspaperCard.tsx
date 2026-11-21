import React from 'react';
import { Newspaper, ExternalLink, Mail, CheckCircle2, AlertCircle, ShieldCheck, Calendar, Car, AlertTriangle } from 'lucide-react';
import { PermNewspaperResult, CommuteAssessment } from '@case-support/shared-types';

interface RecommendedNewspaperCardProps {
  newspaper: PermNewspaperResult;
  commuteAssessment?: CommuteAssessment;
  closestAlternative?: PermNewspaperResult;
}

export const RecommendedNewspaperCard: React.FC<RecommendedNewspaperCardProps> = ({
  newspaper,
  commuteAssessment,
  closestAlternative
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-level-1)'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '1rem',
          marginBottom: '1.25rem'
        }}
      >
        <div>
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
                padding: '0.15rem 0.6rem'
              }}
            >
              Jornal de Maior Circulação Selecionado
            </span>
            {newspaper.compliance_tier === 'LOW_RISK' && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: 'var(--color-success, #1aae39)',
                  backgroundColor: 'rgba(26, 174, 57, 0.08)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.15rem 0.55rem'
                }}
              >
                <ShieldCheck size={11} />
                Baixo Risco DOL
              </span>
            )}
          </div>

          <h3
            style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              margin: '0.2rem 0'
            }}
          >
            {newspaper.name}
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
            Sede: {newspaper.headquarters_city ? `${newspaper.headquarters_city}, ` : ''}{newspaper.headquarters_state}
            {newspaper.counties_covered && newspaper.counties_covered.length > 0
              ? ` • Abrange: ${newspaper.counties_covered.slice(0, 3).join(', ')}`
              : ''}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {newspaper.website_url && (
            <a
              href={newspaper.website_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              <ExternalLink size={13} />
              <span>Website Oficial</span>
            </a>
          )}
          {newspaper.classifieds_email && (
            <a
              href={`mailto:${newspaper.classifieds_email}?subject=PERM%20Recruitment%20Ad%20Inquiry`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius-sm)',
                padding: '0.45rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              <Mail size={13} />
              <span>Contatar Classificados</span>
            </a>
          )}
        </div>
      </div>

      {/* Circulation Specs Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem'
          }}
        >
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Tiragem Dominical Estimada
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            {newspaper.sunday_circulation > 0 ? `${newspaper.sunday_circulation.toLocaleString()} exemplares` : 'Sem edição de domingo'}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
            {newspaper.is_primary_metro_daily ? 'Principal diário metropolitano da região' : 'Circulação geral na área'}
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem'
          }}
        >
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Edição Impressa de Domingo
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
            {newspaper.has_sunday_print_edition ? (
              <>
                <CheckCircle2 size={16} color="var(--color-success, #1aae39)" />
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-success, #1aae39)' }}>
                  Confirmada
                </span>
              </>
            ) : (
              <>
                <AlertCircle size={16} color="var(--color-warning, #dd5b00)" />
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-warning, #dd5b00)' }}>
                  Apenas Dias Úteis
                </span>
              </>
            )}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
            20 CFR § 656.17(e)(1)(i)(B)(1)
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem'
          }}
        >
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>
            Prazo Típico de Envio (Deadline)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
            <Calendar size={15} color="var(--text-tertiary)" />
            <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {newspaper.ad_deadline || 'Quinta-feira, 17h EST'}
            </span>
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
            Para veiculação na edição dominical
          </div>
        </div>
      </div>

      {/* DOL Commute Risk Assessment */}
      {commuteAssessment && (
        <div
          style={{
            marginTop: '1.25rem',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${commuteAssessment.risk_level === 'LOW' ? 'rgba(26, 174, 57, 0.3)' : commuteAssessment.risk_level === 'MEDIUM' ? 'rgba(221, 91, 0, 0.3)' : 'rgba(229, 57, 53, 0.3)'}`,
            backgroundColor: `${commuteAssessment.risk_level === 'LOW' ? 'rgba(26, 174, 57, 0.05)' : commuteAssessment.risk_level === 'MEDIUM' ? 'rgba(221, 91, 0, 0.05)' : 'rgba(229, 57, 53, 0.05)'}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Car size={16} color="var(--text-secondary)" />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Estimativa de Deslocamento: {commuteAssessment.estimated_driving_miles} mi rodoviárias
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                ({commuteAssessment.straight_line_miles} mi linha reta • fator 1.25x)
              </span>
            </div>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '0.15rem 0.6rem',
                borderRadius: 'var(--radius-pill)',
                color: commuteAssessment.risk_level === 'LOW' ? '#1aae39' : commuteAssessment.risk_level === 'MEDIUM' ? '#dd5b00' : '#e53935',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid currentColor'
              }}
            >
              Risco DOL: {commuteAssessment.risk_level}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {commuteAssessment.dol_rationale}
          </p>

          {closestAlternative && (
            <div
              style={{
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px dashed var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)'
              }}
            >
              <AlertTriangle size={14} color="var(--color-warning, #dd5b00)" />
              <span>
                <strong>Alternativa Local Mais Próxima para Auditoria:</strong> {closestAlternative.name} ({closestAlternative.headquarters_city}, {closestAlternative.headquarters_state}) — circulação: {closestAlternative.sunday_circulation || closestAlternative.sunday_circulation === 0 ? closestAlternative.sunday_circulation.toLocaleString() : 'N/A'}.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
