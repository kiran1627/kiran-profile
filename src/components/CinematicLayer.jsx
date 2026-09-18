'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 140;

const PALETTE = [
  new THREE.Color('#ff8a3d'), // warm orange
  new THREE.Color('#ffd9b3'), // soft amber-white
  new THREE.Color('#ffffff'), // white
  new THREE.Color('#4fa8ff'), // soft monitor blue
];

function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.25, 'rgba(255,220,180,0.7)');
  gradient.addColorStop(0.6, 'rgba(255,150,80,0.15)');
  gradient.addColorStop(1, 'rgba(255,150,80,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const CinematicLayer = ({ className }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const glowTexture = makeGlowTexture();

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const offsets = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 10;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 0.25 + Math.random() * 0.9;
      speeds[i] = 0.15 + Math.random() * 0.35;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.6,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const basePositions = positions.slice();
    const mouse = { x: 0, y: 0 };
    const targetCamera = { x: 0, y: 0 };

    const handlePointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        const posAttr = geometry.attributes.position;
        for (let i = 0; i < PARTICLE_COUNT; i += 1) {
          const idx = i * 3;
          posAttr.array[idx] = basePositions[idx] + Math.sin(elapsed * speeds[i] + offsets[i]) * 0.6;
          posAttr.array[idx + 1] =
            basePositions[idx + 1] + Math.cos(elapsed * speeds[i] * 0.8 + offsets[i]) * 0.4;
        }
        posAttr.needsUpdate = true;

        targetCamera.x += (mouse.x * 0.6 - targetCamera.x) * 0.03;
        targetCamera.y += (-mouse.y * 0.4 - targetCamera.y) * 0.03;
        camera.position.x = targetCamera.x;
        camera.position.y = targetCamera.y;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const { clientWidth, clientHeight } = mount;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      glowTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
};

export default CinematicLayer;
