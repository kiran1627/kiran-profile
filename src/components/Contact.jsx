'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, FileText, Phone, Send, User, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CinematicLayer from './CinematicLayer';
import styles from './Contact.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CONTACT_LINKS = [
  { name: 'Email', value: 'kiranbabubandela6@gmail.com', icon: Mail, url: 'mailto:kiranbabubandela6@gmail.com', color: '#00E5FF' },
  { name: 'LinkedIn', value: 'linkedin.com/in/kiranbabu18', icon: Linkedin, url: 'https://linkedin.com/in/kiranbabu18', color: '#8B5CF6' },
  { name: 'GitHub', value: 'github.com/kiran1627', icon: Github, url: 'https://github.com/kiran1627', color: '#3B82F6' },
  { name: 'WhatsApp', value: '+91 93813 42247', icon: Phone, url: 'https://wa.me/919381342247', color: '#25D366' },
  { name: 'Resume', value: 'Download PDF', icon: FileText, url: '/Kiran_Resume.pdf', color: '#00E5FF' },
];

const HEADLINE_WORDS = ["Let's", 'Build', 'Something'];

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = headlineRef.current;
    if (!root || reduceMotion) return;
    const words = root.querySelectorAll('[data-word]');
    gsap.set(words, { opacity: 0, y: 20 });
    gsap.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: root, start: 'top 85%', once: true },
    });
  }, []);

  // Same submit logic/endpoint as before — restyled only.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setFormState({ name: '', email: '', message: '' });
      setStatus({ type: 'success', text: "Message sent! I'll get back to you soon." });
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

  return (
    <section id="contact" className={styles.contact}>
      <CinematicLayer intensity={0.35} color="#4fb4ff" />

      <div className={styles.container}>
        <div className={styles.headline}>
          <span className={styles.eyebrow}>Get In Touch</span>
          <h2 className={styles.heading} ref={headlineRef}>
            {HEADLINE_WORDS.map((w) => (
              <span key={w} className={styles.word} data-word>{w}&nbsp;</span>
            ))}
          </h2>
          <p className={styles.subtitle}>Reach out for opportunities, collaborations, or just to say hello.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.linksColumn}>
            {CONTACT_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkCard}
                  style={{ '--link-color': link.color }}
                >
                  <span className={styles.linkIcon}><Icon size={18} /></span>
                  <span>
                    <span className={styles.linkLabel}>{link.name}</span>
                    <span className={styles.linkValue}>{link.value}</span>
                  </span>
                </a>
              );
            })}
          </div>

          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Send a Message</h3>
            <p className={styles.formSub}>Fill out the form below and I&apos;ll get back to you as soon as possible.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="contact-name" className={styles.srOnly}>Your Name</label>
                <User size={16} className={styles.inputIcon} aria-hidden="true" />
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  autoComplete="name"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-email" className={styles.srOnly}>Your Email</label>
                <Mail size={16} className={styles.inputIcon} aria-hidden="true" />
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  autoComplete="email"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-message" className={styles.srOnly}>Your Message</label>
                <MessageSquare size={16} className={`${styles.inputIcon} ${styles.textareaIcon}`} aria-hidden="true" />
                <textarea
                  id="contact-message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  className={`${styles.input} ${styles.textarea}`}
                  rows="5"
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send size={16} />
              </button>

              {status && (
                <p role="status" className={`${styles.status} ${status.type === 'success' ? styles.statusSuccess : styles.statusError}`}>
                  {status.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
