import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { PermDateInputs } from './PermDateInputs.js';
import { PermResultCard } from './PermResultCard.js';

export const PermCalculatorView: React.FC = () => {
  const [jobOrderStart, setJobOrderStart] = useState('2026-08-01');
  const [jobOrderEnd, setJobOrderEnd] = useState('2026-08-31');
  const [sundayAd1, setSundayAd1] = useState('2026-08-10');
  const [sundayAd2, setSundayAd2] = useState('2026-08-17');
  const [nofStart, setNofStart] = useState('2026-08-05');
  const [nofEnd, setNofEnd] = useState('2026-08-19');
  const [add1, setAdd1] = useState('2026-08-12');
  const [add2, setAdd2] = useState('2026-08-20');
  const [add3, setAdd3] = useState('');

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calculateTimeline = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/calculator/perm-timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobOrderStartDate: jobOrderStart,
          jobOrderEndDate: jobOrderEnd,
          sundayAd1Date: sundayAd1,
          sundayAd2Date: sundayAd2,
          nofStartDate: nofStart,
          nofEndDate: nofEnd,
          additional1Date: add1 || undefined,
          additional2Date: add2 || undefined,
          additional3Date: add3 || undefined
        })
      });

      if (res.ok) {
        const json = await res.json();
        setResult(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '0 1.5rem 2rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Calculator size={22} color="#38bdf8" />
          Calculadora de Conformidade & Quiet Period (PERM)
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Validação automatizada das janelas temporais regulamentares (20 CFR 656): SWA, NOF, Quiet Period de 30 dias e janela de 180 dias.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        <PermDateInputs
          jobOrderStart={jobOrderStart} setJobOrderStart={setJobOrderStart}
          jobOrderEnd={jobOrderEnd} setJobOrderEnd={setJobOrderEnd}
          sundayAd1={sundayAd1} setSundayAd1={setSundayAd1}
          sundayAd2={sundayAd2} setSundayAd2={setSundayAd2}
          nofStart={nofStart} setNofStart={setNofStart}
          nofEnd={nofEnd} setNofEnd={setNofEnd}
          add1={add1} setAdd1={setAdd1}
          add2={add2} setAdd2={setAdd2}
          onCalculate={calculateTimeline}
          loading={loading}
        />

        <PermResultCard result={result} />
      </div>
    </div>
  );
};
