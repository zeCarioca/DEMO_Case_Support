import React from 'react';
import { Calculator } from 'lucide-react';

interface PermDateInputsProps {
  jobOrderStart: string;
  setJobOrderStart: (val: string) => void;
  jobOrderEnd: string;
  setJobOrderEnd: (val: string) => void;
  sundayAd1: string;
  setSundayAd1: (val: string) => void;
  sundayAd2: string;
  setSundayAd2: (val: string) => void;
  nofStart: string;
  setNofStart: (val: string) => void;
  nofEnd: string;
  setNofEnd: (val: string) => void;
  add1: string;
  setAdd1: (val: string) => void;
  add2: string;
  setAdd2: (val: string) => void;
  onCalculate: () => void;
  loading: boolean;
}

export const PermDateInputs: React.FC<PermDateInputsProps> = ({
  jobOrderStart, setJobOrderStart,
  jobOrderEnd, setJobOrderEnd,
  sundayAd1, setSundayAd1,
  sundayAd2, setSundayAd2,
  nofStart, setNofStart,
  nofEnd, setNofEnd,
  add1, setAdd1,
  add2, setAdd2,
  onCalculate, loading
}) => {
  return (
    <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.05rem', color: '#ffffff', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        Datas das Ações de Recrutamento
      </h3>

      {/* SWA Job Order */}
      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#60a5fa', display: 'block', marginBottom: '0.4rem' }}>
          Ordem de Emprego Estadual (SWA Job Order - Mínimo 30 dias)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Data Início</span>
            <input
              type="date"
              value={jobOrderStart}
              onChange={(e) => setJobOrderStart(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Data Término</span>
            <input
              type="date"
              value={jobOrderEnd}
              onChange={(e) => setJobOrderEnd(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>
        </div>
      </div>

      {/* Sunday Ads */}
      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c4b5fd', display: 'block', marginBottom: '0.4rem' }}>
          Anúncios de Jornal (Dois Domingos)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Domingo 1</span>
            <input
              type="date"
              value={sundayAd1}
              onChange={(e) => setSundayAd1(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Domingo 2</span>
            <input
              type="date"
              value={sundayAd2}
              onChange={(e) => setSundayAd2(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>
        </div>
      </div>

      {/* Notice of Filing */}
      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#34d399', display: 'block', marginBottom: '0.4rem' }}>
          Notice of Filing (NOF - 10 dias corridos na empresa)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Início Afixação</span>
            <input
              type="date"
              value={nofStart}
              onChange={(e) => setNofStart(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Retirada</span>
            <input
              type="date"
              value={nofEnd}
              onChange={(e) => setNofEnd(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>
        </div>
      </div>

      {/* Additional Methods */}
      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fef08a', display: 'block', marginBottom: '0.4rem' }}>
          Métodos Adicionais (Vagas Profissionais)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Método 1 (Site/Feira)</span>
            <input
              type="date"
              value={add1}
              onChange={(e) => setAdd1(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Método 2 (Job Board)</span>
            <input
              type="date"
              value={add2}
              onChange={(e) => setAdd2(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#ffffff' }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onCalculate}
        disabled={loading}
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
      >
        <Calculator size={16} />
        <span>{loading ? 'Calculando...' : 'Calcular Janela & Quiet Period'}</span>
      </button>
    </div>
  );
};
