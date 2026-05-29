'use client';

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { navLinks, personalInfo } from '@/data/content';
import styles from './Navbar.module.css';

// ⚡ Bolt: Extract static array mapping outside component to prevent unnecessary recalculation on every render
const NAV_ITEMS = navLinks.map(link => ({
  ...link,
  id: link.href.replace('#', '')
}));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Intersection Observer for active section */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <a href="#" className={styles.logo}>
            S<span>.</span>
          </a>

          <div className={styles.links}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.link} ${
                  activeSection === item.id ? styles.active : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-primary ${styles.resumeBtn}`}
          >
            <Download size={14} />
            Resume
          </a>

          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={styles.mobileLink}
            onClick={handleNavClick}
          >
            {item.label}
          </a>
        ))}
        <a
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          onClick={handleNavClick}
        >
          <Download size={14} />
          Resume
        </a>
      </div>
    </>
  );
}
