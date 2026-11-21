import { useState, useEffect, useRef, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useDraggable(defaultWidth = 430, defaultHeight = 480) {
  const [position, setPosition] = useState<Position>(() => {
    if (typeof window === 'undefined') return { x: 40, y: 80 };
    const initialX = Math.max(16, window.innerWidth - defaultWidth - 32);
    const initialY = 75;
    return { x: initialX, y: initialY };
  });

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number } | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  const clampPosition = useCallback((x: number, y: number): Position => {
    if (typeof window === 'undefined') return { x, y };
    const rect = terminalRef.current?.getBoundingClientRect();
    const currentWidth = rect ? rect.width : defaultWidth;
    const currentHeight = rect ? rect.height : defaultHeight;

    const maxX = Math.max(0, window.innerWidth - currentWidth - 16);
    const maxY = Math.max(0, window.innerHeight - currentHeight - 16);

    return {
      x: Math.min(Math.max(16, x), maxX),
      y: Math.min(Math.max(60, y), maxY)
    };
  }, [defaultWidth, defaultHeight]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only drag with left mouse button or touch
    if (e.button !== 0) return;
    e.preventDefault();

    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: position.x,
      startY: position.y
    };
  }, [position]);

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragStartRef.current) return;
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;

      const nextX = dragStartRef.current.startX + deltaX;
      const nextY = dragStartRef.current.startY + deltaY;

      setPosition(clampPosition(nextX, nextY));
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, clampPosition]);

  // Keep inside screen when viewport resizes
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => clampPosition(prev.x, prev.y));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clampPosition]);

  return {
    position,
    handlePointerDown,
    isDragging,
    terminalRef
  };
}
