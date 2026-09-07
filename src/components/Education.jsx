'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BadgeCheck } from 'lucide-react';
import './Education.css';

const EDUCATION = {
  degree: 'B.Tech, Artificial Intelligence & Machine Learning',
  school: 'JNTUH, Hyderabad',
  period: 'May 2026',
};

const CERTIFICATIONS = [
  { name: 'Oracle Cloud Infrastructure — Generative AI Professional', issuer: 'Oracle' },
  { name: 'Oracle Cloud Infrastructure — Data Science Professional', issuer: 'Oracle' },
];

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="section-container">
        <motion.div
          className="section-header-cinematic"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">
            <GraduationCap size={12} className="pulse-icon" /> BACKGROUND
          </span>
          <h2 className="heading-primary-cinematic">
            <span className="text-gradient">EDUCATION</span>
          </h2>
        </motion.div>

        <div className="education-grid">
          <motion.div
            className="education-card glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="education-icon"><GraduationCap size={20} /></div>
            <div>
              <h3 className="education-title">{EDUCATION.degree}</h3>
              <p className="education-meta">{EDUCATION.school} &middot; {EDUCATION.period}</p>
            </div>
          </motion.div>

          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="education-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
            >
              <div className="education-icon"><BadgeCheck size={20} /></div>
              <div>
                <h3 className="education-title">{cert.name}</h3>
                <p className="education-meta">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
