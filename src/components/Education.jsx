'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BadgeCheck } from 'lucide-react';
import './Education.css';

const EDUCATION = {
  degree: 'B.Tech, Artificial Intelligence & Machine Learning',
  school: 'JNTUH, Hyderabad',
  period: 'May 2026',
  focus: ['Generative AI', 'LLMs', 'Deep Learning', 'Computer Vision', 'Data Science'],
};

const CERTIFICATIONS = [
  { name: 'OCI Generative AI Professional', issuer: 'Oracle' },
  { name: 'OCI Data Science Professional', issuer: 'Oracle' },
];

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="ed-label ed-label--tl" aria-hidden="true">
        Credentials<br />Foundation<br />Growth
      </div>
      <div className="ed-label ed-label--tr" aria-hidden="true">
        Learn<br /><b>Certify · Apply</b>
      </div>
      <div className="ed-label ed-label--bl" aria-hidden="true">
        Est. 2026
      </div>
      <div className="ed-label ed-label--br" aria-hidden="true">
        Knowledge<br />Proof<br />Practice
      </div>

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

        <motion.div
          className="education-primary-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="education-icon">
            <GraduationCap size={22} aria-hidden="true" />
          </div>
          <div className="education-primary-body">
            <h3 className="education-degree">{EDUCATION.degree}</h3>
            <p className="education-meta">{EDUCATION.school} &middot; {EDUCATION.period}</p>
            <div className="education-focus-tags">
              {EDUCATION.focus.map((area) => (
                <span key={area} className="education-focus-tag">{area}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="certifications-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="certifications-label">CERTIFICATIONS</span>
          <div className="certifications-list">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} className="certification-chip">
                <BadgeCheck size={14} aria-hidden="true" />
                <span>{cert.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
