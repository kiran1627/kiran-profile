'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Award, Briefcase, Info, Compass, Terminal, Shield, Zap } from 'lucide-react';
import './Ecosystem.css';

// Concentric Orbits and technical nodes database
const orbitsData = [
  {
    name: 'Programming Layer',
    radius: 110,
    speed: 40,
    color: '#00F0FF',
    nodes: [
      { id: 'python', name: 'Python', level: 'Expert', desc: 'Primary language for developing complex AI models, machine learning pipelines, and autonomous agent orchestration.', projects: ['AI Interview Assistant', 'Multi-Agent FinPilot', 'Threat Monitor'], related: ['Generative AI', 'FastAPI', 'Deep Learning'], color: '#3776AB', code: 'PY' },
      { id: 'sql', name: 'SQL', level: 'Advanced', desc: 'Relational database querying and optimization for massive dataset handling.', projects: ['Smart Donor Matching DB', 'FinPilot Transaction Ledger'], related: ['Python', 'Node.js'], color: '#336791', code: 'SQL' },
      { id: 'javascript', name: 'JavaScript', level: 'Expert', desc: 'Core scripting language for frontend interactions, dynamic canvasses, and animations.', projects: ['Cinematic Portfolio Portal', 'Interactive Command Dashboard'], related: ['TypeScript', 'React'], color: '#F7DF1E', code: 'JS' },
      { id: 'typescript', name: 'TypeScript', level: 'Advanced', desc: 'Strongly typed language layer for secure, scalable, and compile-checked production modules.', projects: ['Multi-agent Finance Core', 'Real-time WebSocket Hub'], related: ['React', 'Next.js'], color: '#3178C6', code: 'TS' }
    ]
  },
  {
    name: 'Frontend Layer',
    radius: 180,
    speed: -55, // Negative for counter-clockwise
    color: '#8B5CF6',
    nodes: [
      { id: 'react', name: 'React', level: 'Expert', desc: 'Component-driven frontend development using reactive state-engines and virtual DOM manipulation.', projects: ['PROACT-SAFE Grid Dashboard', 'Holographic Portals'], related: ['Next.js', 'Tailwind CSS'], color: '#61DAFB', code: 'RE' },
      { id: 'nextjs', name: 'Next.js', level: 'Expert', desc: 'React meta-framework for high-performance server-side rendering, edge API routes, and static generation.', projects: ['Cinematic Portfolio Core', 'Autonomous FinPilot WebApp'], related: ['React', 'TypeScript'], color: '#ffffff', code: 'NX' },
      { id: 'tailwind', name: 'Tailwind CSS', level: 'Expert', desc: 'Utility-first styling utility for highly responsive, performant, and premium modern interfaces.', projects: ['Cinematic UI components', 'Command Dashboard layout'], related: ['React', 'Next.js'], color: '#38BDF8', code: 'TW' }
    ]
  },
  {
    name: 'Backend Layer',
    radius: 250,
    speed: 70,
    color: '#3B82F6',
    nodes: [
      { id: 'nodejs', name: 'Node.js', level: 'Expert', desc: 'Asynchronous event-driven server runtime for scalable backend pipelines and fast routing.', projects: ['WebSocket Chat Hub', 'Dynamic API Server Gateway'], related: ['FastAPI', 'TypeScript'], color: '#339933', code: 'ND' },
      { id: 'fastapi', name: 'FastAPI', level: 'Advanced', desc: 'Modern, high-performance python API framework for microservices and direct ML engine linkages.', projects: ['Multi-agent Finance API', 'Threat Detector Telemetry'], related: ['Python', 'Generative AI'], color: '#05998B', code: 'FA' },
      { id: 'rest', name: 'REST APIs', level: 'Expert', desc: 'Secure, standards-compliant interface architectures for resource-state mapping and data synchronization.', projects: ['Unified Donor Dispatch API', 'Conversational AI endpoint'], related: ['FastAPI', 'Node.js'], color: '#A855F7', code: 'API' }
    ]
  },
  {
    name: 'AI Layer',
    radius: 320,
    speed: -85,
    color: '#FF8C42',
    nodes: [
      { id: 'ml', name: 'Machine Learning', level: 'Expert', desc: 'Designing statistical classifiers, regression graphs, and optimization structures.', projects: ['Smart Donor Compatibility Index', 'Feature Weight Classifiers'], related: ['Deep Learning', 'Python'], color: '#3B82F6', code: 'ML' },
      { id: 'dl', name: 'Deep Learning', level: 'Advanced', desc: 'Neural network training, weights optimization, and layer configurations (CNNs, transformers).', projects: ['Firearm YOLOv8 detector', 'Vision-Language embedding parser'], related: ['Machine Learning', 'Generative AI'], color: '#EE4C2C', code: 'DL' },
      { id: 'genai', name: 'Generative AI', level: 'Expert', desc: 'Retrieval Augmented Generation (RAG), context optimization, prompt engineering, and fine-tuning.', projects: ['Multimodal Conversational Agent', 'Agentic Resume Analyzer'], related: ['LangChain', 'Python'], color: '#8E75FF', code: 'AI' },
      { id: 'langchain', name: 'LangChain', level: 'Advanced', desc: 'Orchestrating modular transformer flows, RAG indexes, and prompt template parameters.', projects: ['Multimodal Chatbot', 'Context Synthesis System'], related: ['Generative AI', 'LangGraph'], color: '#00A67E', code: 'LC' },
      { id: 'langgraph', name: 'LangGraph', level: 'Advanced', desc: 'Stateful, multi-agent cyclical networks for executing non-deterministic AI decisions.', projects: ['Autonomous FinPilot Orchestration', 'Multi-Agent Reasoning Core'], related: ['LangChain', 'Python'], color: '#FF6F00', code: 'LG' }
    ]
  },
  {
    name: 'Cloud Layer',
    radius: 390,
    speed: 100,
    color: '#33FFBD',
    nodes: [
      { id: 'aws', name: 'AWS', level: 'Advanced', desc: 'Amazon Web Services deployment, serverless lambda triggers, EC2 scaling, S3 logs storage.', projects: ['Smart Donor secure backend', 'ML model endpoint hosting'], related: ['Docker', 'Git'], color: '#FF9900', code: 'AWS' },
      { id: 'docker', name: 'Docker', level: 'Advanced', desc: 'Containerizing backend scripts and microservices to ensure complete environment stability.', projects: ['FastAPI Threat monitoring container', 'DevOps deployment modules'], related: ['AWS', 'GitHub'], color: '#2496ED', code: 'DK' },
      { id: 'git', name: 'Git', level: 'Expert', desc: 'Decentralized version control system for staging commits, merge conflicts management, and pipelines.', projects: ['Production repository branches'], related: ['GitHub', 'AWS'], color: '#F05032', code: 'GIT' },
      { id: 'github', name: 'GitHub', level: 'Expert', desc: 'Hosting repository trunks, managing CI/CD Actions workflows, and collaborative developer cycles.', projects: ['Ecosystem release pipelines'], related: ['Git', 'AWS'], color: '#ffffff', code: 'GH' }
    ]
  }
];

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
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.25" />
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
