'use client';

import { useEffect, useCallback, useRef } from 'react';

export function useMouseGlow(containerRef) {
  const frameIdRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }

      frameIdRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        // Reading getBoundingClientRect is synchronous and can cause layout thrashing
        // Throttling it inside requestAnimationFrame helps performance
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        container.style.setProperty('--mouse-x', `${x}px`);
        container.style.setProperty('--mouse-y', `${y}px`);
        frameIdRef.current = null;
      });
    },
    [containerRef]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [containerRef, handleMouseMove]);
}
