'use client';

import { useEffect, useCallback, useRef } from 'react';

export function useMouseGlow(containerRef) {
  const isTicking = useRef(false);

  const handleMouseMove = useCallback(
    (e) => {
      const container = containerRef.current;
      if (!container) return;

      if (!isTicking.current) {
        window.requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          container.style.setProperty('--mouse-x', `${x}px`);
          container.style.setProperty('--mouse-y', `${y}px`);
          isTicking.current = false;
        });
        isTicking.current = true;
      }
    },
    [containerRef]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef, handleMouseMove]);
}
