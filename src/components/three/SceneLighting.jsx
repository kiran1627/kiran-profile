'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SceneLighting() {
  const light1Ref = useRef();
  const light2Ref = useRef();
  const light3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(time * 0.3) * 5;
      light1Ref.current.position.y = 3 + Math.sin(time * 0.5) * 1;
      light1Ref.current.intensity = 1.5 + Math.sin(time * 0.8) * 0.5;
    }

    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(time * 0.4) * 6;
      light2Ref.current.position.z = Math.sin(time * 0.3) * 4;
      light2Ref.current.intensity = 1 + Math.sin(time * 0.6 + 1) * 0.3;
    }

    if (light3Ref.current) {
      light3Ref.current.intensity = 0.5 + Math.sin(time * 1.2) * 0.2;
    }
  });

  return (
    <>
      {/* Ambient - very low for dark mood */}
      <ambientLight intensity={0.15} color="#1a1a3e" />

      {/* Primary key light - cyan tint */}
      <pointLight
        ref={light1Ref}
        position={[3, 4, 5]}
        intensity={1.5}
        color="#00F0FF"
        distance={20}
        decay={2}
      />

      {/* Fill light - violet accent */}
      <pointLight
        ref={light2Ref}
        position={[-4, 2, 3]}
        intensity={1}
        color="#8B5CF6"
        distance={15}
        decay={2}
      />

      {/* Rim light from behind - strong cyan */}
      <pointLight
        ref={light3Ref}
        position={[0, 3, -5]}
        intensity={0.5}
        color="#00F0FF"
        distance={12}
        decay={2}
      />

      {/* Top spotlight for avatar */}
      <spotLight
        position={[0, 8, 2]}
        angle={0.3}
        penumbra={0.8}
        intensity={1.2}
        color="#ffffff"
        distance={20}
        decay={2}
        castShadow={false}
      />

      {/* Subtle directional for overall shape */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.3}
        color="#E0E7FF"
      />
    </>
  );
}
