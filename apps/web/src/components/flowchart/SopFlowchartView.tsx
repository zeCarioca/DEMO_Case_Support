import React, { useState, useRef } from 'react';
import { FLOW_NODES, FlowNode } from './flowData.js';
import { FlowNodeCard } from './FlowNodeCard.js';
import { NodeDetailDrawer } from './NodeDetailDrawer.js';
import { PhaseSection } from './PhaseSection.js';
import { FlowchartHeroBand } from './FlowchartHeroBand.js';
import { useLanguage } from '../i18n/LanguageContext.js';

const DEFAULT_DRAWER_WIDTH = 400;
const MIN_DRAWER_WIDTH = 300;
const MAX_DRAWER_WIDTH = 750;

export interface SopTargetSelection {
  nodeId: string;
  stepCode?: string | null;
  tab?: 'overview' | 'steps';
}

interface SopFlowchartViewProps {
  targetSelection?: SopTargetSelection | null;
}

export const SopFlowchartView: React.FC<SopFlowchartViewProps> = ({
  targetSelection
}) => {
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(FLOW_NODES[0]);

  React.useEffect(() => {
    if (targetSelection?.nodeId) {
      const match = FLOW_NODES.find((n) => n.id === targetSelection.nodeId);
      if (match) {
        setSelectedNode(match);
      }
    }
  }, [targetSelection]);

  const [drawerWidth, setDrawerWidth] = useState<number>(() => {
    const saved = localStorage.getItem('apex_drawer_width');
    return saved ? Math.max(MIN_DRAWER_WIDTH, Math.min(MAX_DRAWER_WIDTH, Number(saved))) : DEFAULT_DRAWER_WIDTH;
  });
  const [isDragging, setIsDragging] = useState(false);

  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(DEFAULT_DRAWER_WIDTH);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = drawerWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = startXRef.current - moveEvent.clientX;
      const nextWidth = Math.max(MIN_DRAWER_WIDTH, Math.min(MAX_DRAWER_WIDTH, startWidthRef.current + delta));
      setDrawerWidth(nextWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setDrawerWidth((curr) => {
        localStorage.setItem('apex_drawer_width', String(curr));
        return curr;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleSetPreset = (targetWidth: number) => {
    const clamped = Math.max(MIN_DRAWER_WIDTH, Math.min(MAX_DRAWER_WIDTH, targetWidth));
    setDrawerWidth(clamped);
    localStorage.setItem('apex_drawer_width', String(clamped));
  };

  const handleToggleNode = (node: FlowNode) => {
    if (selectedNode?.id === node.id) {
      setSelectedNode(null);
    } else {
      setSelectedNode(node);
    }
  };

  const clearanceNodes = FLOW_NODES.slice(0, 2);
  const examNodes = FLOW_NODES.slice(2, 4);
  const allowanceNodes = FLOW_NODES.slice(4, 6);
  const maintenanceNode = FLOW_NODES[6];

  const isClearanceActive = selectedNode?.phase === 'PHASE_A_CLEARANCE_FILING';
  const isExamActive = selectedNode?.phase === 'PHASE_B_EXAMINATION_PROSECUTION';
  const isAllowanceActive = selectedNode?.phase === 'PHASE_C_ALLOWANCE_MAINTENANCE' && selectedNode?.id !== 'node-maintenance';
  const isMaintenanceActive = selectedNode?.id === 'node-maintenance';
  const hasSelection = Boolean(selectedNode);

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '2rem' }}>
      
      {/* Notion Section Header & Night Hero Band Moment */}
      <div style={{ marginBottom: '2rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)' }}>
            {isPt ? 'PROCEDIMENTO OPERACIONAL PADRÃO (SOP) • USPTO TRADEMARK' : 'STANDARD OPERATING PROCEDURE (SOP) • USPTO TRADEMARK'}
          </span>
          {selectedNode && (
            <button
              onClick={() => setSelectedNode(null)}
              className="badge"
              style={{
                cursor: 'pointer',
                fontSize: '0.6875rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.2rem 0.6rem',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-secondary)',
                borderColor: 'var(--border)'
              }}
              title={isPt ? 'Voltar ao estado neutro' : 'Clear active selection'}
            >
              {isPt ? 'Desmarcar etapa ✕' : 'Clear selection ✕'}
            </button>
          )}
        </div>

        {/* Hero Band */}
        <FlowchartHeroBand />

      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', position: 'relative' }}>
        
        {/* Workflow Columns */}
        <div style={{ flex: 1, minWidth: 0 }}>
          
          {/* Phase A: Clearance & TEAS Filing */}
          <PhaseSection
            title={isPt ? 'Fase A — Busca Prévia & Protocolo TEAS' : 'Phase A — Clearance & TEAS Filing'}
            subtitle={isPt ? '2 etapas preparatórias' : '2 sequential stages'}
            isActive={isClearanceActive}
            isDimmed={hasSelection && !isClearanceActive}
            activeStepLabel={isClearanceActive && selectedNode ? `${isPt ? 'Ativo' : 'Active'}: ${selectedNode.title}` : undefined}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {clearanceNodes.map((node, index) => (
                <FlowNodeCard
                  key={node.id}
                  node={node}
                  stepNumber={index + 1}
                  isSelected={selectedNode?.id === node.id}
                  onSelect={handleToggleNode}
                />
              ))}
            </div>
          </PhaseSection>

          {/* Phase B: Examination & Office Action */}
          <PhaseSection
            title={isPt ? 'Fase B — Exame Formal & Defesa de Despachos' : 'Phase B — Examination & Office Action Defense'}
            subtitle={isPt ? '2 etapas críticas' : '2 critical stages'}
            isActive={isExamActive}
            isDimmed={hasSelection && !isExamActive}
            activeStepLabel={isExamActive && selectedNode ? `${isPt ? 'Ativo' : 'Active'}: ${selectedNode.title}` : undefined}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {examNodes.map((node, index) => (
                <FlowNodeCard
                  key={node.id}
                  node={node}
                  stepNumber={index + 3}
                  isSelected={selectedNode?.id === node.id}
                  onSelect={handleToggleNode}
                />
              ))}
            </div>
          </PhaseSection>

          {/* Phase C: Publication, SOU & Allowance */}
          <PhaseSection
            title={isPt ? 'Fase C — Publicação na Revista Oficial & Prova de Uso (SOU)' : 'Phase C — Official Gazette Publication & SOU'}
            subtitle={isPt ? '2 etapas de concessão' : '2 allowance stages'}
            isActive={isAllowanceActive}
            isDimmed={hasSelection && !isAllowanceActive}
            activeStepLabel={isAllowanceActive && selectedNode ? `${isPt ? 'Ativo' : 'Active'}: ${selectedNode.title}` : undefined}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {allowanceNodes.map((node, index) => (
                <FlowNodeCard
                  key={node.id}
                  node={node}
                  stepNumber={index + 5}
                  isSelected={selectedNode?.id === node.id}
                  onSelect={handleToggleNode}
                />
              ))}
            </div>
          </PhaseSection>

          {/* Post-Registration Maintenance Special Track */}
          <PhaseSection
            title={isPt ? 'Manutenção Pós-Registro — Declarações Decenais (§ 8, § 15 & § 9)' : 'Post-Registration Maintenance — Decennial (§ 8, § 15 & § 9)'}
            subtitle={isPt ? 'Ciclo vitalício do registro' : 'Lifetime registration cycle'}
            isActive={isMaintenanceActive}
            isDimmed={hasSelection && !isMaintenanceActive}
            activeStepLabel={isMaintenanceActive && selectedNode ? `${isPt ? 'Ativo' : 'Active'}: ${selectedNode.title}` : undefined}
          >
            <div
              onClick={() => handleToggleNode(maintenanceNode)}
              className="swiss-card"
              style={{
                padding: '1.25rem 1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                borderColor: selectedNode?.id === 'node-maintenance' ? 'var(--accent)' : 'var(--border)',
                borderLeft: '3px solid var(--accent)',
                backgroundColor: selectedNode?.id === 'node-maintenance' ? 'var(--bg-subtle)' : 'var(--bg-surface)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span className="badge badge-accent">{isPt ? 'Ciclo Contínuo' : 'Lifecycle Maintenance'}</span>
                  <span style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                    {isPt ? 'Anos 5-6 & Renovação Decenal' : 'Years 5-6 & Decennial Renewal'}
                  </span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
                  {maintenanceNode.title}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', maxWidth: '60ch', margin: 0 }}>
                  {maintenanceNode.summary}
                </p>
              </div>
              <div style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                fontWeight: 600,
                flexShrink: 0
              }}>
                {selectedNode?.id === 'node-maintenance' ? (isPt ? 'Fechar detalhes ✕' : 'Close details ✕') : (isPt ? 'Abrir detalhes →' : 'View details →')}
              </div>
            </div>
          </PhaseSection>

        </div>

        {/* Selected Node Drawer (Adjustable) */}
        {selectedNode && (
          <NodeDetailDrawer
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            width={drawerWidth}
            onResizeStart={handleResizeStart}
            isDragging={isDragging}
            onSetPreset={handleSetPreset}
            onResetWidth={() => handleSetPreset(DEFAULT_DRAWER_WIDTH)}
            initialTab={targetSelection?.nodeId === selectedNode.id ? targetSelection.tab : 'overview'}
            highlightStepCode={targetSelection?.nodeId === selectedNode.id ? targetSelection.stepCode : null}
          />
        )}

      </div>

    </div>
  );
};
