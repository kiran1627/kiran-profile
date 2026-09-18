'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Lightweight canvas2d particle/ember background.
 * Decorative only (aria-hidden) — never carries content.
 * Respects prefers-reduced-motion by rendering a static frame.
 */
const EmberCanvas = ({ color = '255,120,60', density = 46, className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let rafId = null;
    let running = true;

    const makeParticles = () => {
      const count = Math.max(12, Math.round(density * (width / 1440)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.4,
        vy: -(Math.random() * 0.35 + 0.08),
        vx: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.15,
        flicker: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.flicker += 0.03;
        const flick = 0.6 + Math.sin(p.flicker) * 0.4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${(p.a * flick).toFixed(3)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        }
      }
      if (!reduceMotion && running) rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, [color, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`ember-canvas ${className}`}
      aria-hidden="true"
    />
  );
};

export default EmberCanvas;
