'use client';

import { useState, useRef } from 'react';
import { Mail, Send, Coffee, CheckCircle, AlertCircle } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import { personalInfo } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { GithubIcon, LinkedinIcon } from '@/components/Icons/BrandIcons';
import styles from './Contact.module.css';

/* ── Contact cards data ──────────────────────────────────────── */
const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@snigdhsharma.in',
    href: 'mailto:contact@snigdhsharma.in',
    isBrand: false,
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'snigdh-sharma',
    href: personalInfo.socials.linkedin,
    isBrand: true,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'Snigdh41',
    href: personalInfo.socials.github,
    isBrand: true,
  },
];

/* ── Intent options ──────────────────────────────────────────── */
const INTENT_OPTIONS = [
  { value: '', label: 'What brings you here?' },
  { value: 'Job Opportunity', label: '💼 Job Opportunity' },
  { value: 'Collaboration', label: '🤝 Collaboration' },
  { value: 'Just Vibes ☕', label: '☕ Just Vibes' },
];

/* ── API URL ─────────────────────────────────────────────────── */
const CONTACT_API_URL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL || 'https://api.snigdhsharma.in/contact';

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'; // test key fallback

/* ── Main Component ──────────────────────────────────────────── */
export default function Contact() {
  const headerRef = useScrollReveal({ duration: 800 });
  const formRef = useScrollReveal({ duration: 700, delay: 200 });

  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <div className={styles.header} ref={headerRef}>
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
        </div>

        <p className={styles.subtitle}>
          Have a project in mind, a role to discuss, or just want to talk tech?
          Grab a virtual coffee with me ☕
        </p>

        <div className={styles.grid}>
          {contactItems.map((item, i) => (
            <ContactCard key={item.label} item={item} index={i} />
          ))}
        </div>

        <div className={styles.formSection} ref={formRef}>
          <div className={styles.formHeader}>
            <Coffee size={20} className={styles.formHeaderIcon} />
            <h3 className={styles.formTitle}>Book a Coffee Chat</h3>
          </div>
          <CoffeeChatForm />
        </div>
      </div>
    </section>
  );
}

/* ── Contact Card ────────────────────────────────────────────── */
function ContactCard({ item, index }) {
  const ref = useScrollReveal({ duration: 700, delay: index * 100 });
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      target={item.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className={`glass glass-hover ${styles.contactCard}`}
      ref={ref}
    >
      <div className={styles.contactIcon}>
        {item.isBrand ? <Icon size={24} /> : <Icon size={24} />}
      </div>
      <span className={styles.contactLabel}>{item.label}</span>
      <span className={styles.contactValue}>{item.value}</span>
    </a>
  );
}

/* ── Coffee Chat Form ────────────────────────────────────────── */
function CoffeeChatForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    intent: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.intent || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (!turnstileToken) {
      setErrorMsg('Please complete the verification.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', intent: '', message: '' });
        setTurnstileToken(null);
        turnstileRef.current?.reset();

        // Reset to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        const msg = data.details?.length
          ? data.details.join(' ')
          : data.error || 'Something went wrong. Please try again.';
        setErrorMsg(msg);
        turnstileRef.current?.reset();
        setTurnstileToken(null);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  return (
    <form className={`glass ${styles.form}`} onSubmit={handleSubmit} id="coffee-chat-form">
      {/* Success overlay */}
      {status === 'success' && (
        <div className={styles.successOverlay}>
          <CheckCircle size={48} className={styles.successIcon} />
          <p className={styles.successText}>Message sent! ☕</p>
          <p className={styles.successSubtext}>
            Check your inbox — I&apos;ve sent you a confirmation.
          </p>
        </div>
      )}

      {/* Form fields */}
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="contact-name" className={styles.label}>
            Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={styles.input}
            required
            disabled={status === 'loading'}
            autoComplete="name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contact-email" className={styles.label}>
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={styles.input}
            required
            disabled={status === 'loading'}
            autoComplete="email"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contact-intent" className={styles.label}>
          What brings you here? <span className={styles.required}>*</span>
        </label>
        <select
          id="contact-intent"
          name="intent"
          value={formData.intent}
          onChange={handleChange}
          className={`${styles.input} ${styles.select} ${!formData.intent ? styles.selectPlaceholder : ''}`}
          required
          disabled={status === 'loading'}
        >
          {INTENT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="contact-message" className={styles.label}>
          Message <span className={styles.required}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me what's on your mind..."
          className={`${styles.input} ${styles.textarea}`}
          rows={5}
          required
          disabled={status === 'loading'}
          maxLength={2000}
        />
        <span className={styles.charCount}>
          {formData.message.length}/2000
        </span>
      </div>

      {/* Turnstile */}
      <div className={styles.turnstileWrapper}>
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={(token) => setTurnstileToken(token)}
          onError={() => setTurnstileToken(null)}
          onExpire={() => setTurnstileToken(null)}
          options={{
            theme: 'dark',
            size: 'flexible',
          }}
        />
      </div>

      {/* Error message */}
      {errorMsg && (
        <div className={styles.errorBanner}>
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className={`btn-primary ${styles.submitBtn}`}
        disabled={status === 'loading' || status === 'success'}
        id="coffee-chat-submit"
      >
        {status === 'loading' ? (
          <>
            <span className={styles.spinner} />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Coffee Chat Request
          </>
        )}
      </button>
    </form>
  );
}
