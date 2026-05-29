'use client';

import React, { Suspense, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import AvatarModel from './avatar/AvatarModel';
import AvatarPedestal from './avatar/AvatarPedestal';
import SceneLighting from './three/SceneLighting';
import usePortfolioStore from '../store/usePortfolioStore';
import { useVoiceSystem } from '../hooks/useVoiceSystem';
import './Hero.css';

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.5 + i * 0.04,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.8, duration: 0.8, ease: 'easeOut' },
  },
};

const FULL_NAME = 'KIRAN BABU BANDELA';

const Hero = () => {
  const setAvatarExpression = usePortfolioStore((s) => s.setAvatarExpression);
  const { playIntro, INTRO_TEXT } = useVoiceSystem();

  // Greeting animation and voice on load
  useEffect(() => {
    // Only play intro if not already played, but since this mounts once, we can just call it
    const timer = setTimeout(() => {
      playIntro();
    }, 2000);
    return () => clearTimeout(timer);
  }, [playIntro]);

  return (
    <section id="hero" className="hero-section">
      {/* ─── 3D Avatar Canvas ─────────────────────────────── */}
      <div className="hero-avatar-container">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <AdaptiveDpr pixelated />
          <SceneLighting />
          <Suspense fallback={null}>
            <AvatarModel />
            <AvatarPedestal />
          </Suspense>
        </Canvas>
      </div>

      {/* ─── Text Content Layer ───────────────────────────── */}
      <div className="hero-content-layer">
        {/* Top badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Sparkles size={14} />
          <span>AI-Powered Portfolio</span>
        </motion.div>

        {/* Main name - letter by letter */}
        <h1 className="hero-name">
          {FULL_NAME.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className={char === ' ' ? 'hero-space' : 'hero-letter'}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.div
          className="hero-subtitle-line"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="hero-subtitle-text">
            AI Engineer
            <span className="hero-divider">|</span>
            Full Stack Developer
            <span className="hero-divider">|</span>
            Machine Learning Engineer
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          Building intelligent systems with LLMs, Computer Vision, and Autonomous Agents
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <a href="#projects" className="btn-primary hero-btn">
            View My Work
          </a>
          <button onClick={() => playIntro()} className="btn-outline hero-btn" style={{ cursor: 'pointer' }}>
            Say Hello
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.6 }}
        >
          <div className="hero-stat">
            <span className="hero-stat-num">20+</span>
            <span className="hero-stat-label">Open Source</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">15+</span>
            <span className="hero-stat-label">Projects</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">500+</span>
            <span className="hero-stat-label">Problems Solved</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">10+</span>
            <span className="hero-stat-label">Certifications</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} />
        </motion.div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;
