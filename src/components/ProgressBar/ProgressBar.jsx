'use client';

import { useEffect, useRef } from 'react';
import styles from './ProgressBar.module.css';

export default function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const el = barRef.current;
      if (!el) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      el.style.transform = `scaleX(${progress})`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress(); // initial

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className={styles.bar} ref={barRef} aria-hidden="true" />;
}
