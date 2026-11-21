import React, { useState, useMemo } from 'react';
import { ArrowLeft, Scissors, Copy, Check, Trash2, ClipboardPaste, Sparkles, FileText } from 'lucide-react';
import { splitTextIntoBoxes, cleanInputText, DEFAULT_MAX_CHARS, SAMPLE_TEXT } from './textSplitter.js';
import { SplitBoxCard } from './SplitBoxCard.js';
import { SplitterControls } from './SplitterControls.js';
import { CleanSparkleBurst, TextareaCleanOverlay, useCleanTextVfx } from './CleanTextVfx.js';

interface TextSplitterViewProps {
  onBackToHub: () => void;
}

export const TextSplitterView: React.FC<TextSplitterViewProps> = ({ onBackToHub }) => {
  const [inputText, setInputText] = useState(SAMPLE_TEXT);
  const [maxChars, setMaxChars] = useState(DEFAULT_MAX_CHARS);
  const [hyphenateBreak, setHyphenateBreak] = useState(true);
  const [preserveParagraphs, setPreserveParagraphs] = useState(true);
  const [copiedAll, setCopiedAll] = useState(false);
  const [cleanedToast, setCleanedToast] = useState(false);
  const { vfxActive, vfxKey, triggerCleanVfx } = useCleanTextVfx();

  const boxes = useMemo(() => {
    return splitTextIntoBoxes(inputText, {
      maxChars,
      hyphenateBreak,
      preserveParagraphs
    });
  }, [inputText, maxChars, hyphenateBreak, preserveParagraphs]);

  const handleCleanText = () => {
    if (!inputText) return;
    const cleaned = cleanInputText(inputText);
    setInputText(cleaned);
    setCleanedToast(true);
    triggerCleanVfx();
    setTimeout(() => setCleanedToast(false), 1800);
  };

  const handleCopyAll = async () => {
    if (boxes.length === 0) return;
    const combined = boxes.map((b) => b.text).join('\n');
    try {
      await navigator.clipboard.writeText(combined);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = combined;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInputText(text);
    } catch {
      // Ignore if permission denied
    }
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Breadcrumb & Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onBackToHub}
            className="btn"
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              gap: '0.375rem'
            }}
          >
            <ArrowLeft size={14} />
            Voltar aos Utilitários
          </button>

          <span style={{ color: 'var(--border)' }}>/</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scissors size={18} style={{ color: 'var(--accent)' }} />
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Formatador de Texto (Caixas de {maxChars} Caracteres)
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.25rem 0.625rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(42, 157, 153, 0.12)',
              color: 'var(--sticker-teal)',
              border: '1px solid rgba(42, 157, 153, 0.3)',
              fontWeight: 600
            }}
          >
            {boxes.length} {boxes.length === 1 ? 'caixa gerada' : 'caixas geradas'}
          </span>
        </div>
      </div>

      {/* Main 2-Column or Stacked Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Left Column: Input and Controls */}
        <div className="notion-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Texto de Entrada
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleCleanText}
                className={`btn btn-utility ${vfxActive ? 'clean-vfx-button-pop' : ''}`}
                style={{
                  position: 'relative',
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.6rem',
                  gap: '0.35rem',
                  backgroundColor: cleanedToast ? 'rgba(35, 134, 54, 0.12)' : 'var(--bg-subtle)',
                  color: cleanedToast ? 'var(--sticker-green-text)' : 'var(--accent)',
                  borderColor: cleanedToast ? 'var(--sticker-green-text)' : 'var(--accent)',
                  fontWeight: 600
                }}
                title="Substituir quebras de linha por espaços e remover marcadores (•)"
              >
                <CleanSparkleBurst active={vfxActive} triggerKey={vfxKey} />
                {cleanedToast ? (
                  <Check size={12} className={vfxActive ? 'clean-vfx-icon-spin' : ''} />
                ) : (
                  <Sparkles size={12} className={vfxActive ? 'clean-vfx-icon-spin' : ''} />
                )}
                <span>{cleanedToast ? 'Texto Limpo!' : 'Limpar Texto'}</span>
              </button>

              <button
                type="button"
                onClick={handlePaste}
                className="btn btn-utility"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', gap: '0.3rem' }}
                title="Colar da área de transferência"
              >
                <ClipboardPaste size={12} />
                <span>Colar</span>
              </button>

              <button
                type="button"
                onClick={() => setInputText(SAMPLE_TEXT)}
                className="btn btn-utility"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', gap: '0.3rem' }}
                title="Inserir texto com marcadores de exemplo"
              >
                <FileText size={12} />
                <span>Exemplo</span>
              </button>

              {inputText && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn btn-utility"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', gap: '0.3rem', color: 'var(--sticker-red-text)' }}
                  title="Apagar todo o texto"
                >
                  <Trash2 size={12} />
                  <span>Apagar</span>
                </button>
              )}
            </div>
          </div>

          <div className="clean-vfx-sweep-container">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite ou cole aqui o texto que deseja dividir em blocos de 41 caracteres..."
              rows={8}
              className={vfxActive ? 'clean-vfx-textarea-active' : ''}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-primary)',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                resize: 'vertical',
                outline: 'none',
                display: 'block'
              }}
            />
            <TextareaCleanOverlay active={vfxActive} triggerKey={vfxKey} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            <span>{inputText.length} caracteres no texto</span>
            <span>{inputText.trim() ? inputText.trim().split(/\s+/).length : 0} palavras</span>
          </div>

          <SplitterControls
            maxChars={maxChars}
            onMaxCharsChange={setMaxChars}
            hyphenateBreak={hyphenateBreak}
            onHyphenateBreakChange={setHyphenateBreak}
            preserveParagraphs={preserveParagraphs}
            onPreserveParagraphsChange={setPreserveParagraphs}
          />
        </div>

        {/* Right Column: Generated Boxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Caixas Formatadas para Copiar ({boxes.length})
            </h3>
            {boxes.length > 0 && (
              <button
                type="button"
                onClick={handleCopyAll}
                className="btn btn-secondary"
                style={{
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  gap: '0.4rem',
                  backgroundColor: copiedAll ? 'var(--sticker-green-text)' : undefined,
                  color: copiedAll ? '#ffffff' : undefined,
                  borderColor: copiedAll ? 'var(--sticker-green-text)' : undefined
                }}
              >
                {copiedAll ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedAll ? 'Todas Copiadas!' : 'Copiar Todas'}</span>
              </button>
            )}
          </div>

          {boxes.length === 0 ? (
            <div
              className="notion-card"
              style={{
                padding: '3rem 1.5rem',
                textAlign: 'center',
                color: 'var(--text-tertiary)',
                fontSize: '0.875rem'
              }}
            >
              Insira ou cole um texto no campo ao lado para gerar as caixas de 41 caracteres.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {boxes.map((box) => (
                <SplitBoxCard key={box.index} item={box} maxChars={maxChars} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
