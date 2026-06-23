'use client';

import { Cloud, LineChart, AppWindow, Workflow, Code2, Check } from 'lucide-react';
import { services } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Services.module.css';

const iconMap = {
  Cloud,
  LineChart,
  AppWindow,
  Workflow,
};

export default function Services() {
  const headerRef = useScrollReveal({ duration: 800 });

  return (
    <section className={`section ${styles.services}`} id="services">
      <div className="container">
        <div className={styles.header} ref={headerRef}>
          <span className="section-label">What I Do</span>
          <h2 className="section-title">
            Turning Technology Into <span className="gradient-text">Business Value</span>
          </h2>
          <p className={styles.subtitle}>
            I help teams bridge the gap between engineering and outcomes — building the
            platforms, products, and analytics that move the numbers that matter.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const ref = useScrollReveal({ duration: 700, delay: index * 120 });
  const Icon = iconMap[service.icon] || Code2;

  return (
    <div className={`glass glass-hover ${styles.card}`} ref={ref}>
      <div className={styles.iconWrap}>
        <Icon size={22} />
      </div>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.desc}>{service.description}</p>
      <ul className={styles.deliverables}>
        {service.deliverables.map((item) => (
          <li key={item}>
            <Check size={14} className={styles.check} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
