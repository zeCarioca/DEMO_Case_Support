import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FlowNode } from './flowData.js';

interface FlowNodeCardProps {
  node: FlowNode;
  stepNumber: number;
  isSelected: boolean;
  onSelect: (node: FlowNode) => void;
}

export const FlowNodeCard: React.FC<FlowNodeCardProps> = ({
  node,
  stepNumber,
  isSelected,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(node)}
      className="notion-card"
      style={{
        padding: '1.25rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: isSelected ? 'var(--bg-subtle)' : 'var(--bg-surface)',
        borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: isSelected ? 'var(--shadow-level-1)' : 'var(--shadow-level-0)',
        minHeight: '190px',
        position: 'relative',
        transition: 'all 0.15s ease'
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.boxShadow = 'var(--shadow-level-1)';
          e.currentTarget.style.borderColor = 'var(--border-contrast)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.boxShadow = 'var(--shadow-level-0)';
          e.currentTarget.style.borderColor = 'var(--border)';
        }
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span
            className="badge"
            style={{
              fontSize: '0.6875rem',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-secondary)'
            }}
          >
            {node.stepCount}&nbsp;passos
          </span>
          <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)' }} className="tabular">
            Fase 0{stepNumber}
          </span>
        </div>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.45rem', letterSpacing: '-0.2px' }}>
          {node.title}
        </h4>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1rem', maxWidth: '48ch' }}>
          {node.summary.slice(0, 95)}…
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.75rem',
        color: isSelected ? 'var(--accent)' : 'var(--text-tertiary)',
        fontWeight: 600,
        paddingTop: '0.6rem',
        borderTop: '1px solid var(--border)'
      }}>
        <span>Visualizar detalhes</span>
        <ArrowRight size={12} color={isSelected ? 'var(--accent)' : 'var(--text-tertiary)'} />
      </div>
    </div>
  );
};
