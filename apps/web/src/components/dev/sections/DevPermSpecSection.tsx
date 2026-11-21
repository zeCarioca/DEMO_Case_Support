import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, MapPin, FileText } from 'lucide-react';

export const DevPermSpecSection: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Legal Basis Overview */}
      <div
        style={{
          backgroundColor: 'var(--bg-page)',
          border: '1px solid var(--border)',
          borderLeft: '4px solid #10b981',
          padding: '1rem 1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <Scale size={16} color="#10b981" />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Especificação Jurídica & Técnica: Motor de Resolução PERM
          </h3>
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
          O motor elimina consultas arbitrárias baseadas em raio circular cego ou capitais estaduais distantes.
          Em processos de certificação permanente do DOL (PERM), a definição de <strong>Área de Emprego Pretendida (AIE)</strong> é regida estritamente por <strong>20 CFR § 656.3</strong> e <strong>20 CFR § 656.17(e)</strong>.
        </p>
      </div>

      {/* 3-Tier Waterfall Pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {/* Tier 1 */}
        <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '0.15rem 0.45rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid #10b98140' }}>
              TIER 1
            </span>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Fronteira CBSA / MSA (20 CFR § 656.3)
            </h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '0 0 0.5rem 0' }}>
            Qualquer local de trabalho situado dentro de uma Área Estatística Metropolitana (OMB CBSA) é legalmente considerado dentro da distância diária normal de deslocamento.
          </p>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
            • Seleciona o <strong>diário metropolitano primário</strong> com maior tiragem dominical.<br />
            • <strong>Fronteiras estaduais são irrelevantes:</strong> Jersey City (NJ) utiliza o <em>NY Times</em> (CBSA 35620); Arlington (VA) utiliza o <em>Washington Post</em> (CBSA 47900).
          </div>
        </div>

        {/* Tier 2 */}
        <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '0.15rem 0.45rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid #3b82f640' }}>
              TIER 2
            </span>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Condado Não-Metropolitano
            </h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '0 0 0.5rem 0' }}>
            Aplicável quando o worksite está em condado rural/micropolitano fora de qualquer CBSA metropolitano.
          </p>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
            • Busca periódicos ativos vinculados ao <code>county_fips</code> do worksite.<br />
            • Se existir jornal com edição dominical impressa no condado, seleciona o de maior tiragem.
          </div>
        </div>

        {/* Tier 3 */}
        <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '0.15rem 0.45rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid #f59e0b40' }}>
              TIER 3
            </span>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Exceção Rural (20 CFR § 656.17(e))
            </h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '0 0 0.5rem 0' }}>
            Ativada quando não existe publicação com edição dominical no condado do local de trabalho.
          </p>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
            • Executa busca por fórmula de <strong>Haversine</strong> até raio de 50 milhas.<br />
            • Seleciona a publicação de maior circulação geral (semanal ou diária) que atende a localidade.<br />
            • Gera nota de conformidade para o <em>Audit File</em> do DOL.
          </div>
        </div>
      </div>

      {/* Audit Readiness Checklist */}
      <div
        style={{
          backgroundColor: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <FileText size={15} color="var(--accent)" />
          <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>
            Requisitos Obrigatórios para o DOL Audit File
          </h4>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <div>
            <strong>1. Electronic Tear Sheets:</strong> Exigir comprovação com cabeçalho contendo nome do jornal, página completa e data de veiculação em 2 domingos distintos.
          </div>
          <div>
            <strong>2. Nota de AIE Interestadual:</strong> Anexar o código CBSA (ex: 35620) provando que o worksite pertence à mesma área metropolitana da publicação.
          </div>
          <div>
            <strong>3. Declaração de Exceção Rural:</strong> Caso ativado Tier 3, registrar a citação de 20 CFR § 656.17(e)(1)(i)(B)(2) atestando ausência de periódico dominical no condado.
          </div>
        </div>
      </div>
    </div>
  );
};
