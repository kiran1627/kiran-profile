'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';
import './About.css';

const TECH_RIBBON = [
  'Python',
  'RAG',
  'LangChain',
  'LangGraph',
  'Qdrant',
  'FastAPI',
  'Next.js',
  'Docker',
  'WebSockets',
  'AWS'
];

const PROFESSIONAL_BADGES = [
  { label: 'PRIMARY STACK', value: 'Python • FastAPI' },
  { label: 'FOCUS AREA', value: 'RAG & Multi-Agent Systems' },
];

const METRICS = [
  { number: '5', label: 'Govt. Departments Served', delay: 0 },
  { number: '2', label: 'Retrieval Stages (BM25+Vector)', delay: 0.1 },
  { number: '8B', label: 'Param Model Self-Hosted', delay: 0.2 },
];

const About = () => {
  const completeStory = `I own the AI microservice behind SurakshaGrid, a public-safety platform running live across 5 Telangana government departments. It runs a hybrid retrieval pipeline — BM25 keyword search fused with Qdrant vector search via reciprocal rank fusion, then reranked with a BGE cross-encoder — serving a self-hosted Qwen3-8B model for grounded, low-hallucination responses.

Alongside the retrieval layer, I built SETU GRID, a real-time WebSocket coordination layer that keeps department dashboards in sync as incidents update, without polling.

Currently targeting an entry-level AI/ML or GenAI/RAG Engineer role, with a long-term trajectory toward AI Architect — designing the retrieval, orchestration, and serving layers that production LLM systems run on, not just prototyping against an API.`;

  return (
    <section id="about" className="about-premium-section">
      <div className="about-grid-overlay" />
      <div className="about-glow-orb-primary" />
      <div className="about-glow-orb-secondary" />

      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-cinematic">
          <span className="section-eyebrow">
            <Sparkles size={12} className="pulse-icon" /> PROFESSIONAL PROFILE
          </span>
          <h2 className="heading-primary-cinematic">
            <span className="text-gradient">ABOUT</span>
          </h2>
          <p className="section-subtitle-cinematic">
            GenAI/RAG Engineer
          </p>
        </div>

        {/* Main Content Container */}
        <div className="about-main-container">
          {/* Profile Section */}
          <motion.div
            className="profile-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Profile Image with Glass Frame */}
            <div className="profile-image-wrapper">
              <div className="glass-profile-frame">
                <img
                  src="/profile-fixed.png"
                  alt="Portrait of Kiran Babu Bandela"
                  className="profile-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500';
                  }}
                />
                <div className="frame-border-accent" />
                <div className="frame-glow-ring" />
              </div>

              {/* Professional Badges Below Image */}
              <div className="professional-badges">
                {PROFESSIONAL_BADGES.map((badge, index) => (
                  <motion.div
                    key={badge.label}
                    className="badge-item"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <span className="badge-label">{badge.label}</span>
                    <span className="badge-value">{badge.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Story Block */}
            <div className="story-block">
              <motion.p
                className="story-text"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {completeStory}
              </motion.p>
            </div>
          </motion.div>

          {/* Animated Metrics */}
          <motion.div
            className="metrics-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="metrics-container">
              {METRICS.map((metric) => (
                <motion.div
                  key={metric.label}
                  className="metric-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.4 + metric.delay }}
                >
                  <div className="metric-icon">
                    <TrendingUp size={18} />
                  </div>
                  <div className="metric-number">{metric.number}</div>
                  <div className="metric-label">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technology Ribbon */}
          <motion.div
            className="tech-ribbon-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ribbon-header">
              <Sparkles size={16} className="ribbon-icon" />
              <span>CORE TECHNOLOGIES</span>
            </div>
            <div className="tech-ribbon-track">
              <div className="tech-ribbon-items">
                {TECH_RIBBON.map((tech) => (
                  <motion.span
                    key={tech}
                    className="tech-pill"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
