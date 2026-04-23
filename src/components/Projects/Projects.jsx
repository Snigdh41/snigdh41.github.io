'use client';

import { projects } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Projects.module.css';

export default function Projects() {
  const headerRef = useScrollReveal({ duration: 800 });

  return (
    <section className={`section ${styles.projects}`} id="projects">
      <div className="container">
        <div className={styles.header} ref={headerRef}>
          <span className="section-label">Projects</span>
          <h2 className="section-title">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const ref = useScrollReveal({ duration: 700, delay: index * 150 });
  const number = String(index + 1).padStart(2, '0');

  return (
    <div className={`glass glass-hover ${styles.card}`} ref={ref}>
      <span className={styles.projectNumber}>{number}</span>
      <h3 className={styles.projectTitle}>{project.title}</h3>
      <p className={styles.projectDesc}>{project.description}</p>
      <div className={styles.techStack}>
        {project.tech.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
