'use client';

import { Calendar } from 'lucide-react';
import { experience } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Experience.module.css';

export default function Experience() {
  const headerRef = useScrollReveal({ duration: 800 });

  return (
    <section className={`section ${styles.experience}`} id="experience">
      <div className="container">
        <div className={styles.header} ref={headerRef}>
          <span className="section-label">Experience</span>
          <h2 className="section-title">
            Where I&apos;ve <span className="gradient-text">Worked</span>
          </h2>
        </div>

        <div className={styles.timeline}>
          {experience.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
  const ref = useScrollReveal({ duration: 700, delay: index * 150, distance: 40 });

  return (
    <div className={styles.item} ref={ref}>
      <div className={styles.dot} />
      <div className={`glass glass-hover ${styles.card}`}>
        <div className={styles.cardHeader}>
          <div>
            <h3 className={styles.role}>{item.role}</h3>
            <p className={styles.company}>{item.company}</p>
          </div>
          <span className={styles.duration}>
            <Calendar size={12} />
            {item.duration} · {item.durationLabel}
          </span>
        </div>
        <div className={styles.bullets}>
          {item.description.map((bullet, j) => (
            <div key={j} className={styles.bullet}>
              <span className={styles.bulletDot} />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
