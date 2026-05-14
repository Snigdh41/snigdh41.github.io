'use client';

import { useEffect, useRef } from 'react';

// ⚡ Bolt: Global observers cache to batch IntersectionObserver instances by threshold
const observers = new Map();
const callbacks = new WeakMap();

function getObserver(threshold) {
  if (!observers.has(threshold)) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cbList = callbacks.get(entry.target);
          if (cbList) {
            cbList.forEach((cb) => cb(entry, observer));
          }
        });
      },
      { threshold }
    );
    observers.set(threshold, observer);
  }
  return observers.get(threshold);
}

// Exported for testing purposes
export function clearObservers() {
  observers.forEach((observer) => observer.disconnect());
  observers.clear();
}

function addCallback(el, cb) {
  const cbList = callbacks.get(el) || [];
  cbList.push(cb);
  callbacks.set(el, cbList);
}

function removeCallback(el, cbToRemove) {
  const cbList = callbacks.get(el);
  if (cbList) {
    const nextList = cbList.filter((cb) => cb !== cbToRemove);
    if (nextList.length === 0) {
      callbacks.delete(el);
    } else {
      callbacks.set(el, nextList);
    }
  }
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

    const callback = (entry, obs) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        if (once) {
          removeCallback(el, callback);
          obs.unobserve(el);
        }
      }
    };
    addCallback(el, callback);

    observer.observe(el);
    return () => {
      removeCallback(el, callback);
      observer.unobserve(el);
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

    const callback = (entry, obs) => {
      if (entry.isIntersecting) {
        elements.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
        removeCallback(container, callback);
        obs.unobserve(container);
      }
    };
    addCallback(container, callback);

    observer.observe(container);

    return () => {
      removeCallback(container, callback);
      observer.unobserve(container);
    };
  }, [count, threshold, duration, baseDelay, staggerDelay, distance]);

  return (index) => (el) => {
    refs.current[index] = el;
  };
}
