'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Eye, Film, Volume2, VolumeX, ShieldAlert, MonitorPlay } from 'lucide-react';
import './DemoCenter.css';

const DEMOS_DATA = [
  {
    id: 'finpilot',
    title: 'FinPilot Autonomous Finance',
    subtitle: 'Multi-Agent State Orchestration',
    videoSrc: '/Finpilot.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    duration: '2m 14s',
    codec: 'MP4 / H264',
    fps: '60 FPS',
    description: 'Autonomous financial portfolio planning runs and multi-agent debates loop simulations showing allocation and order generation logs.'
  },
  {
    id: 'proact',
    title: 'PROACT-SAFE CCTV Threat',
    subtitle: 'CPU-Bound YOLOv8 Frame Inference',
    videoSrc: '/Proact.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800',
    duration: '1m 45s',
    codec: 'MP4 / H264',
    fps: '30 FPS',
    description: 'Weapon anomaly class segmentation logs inside smart-city camera simulated matrices, broadcasting alerts via real-time WebSockets.'
  },
  {
    id: 'blood',
    title: 'Smart Blood Donor Matcher',
    subtitle: 'Random Forest Geofence Intake',
    videoSrc: '/BloodDonation-demo-compressed.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800',
    duration: '1m 12s',
    codec: 'MP4 / H264',
    fps: '30 FPS',
    description: 'Emergency patient geocoding intakes and Random Forest matched dispatch records commitment to mock Blockchain verified ledgers.'
  },
  {
    id: 'chatbot',
    title: 'Multimodal Generative Chatbot',
    subtitle: 'Whisper Vocal Speech Ingestion',
    videoSrc: '/chatbot-demo.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&q=80&w=800',
    duration: '3m 05s',
    codec: 'MP4 / H264',
    fps: '60 FPS',
    description: 'Parallel Whisper speech-to-text transcript processing, CLIP visual vector matching, and gTTS synthesized vocal response feeds.'
  }
];

const DemoCenter = () => {
  const [activeTheater, setActiveTheater] = useState(null);
  const [hoveredDemoId, setHoveredDemoId] = useState(null);
  const [theaterMuted, setTheaterMuted] = useState(false);

  const videoRefs = useRef({});

  const handleMouseEnter = (id) => {
    setHoveredDemoId(id);
    const video = videoRefs.current[id];
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (id) => {
    setHoveredDemoId(null);
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section id="demo-center" className="demo-center-section">
      <div className="section-container">
        {/* Header Block */}
        <div className="demo-header-os">
          <div className="title-area">
            <span className="demo-tag-badge">
              <Film size={12} /> SYSTEM PLAYBACKS
            </span>
            <h2 className="section-title">
              PROJECT <span className="text-gradient">DEMO CENTER</span>
            </h2>
            <p className="section-subtitle">
              Explore dynamic workflow playbacks of my primary modules. Hover over any console card for a real-time muted preview, click to enter full-screen unmuted theater.
            </p>
          </div>
        </div>

        {/* Horizontal Netflix Style deck */}
        <div className="demo-cards-deck">
          {DEMOS_DATA.map((demo) => {
            const isHovered = hoveredDemoId === demo.id;

            return (
              <motion.div
                key={demo.id}
                className={`demo-console-card glass-panel-premium ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => handleMouseEnter(demo.id)}
                onMouseLeave={() => handleMouseLeave(demo.id)}
                onClick={() => setActiveTheater(demo)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {/* Visual Viewport Box */}
                <div className="demo-card-viewport">
                  {/* Thumbnail static view */}
                  <img
                    src={demo.thumbnail}
                    alt={demo.title}
                    className={`demo-thumbnail-img ${isHovered ? 'fade-out' : ''}`}
                  />
                  {/* Auto-play muted video preview */}
                  <video
                    ref={(el) => (videoRefs.current[demo.id] = el)}
                    src={demo.videoSrc}
                    className={`demo-preview-video ${isHovered ? 'fade-in' : ''}`}
                    loop
                    muted
                    playsInline
                    preload="none"
                  />

                  {/* High tech overlays */}
                  <div className="viewport-overlay-glow" />
                  <div className="viewport-badge-duration">{demo.duration}</div>
                  <div className="viewport-badge-codec">{demo.codec}</div>
                  <div className="viewport-play-hover">
                    <Play size={20} fill="#ffffff" />
                  </div>
                </div>

                {/* Info details */}
                <div className="demo-card-details">
                  <div className="details-header">
                    <span className="fps">{demo.fps}</span>
                    <span className="dot-active" />
                  </div>
                  <h4>{demo.title}</h4>
                  <p>{demo.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Theater Modal */}
      <AnimatePresence>
        {activeTheater && (
          <div className="theater-modal-wrapper">
            <motion.div
              className="theater-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTheater(null)}
            />

            <motion.div
              className="theater-content-box glass-panel-premium"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {/* Theater Window Controls */}
              <div className="theater-window-header">
                <span className="dot dot-red" onClick={() => setActiveTheater(null)}></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
                <span className="window-title">THEATER_MODE_CONSOLES // {activeTheater.id.toUpperCase()}</span>
                <button className="theater-close-btn" onClick={() => setActiveTheater(null)}>
                  <X size={18} /> CLOSE
                </button>
              </div>

              {/* Theater Video Body */}
              <div className="theater-video-frame">
                <video
                  src={activeTheater.videoSrc}
                  autoPlay
                  controls
                  loop
                  muted={theaterMuted}
                  className="theater-full-video"
                  playsInline
                />
                
                {/* Mute toggle HUD overlay */}
                <button
                  className="theater-audio-hud-btn"
                  onClick={() => setTheaterMuted(!theaterMuted)}
                  title={theaterMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {theaterMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  <span>{theaterMuted ? 'UNMUTE THEATER' : 'THEATER SOUND ON'}</span>
                </button>
              </div>

              {/* Theater Specs Footer info */}
              <div className="theater-specs-footer">
                <div className="footer-spec-main">
                  <h3>{activeTheater.title}</h3>
                  <span className="subtitle">{activeTheater.subtitle}</span>
                  <p>{activeTheater.description}</p>
                </div>
                <div className="footer-spec-meta">
                  <div className="meta-line">
                    <span className="lbl">ENCODING:</span>
                    <span className="val">{activeTheater.codec}</span>
                  </div>
                  <div className="meta-line">
                    <span className="lbl">FRAME_RATE:</span>
                    <span className="val">{activeTheater.fps}</span>
                  </div>
                  <div className="meta-line">
                    <span className="lbl">DURATION:</span>
                    <span className="val">{activeTheater.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DemoCenter;
