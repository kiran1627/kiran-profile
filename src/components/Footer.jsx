'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow-line" />
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-logo">KIRAN BABU BANDELA</span>
          <span className="footer-tagline">AI Engineer | Building the future with intelligence</span>
        </div>
        <div className="footer-right">
          <p className="footer-copy">
            © {currentYear} Kiran Babu Bandela. Built with{' '}
            <Heart size={12} className="footer-heart" />{' '}
            and AI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
