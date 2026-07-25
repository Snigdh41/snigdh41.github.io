'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useCountUp — animates a number from 0 to `target` when the element is
 * scrolled into view. Returns [ref, displayValue].
 *
 * Uses requestAnimationFrame with an ease-out curve for a natural deceleration.
 */
export function useCountUp(target, {
  duration = 1800,
  threshold = 0.3,
  once = true,
} = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  const animateTo = useCallback((end) => {
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }, [duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            hasAnimated.current = true;
            animateTo(target);
            if (once) observer.unobserve(el);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [target, threshold, once, animateTo]);

  return [ref, value];
}
