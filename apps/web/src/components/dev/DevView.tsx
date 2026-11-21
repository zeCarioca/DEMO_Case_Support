import React, { useState } from 'react';
import { Terminal, Shield, Lock, Layers, Scale, Activity, Play, Sliders, Database, BookOpen } from 'lucide-react';
import { DevTabSection } from './types.js';
import { useDevAuth } from './useDevAuth.js';
import { DevArchitectureSection } from './sections/DevArchitectureSection.js';
import { DevPermSpecSection } from './sections/DevPermSpecSection.js';
import { DevHealthSection } from './sections/DevHealthSection.js';
import { DevPermTesterSection } from './sections/DevPermTesterSection.js';
import { DevFlagsEnvSection } from './sections/DevFlagsEnvSection.js';
import { DevDataSeederSection } from './sections/DevDataSeederSection.js';
import { DevServicesDocsSection } from './sections/docs/DevServicesDocsSection.js';

interface DevViewProps {
  onLockDevMode?: () => void;
}

export const DevView: React.FC<DevViewProps> = ({ onLockDevMode }) => {
  const [activeSection, setActiveSection] = useState<DevTabSection>('architecture');
  const { devAccount, lockDevMode } = useDevAuth();

  const handleLock = () => {
    lockDevMode();
    onLockDevMode?.();
  };

  const navItems: Array<{ id: DevTabSection; label: string; icon: React.ReactNode }> = [
    { id: 'architecture', label: '01. Arquitetura & Stack', icon: <Layers size={13} /> },
    { id: 'perm-engine', label: '02. Especificação PERM', icon: <Scale size={13} /> },
    { id: 'health', label: '03. Saúde & Latência', icon: <Activity size={13} /> },
    { id: 'perm-tester', label: '04. Testador de Motor', icon: <Play size={13} /> },
    { id: 'flags-env', label: '05. Feature Flags', icon: <Sliders size={13} /> },
    { id: 'data-seeder', label: '06. Data Seeder', icon: <Database size={13} /> },
    { id: 'services-docs', label: '07. Guia de Serviços & Docs', icon: <BookOpen size={13} /> }
  ];

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.5rem 2rem' }}>
      {/* Dev Auth Status Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-contrast)',
          borderLeft: '4px solid var(--accent)',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
              padding: '0.35rem 0.55rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              fontWeight: 700
            }}
          >
            <Terminal size={13} />
            <span>DEV STATUS: ACTIVE</span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Autenticado como: <strong>{devAccount?.email || 'dev@apextechlaw.internal'}</strong> • Ativado via:{' '}
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-text)' }}>
              {devAccount?.activatedVia || 'SHORTCUT (Ctrl+Shift+D)'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLock}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            padding: '0.35rem 0.75rem',
            fontSize: '0.75rem',
            fontFamily: 'inherit',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
          title="Bloquear e ocultar aba de desenvolvedor"
        >
          <Lock size={12} />
          <span>Bloquear Modo Dev</span>
        </button>
      </div>

      {/* Dev Navigation Sub-Bar */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '0.5rem',
          marginBottom: '1.5rem'
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: isActive ? 'var(--accent)' : 'var(--bg-surface)',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                padding: '0.45rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: isActive ? 600 : 400,
                fontFamily: 'inherit',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.12s ease'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active Section Content */}
      <div style={{ minHeight: '400px' }}>
        {activeSection === 'architecture' && <DevArchitectureSection />}
        {activeSection === 'perm-engine' && <DevPermSpecSection />}
        {activeSection === 'health' && <DevHealthSection />}
        {activeSection === 'perm-tester' && <DevPermTesterSection />}
        {activeSection === 'flags-env' && <DevFlagsEnvSection />}
        {activeSection === 'data-seeder' && <DevDataSeederSection />}
        {activeSection === 'services-docs' && <DevServicesDocsSection />}
      </div>
    </div>
  );
};
