'use client';

import { Cloud, Code2, Database, BarChart3 } from 'lucide-react';
import { skills } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Skills.module.css';

const categoryIcons = {
  'Cloud & DevOps': Cloud,
  'Full-Stack Development': Code2,
  'Data Engineering': BarChart3,
  'Database & Tools': Database,
};

export default function Skills() {
  const headerRef = useScrollReveal({ duration: 800 });

  return (
    <section className={`section ${styles.skills}`} id="skills">
      <div className="container">
        <div className={styles.header} ref={headerRef}>
          <span className="section-label">Skills</span>
          <h2 className="section-title">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {skills.map((group, i) => {
            const Icon = categoryIcons[group.category] || Code2;
            return <SkillCard key={group.category} group={group} Icon={Icon} index={i} />;
          })}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ group, Icon, index }) {
  const ref = useScrollReveal({ duration: 700, delay: index * 120 });

  return (
    <div className={`glass glass-hover ${styles.card}`} ref={ref}>
      <div className={styles.categoryIcon}>
        <Icon size={22} />
      </div>
      <h3 className={styles.categoryName}>{group.category}</h3>
      <div className={styles.skillsList}>
        {group.items.map((skill) => (
          <span key={skill} className={styles.skillPill}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
