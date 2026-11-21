import React from 'react';
import { Clock, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface PermResultCardProps {
  result: any;
}

export const PermResultCard: React.FC<PermResultCardProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ fontSize: '1.05rem', color: '#ffffff', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
          Diagnóstico de Prazos & Janela de Protocolo
        </h3>
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-dim)' }}>
          <Clock size={40} color="#3b82f6" style={{ margin: '0 auto 1rem', opacity: 0.6 }} />
          <p>Insira as datas das ações de recrutamento e clique no botão para verificar se o caso cumpre as regras do DOL.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.05rem', color: '#ffffff', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        Diagnóstico de Prazos & Janela de Protocolo
      </h3>

      {/* Compliance Status Pill */}
      <div style={{
        background: result.isValid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
        border: result.isValid ? '1.5px solid #10b981' : '1.5px solid #ef4444',
        padding: '1rem 1.25rem',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        {result.isValid ? (
          <CheckCircle size={28} color="#10b981" />
        ) : (
          <AlertTriangle size={28} color="#ef4444" />
        )}
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff' }}>
            {result.isValid ? 'CRONOGRAMA CONFORME REGULAMENTO DOL' : 'VIOLAÇÃO DE REGRAS DETECTADA'}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {result.isValid 
              ? 'Todas as ações respeitam a janela de 30 a 180 dias e o período de espera.'
              : 'Ajuste as datas para evitar indeferimento sumário ou auditoria do DOL.'}
          </div>
        </div>
      </div>

      {/* Critical Warnings */}
      {result.warnings.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {result.warnings.map((warn: string, i: number) => (
            <div key={i} style={{
              background: 'rgba(239, 68, 68, 0.1)',
              borderLeft: '3px solid #ef4444',
              padding: '0.6rem 0.8rem',
              fontSize: '0.8rem',
              color: '#fca5a5'
            }}>
              {warn}
            </div>
          ))}
        </div>
      )}

      {/* Timeline Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Duração SWA Job Order</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: result.jobOrderDurationDays >= 30 ? '#34d399' : '#f87171' }}>
            {result.jobOrderDurationDays} dias corridos
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Exigido: Mínimo 30 dias</div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Fim do Quiet Period (30d)</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#facc15' }}>
            {result.quietPeriodEnds}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Período de espera obrigatório</div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Data Mais Cedo de Protocolo</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#60a5fa' }}>
            {result.earliestFilingDate}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Após término do quiet period</div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.85rem', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Data Limite de Protocolo</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f43f5e' }}>
            {result.latestFilingDate}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>180 dias da 1ª ação de recrutamento</div>
        </div>
      </div>

      {/* Notice Alert */}
      <div style={{
        background: 'rgba(59, 130, 246, 0.08)',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        padding: '0.85rem',
        borderRadius: '8px',
        fontSize: '0.75rem',
        color: '#93c5fd',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.5rem'
      }}>
        <Info size={16} color="#60a5fa" style={{ flexShrink: 0, marginTop: '2px' }} />
        <span>
          <strong>Regra de Ouro de Compliance:</strong> Nunca protocolar antes da data mais cedo permitida nem após a data limite regulamentar. Não preencha datas retroativamente em auditorias.
        </span>
      </div>
    </div>
  );
};
