import React, { useState } from 'react';
import { Copy, Check, FileText, Scale } from 'lucide-react';
import { PermResolutionResponse } from '@case-support/shared-types';

interface PermAuditMemoBoxProps {
  resolution: PermResolutionResponse;
}

export const PermAuditMemoBox: React.FC<PermAuditMemoBoxProps> = ({ resolution }) => {
  const [copied, setCopied] = useState(false);

  const { worksite, resolution_strategy, recommended_newspaper } = resolution;

  const areaLabel = worksite.area_type === 'MICROPOLITAN'
    ? 'Área Estatística Micropolitana (μSA)'
    : worksite.area_type === 'METROPOLITAN'
    ? 'Área Estatística Metropolitana (MSA)'
    : 'Área Rural / Não-CBSA';

  const auditMemoText = [
    `RELATÓRIO DE AUDITORIA PERM — DETERMINAÇÃO DE JORNAL DE MAIOR CIRCULAÇÃO`,
    `Local de Trabalho: CEP ${worksite.zip}${worksite.city ? `, ${worksite.city}` : ''}${worksite.state ? ` - ${worksite.state}` : ''}`,
    worksite.is_po_box_fallback && worksite.resolved_zip ? `Observação Postal: CEP ${worksite.zip} é caixa postal (PO Box); resolvido para o ZCTA físico ${worksite.resolved_zip}.` : null,
    `Classificação Censitária: ${areaLabel} ${worksite.cbsa_code ? `(CBSA ${worksite.cbsa_code} - ${worksite.cbsa_name})` : ''}`,
    `Fundamentação Legal: ${resolution_strategy.legal_basis} [Citação: ${resolution_strategy.legal_citation}]`,
    `Publicação Selecionada: ${recommended_newspaper.name}`,
    `Circulação Dominical Declarada: ${recommended_newspaper.sunday_circulation.toLocaleString()} exemplares`,
    `Edição Impressa de Domingo: ${recommended_newspaper.has_sunday_print_edition ? 'SIM (Requisito 20 CFR § 656.17(e) atendido)' : 'NÃO (Exceção rural aplicável)'}`,
    `Sede do Periódico: ${recommended_newspaper.headquarters_city || 'Principal'}, ${recommended_newspaper.headquarters_state}`,
    `Nota de Conformidade: ${resolution_strategy.compliance_note}`
  ].filter(Boolean).join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(auditMemoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        marginTop: '1.25rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '0.85rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Scale size={16} color="var(--color-primary)" />
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Memorando de Conformidade DOL (ETA-9089 Audit File)
          </span>
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 600,
              padding: '0.1rem 0.45rem',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-tertiary)'
            }}
          >
            20 CFR § 656
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: copied ? 'var(--color-primary)' : 'var(--bg-surface)',
            color: copied ? '#ffffff' : 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.35rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'Copiado para Área de Transferência!' : 'Copiar Texto para Relatório'}</span>
        </button>
      </div>

      <pre
        style={{
          margin: 0,
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.75rem',
          lineHeight: 1.55,
          color: 'var(--text-secondary)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.85rem 1rem',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxHeight: '220px',
          overflowY: 'auto'
        }}
      >
        {auditMemoText}
      </pre>
    </div>
  );
};
