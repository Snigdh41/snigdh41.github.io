'use client';

import { useEffect, useRef } from 'react';

// ⚡ Bolt: Global cache for IntersectionObservers to prevent redundant instances
const observers = new Map();
const observerCallbacks = new WeakMap();

// Test helper to clear cache between test runs
export const _clearCache = () => {
  observers.forEach(observer => observer.disconnect());
  observers.clear();
};

function getObserver(threshold) {
  if (!observers.has(threshold)) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = observerCallbacks.get(entry.target);
          if (callback) {
            callback(entry, observer);
          }
        });
      },
      { threshold }
    );
    observers.set(threshold, observer);
  }
  return observers.get(threshold);
}

export function useScrollReveal({
  threshold = 0.15,
  duration = 800,
  delay = 0,
  distance = 30,
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = `translateY(${distance}px)`;
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;

    const observer = getObserver(threshold);

    observerCallbacks.set(el, (entry) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        if (once) observer.unobserve(el);
      }
    });

    observer.observe(el);
    return () => {
      observer.unobserve(el);
      observerCallbacks.delete(el);
    };
  }, [threshold, duration, delay, distance, once]);

  return ref;
}

export function useStaggerReveal(count, {
  threshold = 0.1,
  duration = 700,
  baseDelay = 0,
  staggerDelay = 100,
  distance = 40,
} = {}) {
  const refs = useRef([]);

  useEffect(() => {
    const elements = refs.current.filter(Boolean);
    if (elements.length === 0) return;

    elements.forEach((el, i) => {
      const delay = baseDelay + i * staggerDelay;
      el.style.opacity = '0';
      el.style.transform = `translateY(${distance}px)`;
      el.style.transition = `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;
    });

    const container = elements[0]?.parentElement;
    if (!container) return;

    const observer = getObserver(threshold);

    observerCallbacks.set(container, (entry) => {
      if (entry.isIntersecting) {
        elements.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
        observer.unobserve(container);
      }
    });

    observer.observe(container);
    return () => {
      observer.unobserve(container);
      observerCallbacks.delete(container);
    };
  }, [count, threshold, duration, baseDelay, staggerDelay, distance]);

  return (index) => (el) => {
    refs.current[index] = el;
  };
}
