'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
      <motion.div
        className="footer-container"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="footer-left">
          <span className="footer-logo">KIRAN BABU BANDELA</span>
          <span className="footer-tagline">AI/ML Engineer &middot; GenAI &bull; RAG &bull; Agentic AI &bull; MCP</span>
        </div>

        <div className="footer-socials">
          {SOCIAL_LINKS.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="footer-social-link"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
              >
                <Icon size={16} />
              </motion.a>
            );
          })}
        </div>

        <div className="footer-right">
          <p className="footer-copy">&copy; {currentYear} Kiran Babu Bandela.</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
