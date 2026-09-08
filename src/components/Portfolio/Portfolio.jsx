'use client';

import { ArrowDownRight, ArrowUpRight, Check, ExternalLink, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { experience, personalInfo, projects, services, skills, techRadar } from '@/data/content';
import Contact from '@/components/Contact/Contact';
import styles from './Portfolio.module.css';

const nav = [
  ['01', 'Profile', '#profile'],
  ['02', 'Capabilities', '#capabilities'],
  ['03', 'Selected work', '#work'],
  ['04', 'Contact', '#contact'],
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [activeChapter, setActiveChapter] = useState('profile');
  const [hasStarted, setHasStarted] = useState(false);
  const animationFrame = useRef(null);
  const lastFrame = useRef(0);

  const chapters = {
    profile: 'profile',
    capabilities: 'capabilities',
    work: 'selected work',
    experience: 'experience',
    radar: 'learning',
    contact: 'contact',
  };

  useEffect(() => {
    const chapterIds = ['profile', 'capabilities', 'work', 'experience', 'radar', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveChapter(visible.target.id);
    }, { threshold: [0.2, 0.5, 0.8], rootMargin: '-15% 0px -35% 0px' });

    chapterIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    let introTimer = window.setTimeout(() => setHasStarted(true), 1800);
    const pauseForInteraction = (event) => {
      if (event.target.closest('[data-autoscroll-control]')) return;
      setIsAutoScrolling(false);
      setHasStarted(true);
    };

    window.addEventListener('wheel', pauseForInteraction, { passive: true });
    window.addEventListener('touchstart', pauseForInteraction, { passive: true });
    window.addEventListener('pointerdown', pauseForInteraction, { passive: true });
    window.addEventListener('keydown', pauseForInteraction);

    return () => {
      observer.disconnect();
      window.clearTimeout(introTimer);
      window.removeEventListener('wheel', pauseForInteraction);
      window.removeEventListener('touchstart', pauseForInteraction);
      window.removeEventListener('pointerdown', pauseForInteraction);
      window.removeEventListener('keydown', pauseForInteraction);
    };
  }, []);

  useEffect(() => {
    if (!isAutoScrolling || !hasStarted) {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      return undefined;
    }

    const tick = (timestamp) => {
      const elapsed = lastFrame.current ? timestamp - lastFrame.current : 16;
      lastFrame.current = timestamp;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 2) {
        setIsAutoScrolling(false);
        return;
      }
      window.scrollBy(0, Math.min(0.42 * (elapsed / 16), 1.2));
      animationFrame.current = requestAnimationFrame(tick);
    };

    animationFrame.current = requestAnimationFrame(tick);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      lastFrame.current = 0;
    };
  }, [isAutoScrolling, hasStarted]);

  useEffect(() => {
    let cleanup = () => {};
    import('animejs').then(({ animate, stagger }) => {
      const elements = document.querySelectorAll('[data-story-reveal]');
      animate(elements, {
        opacity: [0, 1],
        translateY: [24, 0],
        delay: stagger(70),
        duration: 900,
        ease: 'outExpo',
      });
      cleanup = () => elements.forEach((element) => {
        element.style.opacity = '';
        element.style.transform = '';
      });
    });
    return () => cleanup();
  }, []);

  const resumeStory = () => {
    setHasStarted(true);
    setIsAutoScrolling(true);
  };

  return (
    <div className={styles.site}>
      <div className={`${styles.storyStatus} ${isAutoScrolling ? styles.storyPlaying : ''}`}>
        <span className={styles.statusPulse} />
        {isAutoScrolling ? 'Story in motion' : 'Story paused'}
      </div>
      <header className={styles.header}>
        <a href="#profile" className={styles.mark}>SS<span>.</span></a>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {nav.map(([number, label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              <small>{number}</small>{label}
            </a>
          ))}
          <a className={styles.navCta} href="#contact">Let&apos;s talk <ArrowUpRight size={15} /></a>
        </nav>
        <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        <section className={styles.hero} id="profile" data-story-reveal>
          <div className={styles.heroMeta}><span>Portfolio / 2026</span><span>India · Global</span></div>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.kicker}>Software engineer × data analyst</p>
              <h1>Making complex<br /><em>systems useful.</em></h1>
              <p className={styles.heroLead}>{personalInfo.bio}</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#work">Explore the work <ArrowDownRight size={17} /></a>
                <a className={styles.textAction} href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">Resume <ExternalLink size={14} /></a>
              </div>
            </div>
            <aside className={styles.heroNote}>
              <span className={styles.noteNumber}>01</span>
              <p>I work where data, product, and cloud infrastructure meet.</p>
              <div className={styles.noteRule} />
              <span>Currently · {personalInfo.title}<br />{personalInfo.company}</span>
            </aside>
          </div>
          <a className={styles.scrollCue} href="#capabilities">Scroll to explore <ArrowDownRight size={15} /></a>
        </section>

        <section className={styles.manifesto} id="capabilities" data-story-reveal>
          <div className={styles.sectionRail}><span>02</span><span>Capabilities</span></div>
          <div className={styles.manifestoBody}>
            <p className={styles.eyebrow}>What I bring to the table</p>
            <h2>From first question<br />to <em>lasting system.</em></h2>
            <p className={styles.bodyCopy}>I combine product thinking with engineering discipline to turn ambiguous problems into clear, dependable outcomes.</p>
            <div className={styles.serviceGrid}>
              {services.map((service, index) => (
                <article className={styles.service} key={service.title}>
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>{service.deliverables.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.skillsBand}>
          <div className={styles.sectionRail}><span>Toolkit</span><span>Built for the real world</span></div>
          <div className={styles.skillColumns}>
            {skills.map((group) => (
              <div key={group.category}>
                <h3>{group.category}</h3>
                <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.work} id="work" data-story-reveal>
          <div className={styles.workHeader}>
            <div><p className={styles.eyebrow}>03 / Selected work</p><h2>Built to make<br /><em>an impact.</em></h2></div>
            <p>Enterprise platforms, automation, and data products designed for people who need to get important work done.</p>
          </div>
          <div className={styles.projectList}>
            {projects.map((project, index) => (
              <article className={styles.project} key={project.title}>
                <span className={styles.projectIndex}>0{index + 1}</span>
                <div className={styles.projectMain}><h3>{project.title}</h3><p>{project.description}</p><div>{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
                <ArrowUpRight className={styles.projectArrow} size={24} />
              </article>
            ))}
          </div>
        </section>

        <section className={styles.experience} id="experience" data-story-reveal>
          <div className={styles.sectionRail}><span>Experience</span><span>The long view</span></div>
          <div className={styles.experienceBody}>
            <div><p className={styles.eyebrow}>A track record of learning fast</p><h2>Depth earned<br /><em>over time.</em></h2></div>
            <div className={styles.timeline}>
              {experience.map((item) => <article key={item.role}><span>{item.duration}</span><div><h3>{item.role}</h3><strong>{item.company}</strong>{item.description.map((line) => <p key={line}>{line}</p>)}</div></article>)}
            </div>
          </div>
        </section>

        <section className={styles.radar} id="radar" data-story-reveal>
          <div><p className={styles.eyebrow}>A living practice</p><h2>Always learning.<br /><em>Never noisy.</em></h2></div>
          <div className={styles.radarGrid}>{techRadar.rings.map((ring) => <div key={ring.name}><span>{ring.name}</span><h3>{ring.label}</h3>{ring.items.map((item) => <p key={item}>{item}</p>)}</div>)}</div>
        </section>

        <Contact />
      </main>
      {!isAutoScrolling && (
        <button
          type="button"
          className={styles.continueButton}
          onClick={resumeStory}
          data-autoscroll-control
        >
          <span>Continue {chapters[activeChapter] || 'story'}</span>
          <ArrowDownRight size={17} />
        </button>
      )}
      <footer className={styles.footer}><span>© {new Date().getFullYear()} Snigdh Sharma</span><span>Designed with intent · Built with care</span><a href="#profile">Back to top ↑</a></footer>
    </div>
  );
}
