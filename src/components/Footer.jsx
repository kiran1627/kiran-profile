'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/kiran1627' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/kiranbabu18' },
  { name: 'Email', icon: Mail, url: 'mailto:kiranbabubandela6@gmail.com' },
];

const Footer = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={ref} className={`${styles.footer}${visible ? ` ${styles.visible}` : ''}`} aria-label="Closing">
      <p className={styles.name}>Kiran Babu Bandela</p>
      <nav className={styles.socials} aria-label="Social">
        {SOCIAL_LINKS.map(({ name, icon: Icon, url }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={name}
          >
            <Icon size={16} />
          </a>
        ))}
      </nav>
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} Kiran Babu Bandela &mdash; All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
