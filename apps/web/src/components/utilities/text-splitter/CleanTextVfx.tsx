import React, { useEffect, useState, useCallback } from 'react';
import './cleanTextVfx.css';

interface ParticleDef {
  dx: number;
  dy: number;
  size: number;
  delay: number;
  type: 'star' | 'dot';
  color: string;
}

const PARTICLES: ParticleDef[] = [
  { dx: 0, dy: -36, size: 8, delay: 0, type: 'star', color: '#10b981' },
  { dx: 24, dy: -26, size: 6, delay: 15, type: 'dot', color: '#2a9d99' },
  { dx: 36, dy: -4, size: 9, delay: 30, type: 'star', color: '#f59e0b' },
  { dx: 28, dy: 22, size: 5, delay: 10, type: 'dot', color: '#38bdf8' },
  { dx: 0, dy: 32, size: 8, delay: 25, type: 'star', color: '#2a9d99' },
  { dx: -26, dy: 24, size: 5, delay: 20, type: 'dot', color: '#10b981' },
  { dx: -36, dy: -4, size: 9, delay: 40, type: 'star', color: '#fbbf24' },
  { dx: -24, dy: -26, size: 6, delay: 30, type: 'dot', color: '#38bdf8' },
  { dx: 14, dy: -40, size: 5, delay: 35, type: 'star', color: '#ffffff' },
  { dx: 38, dy: 10, size: 5, delay: 20, type: 'dot', color: '#2a9d99' },
  { dx: -16, dy: 36, size: 6, delay: 30, type: 'star', color: '#10b981' },
  { dx: -38, dy: -18, size: 5, delay: 15, type: 'dot', color: '#f59e0b' }
];

export function useCleanTextVfx(duration = 800) {
  const [vfxKey, setVfxKey] = useState(0);
  const [vfxActive, setVfxActive] = useState(false);

  useEffect(() => {
    if (!vfxActive) return;
    const timer = setTimeout(() => {
      setVfxActive(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [vfxActive, vfxKey, duration]);

  const triggerCleanVfx = useCallback(() => {
    setVfxKey((k) => k + 1);
    setVfxActive(true);
  }, []);

  return { vfxActive, vfxKey, triggerCleanVfx };
}

interface CleanSparkleBurstProps {
  active: boolean;
  triggerKey: number;
}

export const CleanSparkleBurst: React.FC<CleanSparkleBurstProps> = ({ active, triggerKey }) => {
  if (!active) return null;

  return (
    <div
      key={triggerKey}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 30
      }}
    >
      {/* Expanding Ripple Ring */}
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '36px',
          height: '36px',
          marginLeft: '-18px',
          marginTop: '-18px',
          borderRadius: '50%',
          border: '2px solid rgba(42, 157, 153, 0.9)',
          animation: 'cleanVfxRipple 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
        }}
      />

      {/* Floating Micro-Badge */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '-6px',
          transform: 'translate(-50%, -100%)',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          fontSize: '0.6875rem',
          fontWeight: 700,
          padding: '0.15rem 0.5rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--bg-surface)',
          color: '#10b981',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
          animation: 'cleanVfxBadge 0.75s ease-out forwards',
          display: 'flex',
          alignItems: 'center',
          gap: '0.2rem'
        }}
      >
        <span>✨ Limpo!</span>
      </div>

      {/* Bursting Star & Dot Particles */}
      {PARTICLES.map((p, idx) => (
        <span
          key={idx}
          className="clean-vfx-particle-item"
          style={
            {
              '--px': `${p.dx}px`,
              '--py': `${p.dy}px`,
              marginLeft: `-${p.size / 2}px`,
              marginTop: `-${p.size / 2}px`,
              animationDelay: `${p.delay}ms`
            } as React.CSSProperties
          }
        >
          {p.type === 'star' ? (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color} stroke="none">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
            </svg>
          ) : (
            <span
              style={{
                display: 'block',
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                backgroundColor: p.color,
                boxShadow: `0 0 6px ${p.color}`
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
};

interface TextareaCleanOverlayProps {
  active: boolean;
  triggerKey: number;
}

export const TextareaCleanOverlay: React.FC<TextareaCleanOverlayProps> = ({ active, triggerKey }) => {
  if (!active) return null;

  return (
    <div key={triggerKey} className="clean-vfx-sweep-overlay">
      <div className="clean-vfx-sweep-beam" />
    </div>
  );
};
