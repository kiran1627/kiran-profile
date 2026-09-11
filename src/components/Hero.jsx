'use client';

import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import './Hero.css';

const PIPELINE_NODES = ['USER', 'AI AGENT', 'RAG', 'VECTOR DB', 'TOOLS / MCP', 'API', 'RESPONSE'];

const SOCIAL_LINKS = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/kiran1627' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/kiranbabu18' },
  { name: 'Email', icon: Mail, url: 'mailto:kiranbabubandela6@gmail.com' },
];

const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const PipelineVisual = () => (
  <div className="hero-pipeline" aria-hidden="true">
    {PIPELINE_NODES.map((node, i) => (
      <React.Fragment key={node}>
        <div className="hero-pipeline-node" style={{ animationDelay: `${i * 0.12}s` }}>
          <span className="hero-pipeline-dot" />
          <span className="hero-pipeline-label">{node}</span>
        </div>
        {i < PIPELINE_NODES.length - 1 && (
          <div className="hero-pipeline-line" style={{ animationDelay: `${i * 0.12 + 0.06}s` }} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <video
        className="hero-bg-video"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero-bg-overlay" />
      <div className="hero-bg-grid" />

      <div className="section-container hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">AI/ML ENGINEER</p>

          <h1 className="hero-name">KIRAN BABU BANDELA</h1>

          <p className="hero-tags">GenAI &middot; RAG &middot; Agentic AI &middot; MCP</p>

          <p className="hero-description">
            I build intelligent software systems using modern AI, backend engineering,
            retrieval systems, and tool-integrated workflows.
          </p>

          <div className="hero-ctas">
            <button onClick={() => scrollToId('projects')} className="hero-btn-primary">
              View Projects <ArrowRight size={16} className="hero-btn-arrow" />
            </button>
            <a href="/Kiran_Resume.pdf" className="hero-btn-secondary" target="_blank" rel="noopener noreferrer">
              <Download size={15} /> Download Resume
            </a>
          </div>

          <div className="hero-socials">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="hero-social-link"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="hero-visual">
          <PipelineVisual />
        </div>
      </div>

      <button
        className="hero-scroll-indicator"
        onClick={() => scrollToId('about')}
        aria-label="Scroll to explore"
        type="button"
      >
        <span className="hero-scroll-line" />
        <span>SCROLL</span>
      </button>
    </section>
  );
};

export default Hero;
