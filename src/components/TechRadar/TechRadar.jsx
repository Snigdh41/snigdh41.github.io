'use client';

import { Radar } from 'lucide-react';
import { techRadar } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './TechRadar.module.css';

export default function TechRadar() {
  const headerRef = useScrollReveal({ duration: 800 });

  return (
    <section className={`section ${styles.radar}`} id="now">
      <div className="container">
        <div className={styles.header} ref={headerRef}>
          <span className="section-label">Now</span>
          <h2 className="section-title">
            My Tech <span className="gradient-text">Radar</span>
          </h2>
          <p className={styles.subtitle}>{techRadar.intro}</p>
        </div>

        <div className={styles.grid}>
          {techRadar.rings.map((ring, i) => (
            <RingCard key={ring.name} ring={ring} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RingCard({ ring, index }) {
  const ref = useScrollReveal({ duration: 700, delay: index * 110 });

  return (
    <div className={`glass glass-hover ${styles.card}`} ref={ref}>
      <div className={styles.cardHead}>
        <Radar size={18} className={styles.ringIcon} />
        <div>
          <h3 className={styles.ringName}>{ring.name}</h3>
          <span className={styles.ringLabel}>{ring.label}</span>
        </div>
      </div>
      <div className={styles.items}>
        {ring.items.map((item) => (
          <span key={item} className="tech-tag">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
