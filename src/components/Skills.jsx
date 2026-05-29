'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import './Skills.css';

// Lazy load the newly designed Technology Ecosystem component
const TechOrbit = dynamic(
  () => import('./three/TechOrbit'),
  { ssr: false }
);

const Skills = () => {
  return (
    <section id="skills" className="skills-orbit-section">
      <div className="section-container skills-flow-container">
        
        <motion.div
          className="section-header-cinematic"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">AI INFRASTRUCTURE</span>
          <h2 className="heading-primary-cinematic">
            <span className="text-gradient">SKILLS</span>
          </h2>
          <p className="section-subtitle-cinematic">
            An immersive graphical mapping of my core AI engineering and full-stack software infrastructure layers. Select a node or orbit layer to inspect specifications.
          </p>
        </motion.div>

        {/* Dynamic Universe Ecosystem Canvas / Grid */}
        <div className="skills-ecosystem-shelf">
          <TechOrbit />
        </div>
        
      </div>
      
      <div className="skills-gradient-bottom" />
    </section>
  );
};

export default Skills;
