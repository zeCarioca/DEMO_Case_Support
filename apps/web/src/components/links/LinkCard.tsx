import React, { useState } from 'react';
import { ExternalLink, Copy, Check, ShieldCheck, AlertTriangle } from 'lucide-react';
import { GovernmentLink } from './types.js';

interface LinkCardProps {
  item: GovernmentLink;
}

export const LinkCard: React.FC<LinkCardProps> = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const getAgencyStyle = (agency: string) => {
    switch (agency) {
      case 'DOL':
        return { bg: 'var(--sticker-purple-bg)', text: 'var(--sticker-purple-text)' };
      case 'USCIS':
        return { bg: 'var(--sticker-blue-bg)', text: 'var(--color-primary)' };
      case 'DOS':
        return { bg: 'var(--sticker-green-bg)', text: 'var(--sticker-green-text)' };
      case 'CBP':
        return { bg: 'var(--sticker-orange-bg)', text: 'var(--sticker-orange-text)' };
      case 'SWA':
        return { bg: 'var(--sticker-brown-bg)', text: 'var(--sticker-brown-text)' };
      default:
        return { bg: 'var(--bg-subtle)', text: 'var(--text-secondary)' };
    }
  };

  const agencyStyle = getAgencyStyle(item.agency);

  return (
    <div
      className="notion-card"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-level-1)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        position: 'relative'
      }}
    >
      <div>
        {/* Top Badges Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          marginBottom: '0.75rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: agencyStyle.bg,
                color: agencyStyle.text,
                border: '1px solid var(--border)'
              }}
            >
              {item.agency}
            </span>
            <span
              style={{
                fontSize: '0.625rem',
                color: 'var(--text-secondary)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)'
              }}
            >
              {item.badge}
            </span>
          </div>

          {item.isOfficialGov && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.625rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
                backgroundColor: 'var(--sticker-blue-bg)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border)'
              }}
              title="Portal oficial do governo norte-americano (.gov)"
            >
              <ShieldCheck size={11} />
              <span>OFICIAL .GOV</span>
            </div>
          )}
        </div>

        {/* Link Title */}
        <h3
          style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            lineHeight: 1.35,
            marginBottom: '0.5rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em'
          }}
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '0.8125rem',
            lineHeight: 1.5,
            color: 'var(--text-secondary)',
            marginBottom: '0.75rem'
          }}
        >
          {item.description}
        </p>

        {/* Critical Note if exists */}
        {item.criticalNote && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.45rem',
              padding: '0.5rem 0.65rem',
              backgroundColor: 'var(--sticker-yellow-bg)',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '3px solid var(--color-warning)',
              marginBottom: '0.75rem'
            }}
          >
            <AlertTriangle size={13} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.6875rem', color: 'var(--sticker-yellow-text)', lineHeight: 1.4 }}>
              {item.criticalNote}
            </span>
          </div>
        )}
      </div>

      {/* URL Footer & Action Buttons */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '0.75rem',
          marginTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--text-tertiary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '180px'
          }}
          title={item.url}
        >
          {item.url.replace(/^https?:\/\//, '')}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            onClick={handleCopy}
            title={copied ? 'Copiado!' : 'Copiar URL'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.3rem 0.55rem',
              fontSize: '0.6875rem',
              color: copied ? 'var(--color-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s ease'
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? 'Copiado' : 'Copiar'}</span>
          </button>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir portal oficial em nova guia"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '0.35rem 0.75rem',
              fontSize: '0.6875rem',
              fontWeight: 500,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.15s ease'
            }}
          >
            <span>Acessar</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
