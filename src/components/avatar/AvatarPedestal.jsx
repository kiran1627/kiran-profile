'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Holographic circular pedestal beneath the avatar.
 * Features rotating rings, glow, and particle emissions.
 */
export default function AvatarPedestal() {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const glowRef = useRef();
  const dataRingRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * 0.35;
    }
    if (dataRingRef.current) {
      dataRingRef.current.rotation.z = time * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.08 + Math.sin(time * 1.5) * 0.03;
    }
  });

  return (
    <group position={[0, -2.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {/* Base glow disc */}
      <mesh ref={glowRef}>
        <circleGeometry args={[1.8, 64]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Outer ring */}
      <mesh ref={outerRingRef}>
        <ringGeometry args={[1.5, 1.55, 128]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Inner ring */}
      <mesh ref={innerRingRef}>
        <ringGeometry args={[1.1, 1.13, 64]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Data ring with dashes */}
      <mesh ref={dataRingRef}>
        <ringGeometry args={[1.3, 1.33, 32]} />
        <meshBasicMaterial
          color="#33FFBD"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Center dot */}
      <mesh>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Cross-hair lines */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <mesh key={i} rotation={[0, 0, angle]}>
          <planeGeometry args={[3.2, 0.005]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.1}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
