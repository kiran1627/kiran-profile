'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import usePortfolioStore from '../../store/usePortfolioStore';

const PARTICLE_COUNT = 1500;

function createParticleData() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);

  const colorA = new THREE.Color('#00F0FF');
  const colorB = new THREE.Color('#8B5CF6');
  const colorC = new THREE.Color('#33FFBD');

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 30;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 15 - 5;

    velocities[i3] = (Math.random() - 0.5) * 0.002;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;

    const t = Math.random();
    const color = t < 0.33
      ? colorA.clone().lerp(colorB, t * 3)
      : t < 0.66
      ? colorB.clone().lerp(colorC, (t - 0.33) * 3)
      : colorC.clone().lerp(colorA, (t - 0.66) * 3);

    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    sizes[i] = Math.random() * 3 + 0.5;
  }

  return { positions, velocities, colors, sizes };
}

const INITIAL_DATA = createParticleData();

export default function ParticleField() {
  const meshRef = useRef();
  const cursorPosition = usePortfolioStore((s) => s.cursorPosition);

  const { positions, velocities, colors, sizes } = INITIAL_DATA;

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position;
    const time = state.clock.elapsedTime;

    // Normalized cursor position (-1 to 1)
    const cx = (cursorPosition.x / window.innerWidth) * 2 - 1;
    const cy = -(cursorPosition.y / window.innerHeight) * 2 + 1;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Base drift
      posAttr.array[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.01) * 0.001;
      posAttr.array[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.01) * 0.001;
      posAttr.array[i3 + 2] += velocities[i3 + 2];

      // Cursor repulsion
      const dx = posAttr.array[i3] - cx * 5;
      const dy = posAttr.array[i3 + 1] - cy * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.003;
        posAttr.array[i3] += (dx / dist) * force;
        posAttr.array[i3 + 1] += (dy / dist) * force;
      }

      // Wrap boundaries
      if (posAttr.array[i3] > 15) posAttr.array[i3] = -15;
      if (posAttr.array[i3] < -15) posAttr.array[i3] = 15;
      if (posAttr.array[i3 + 1] > 10) posAttr.array[i3 + 1] = -10;
      if (posAttr.array[i3 + 1] < -10) posAttr.array[i3 + 1] = 10;
      if (posAttr.array[i3 + 2] > 5) posAttr.array[i3 + 2] = -15;
      if (posAttr.array[i3 + 2] < -15) posAttr.array[i3 + 2] = 5;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
