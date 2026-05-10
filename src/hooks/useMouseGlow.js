'use client';

import { useEffect, useCallback } from 'react';

export function useMouseGlow(containerRef) {
  const handleMouseMove = useCallback(
    (e) => {
      const container = containerRef.current;
      if (!container) return;

      // Throttle mouse move event with requestAnimationFrame to prevent layout thrashing
      // when reading getBoundingClientRect() on every tick.
      window.requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        container.style.setProperty('--mouse-x', `${x}px`);
        container.style.setProperty('--mouse-y', `${y}px`);
      });
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
