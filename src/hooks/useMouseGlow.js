'use client';

import { useEffect } from 'react';

export function useMouseGlow(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (!ticking) {
        // ⚡ Bolt: Throttling mousemove events with requestAnimationFrame.
        // Mousemove events can fire very frequently (e.g., 1000 times per second for some hardware).
        // By using requestAnimationFrame, we ensure that DOM reads (getBoundingClientRect)
        // and DOM writes (setProperty) are synchronized with the browser's refresh rate
        // (typically 60-120fps), drastically reducing main thread work and preventing layout thrashing.
        animationFrameId = window.requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          container.style.setProperty('--mouse-x', `${x}px`);
          container.style.setProperty('--mouse-y', `${y}px`);
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [containerRef]);
}
