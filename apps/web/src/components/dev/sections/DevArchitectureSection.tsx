import React from 'react';
import { Layers, Server, Database, Layout, Shield, Cpu } from 'lucide-react';

export const DevArchitectureSection: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Intro Banner */}
      <div
        style={{
          backgroundColor: 'var(--bg-page)',
          border: '1px solid var(--border)',
          borderLeft: '4px solid var(--accent)',
          padding: '1rem 1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <Layers size={16} color="var(--accent)" />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Arquitetura Global do Sistema (CaseSupport Atlas)
          </h3>
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
          O CaseSupport é estruturado como um monorepo TypeScript gerenciado com <strong>Turborepo</strong> e <strong>pnpm</strong>,
          separando responsabilidades estritas entre contratos compartilhados, serviços REST Fastify, persistência Prisma/SQLite e interface gráfica React 18 no estilo Swiss International.
        </p>
      </div>

      {/* Package Topology Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {/* @case-support/shared-types */}
        <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
            <Cpu size={15} color="var(--accent)" />
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-mono)' }}>
              @case-support/shared-types
            </h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '0 0 0.5rem 0' }}>
            Biblioteca compartilhada de esquemas Zod e tipagens TypeScript para contratos de API, DTOs de casos, tarefas e resolução de jornais PERM.
          </p>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
            Exporta: PermResolutionRequest, PermResolutionResponse, CaseSummary
          </div>
        </div>

        {/* @case-support/api */}
        <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
            <Server size={15} color="var(--accent)" />
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-mono)' }}>
              @case-support/api (Fastify 5)
            </h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '0 0 0.5rem 0' }}>
            Servidor HTTP de alta performance rodando na porta <code>4000</code>. Implementa rotas de casos, cronograma PERM, tarefas e o motor hierárquico de jornais.
          </p>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
            Rotas: /api/cases, /api/newspapers/resolve, /api/calculator
          </div>
        </div>

        {/* @case-support/database */}
        <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
            <Database size={15} color="var(--accent)" />
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-mono)' }}>
              @case-support/database (Prisma)
            </h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '0 0 0.5rem 0' }}>
            Camada de persistência ORM conectada ao SQLite local (<code>dev.db</code>). Armazena histórico de casos, pipelines, notas e logs de auditoria.
          </p>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
            Driver: @prisma/client • Migrations gerenciadas via prisma migrate
          </div>
        </div>

        {/* @case-support/web */}
        <div style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
            <Layout size={15} color="var(--accent)" />
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-mono)' }}>
              @case-support/web (Vite + React)
            </h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: '0 0 0.5rem 0' }}>
            SPA servida na porta <code>3000</code> com proxy automático para <code>/api</code>. Sistema de abas, mapas interativos SVG e gerenciador de casos.
          </p>
          <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
            Design System: Swiss Style • Tipografia: IBM Plex Sans + Mono
          </div>
        </div>
      </div>

      {/* Architecture Principles & Security */}
      <div
        style={{
          backgroundColor: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Shield size={15} color="var(--accent)" />
          <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>
            Padrões Arquiteturais e Diretrizes de Engenharia
          </h4>
        </div>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <li><strong>Regra dos 300 Linhas (AGENTS.md):</strong> Todo arquivo fonte mantém estritamente menos de 300 linhas, desacoplando subcomponentes em feature folders.</li>
          <li><strong>Zero-Error Gate:</strong> Nenhuma alteração é promovida sem aprovação de <code>pnpm build</code> e <code>pnpm lint</code> em todos os 4 pacotes.</li>
          <li><strong>Consistência de Tokens:</strong> Cores e espaçamentos seguem variáveis CSS nativas (<code>--bg-page</code>, <code>--bg-surface</code>, <code>--accent</code>, <code>--border</code>) sem classes ad-hoc opacas.</li>
        </ul>
      </div>
    </div>
  );
};
