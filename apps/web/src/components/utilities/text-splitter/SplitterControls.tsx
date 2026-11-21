import React from 'react';
import { Sliders } from 'lucide-react';

interface SplitterControlsProps {
  maxChars: number;
  onMaxCharsChange: (val: number) => void;
  hyphenateBreak: boolean;
  onHyphenateBreakChange: (val: boolean) => void;
  preserveParagraphs: boolean;
  onPreserveParagraphsChange: (val: boolean) => void;
}

const PRESET_LIMITS = [41, 40, 50, 70];

export const SplitterControls: React.FC<SplitterControlsProps> = ({
  maxChars,
  onMaxCharsChange,
  hyphenateBreak,
  onHyphenateBreakChange,
  preserveParagraphs,
  onPreserveParagraphsChange
}) => {
  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        paddingTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
        <Sliders size={13} />
        <span>Configurações de Divisão</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Limite por caixa:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {PRESET_LIMITS.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => onMaxCharsChange(val)}
              style={{
                padding: '0.2rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: maxChars === val ? 700 : 500,
                borderRadius: 'var(--radius-xs)',
                border: '1px solid',
                borderColor: maxChars === val ? 'var(--accent)' : 'var(--border)',
                backgroundColor: maxChars === val ? 'var(--accent)' : 'var(--bg-subtle)',
                color: maxChars === val ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {val} {val === 41 ? '(Padrão)' : ''}
            </button>
          ))}
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={hyphenateBreak}
          onChange={(e) => onHyphenateBreakChange(e.target.checked)}
          style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
        />
        <span>Dividir palavras no limite com hífen (-)</span>
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={preserveParagraphs}
          onChange={(e) => onPreserveParagraphsChange(e.target.checked)}
          style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
        />
        <span>Respeitar quebras de linha/parágrafos originais</span>
      </label>
    </div>
  );
};
