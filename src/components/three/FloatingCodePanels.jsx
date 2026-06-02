'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Pre-create geometries outside render to satisfy React purity rules
const PANEL_PLANE = new THREE.PlaneGeometry(3.5, 2.5);
const PANEL_EDGES = new THREE.EdgesGeometry(PANEL_PLANE);

const CODE_SNIPPETS = [
  `def train_model(data):
    model = GPT4(layers=12)
    model.fit(data, epochs=50)
    return model.evaluate()`,
  `import torch
from transformers import AutoModel
pipe = pipeline("text-gen",
  model="gemini-pro")`,
  `class RAGPipeline:
  def retrieve(self, query):
    embeddings = encode(query)
    return vector_db.search(
      embeddings, top_k=5)`,
  `agent = CrewAI(
  role="ML Engineer",
  tools=[search, code_gen],
  llm=gemini_flash
)`,
];

function CodePanel({ position, rotation, snippet, index }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const baseY = position[1];
    meshRef.current.position.y = baseY + Math.sin(time * 0.5 + index * 1.5) * 0.3;
    meshRef.current.rotation.y = rotation[1] + Math.sin(time * 0.3 + index) * 0.05;

    if (materialRef.current) {
      materialRef.current.opacity = 0.06 + Math.sin(time * 0.8 + index * 2) * 0.02;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Panel background */}
      <mesh>
        <planeGeometry args={[3.5, 2.5]} />
        <meshBasicMaterial
          ref={materialRef}
          color="#00E5FF"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Panel border */}
      <lineSegments geometry={PANEL_EDGES}>
        <lineBasicMaterial color="#00E5FF" transparent opacity={0.15} />
      </lineSegments>

      {/* Code text */}
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.12}
        color="#00E5FF"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        lineHeight={1.4}
        fillOpacity={0.4}
      >
        {snippet}
      </Text>
    </group>
  );
}

export default function FloatingCodePanels() {
  const panels = useMemo(() => [
    { position: [-7, 1, -6], rotation: [0, 0.4, 0] },
    { position: [7, 0.5, -5], rotation: [0, -0.4, 0] },
    { position: [-5, -1, -8], rotation: [0, 0.2, 0] },
    { position: [6, 2, -7], rotation: [0, -0.3, 0.05] },
  ], []);

  return (
    <group>
      {panels.map((panel, i) => (
        <CodePanel
          key={i}
          index={i}
          position={panel.position}
          rotation={panel.rotation}
          snippet={CODE_SNIPPETS[i]}
        />
      ))}
    </group>
  );
}
