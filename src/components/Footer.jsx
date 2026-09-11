'use client';

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const SOCIAL_LINKS = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/kiran1627' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/kiranbabu18' },
  { name: 'Email', icon: Mail, url: 'mailto:kiranbabubandela6@gmail.com' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow-line" />
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-logo">KIRAN BABU BANDELA</span>
          <span className="footer-tagline">AI/ML Engineer &middot; GenAI &bull; RAG &bull; Agentic AI &bull; MCP</span>
        </div>

        <div className="footer-socials">
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="footer-social-link"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>

        <div className="footer-right">
          <p className="footer-copy">&copy; {currentYear} Kiran Babu Bandela.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
