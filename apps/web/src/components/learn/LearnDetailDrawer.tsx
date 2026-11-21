import React, { useState } from 'react';
import { X, ExternalLink, AlertTriangle, CheckSquare, Info, ShieldCheck, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';
import { LearnItem } from './types.js';
import { ResizeHandle } from '../flowchart/ResizeHandle.js';

interface LearnDetailDrawerProps {
  item: LearnItem;
  onClose: () => void;
  width: number;
  onResizeStart: (e: React.MouseEvent) => void;
  isDragging: boolean;
  onSetPreset: (width: number) => void;
  onResetWidth: () => void;
  onNavigateToPhase: (phaseId: string) => void;
}

export const LearnDetailDrawer: React.FC<LearnDetailDrawerProps> = ({
  item,
  onClose,
  width,
  onResizeStart,
  isDragging,
  onSetPreset,
  onResetWidth,
  onNavigateToPhase
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'checklist'>('overview');

  return (
    <div
      className="notion-card"
      style={{
        width: `${width}px`,
        flexShrink: 0,
        position: 'relative',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-level-2)',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        userSelect: isDragging ? 'none' : 'auto',
        transition: isDragging ? 'none' : 'width 0.15s ease',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto'
      }}
    >
      <ResizeHandle
        onMouseDown={onResizeStart}
        isDragging={isDragging}
        onReset={onResetWidth}
      />

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-accent" style={{ fontSize: '0.6875rem' }}>
              {item.agency}
            </span>
            <span className="badge" style={{ fontSize: '0.6875rem', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-tertiary)', borderColor: 'var(--border)' }}>
              {item.code}
            </span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px', lineHeight: '1.2' }}>
            {item.title}
          </h3>
          <div style={{ fontSize: '0.78125rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>
            {item.subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            onClick={() => onSetPreset(width > 500 ? 380 : 620)}
            title={width > 500 ? 'Modo Compacto' : 'Modo Expandido'}
            className="btn-utility"
            style={{
              padding: '0.35rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              borderRadius: 'var(--radius-md)'
            }}
          >
            {width > 500 ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          <button
            onClick={onClose}
            title="Fechar"
            className="btn-utility"
            style={{
              padding: '0.35rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Segmented Tab Switcher */}
      <div style={{ display: 'flex', gap: '0.35rem', backgroundColor: 'var(--bg-subtle)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            flex: 1,
            padding: '0.4rem 0.6rem',
            background: activeTab === 'overview' ? 'var(--bg-surface)' : 'transparent',
            border: 'none',
            borderRadius: 'var(--radius-xs)',
            boxShadow: activeTab === 'overview' ? 'var(--shadow-level-1)' : 'none',
            color: activeTab === 'overview' ? 'var(--text-primary)' : 'var(--text-tertiary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            transition: 'all 0.15s ease'
          }}
        >
          <Info size={13} color={activeTab === 'overview' ? 'var(--accent)' : 'var(--text-tertiary)'} />
          <span>Visão Geral & Regras</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          style={{
            flex: 1,
            padding: '0.4rem 0.6rem',
            background: activeTab === 'checklist' ? 'var(--bg-surface)' : 'transparent',
            border: 'none',
            borderRadius: 'var(--radius-xs)',
            boxShadow: activeTab === 'checklist' ? 'var(--shadow-level-1)' : 'none',
            color: activeTab === 'checklist' ? 'var(--text-primary)' : 'var(--text-tertiary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            transition: 'all 0.15s ease'
          }}
        >
          <CheckSquare size={13} color={activeTab === 'checklist' ? 'var(--accent)' : 'var(--text-tertiary)'} />
          <span className="tabular">Checklist ({item.submissionChecklist.length})</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '0.35rem' }}>
              FINALIDADE & DESCRIÇÃO
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {item.summary}
            </p>
          </div>

          {/* Legal Basis */}
          {item.legalBasis && (
            <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', borderLeft: '3px solid var(--accent)' }}>
              <div style={{ fontSize: '0.6875rem', color: 'var(--accent)', fontWeight: 600 }}>
                Base Legal / Regulamentação
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginTop: '0.2rem', fontWeight: 500 }}>
                {item.legalBasis}
              </div>
            </div>
          )}

          {/* Responsible Roles */}
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '0.45rem' }}>
              CARGOS ENVOLVIDOS
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {item.responsibleRoles.map((role, i) => (
                <span key={i} className="badge badge-neutral" style={{ fontSize: '0.6875rem' }}>
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Critical Rules */}
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--sticker-orange)', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <AlertTriangle size={13} />
              <span>REGRAS CRÍTICAS & PONTOS DE ATENÇÃO</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {item.criticalRules.map((rule, i) => (
                <div key={i} style={{
                  fontSize: '0.78125rem',
                  backgroundColor: 'rgba(221, 91, 0, 0.08)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.5rem 0.75rem',
                  borderLeft: '3px solid var(--sticker-orange)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4'
                }}>
                  {rule}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Checklist */}
      {activeTab === 'checklist' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            Itens indispensáveis a serem conferidos antes da finalização ou submissão:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {item.submissionChecklist.map((check, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem 0.85rem',
                border: '1px solid var(--border)'
              }}>
                <ShieldCheck size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  {check}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Navigation & Portal Links */}
      <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button
          onClick={() => onNavigateToPhase(item.relatedPhaseId)}
          className="btn btn-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.55rem 1rem',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          <span>Ver na {item.relatedPhaseName}</span>
          <ArrowRight size={13} />
        </button>

        {item.officialUrl && (
          <a
            href={item.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.45rem 0.65rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'transparent',
              transition: 'border-color 0.15s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <span>Acessar portal oficial da agência ({item.agency})</span>
            <ExternalLink size={12} color="var(--accent)" />
          </a>
        )}
      </div>

    </div>
  );
};
