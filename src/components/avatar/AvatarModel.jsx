'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import usePortfolioStore from '../../store/usePortfolioStore';
import { useAvatarExpressions } from './useAvatarExpressions';

/**
 * Load and render a Ready Player Me .glb avatar with morph targets.
 * Falls back to a placeholder sphere if model isn't available.
 */
export default function AvatarModel({ url = '/models/avatar.glb' }) {
  const gltfResult = useGLTF(url);

  if (!gltfResult || !gltfResult.scene) {
    return <AvatarPlaceholder />;
  }

  return <AvatarModelInner scene={gltfResult.scene} nodes={gltfResult.nodes} />;
}

function AvatarModelInner({ scene, nodes }) {
  const groupRef = useRef();
  const headRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  const meshesWithMorphs = useRef([]);

  const cursorPosition = usePortfolioStore((s) => s.cursorPosition);
  const avatarExpression = usePortfolioStore((s) => s.avatarExpression);
  const setAvatarIsSpeaking = usePortfolioStore((s) => s.setAvatarIsSpeaking);

  // Blinking state
  const blinkState = useRef({
    nextBlinkTime: 4,
    blinkProgress: 0,
    isBlinking: false,
  });

  // Breathing state
  const breathState = useRef({ phase: 0 });

  // Expression system
  const { getExpressionTargets } = useAvatarExpressions();
  const currentMorphValues = useRef({});

  useEffect(() => {
    if (!scene) return;

    // Collect all meshes with morph targets
    const morphMeshes = [];
    scene.traverse((child) => {
      if (child.isMesh || child.isSkinnedMesh) {
        if (child.morphTargetDictionary && child.morphTargetInfluences) {
          morphMeshes.push(child);
        }

        // Enhance materials
        if (child.material) {
          child.material.needsUpdate = true;
          child.material.envMapIntensity = 0.8;
        }
      }

      // Find head bone for cursor tracking
      if (child.isBone) {
        const name = child.name.toLowerCase();
        if (name.includes('head') && !name.includes('end')) {
          headRef.current = child;
        }
      }
    });

    meshesWithMorphs.current = morphMeshes;
  }, [scene]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // ─── HEAD TRACKING (follow cursor) ───────────────────────
    if (headRef.current) {
      const targetRotY = ((cursorPosition.x / window.innerWidth) * 2 - 1) * 0.3;
      const targetRotX = -((cursorPosition.y / window.innerHeight) * 2 - 1) * 0.15;

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotY,
        delta * 3
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotX,
        delta * 3
      );
    }

    // ─── BLINKING ────────────────────────────────────────────
    const blink = blinkState.current;
    if (!blink.isBlinking && time > blink.nextBlinkTime) {
      blink.isBlinking = true;
      blink.blinkProgress = 0;
    }

    if (blink.isBlinking) {
      blink.blinkProgress += delta * 8;
      const blinkValue = blink.blinkProgress < 0.5
        ? blink.blinkProgress * 2
        : 2 - blink.blinkProgress * 2;

      setMorphTarget(meshesWithMorphs.current, 'eyeBlinkLeft', Math.max(0, blinkValue));
      setMorphTarget(meshesWithMorphs.current, 'eyeBlinkRight', Math.max(0, blinkValue));

      if (blink.blinkProgress >= 1) {
        blink.isBlinking = false;
        // Random next blink with occasional double-blink
        const isDoubleBlink = Math.random() < 0.2;
        blink.nextBlinkTime = time + (isDoubleBlink ? 0.3 : 2 + Math.random() * 4);
        setMorphTarget(meshesWithMorphs.current, 'eyeBlinkLeft', 0);
        setMorphTarget(meshesWithMorphs.current, 'eyeBlinkRight', 0);
      }
    }

    // ─── BREATHING ───────────────────────────────────────────
    breathState.current.phase += delta * 0.8;
    if (groupRef.current) {
      const breathAmount = Math.sin(breathState.current.phase) * 0.008;
      groupRef.current.position.y = -1 + breathAmount;
      // Subtle shoulder movement via scale
      groupRef.current.scale.y = 1 + Math.sin(breathState.current.phase) * 0.003;
    }

    // ─── EXPRESSIONS ─────────────────────────────────────────
    const targets = getExpressionTargets(avatarExpression);
    for (const [morphName, targetValue] of Object.entries(targets)) {
      const current = currentMorphValues.current[morphName] || 0;
      const lerped = THREE.MathUtils.lerp(current, targetValue, delta * 4);
      currentMorphValues.current[morphName] = lerped;
      setMorphTarget(meshesWithMorphs.current, morphName, lerped);
    }

    // ─── IDLE MICRO-MOVEMENTS ────────────────────────────────
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={[1.8, 1.8, 1.8]}>
      <primitive object={scene} />
    </group>
  );
}

/**
 * Placeholder avatar when GLB model is not yet available
 */
function AvatarPlaceholder() {
  const groupRef = useRef();
  const cursorPosition = usePortfolioStore((s) => s.cursorPosition);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Breathing
    groupRef.current.position.y = -0.5 + Math.sin(time * 0.8) * 0.05;

    // Cursor tracking
    const targetRotY = ((cursorPosition.x / window.innerWidth) * 2 - 1) * 0.3;
    const targetRotX = -((cursorPosition.y / window.innerHeight) * 2 - 1) * 0.15;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#0A0A1A"
          emissive="#00F0FF"
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.12, 1.65, 0.35]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.12, 1.65, 0.35]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
        <meshStandardMaterial
          color="#111128"
          emissive="#8B5CF6"
          emissiveIntensity={0.05}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Holographic ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 0.85, 64]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/**
 * Helper: set a morph target by name across all meshes
 */
function setMorphTarget(meshes, name, value) {
  for (const mesh of meshes) {
    const dict = mesh.morphTargetDictionary;
    if (dict && name in dict) {
      mesh.morphTargetInfluences[dict[name]] = value;
    }
  }
}

// Preload avatar model
try {
  useGLTF.preload('/models/avatar.glb');
} catch {
  // Model may not exist yet
}
