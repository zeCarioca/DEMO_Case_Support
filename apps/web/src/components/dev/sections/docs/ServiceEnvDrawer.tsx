import React, { useState } from 'react';
import { X, Copy, Check, Key, Server, Database, ShieldAlert, FileCode } from 'lucide-react';
import { ServiceItem } from './types.js';

interface ServiceEnvDrawerProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceEnvDrawer: React.FC<ServiceEnvDrawerProps> = ({ service, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!service) return null;

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(identifier);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(3px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-page)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 20px 35px rgba(0, 0, 0, 0.35)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  padding: '0.15rem 0.45rem',
                  backgroundColor: 'var(--accent)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                {service.tier}
              </span>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
                {service.package}
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {service.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-tertiary)',
              padding: '0.35rem'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Detailed description */}
          <div>
            <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: '0 0 0.35rem 0' }}>
              Descrição Funcional
            </h5>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {service.description}
            </p>
          </div>

          {/* Entry point */}
          <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <FileCode size={14} style={{ color: 'var(--accent)' }} />
                <span>Arquivo de Entrada:</span>
                <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{service.entryPoint}</code>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(service.entryPoint, 'entrypoint')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.2rem 0.45rem',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.6875rem',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {copiedKey === 'entrypoint' ? <Check size={11} color="#10b981" /> : <Copy size={11} />}
                <span>{copiedKey === 'entrypoint' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>

          {/* Environment Variables Table */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
              <Key size={14} style={{ color: 'var(--accent)' }} />
              <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>
                Variáveis de Ambiente ({service.envVars.length})
              </h5>
            </div>

            {service.envVars.length === 0 ? (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontStyle: 'italic', padding: '0.5rem 0' }}>
                Nenhuma variável de ambiente específica necessária para este serviço.
              </div>
            ) : (
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                      <th style={{ padding: '0.5rem 0.75rem', color: 'var(--text-secondary)' }}>Variável</th>
                      <th style={{ padding: '0.5rem 0.75rem', color: 'var(--text-secondary)' }}>Escopo</th>
                      <th style={{ padding: '0.5rem 0.75rem', color: 'var(--text-secondary)' }}>Padrão</th>
                      <th style={{ padding: '0.5rem 0.75rem', color: 'var(--text-secondary)' }}>Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.envVars.map((ev) => (
                      <tr key={ev.name} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <span>{ev.name}</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(ev.name, ev.name)}
                              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                              title="Copiar nome da variável"
                            >
                              {copiedKey === ev.name ? <Check size={11} color="#10b981" /> : <Copy size={11} color="var(--text-tertiary)" />}
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
                          {ev.scope}
                        </td>
                        <td style={{ padding: '0.5rem 0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
                          {ev.defaultValue || '-'}
                        </td>
                        <td style={{ padding: '0.5rem 0.75rem', color: 'var(--text-secondary)' }}>
                          {ev.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Network and Routes */}
          {(service.port || (service.routes && service.routes.length > 0)) && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                <Server size={14} style={{ color: '#3b82f6' }} />
                <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>
                  Rede & Rotas HTTP
                </h5>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', backgroundColor: 'var(--bg-subtle)', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: '0.75rem' }}>
                {service.port && (
                  <div>
                    Porta Primária: <strong style={{ fontFamily: 'var(--font-mono)' }}>{service.port}</strong> (Fastify)
                  </div>
                )}
                {service.routes && service.routes.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{ color: 'var(--text-tertiary)' }}>Endpoints Públicos/Protegidos:</span>
                    {service.routes.map((r) => (
                      <code key={r} style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{r}</code>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Storage & Persistence */}
          {service.storage && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                <Database size={14} style={{ color: '#10b981' }} />
                <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>
                  Armazenamento Local & Persistência ({service.storage.type})
                </h5>
              </div>
              <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-xs)', fontSize: '0.75rem' }}>
                <p style={{ margin: '0 0 0.35rem 0', color: 'var(--text-secondary)' }}>{service.storage.description}</p>
                {service.storage.keys && service.storage.keys.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {service.storage.keys.map((k) => (
                      <span key={k} style={{ fontFamily: 'var(--font-mono)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.1rem 0.35rem', borderRadius: 'var(--radius-xs)', color: 'var(--text-primary)' }}>
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fallback & Resilience */}
          {service.fallbacks && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                <ShieldAlert size={14} style={{ color: '#10b981' }} />
                <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', margin: 0 }}>
                  Resiliência & Fallback Offline
                </h5>
              </div>
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {service.fallbacks}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
