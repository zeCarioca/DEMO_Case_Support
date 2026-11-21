import React, { useState } from 'react';
import { Play, Copy, Check, Terminal, MapPin } from 'lucide-react';
import { PermResolutionResponse } from '@case-support/shared-types';

export const DevPermTesterSection: React.FC = () => {
  const [zipInput, setZipInput] = useState('07302');
  const [cityInput, setCityInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [responseJson, setResponseJson] = useState<PermResolutionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const presets = [
    { label: '07302 (Jersey City - Cross-State)', zip: '07302', city: 'Jersey City', state: 'NJ' },
    { label: '79901 (El Paso - Local Daily)', zip: '79901', city: 'El Paso', state: 'TX' },
    { label: '79830 (Alpine - Rural Exception)', zip: '79830', city: 'Alpine', state: 'TX' },
    { label: '75201 (Dallas - Dallas MSA)', zip: '75201', city: 'Dallas', state: 'TX' },
    { label: '22201 (Arlington - DC MSA)', zip: '22201', city: 'Arlington', state: 'VA' }
  ];

  const handleTestResolution = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const payload: Record<string, string> = {};
      if (zipInput.trim()) payload.zip_code = zipInput.trim();
      if (cityInput.trim()) payload.city = cityInput.trim();
      if (stateInput.trim()) payload.state = stateInput.trim();

      const res = await fetch('/api/newspapers/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setResponseJson(data);
      } else {
        const err = await res.json();
        setErrorMsg(err?.message || 'Falha na resolução do periódico');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Erro ao conectar à API /api/newspapers/resolve');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyJson = () => {
    if (!responseJson) return;
    navigator.clipboard.writeText(JSON.stringify(responseJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Input Form */}
      <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1.25rem' }}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 0.75rem 0' }}>
          Simulador em Tempo Real do Motor PERM (POST /api/newspapers/resolve)
        </h4>

        {/* Preset Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.625rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
            Cenários de Teste:
          </span>
          {presets.map((p) => (
            <button
              key={p.zip}
              type="button"
              onClick={() => {
                setZipInput(p.zip);
                setCityInput(p.city);
                setStateInput(p.state);
              }}
              style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.2rem 0.5rem',
                cursor: 'pointer'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Inputs row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>
              ZIP CODE (CEP)
            </label>
            <input
              type="text"
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value)}
              placeholder="ex: 07302"
              style={{ width: '100%', padding: '0.4rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>
              CIDADE (OPCIONAL)
            </label>
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="ex: Jersey City"
              style={{ width: '100%', padding: '0.4rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'inherit', fontSize: '0.8125rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>
              ESTADO (UF)
            </label>
            <input
              type="text"
              value={stateInput}
              onChange={(e) => setStateInput(e.target.value.toUpperCase())}
              placeholder="ex: NJ"
              maxLength={2}
              style={{ width: '100%', padding: '0.4rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleTestResolution}
          disabled={loading}
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
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          <Play size={13} />
          <span>{loading ? 'Executando Motor...' : 'Disparar Resolução PERM'}</span>
        </button>
      </div>

      {/* Response Box */}
      {errorMsg && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '0.75rem', color: '#ef4444', fontSize: '0.75rem' }}>
          {errorMsg}
        </div>
      )}

      {responseJson && (
        <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Terminal size={14} color="var(--accent)" />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                Resposta Audit-Ready da API (20 CFR § 656)
              </span>
            </div>
            <button
              onClick={handleCopyJson}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', padding: '0.2rem 0.5rem', fontSize: '0.6875rem', color: copied ? 'var(--accent-text)' : 'var(--text-secondary)', cursor: 'pointer' }}
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              <span>{copied ? 'Copiado!' : 'Copiar JSON'}</span>
            </button>
          </div>
          <pre style={{ margin: 0, padding: '0.75rem', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', overflowX: 'auto', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', lineHeight: 1.45 }}>
            {JSON.stringify(responseJson, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
