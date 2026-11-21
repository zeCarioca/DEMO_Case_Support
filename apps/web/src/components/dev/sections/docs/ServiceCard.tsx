import React from 'react';
import { ExternalLink, Database, Server, Key, ShieldAlert } from 'lucide-react';
import { ServiceItem } from './types.js';

interface ServiceCardProps {
  service: ServiceItem;
  onOpenDetails: (service: ServiceItem) => void;
  onTagClick: (tag: string) => void;
  activeTag?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onOpenDetails,
  onTagClick,
  activeTag
}) => {
  const tierColors: Record<string, { bg: string; text: string; border: string }> = {
    BACKEND: { bg: 'rgba(59, 130, 246, 0.08)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.25)' },
    DATABASE: { bg: 'rgba(16, 185, 129, 0.08)', text: '#10b981', border: 'rgba(16, 185, 129, 0.25)' },
    FRONTEND: { bg: 'rgba(245, 158, 11, 0.08)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.25)' },
    CONTRACTS: { bg: 'rgba(139, 92, 246, 0.08)', text: '#8b5cf6', border: 'rgba(139, 92, 246, 0.25)' }
  };

  const styleConfig = tierColors[service.tier] || tierColors.BACKEND;

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        padding: '1.15rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '0.85rem',
        transition: 'border-color 0.15s ease'
      }}
    >
      <div>
        {/* Header with tier badge and package */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              padding: '0.15rem 0.45rem',
              backgroundColor: styleConfig.bg,
              color: styleConfig.text,
              border: `1px solid ${styleConfig.border}`,
              borderRadius: 'var(--radius-xs)'
            }}
          >
            {service.tier}
          </span>
          <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
            {service.package}
          </span>
        </div>

        {/* Title */}
        <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
          {service.name}
        </h4>

        {/* Summary */}
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '0 0 0.65rem 0' }}>
          {service.summary}
        </p>

        {/* Entry Point File Path */}
        <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', marginBottom: '0.65rem', wordBreak: 'break-all' }}>
          <code>{service.entryPoint}</code>
        </div>

        {/* Quick Indicators Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
          {service.envVars.length > 0 && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.6875rem',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                padding: '0.15rem 0.4rem',
                borderRadius: 'var(--radius-xs)'
              }}
              title={`${service.envVars.length} variáveis de ambiente requeridas/suportadas`}
            >
              <Key size={11} style={{ color: 'var(--accent)' }} />
              <span>{service.envVars.length} .env</span>
            </span>
          )}

          {service.storage && service.storage.type !== 'None' && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.6875rem',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                padding: '0.15rem 0.4rem',
                borderRadius: 'var(--radius-xs)'
              }}
              title={`Armazenamento: ${service.storage.type}`}
            >
              <Database size={11} style={{ color: '#10b981' }} />
              <span>{service.storage.type}</span>
            </span>
          )}

          {service.port && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.6875rem',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                padding: '0.15rem 0.4rem',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <Server size={11} style={{ color: '#3b82f6' }} />
              <span>Porta {service.port}</span>
            </span>
          )}

          {service.fallbacks && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.6875rem',
                color: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '0.15rem 0.4rem',
                borderRadius: 'var(--radius-xs)'
              }}
              title="Possui estratégia de resiliência/fallback documentada"
            >
              <ShieldAlert size={11} />
              <span>Fallback</span>
            </span>
          )}
        </div>
      </div>

      <div>
        {/* Tag pills */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {service.tags.map((tag) => {
            const isTagActive = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagClick(tag)}
                style={{
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  color: isTagActive ? '#ffffff' : 'var(--text-tertiary)',
                  backgroundColor: isTagActive ? 'var(--accent)' : 'transparent',
                  border: `1px solid ${isTagActive ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.1rem 0.35rem',
                  cursor: 'pointer'
                }}
              >
                #{tag}
              </button>
            );
          })}
        </div>

        {/* Action Button to Open Drawer */}
        <button
          type="button"
          onClick={() => onOpenDetails(service)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            padding: '0.45rem',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'all 0.12s ease'
          }}
        >
          <span>Ver Especificação de Ambiente</span>
          <ExternalLink size={12} style={{ color: 'var(--accent)' }} />
        </button>
      </div>
    </div>
  );
};
