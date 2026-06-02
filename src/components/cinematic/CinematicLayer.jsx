'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CinematicLayer — Floating warm bokeh particles using raw Three.js
 * 
 * Creates a dreamy, cinematic particle atmosphere with:
 * - Warm orange + white glowing particles
 * - Additive blending for luminous overlaps
 * - Slow sine-wave floating motion
 * - Mouse parallax camera movement
 * - Procedurally generated soft circular textures
 */
export default function CinematicLayer() {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ─── Setup ─────────────────────────────────────────
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ─── Procedural Particle Texture ───────────────────
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createParticleTexture();

    // ─── Particle System ───────────────────────────────
    const PARTICLE_COUNT = 100;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const offsets = new Float32Array(PARTICLE_COUNT); // phase offsets
    const speeds = new Float32Array(PARTICLE_COUNT);  // animation speed

    // Cool cinematic color palette
    const palette = [
      new THREE.Color('#00E5FF'),  // cyan
      new THREE.Color('#3B82F6'),  // blue
      new THREE.Color('#FFFFFF'),  // pure white
      new THREE.Color('#8B5CF6'),  // violet
      new THREE.Color('#A5F3FC'),  // light cyan
      new THREE.Color('#E0E7FF'),  // light blue
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles in a wide volume
      positions[i * 3] = (Math.random() - 0.5) * 24;      // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;  // z

      // Random warm color
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Random sizes — mostly small, few larger for depth
      sizes[i] = Math.random() < 0.15
        ? 0.15 + Math.random() * 0.25  // larger particles (15%)
        : 0.04 + Math.random() * 0.1;   // small particles (85%)

      offsets[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.2 + Math.random() * 0.4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      map: particleTexture,
      size: 0.12,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Store initial positions for sine-wave animation
    const initialPositions = new Float32Array(positions);

    // ─── Camera target for smooth parallax ─────────────
    const cameraTarget = { x: 0, y: 0 };

    // ─── Mouse handler ─────────────────────────────────
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ─── Resize handler ────────────────────────────────
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // ─── Animation Loop ────────────────────────────────
    let time = 0;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.003; // very slow for cinematic feel

      const posAttr = geometry.getAttribute('position');
      const posArray = posAttr.array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const offset = offsets[i];
        const speed = speeds[i];

        // Sine-wave floating
        posArray[i3] = initialPositions[i3] + Math.sin(time * speed + offset) * 0.6;
        posArray[i3 + 1] = initialPositions[i3 + 1] + Math.cos(time * speed * 0.7 + offset) * 0.4;
        posArray[i3 + 2] = initialPositions[i3 + 2] + Math.sin(time * speed * 0.5 + offset * 1.3) * 0.3;
      }
      posAttr.needsUpdate = true;

      // Smooth camera parallax (lerp)
      cameraTarget.x = mouseRef.current.x * 0.3;
      cameraTarget.y = mouseRef.current.y * 0.2;
      camera.position.x += (cameraTarget.x - camera.position.x) * 0.02;
      camera.position.y += (cameraTarget.y - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup ───────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 4,
      }}
    />
  );
}
