'use client';

import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import ParticleField from './ParticleField';
import HolographicGrid from './HolographicGrid';
import FloatingCodePanels from './FloatingCodePanels';
import SceneLighting from './SceneLighting';
import usePortfolioStore from '../../store/usePortfolioStore';

function SceneContent() {
  return (
    <>
      <SceneLighting />
      <ParticleField />
      <HolographicGrid />
      <FloatingCodePanels />
      <fog attach="fog" args={['#000000', 8, 30]} />
    </>
  );
}

export default function SceneEnvironment() {
  const setCursorPosition = usePortfolioStore((s) => s.setCursorPosition);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setCursorPosition]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: 3, // ACESFilmicToneMapping
          toneMappingExposure: 1.2,
        }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <SceneContent />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
