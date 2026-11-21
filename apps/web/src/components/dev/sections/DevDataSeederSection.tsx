import React, { useState } from 'react';
import { Database, Trash2, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export const DevDataSeederSection: React.FC = () => {
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleClearCache = () => {
    try {
      localStorage.removeItem('casesupport_recent_searches');
      localStorage.removeItem('casesupport_newspaper_cache');
      setStatusMsg('Caches locais de busca e histórico limpos com sucesso.');
      setTimeout(() => setStatusMsg(null), 3000);
    } catch {
      setStatusMsg('Erro ao limpar caches locais.');
    }
  };

  const handleSeedMockCase = async () => {
    try {
      const sampleCase = {
        internalId: `CASE-TEST-${Math.floor(100 + Math.random() * 900)}`,
        clientName: 'Global Tech Innovations Inc.',
        beneficiaryName: 'Eduardo Silveira dos Santos',
        currentPhaseId: 'fase-recrutamento',
        status: 'EM_ANDAMENTO',
        role: 'Software Engineer II (SOC 15-1252.00)',
        prevailingWage: '$124,500/ano',
        priorityDate: new Date().toISOString().split('T')[0]
      };

      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sampleCase)
      });

      if (res.ok) {
        setStatusMsg(`Novo caso de teste [${sampleCase.internalId}] criado com sucesso no banco de dados!`);
      } else {
        setStatusMsg('Aviso: endpoint POST /api/cases não aceitou mock direto ou está simulado.');
      }
    } catch {
      setStatusMsg('Erro de rede ao disparar seed para o backend.');
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Action Notification */}
      {statusMsg && (
        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #10b981',
            padding: '0.75rem 1rem',
            color: '#10b981',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <CheckCircle2 size={15} />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Seeder Card */}
      <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Sparkles size={16} color="var(--accent)" />
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Gerador de Dados de Teste (Mock Data Seeder)
          </h4>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
          Gere registros de teste no banco de dados SQLite para validar o fluxo do Pipeline de Casos, cálculo de SLA de recrutamento e quadro de prioridades.
        </p>

        <button
          type="button"
          onClick={handleSeedMockCase}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'var(--accent)',
            color: '#ffffff',
            border: 'none',
            padding: '0.45rem 1rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Database size={13} />
          <span>Gerar Caso PERM de Teste no Banco</span>
        </button>
      </div>

      {/* Cache & Reset Card */}
      <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Trash2 size={16} color="var(--text-tertiary)" />
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Limpeza de Cache e Reset de Estado
          </h4>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
          Limpa o histórico de buscas recentes, respostas cacheadas de jornais e dados temporários de sessão no navegador.
        </p>

        <button
          type="button"
          onClick={handleClearCache}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            padding: '0.45rem 1rem',
            fontSize: '0.75rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={13} />
          <span>Limpar Caches Locais de Teste</span>
        </button>
      </div>
    </div>
  );
};
