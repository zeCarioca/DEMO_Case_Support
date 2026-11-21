import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, FileText, ExternalLink, Maximize2, Minimize2, ListOrdered, Info } from 'lucide-react';
import { FlowNode } from './flowData.js';
import { ResizeHandle } from './ResizeHandle.js';
import { NODE_STEPS_MAP } from './nodeStepsData.js';
import { NodeStepsExplorer } from './NodeStepsExplorer.js';

interface NodeDetailDrawerProps {
  node: FlowNode;
  onClose: () => void;
  width: number;
  onResizeStart: (e: React.MouseEvent) => void;
  isDragging: boolean;
  onSetPreset: (width: number) => void;
  onResetWidth: () => void;
  initialTab?: 'overview' | 'steps';
  highlightStepCode?: string | null;
}

export const NodeDetailDrawer: React.FC<NodeDetailDrawerProps> = ({
  node,
  onClose,
  width,
  onResizeStart,
  isDragging,
  onSetPreset,
  onResetWidth,
  initialTab = 'overview',
  highlightStepCode
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'steps'>(initialTab);
  const steps = NODE_STEPS_MAP[node.id] || [];

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, node.id]);

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
        transition: isDragging ? 'none' : 'width 0.15s ease'
      }}
    >
      <ResizeHandle
        onMouseDown={onResizeStart}
        isDragging={isDragging}
        onReset={onResetWidth}
      />

      {/* Drawer Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <div>
          <span className="badge badge-accent" style={{ fontSize: '0.6875rem' }}>
            {node.phase.replace(/_/g, ' ')}
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.4rem', letterSpacing: '-0.3px' }}>
            {node.title}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            onClick={() => onSetPreset(width > 500 ? 360 : 600)}
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

      {/* Segmented Tab Switcher (Notion Style) */}
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
          <span>Visão Geral</span>
        </button>
        <button
          onClick={() => setActiveTab('steps')}
          style={{
            flex: 1,
            padding: '0.4rem 0.6rem',
            background: activeTab === 'steps' ? 'var(--bg-surface)' : 'transparent',
            border: 'none',
            borderRadius: 'var(--radius-xs)',
            boxShadow: activeTab === 'steps' ? 'var(--shadow-level-1)' : 'none',
            color: activeTab === 'steps' ? 'var(--text-primary)' : 'var(--text-tertiary)',
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
          <ListOrdered size={13} color={activeTab === 'steps' ? 'var(--accent)' : 'var(--text-tertiary)'} />
          <span className="tabular">Passos ({steps.length})</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '52ch' }}>
            {node.summary}
          </p>

          {/* Departments */}
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '0.45rem' }}>
              DEPARTAMENTOS ENVOLVIDOS
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {node.responsibilities.map((resp, i) => (
                <span key={i} className="badge badge-neutral" style={{ fontSize: '0.6875rem' }}>
                  {resp}
                </span>
              ))}
            </div>
          </div>

          {/* Critical Checks */}
          <div>
            <div style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'var(--sticker-orange)',
              marginBottom: '0.45rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <AlertTriangle size={13} />
              <span>PONTOS DE REVISÃO CRÍTICA</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {node.criticalChecks.map((check, i) => (
                <li key={i} style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: '1.5' }}>
                  <CheckCircle2 size={13} color="var(--accent)" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Docs */}
          {node.requiredDocs && (
            <div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FileText size={13} />
                <span>DOCUMENTOS DE ORIGEM</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {node.requiredDocs.map((doc, i) => (
                  <div key={i} style={{
                    fontSize: '0.78125rem',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem 0.75rem',
                    borderLeft: '3px solid var(--accent)',
                    color: 'var(--text-secondary)'
                  }}>
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Links */}
          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '0.45rem' }}>
              PORTAIS OFICIAIS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {node.officialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
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
                    backgroundColor: 'var(--bg-surface)',
                    transition: 'border-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <span style={{ fontWeight: 500 }}>{link.label}</span>
                  <ExternalLink size={12} color="var(--accent)" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Individual Passos Explorer */}
      {activeTab === 'steps' && (
        <NodeStepsExplorer
          steps={steps}
          phaseTitle={node.title}
          highlightStepCode={highlightStepCode}
        />
      )}

    </div>
  );
};
