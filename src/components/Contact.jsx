'use client';

import React, { useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, FileText, Phone } from 'lucide-react';
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

          <div className={styles.globeCard} aria-hidden="true">
            <div className={styles.globeWrap}>
              <div className={styles.globeCore} />
              <div className={styles.globe}>
                {[0, 30, 60, 90, 120, 150].map((deg) => (
                  <span key={`ring-${deg}`} className={styles.globeRing} style={{ transform: `rotateY(${deg}deg)` }} />
                ))}
                {[-60, -30, 0, 30, 60].map((deg) => (
                  <span key={`lat-${deg}`} className={styles.globeLat} style={{ transform: `rotateX(${deg}deg)` }} />
                ))}
              </div>
              <span className={`${styles.globeDot} ${styles.globeDotA}`} />
              <span className={`${styles.globeDot} ${styles.globeDotB}`} />
              <span className={`${styles.globeDot} ${styles.globeDotC}`} />
            </div>
            <p className={styles.globeCaption}>Open to opportunities, anywhere.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
