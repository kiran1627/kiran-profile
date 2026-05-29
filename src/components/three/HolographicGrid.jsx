'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create shader material at module level to avoid React purity/ref rules
const gridMaterial = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#00F0FF') },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vDist;
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vDist = length(worldPos.xz);
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying float vDist;

    void main() {
      // Grid lines
      vec2 grid = abs(fract(vUv * 40.0 - 0.5) - 0.5) / fwidth(vUv * 40.0);
      float line = min(grid.x, grid.y);
      float gridAlpha = 1.0 - min(line, 1.0);

      // Fade with distance
      float distFade = smoothstep(20.0, 2.0, vDist);

      // Scan line effect
      float scan = smoothstep(0.0, 0.02, abs(sin(vUv.y * 80.0 + uTime * 2.0))) * 0.3 + 0.7;

      float alpha = gridAlpha * distFade * 0.15 * scan;

      gl_FragColor = vec4(uColor, alpha);
    }
  `,
});

export default function HolographicGrid() {
  const gridRef = useRef();

  useFrame((state) => {
    gridMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    if (gridRef.current) {
      gridRef.current.rotation.x = -Math.PI / 2;
      gridRef.current.position.y = -3;
    }
  });

  return (
    <mesh ref={gridRef} material={gridMaterial}>
      <planeGeometry args={[40, 40, 1, 1]} />
    </mesh>
  );
}
