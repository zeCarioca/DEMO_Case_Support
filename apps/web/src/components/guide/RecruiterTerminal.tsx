import React, { useState, useEffect } from 'react';
import { Terminal, X, ArrowUpRight, GripHorizontal, ShieldAlert, Cpu } from 'lucide-react';
import { AppTab } from '../Header.js';
import { TAB_GUIDE_DATA } from './guideData.js';
import { useDraggable } from './useDraggable.js';
import { useLanguage } from '../i18n/LanguageContext.js';

interface RecruiterTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  activeAppTab: AppTab;
  onNavigateTab: (tab: AppTab) => void;
}

export const RecruiterTerminal: React.FC<RecruiterTerminalProps> = ({
  isOpen,
  onClose,
  activeAppTab,
  onNavigateTab
}) => {
  const { language } = useLanguage();
  const isPt = language === 'pt';

  // Selected tab in guide defaults to current app tab, but user can click through tabs
  const [selectedTabId, setSelectedTabId] = useState<AppTab>(activeAppTab);
  const { position, handlePointerDown, isDragging, terminalRef } = useDraggable(440, 530);

  // Sync internal guide selection when app tab changes
  useEffect(() => {
    setSelectedTabId(activeAppTab);
  }, [activeAppTab]);

  if (!isOpen) return null;

  const currentGuide = TAB_GUIDE_DATA.find((item) => item.id === selectedTabId) || TAB_GUIDE_DATA[0];
  const isViewingCurrentAppTab = selectedTabId === activeAppTab;

  return (
    <div
      ref={terminalRef}
      className="terminal-window animate-terminal-pop"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '440px',
        maxWidth: 'calc(100vw - 32px)',
        zIndex: 50,
        backgroundColor: 'rgba(11, 15, 23, 0.96)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.85), 0 0 24px rgba(56, 189, 248, 0.15)',
        color: '#e2e8f0',
        fontFamily: 'var(--font-mono, monospace)',
        overflow: 'hidden',
        userSelect: isDragging ? 'none' : 'auto'
      }}
    >
      {/* Title Bar / Drag Grip Handle */}
      <div
        onPointerDown={handlePointerDown}
        style={{
          backgroundColor: 'rgba(19, 26, 42, 0.98)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
          padding: '0.625rem 0.875rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Mac/Linux Terminal dots */}
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eab308', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginLeft: '0.25rem', color: '#94a3b8', fontSize: '0.75rem' }}>
            <Terminal size={13} style={{ color: '#38bdf8' }} />
            <span style={{ fontWeight: 600, letterSpacing: '-0.3px', color: '#cbd5e1' }}>
              recruiter_guide@apex-ip:~
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <GripHorizontal size={14} style={{ color: '#64748b' }} />
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '2px 4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
            title={isPt ? 'Minimizar Terminal' : 'Minimize Terminal'}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Tab Switcher Pills */}
      <div
        style={{
          display: 'flex',
          gap: '0.25rem',
          padding: '0.5rem 0.75rem',
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}
      >
        {TAB_GUIDE_DATA.map((item) => {
          const isSelected = item.id === selectedTabId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedTabId(item.id)}
              style={{
                background: isSelected ? 'rgba(56, 189, 248, 0.16)' : 'transparent',
                border: isSelected ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid transparent',
                borderRadius: 'var(--radius-sm)',
                padding: '0.25rem 0.5rem',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: isSelected ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {item.tabNumber}. {item.id.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Terminal Body Content */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {/* Simulated Command prompt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#38bdf8' }}>
          <span style={{ color: '#22c55e' }}>apex@docket:~$</span>
          <span style={{ color: '#f1f5f9' }}>{currentGuide.command}</span>
          <span className="terminal-cursor" />
        </div>

        {/* Tab Title & Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f8fafc' }}>
            {isPt ? currentGuide.title.pt : currentGuide.title.en}
          </span>
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 600,
              padding: '1px 6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8'
            }}
          >
            {isPt ? currentGuide.badge.pt : currentGuide.badge.en}
          </span>
        </div>

        {/* Real Operational Problem */}
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            borderLeft: '3px solid #ef4444',
            padding: '0.625rem 0.75rem',
            borderRadius: '0 4px 4px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f87171', fontSize: '0.6875rem', fontWeight: 700 }}>
            <ShieldAlert size={12} />
            <span>{isPt ? '[PROBLEMA OPERACIONAL REAL]' : '[REAL OPERATIONAL PROBLEM]'}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', lineHeight: 1.45, color: '#cbd5e1' }}>
            {isPt ? currentGuide.problem.pt : currentGuide.problem.en}
          </p>
        </div>

        {/* Technical Engineering Solution */}
        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            borderLeft: '3px solid #10b981',
            padding: '0.625rem 0.75rem',
            borderRadius: '0 4px 4px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#34d399', fontSize: '0.6875rem', fontWeight: 700 }}>
            <Cpu size={12} />
            <span>{isPt ? '[SOLUÇÃO DE ENGENHARIA IMPLEMENTADA]' : '[ENGINEERING SOLUTION DELIVERED]'}</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', lineHeight: 1.45, color: '#e2e8f0' }}>
            {isPt ? currentGuide.solution.pt : currentGuide.solution.en}
          </p>
        </div>

        {/* Technology Highlight Badges */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {currentGuide.techTags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.625rem',
                padding: '2px 6px',
                borderRadius: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94a3b8'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Bottom Actions: Jump to Tab button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.25rem' }}>
          <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>
            {isPt ? 'Arraste pelo topo para reposicionar' : 'Drag title bar to reposition'}
          </span>

          {!isViewingCurrentAppTab && (
            <button
              type="button"
              onClick={() => onNavigateTab(selectedTabId)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#0284c7',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                color: '#ffffff',
                fontSize: '0.6875rem',
                fontWeight: 600,
                padding: '0.3rem 0.65rem',
                cursor: 'pointer'
              }}
            >
              <span>{isPt ? 'Abrir esta aba' : 'Open this tab'}</span>
              <ArrowUpRight size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
