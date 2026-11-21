import React from 'react';
import { MapPin, Compass, Layers, Sparkles } from 'lucide-react';

export const UsaMapPlaceholder: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        padding: '1.75rem',
        marginBottom: '2rem'
      }}
    >
      {/* Container Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)'
              }}
            >
              06.1 Geoespacial
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>•</span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
              Jurisdições & SWA dos 50 Estados
            </span>
          </div>
          <h2
            style={{
              fontSize: '1.125rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}
          >
            Mapa Interativo dos EUA por Estado
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
            Acesso regionalizado às 50 Agências Estaduais de Emprego (SWA), portais de Job Order e regras locais de recrutamento.
          </p>
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.65rem',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            fontSize: '0.6875rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-secondary)'
          }}
        >
          <Sparkles size={13} color="var(--accent)" />
          <span>Contêiner Reservado para Integração</span>
        </div>
      </div>

      {/* Empty State Map Container ready to be populated */}
      <div
        id="usa-state-map-container"
        style={{
          minHeight: '260px',
          backgroundColor: 'var(--bg-page)',
          border: '1px dashed var(--border-contrast)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}
        >
          <Compass size={24} color="var(--accent)" />
        </div>

        <h3
          style={{
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            marginBottom: '0.4rem'
          }}
        >
          Área Reservada: Mapa Interativo dos 50 Estados (SWA)
        </h3>

        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            lineHeight: 1.5,
            marginBottom: '1.25rem'
          }}
        >
          Este contêiner foi preparado para receber o componente de mapa SVG interativo dos Estados Unidos. 
          Ao clicar em qualquer estado (ex: FL, CA, TX, NY), o operador poderá consultar instantaneamente o link direto 
          do portal SWA local, prazos de validação de Job Order e instruções de publicação regional.
        </p>

        {/* Feature Highlights Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem 0.55rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              fontSize: '0.6875rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-tertiary)'
            }}
          >
            <MapPin size={11} color="var(--accent)" />
            <span>50 Portais SWA Estaduais</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem 0.55rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              fontSize: '0.6875rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-tertiary)'
            }}
          >
            <Layers size={11} color="var(--accent)" />
            <span>Jurisdições USCIS por Service Center</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.25rem 0.55rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              fontSize: '0.6875rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-tertiary)'
            }}
          >
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>20 CFR 656</span>
            <span>Job Order Mínimo 30 Dias</span>
          </div>
        </div>
      </div>
    </section>
  );
};
