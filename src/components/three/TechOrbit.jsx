'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Award, Briefcase, Info, Compass, Terminal, Shield, Zap } from 'lucide-react';
import './Ecosystem.css';

import { categories as sourceCategories, skills as sourceSkills } from '../../data/skillsEcosystemData';

// Map categories to 4 distinct layers to avoid overcrowding
const layerMapping = {
  'prog': 0, 'front': 0, 'back': 0, 'db': 0,          // Layer 0: Core Stack
  'ai': 1, 'aif': 1, 'ds': 1,                         // Layer 1: AI & Data
  'cloud': 2, 'sec': 2,                               // Layer 2: Cloud & Security
  'se': 3, 'tools': 3, 'learn': 3                     // Layer 3: Engineering & Tools
};

const layerConfigs = [
  { name: 'Core Stack Layer', radius: 140, speed: 20, color: '#00E5FF' },
  { name: 'AI & Data Layer', radius: 240, speed: -15, color: '#FF3366' },
  { name: 'Cloud & Security Layer', radius: 340, speed: 25, color: '#2496ED' },
  { name: 'Engineering & Tools Layer', radius: 440, speed: -18, color: '#A855F7' }
];

// Build the orbitsData dynamically
const orbitsData = layerConfigs.map((config, idx) => ({
  ...config,
  nodes: sourceSkills
    .filter(skill => layerMapping[skill.category] === idx)
    .map(skill => {
      const cat = sourceCategories.find(c => c.id === skill.category);
      return {
        id: skill.id,
        name: skill.name,
        level: 'Advanced',
        desc: `Core technology within the ${cat?.name || 'ecosystem'} domain.`,
        projects: ['Ecosystem Integration', 'Platform Development'],
        related: [],
        color: cat?.color || config.color,
        code: skill.name.replace(/[^A-Z]/g, '').substring(0, 2) || skill.name.substring(0, 2).toUpperCase()
      };
    })
}));

// Flatten all nodes to simplify reference querying
const allNodes = orbitsData.reduce((acc, orbit) => [...acc, ...orbit.nodes], []);

export default function TechOrbit() {
  const [selectedNode, setSelectedNode] = useState(allNodes.find(n => n.id === 'python') || null);
  const [isMobile, setIsMobile] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);
  const containerRef = useRef(null);

  // ─── Responsiveness & Mouse Parallax ────────────────
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 820);
    checkSize();
    window.addEventListener('resize', checkSize);

    const handleMouseMove = (e) => {
      if (isMobile) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);



  // Handle mobile hexagon click
  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  return (
    <div ref={containerRef} className="ecosystem-master-wrapper">
      {isMobile ? (
        /* ─── MOBILE HEXAGON TECHNOLOGY GRID ──────────────── */
        <div className="mobile-hex-wrapper">
          <div className="mobile-hex-grid">
            {orbitsData.map((orbit) => (
              <div key={orbit.name} className="mobile-orbit-category-block">
                <h4 className="mobile-category-title" style={{ color: orbit.color }}>
                  {orbit.name}
                </h4>
                <div className="mobile-honeycomb-shelf">
                  {orbit.nodes.map((node) => {
                    const isActive = selectedNode?.id === node.id;
                    return (
                      <div
                        key={node.id}
                        className={`mobile-hex-cell ${isActive ? 'hex-cell-active' : ''}`}
                        onClick={() => handleNodeClick(node)}
                        style={{
                          '--hex-glow': node.color,
                          borderColor: isActive ? node.color : 'rgba(255, 255, 255, 0.1)',
                          boxShadow: isActive ? `0 0 15px ${node.color}50` : 'none',
                        }}
                      >
                        <div className="hex-cell-content">
                          <span className="hex-node-code" style={{ color: isActive ? '#fff' : node.color }}>
                            {node.code}
                          </span>
                          <span className="hex-node-name">{node.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Details Display Panel below grid for Mobile */}
          <AnimatePresence mode="wait">
            {selectedNode && (
              <motion.div
                key={selectedNode.id}
                className="mobile-details-panel glass-panel"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="detail-panel-header" style={{ borderLeftColor: selectedNode.color }}>
                  <h3 style={{ textShadow: `0 0 15px ${selectedNode.color}60` }}>
                    {selectedNode.name}
                  </h3>
                  <span className="badge" style={{ color: selectedNode.color, border: `1px solid ${selectedNode.color}30`, background: `${selectedNode.color}10` }}>
                    {selectedNode.level}
                  </span>
                </div>
                <p className="detail-desc">{selectedNode.desc}</p>

                <div className="detail-meta-box">
                  <h5><Zap size={14} style={{ color: selectedNode.color }} /> Core Use Cases</h5>
                  <ul className="meta-list">
                    {selectedNode.related.map((tag) => (
                      <li key={tag} className="meta-tag" style={{ border: `1px solid ${selectedNode.color}15` }}>{tag}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-meta-box">
                  <h5><Briefcase size={14} style={{ color: selectedNode.color }} /> Featured Projects</h5>
                  <ul className="project-list">
                    {selectedNode.projects.map((proj) => (
                      <li key={proj} className="project-item">{proj}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* ─── DESKTOP CONCENTRIC ORBIT UNIVERSE ───────────── */
        <div 
          className="desktop-universe-container"
          style={{
            transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0px)`
          }}
        >
          <div className="universe-canvas">
            {/* SVG Orbits & Connecting Circuits */}
            <svg className="universe-circuits" viewBox="-450 -450 900 900">
              <defs>
                <radialGradient id="aiCoreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#030014" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Central Core Ambient Glow */}
              <circle cx="0" cy="0" r="100" fill="url(#aiCoreGlow)" />

              {/* Render Orbit Paths */}
              {orbitsData.map((orbit) => (
                <g key={orbit.name}>
                  {/* Base Orbit Ring */}
                  <circle
                    cx="0"
                    cy="0"
                    r={orbit.radius}
                    className="circuit-path-circle"
                    style={{ stroke: `${orbit.color}12` }}
                  />
                  {/* Glowing Dashed Secondary Path */}
                  <circle
                    cx="0"
                    cy="0"
                    r={orbit.radius}
                    className="circuit-path-dashes"
                    style={{ stroke: orbit.color }}
                  />
                </g>
              ))}

              {/* Connective pulses between active node and core */}
              {selectedNode && (
                <line
                  x1="0"
                  y1="0"
                  x2={selectedNode.currentX || 0}
                  y2={selectedNode.currentY || 0}
                  className="active-connector-line"
                  style={{ stroke: selectedNode.color }}
                />
              )}
            </svg>

            {/* Concentric HTML Orbit Slots */}
            {orbitsData.map((orbit, orbitIndex) => {
              const rotateDirection = orbit.speed > 0 ? 'normal' : 'reverse';
              const absDuration = Math.abs(orbit.speed);
              const nodeCount = orbit.nodes.length;

              return (
                <div
                  key={orbit.name}
                  className="orbit-ring-container"
                  style={{
                    width: orbit.radius * 2,
                    height: orbit.radius * 2,
                    animation: `orbitRotate ${absDuration}s linear infinite ${rotateDirection}`,
                    animationPlayState: isOrbitPaused ? 'paused' : 'running'
                  }}
                >
                  {orbit.nodes.map((node, nodeIndex) => {
                    const angle = (nodeIndex * 2 * Math.PI) / nodeCount;
                    const x = orbit.radius * Math.cos(angle);
                    const y = orbit.radius * Math.sin(angle);

                    // Cache relative coordinates for connector drawing
                    node.currentX = x;
                    node.currentY = y;

                    const isActive = selectedNode?.id === node.id;

                    return (
                      <div
                        key={node.id}
                        className={`tech-node-badge ${isActive ? 'node-badge-active' : ''}`}
                        style={{
                          left: orbit.radius + x,
                          top: orbit.radius + y,
                          // Counter-rotation animation so icons stay upright!
                          animation: `orbitRotate ${absDuration}s linear infinite ${rotateDirection === 'normal' ? 'reverse' : 'normal'}`,
                          animationPlayState: isOrbitPaused ? 'paused' : 'running',
                          '--badge-glow': node.color,
                          borderColor: isActive ? node.color : 'rgba(255, 255, 255, 0.08)',
                        }}
                        onMouseEnter={() => {
                          setSelectedNode(node);
                          setIsOrbitPaused(true);
                        }}
                        onMouseLeave={() => {
                          setIsOrbitPaused(false);
                        }}
                      >
                        <span className="node-code-label" style={{ color: isActive ? '#fff' : node.color }}>
                          {node.code}
                        </span>
                        <div className="node-glow-ring" style={{ background: node.color }} />
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* ─── Center: PULSING AI CORE ──────────────────── */}
            <div className="ai-core-hub">
              <div className="ai-core-glow-pulsar" />
              <div className="ai-core-scanning-ring" />
              <div className="ai-core-hologram-disk" />
              <div className="ai-core-inner-ring">
                <Network className="ai-core-icon" />
                <span className="ai-core-label">INNOVATION</span>
                <span className="ai-core-sub">CORE HUB</span>
              </div>
            </div>
          </div>

          {/* ─── Floating Details Panel (Right HUD Card) ─── */}
          <div className="universe-detail-dock">
            <AnimatePresence mode="wait">
              {selectedNode && (
                <motion.div
                  key={selectedNode.id}
                  className="universe-glass-detail glass-panel"
                  initial={{ opacity: 0, x: 30, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ borderColor: `${selectedNode.color}35` }}
                >
                  <div className="detail-header" style={{ borderLeftColor: selectedNode.color }}>
                    <div className="title-section">
                      <h3 style={{ textShadow: `0 0 20px ${selectedNode.color}40` }}>
                        {selectedNode.name}
                      </h3>
                      <span className="badge" style={{ color: selectedNode.color, border: `1px solid ${selectedNode.color}25`, background: `${selectedNode.color}08` }}>
                        {selectedNode.level}
                      </span>
                    </div>
                    <div className="node-brand-hex" style={{ background: `${selectedNode.color}15`, borderColor: selectedNode.color }}>
                      <span style={{ color: selectedNode.color }}>{selectedNode.code}</span>
                    </div>
                  </div>

                  <p className="detail-desc-paragraph">
                    {selectedNode.desc}
                  </p>

                  <div className="dock-meta-box">
                    <h4>
                      <Zap size={14} style={{ color: selectedNode.color }} />
                      Core Use Cases
                    </h4>
                    <div className="use-cases-grid">
                      {selectedNode.related.map((tag) => (
                        <span key={tag} className="tag-element" style={{ border: `1px solid ${selectedNode.color}15`, background: `${selectedNode.color}05` }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="dock-meta-box">
                    <h4>
                      <Briefcase size={14} style={{ color: selectedNode.color }} />
                      Featured Projects
                    </h4>
                    <div className="project-items-stack">
                      {selectedNode.projects.map((proj) => (
                        <div key={proj} className="project-pill-item">
                          <div className="project-pill-dot" style={{ background: selectedNode.color }} />
                          <span>{proj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
