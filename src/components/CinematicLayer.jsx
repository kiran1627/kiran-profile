'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Lightweight shared ambient particle layer.
 * Renders a single, cheap Three.js scene (a handful of drifting points)
 * behind whichever section mounts it. Designed to be reused sparingly —
 * NOT a heavy full particle system per section.
 *
 * Only one instance should be mounted at a time across the page; each
 * instance creates + tears down its own tiny WebGL context on
 * mount/unmount, so keep usage to sections that are actually visible.
 */
const CinematicLayer = ({ intensity = 0.5, color = '#ff7a3d', className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNarrow = window.innerWidth < 640;
    if (reduceMotion) return;

    let renderer, scene, camera, points, raf;
    let disposed = false;

    (async () => {
      const THREE = await import('three');
      if (disposed || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || window.innerHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.z = 8;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isNarrow ? 1 : 1.5));
      renderer.setSize(width, height);

      const count = isNarrow ? 40 : Math.round(90 * intensity + 20);
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: new THREE.Color(color),
        size: 0.045,
        transparent: true,
        opacity: 0.55 * intensity + 0.15,
        sizeAttenuation: true,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      const clock = new THREE.Clock();
      const animate = () => {
        if (disposed) return;
        const t = clock.getElapsedTime();
        points.rotation.y = t * 0.02;
        points.position.y = Math.sin(t * 0.15) * 0.2;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      const onResize = () => {
        const w = parent?.clientWidth || window.innerWidth;
        const h = parent?.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      canvasRef.current._cleanupResize = () => window.removeEventListener('resize', onResize);
    })();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      canvasRef.current?._cleanupResize?.();
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [intensity, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`cinematic-layer-canvas ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default CinematicLayer;
