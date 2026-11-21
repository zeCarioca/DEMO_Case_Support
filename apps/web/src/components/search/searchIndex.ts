import { FLOW_NODES } from '../flowchart/flowData.js';
import { NODE_STEPS_MAP, NodeStepItem } from '../flowchart/nodeStepsData.js';
import { LEARN_ITEMS } from '../learn/learnData.js';

export type SearchItemType = 'FASE' | 'PASSO' | 'DOC' | 'LEARN';

export interface SearchItem {
  type: SearchItemType;
  id: string;
  nodeId?: string;
  nodeTitle?: string;
  phaseCode?: string;
  code: string;
  title: string;
  detail: string;
  role?: string;
  criticalNote?: string;
  requiresApproval?: string;
  stepCount?: number;
}

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // 1. Index all 7 Fases
  FLOW_NODES.forEach((node, index) => {
    const phaseCode = index < 4 ? `Fase 0${index + 1}` : index < 6 ? `Fase 0${index + 1}` : 'Subprocesso';
    items.push({
      type: 'FASE',
      id: node.id,
      nodeId: node.id,
      nodeTitle: node.title,
      phaseCode,
      code: phaseCode,
      title: node.title,
      detail: node.summary,
      stepCount: node.stepCount
    });
  });

  // 2. Index all 98 Passos
  FLOW_NODES.forEach((node) => {
    const steps: NodeStepItem[] = NODE_STEPS_MAP[node.id] || [];
    steps.forEach((step) => {
      items.push({
        type: 'PASSO',
        id: step.code,
        nodeId: node.id,
        nodeTitle: node.title,
        phaseCode: node.phase.replace(/_/g, ' '),
        code: step.code,
        title: step.title,
        detail: step.detail || '',
        role: step.role,
        criticalNote: step.criticalNote,
        requiresApproval: step.requiresApproval
      });
    });
  });

  // 3. Index official documents & required forms
  FLOW_NODES.forEach((node) => {
    if (node.requiredDocs) {
      node.requiredDocs.forEach((doc, idx) => {
        items.push({
          type: 'DOC',
          id: `${node.id}-doc-${idx}`,
          nodeId: node.id,
          nodeTitle: node.title,
          phaseCode: node.phase.replace(/_/g, ' '),
          code: 'DOCUMENTO',
          title: doc,
          detail: `Exigido na etapa: ${node.title}`
        });
      });
    }
  });

  // 4. Index all Learn items (Forms, Protocols, Docs)
  LEARN_ITEMS.forEach((learn) => {
    items.push({
      type: 'LEARN',
      id: learn.id,
      nodeId: learn.relatedPhaseId,
      nodeTitle: learn.relatedPhaseName,
      phaseCode: learn.category,
      code: learn.code,
      title: learn.title,
      detail: `${learn.subtitle} — ${learn.summary}`,
      role: learn.responsibleRoles.join(', '),
      criticalNote: learn.criticalRules?.[0]
    });
  });

  return items;
}

export function searchAll(
  query: string,
  typeFilter: 'ALL' | SearchItemType = 'ALL',
  items: SearchItem[]
): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    if (typeFilter !== 'ALL') return items.filter((it) => it.type === typeFilter);
    return items;
  }

  const results = items.filter((item) => {
    if (typeFilter !== 'ALL' && item.type !== typeFilter) return false;

    const matchCode = item.code.toLowerCase().includes(q);
    const matchTitle = item.title.toLowerCase().includes(q);
    const matchDetail = item.detail.toLowerCase().includes(q);
    const matchRole = item.role ? item.role.toLowerCase().includes(q) : false;
    const matchNodeTitle = item.nodeTitle ? item.nodeTitle.toLowerCase().includes(q) : false;
    const matchCritical = item.criticalNote ? item.criticalNote.toLowerCase().includes(q) : false;

    return matchCode || matchTitle || matchDetail || matchRole || matchNodeTitle || matchCritical;
  });

  return results.sort((a, b) => {
    const aCodeStarts = a.code.toLowerCase().startsWith(q);
    const bCodeStarts = b.code.toLowerCase().startsWith(q);
    if (aCodeStarts && !bCodeStarts) return -1;
    if (!aCodeStarts && bCodeStarts) return 1;

    const aTitleStarts = a.title.toLowerCase().startsWith(q);
    const bTitleStarts = b.title.toLowerCase().startsWith(q);
    if (aTitleStarts && !bTitleStarts) return -1;
    if (!aTitleStarts && bTitleStarts) return 1;

    // Type priority ordering: FASES -> PASSOS -> LEARN -> DOCS
    const typePriority: Record<SearchItemType, number> = { FASE: 1, PASSO: 2, LEARN: 3, DOC: 4 };
    return (typePriority[a.type] || 5) - (typePriority[b.type] || 5);
  });
}
