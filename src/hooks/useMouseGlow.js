'use client';

import { useEffect, useRef } from 'react';

export function useMouseGlow(containerRef) {
  // ⚡ Bolt: Use a ref to track whether a requestAnimationFrame is already scheduled.
  // This throttles the mousemove event to execute at most once per frame,
  // preventing layout thrashing from multiple synchronous getBoundingClientRect calls.
  const ticking = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          container.style.setProperty('--mouse-x', `${x}px`);
          container.style.setProperty('--mouse-y', `${y}px`);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // ⚡ Bolt: Mark the listener as passive to avoid blocking the main thread.
    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef]);
}
