'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import EmberCanvas from './EmberCanvas';
import './Footer.css';

const SOCIAL_LINKS = [
  { name: 'GitHub',   icon: Github,   url: 'https://github.com/kiran1627' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/kiranbabu18' },
  { name: 'Email',    icon: Mail,     url: 'mailto:kiranbabubandela6@gmail.com' },
];

const Footer = () => {
  const ref   = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <footer className={`cine-fin${v ? ' is-caps is-bar' : ''}`} id="contact" ref={ref} aria-label="Closing">
      <div className="fin__inner">
        {/* Deep background gradient */}
        <div className="fin__bg" aria-hidden="true" />
        <EmberCanvas color="200,40,30" density={34} className="fin__embers" />

        {/* Editorial corner captions */}
        <p className="f-cap f-cap--tl" aria-hidden="true">
          Ideas<br />Designs<br />Experiences<br />Real Impact
        </p>

        <blockquote className="f-cap f-cap--quote">
          &ldquo;Good<br />Code<br />Speaks<br />Louder.&rdquo;
        </blockquote>

        <p className="f-cap f-cap--blw" aria-hidden="true">
          A<br />Builder&rsquo;s<br />World
        </p>

        <p className="f-cap f-cap--tr" aria-hidden="true">
          Same<br />Passion<br />A Brighter<br />Tomorrow
        </p>

        <p className="f-cap f-cap--br" aria-hidden="true">
          Design<br />Build<br />Explore<br />Repeat
        </p>

        {/* Name wordmark — large, red, grunge */}
        <div className="fin__wordmark" aria-hidden="true">
          <span>KIRAN</span>
        </div>

        {/* Portrait — overlaps the wordmark, duotone-treated to match the fire palette */}
        <img
          src="/footer-portrait.webp"
          alt=""
          aria-hidden="true"
          className="fin__portrait"
        />

        {/* Functional bottom bar */}
        <div className="fin__bar">
          <a href="mailto:kiranbabubandela6@gmail.com">Contact</a>
          <nav className="fin__soc" aria-label="Social">
            {SOCIAL_LINKS.map(({ name, icon: Icon, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                <Icon size={14} />
                <span>{name}</span>
              </a>
            ))}
          </nav>
          <small className="fin__c">
            &copy; {new Date().getFullYear()} Kiran Babu Bandela &mdash; All rights reserved
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
