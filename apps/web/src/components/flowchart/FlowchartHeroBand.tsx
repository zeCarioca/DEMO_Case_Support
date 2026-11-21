import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.js';

export const FlowchartHeroBand: React.FC = () => {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  return (
    <div style={{
      backgroundColor: 'var(--secondary)',
      borderRadius: 'var(--radius-xl)',
      padding: '1.35rem 1.75rem',
      color: '#ffffff',
      boxShadow: 'var(--shadow-level-1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              {isPt ? 'Manual de Registro USPTO' : 'USPTO Prosecution Manual'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              15 U.S.C. § 1051 • Lanham Act & TMEP
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.8px', color: '#ffffff', lineHeight: 1.15 }}>
            {isPt ? 'Fluxograma de Registro de Marcas & Docketing' : 'Trademark Prosecution & Docketing Flowchart'}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.82)', marginTop: '0.35rem', maxWidth: '64ch', lineHeight: 1.5 }}>
            {isPt 
              ? 'Trilha completa perante o USPTO: Busca de anterioridade, protocolo TEAS, resposta a Office Actions, publicação no Official Gazette e manutenção decenal.'
              : 'Full statutory USPTO prosecution lifecycle: Clearance search, TEAS electronic filing, Office Action defense, Gazette publication, and Section 8/9 renewals.'}
          </p>
        </div>

        {/* Sticker Pill Status Constellation */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="badge" style={{ backgroundColor: 'rgba(42, 157, 153, 0.25)', color: '#5eead4', borderColor: 'rgba(42, 157, 153, 0.5)' }}>
            ● USPTO TEAS
          </span>
          <span className="badge" style={{ backgroundColor: 'rgba(214, 182, 246, 0.25)', color: '#e9d5ff', borderColor: 'rgba(214, 182, 246, 0.5)' }}>
            ● Office Action
          </span>
          <span className="badge" style={{ backgroundColor: 'rgba(26, 174, 57, 0.25)', color: '#86efac', borderColor: 'rgba(26, 174, 57, 0.5)' }}>
            ● Gazette & SOU
          </span>
          <span className="badge" style={{ backgroundColor: 'rgba(221, 91, 0, 0.25)', color: '#fdba74', borderColor: 'rgba(221, 91, 0, 0.5)' }}>
            ● Maintenance
          </span>
        </div>
      </div>
    </div>
  );
};
