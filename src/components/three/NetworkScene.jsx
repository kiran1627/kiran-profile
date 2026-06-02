'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';
import { categories, generateNodePositions, connections } from '../../data/skillsEcosystemData';

export default function NetworkScene({ onNodeHover }) {
  const nodes = useMemo(() => generateNodePositions(), []);
  
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle organic floating movement for the entire system
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  // Helper to draw the circular orbit tracks
  const drawOrbitTrack = (radius) => {
    const points = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return points;
  };

  const orbitTracks = useMemo(() => {
    return [5, 9, 14].map(r => drawOrbitTrack(r));
  }, []);

  return (
    <group ref={groupRef}>
      
      {/* Central Solar Core */}
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={3} transparent opacity={0.9} />
      </Sphere>
      <Sphere args={[2, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.15} />
      </Sphere>
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        KIRAN
      </Text>

      {/* Orbit Rings */}
      {orbitTracks.map((track, i) => (
        <Line
          key={`track-${i}`}
          points={track}
          color="#ffffff"
          transparent
          opacity={0.08}
          lineWidth={1}
        />
      ))}

      {/* Render Category Hubs (Planets) */}
      {categories.map((cat) => (
        <group key={`cat-${cat.id}`} position={cat.position}>
          <Sphere 
            args={[0.6, 32, 32]} 
            onPointerOver={(e) => {
              e.stopPropagation();
              onNodeHover(cat);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              onNodeHover(null);
              document.body.style.cursor = 'auto';
            }}
          >
            <meshStandardMaterial 
              color={cat.color} 
              emissive={cat.color} 
              emissiveIntensity={2} 
              transparent 
              opacity={0.9} 
            />
          </Sphere>
          {/* Wireframe wrapper for infrastructure feel */}
          <Sphere args={[0.85, 16, 16]}>
            <meshBasicMaterial color={cat.color} wireframe transparent opacity={0.25} />
          </Sphere>
          {/* Label */}
          <Text
            position={[0, -1.3, 0]}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#000000"
          >
            {cat.name}
          </Text>
        </group>
      ))}

      {/* Render Skill Nodes (Moons) orbiting their respective Categories */}
      {nodes.map((node, i) => (
        <SkillNode key={`node-${node.id}-${i}`} node={node} onHover={onNodeHover} />
      ))}

      {/* Render Connections between Categories */}
      {connections.map(([sourceId, targetId], i) => {
        const source = categories.find(c => c.id === sourceId);
        const target = categories.find(c => c.id === targetId);
        if (!source || !target) return null;

        return (
          <Line
            key={`conn-${i}`}
            points={[source.position, target.position]}
            color={source.color}
            transparent
            opacity={0.35}
            lineWidth={1.5}
          />
        );
      })}
    </group>
  );
}

// Separate component for individual skills to handle their own orbital animations
function SkillNode({ node, onHover }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Calculate true orbit using trigonometric rotation around the local Y axis
      const t = state.clock.elapsedTime * node.orbitSpeed + node.angleOffset;
      // node.localPosition provides the initial radius distance from the center
      const radius = Math.sqrt(node.localPosition[0]**2 + node.localPosition[2]**2);
      
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      // Add slight vertical oscillation
      meshRef.current.position.y = Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group position={node.catPosition}>
      <Sphere 
        ref={meshRef}
        args={[0.2, 16, 16]} 
        // Initial position before useFrame takes over
        position={node.localPosition}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <meshStandardMaterial 
          color={node.color} 
          emissive={node.color} 
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </group>
  );
}
