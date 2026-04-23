'use client';

import { GraduationCap, Calendar } from 'lucide-react';
import { education } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Education.module.css';

export default function Education() {
  const headerRef = useScrollReveal({ duration: 800 });
  const cardRef = useScrollReveal({ duration: 700, delay: 150 });

  return (
    <section className={`section ${styles.education}`} id="education">
      <div className="container">
        <div className={styles.header} ref={headerRef}>
          <span className="section-label">Education</span>
          <h2 className="section-title">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </div>

        <div className={`glass ${styles.card}`} ref={cardRef}>
          <div className={styles.icon}>
            <GraduationCap size={28} />
          </div>
          <div>
            <h3 className={styles.degree}>{education.degree}</h3>
            <p className={styles.specialization}>{education.specialization}</p>
            <span className={styles.duration}>
              <Calendar size={14} />
              {education.duration}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
