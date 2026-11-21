import React, { useState, useEffect } from 'react';
import { Activity, RefreshCw, CheckCircle2, XCircle, Clock, Database, Server } from 'lucide-react';
import { SystemHealthData } from '../types.js';

export const DevHealthSection: React.FC = () => {
  const [health, setHealth] = useState<SystemHealthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState<string>('');

  const checkHealth = async () => {
    setLoading(true);
    const start = performance.now();
    try {
      const res = await fetch('/api/cases');
      const latency = Math.round(performance.now() - start);

      if (res.ok) {
        const data = await res.json();
        setHealth({
          status: 'ONLINE',
          latencyMs: latency,
          apiPort: 4000,
          database: {
            connected: true,
            type: 'SQLite (dev.db via Prisma)',
            casesCount: Array.isArray(data?.cases) ? data.cases.length : 0
          },
          timestamp: new Date().toLocaleTimeString()
        });
      } else {
        setHealth({
          status: 'DEGRADED',
          latencyMs: latency,
          apiPort: 4000,
          database: { connected: false, type: 'SQLite' },
          timestamp: new Date().toLocaleTimeString()
        });
      }
    } catch {
      setHealth({
        status: 'OFFLINE',
        latencyMs: 0,
        apiPort: 4000,
        database: { connected: false, type: 'SQLite' },
        timestamp: new Date().toLocaleTimeString()
      });
    } finally {
      setLoading(false);
      setLastCheckTime(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Controls Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-page)',
          border: '1px solid var(--border)',
          padding: '0.85rem 1.25rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Activity size={16} color="var(--accent)" />
          <div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Inspetor de Saúde do Backend Fastify & SQLite
            </h3>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              Última checagem: {lastCheckTime || 'Aguardando...'}
            </div>
          </div>
        </div>

        <button
          onClick={checkHealth}
          disabled={loading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'var(--accent)',
            color: '#ffffff',
            border: 'none',
            padding: '0.35rem 0.85rem',
            fontSize: '0.75rem',
            fontFamily: 'inherit',
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          <span>{loading ? 'Testando Conexão...' : 'Atualizar Diagnóstico'}</span>
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {/* API Status */}
        <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            Servidor REST Fastify
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem' }}>
            {health?.status === 'ONLINE' ? (
              <CheckCircle2 size={16} color="#10b981" />
            ) : (
              <XCircle size={16} color="#ef4444" />
            )}
            <span style={{ fontSize: '1rem', fontWeight: 600, color: health?.status === 'ONLINE' ? '#10b981' : '#ef4444' }}>
              {health?.status || 'UNKNOWN'}
            </span>
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
            Porta local: 4000 • Proxy Vite ativo
          </div>
        </div>

        {/* Latency */}
        <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            Latência de Resposta (RTT)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem' }}>
            <Clock size={16} color="var(--accent)" />
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {health ? `${health.latencyMs} ms` : '—'}
            </span>
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
            {health && health.latencyMs < 50 ? 'Excelente (Loopback ideal)' : 'Conexão ativa'}
          </div>
        </div>

        {/* Database Status */}
        <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            Banco de Dados Prisma / SQLite
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem' }}>
            <Database size={16} color={health?.database.connected ? '#10b981' : '#ef4444'} />
            <span style={{ fontSize: '1rem', fontWeight: 600, color: health?.database.connected ? '#10b981' : '#ef4444' }}>
              {health?.database.connected ? 'CONECTADO' : 'DESCONECTADO'}
            </span>
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
            {health?.database.casesCount !== undefined ? `${health.database.casesCount} casos indexados` : 'Sem dados'}
          </div>
        </div>
      </div>
    </div>
  );
};
