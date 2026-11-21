import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Sliders, Info, ShieldAlert } from 'lucide-react';
import { FeatureFlag } from '../types.js';

const INITIAL_FLAGS: FeatureFlag[] = [
  {
    key: 'strict_cbsa_mode',
    name: 'Strict CBSA Boundary Enforcer',
    description: 'Força precedência estrita de 20 CFR § 656.3 bloqueando desvios fora do CBSA.',
    enabled: true,
    category: 'ENGINE'
  },
  {
    key: 'metropolis_radius_layer',
    name: 'Metropolis Commuting Radius Layer',
    description: 'Renderiza perímetros radiais de 50 milhas das metrópoles no mapa SVG.',
    enabled: true,
    category: 'UI'
  },
  {
    key: 'offline_resolution_fallback',
    name: 'Client-Side Offline Fallback',
    description: 'Permite resolução geográfica local instantânea se o backend Fastify estiver inacessível.',
    enabled: true,
    category: 'ENGINE'
  },
  {
    key: 'audit_readiness_warnings',
    name: 'BALCA Audit File Warning Banners',
    description: 'Exibe alertas de conformidade para casos com deslocamento interestadual ou exceção rural.',
    enabled: true,
    category: 'PERM_AUDIT'
  }
];

export const DevFlagsEnvSection: React.FC = () => {
  const [flags, setFlags] = useState<FeatureFlag[]>(() => {
    try {
      const stored = localStorage.getItem('casesupport_feature_flags');
      if (stored) return JSON.parse(stored);
    } catch {
      // Fallback
    }
    return INITIAL_FLAGS;
  });

  const toggleFlag = (key: string) => {
    const updated = flags.map((f) => (f.key === key ? { ...f, enabled: !f.enabled } : f));
    setFlags(updated);
    try {
      localStorage.setItem('casesupport_feature_flags', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Feature Flags Card */}
      <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Sliders size={16} color="var(--accent)" />
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Gerenciador de Feature Flags do Sistema
          </h4>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {flags.map((flag) => (
            <div
              key={flag.key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {flag.name}
                  </span>
                  <span style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', backgroundColor: 'var(--bg-surface)', padding: '0.1rem 0.35rem', border: '1px solid var(--border)' }}>
                    {flag.category}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  {flag.description}
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleFlag(flag.key)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: flag.enabled ? 'var(--accent)' : 'var(--text-tertiary)', padding: '0.2rem' }}
              >
                {flag.enabled ? <ToggleRight size={26} /> : <ToggleLeft size={26} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Environment Config */}
      <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Info size={16} color="var(--accent)" />
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Variáveis de Ambiente & Metadados de Runtime
          </h4>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.6rem', border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-tertiary)', display: 'block', fontSize: '0.625rem' }}>MODE</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {(import.meta as any).env?.MODE || 'development'}
            </span>
          </div>
          <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.6rem', border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-tertiary)', display: 'block', fontSize: '0.625rem' }}>DEV</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {String((import.meta as any).env?.DEV ?? true)}
            </span>
          </div>
          <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.6rem', border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-tertiary)', display: 'block', fontSize: '0.625rem' }}>API PROXY</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>http://localhost:4000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
