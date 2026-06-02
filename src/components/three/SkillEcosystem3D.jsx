'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import NetworkScene from './NetworkScene';
import './Ecosystem.css';

export default function SkillEcosystem3D() {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className="ecosystem-master-wrapper" style={{ height: '800px', width: '100%', position: 'relative' }}>
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
      >
        <color attach="background" args={['#030014']} />
        
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <NetworkScene onNodeHover={setActiveNode} />
        </Suspense>

        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        
        {/* Post-processing effects for neon glow */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        </EffectComposer>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>

      {/* Floating HUD Panel for active hovered node */}
      <div className={`glass-hud-panel ${activeNode ? 'visible' : ''}`}>
        {activeNode && (
          <div className="hud-content" style={{ borderLeftColor: activeNode.color }}>
            <span className="hud-category" style={{ color: activeNode.color }}>
              {activeNode.categoryName || activeNode.name}
            </span>
            <h3 className="hud-title">{activeNode.name}</h3>
          </div>
        )}
      </div>

    </div>
  );
}
