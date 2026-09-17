"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { extend, type ThreeElement } from "@react-three/fiber";
import * as THREE from "three";
import type { BrainData } from "./generateBrain";

const NodeMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#c89b4a"),
    uReduced: 0,
  },
  /* vertex */ `
    attribute float aPhase;
    attribute float aActive;
    varying float vAlpha;
    uniform float uTime;
    uniform float uReduced;

    void main() {
      float pulse = uReduced > 0.5
        ? 0.7
        : (sin(uTime * 0.6 + aPhase) * 0.5 + 0.5);

      // Dim, mostly-static nodes vs. a small minority of bright, pulsing ones.
      float baseAlpha = mix(0.10, 0.85, aActive);
      vAlpha = baseAlpha * mix(0.75, 1.0, pulse);

      float size = mix(2.2, 4.2, aActive);

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (260.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /* fragment */ `
    uniform vec3 uColor;
    varying float vAlpha;

    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float d = length(uv);
      float edge = smoothstep(0.5, 0.0, d);
      gl_FragColor = vec4(uColor, edge * vAlpha);
    }
  `
);

extend({ NodeMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    nodeMaterial: ThreeElement<typeof NodeMaterial>;
  }
}

export default function BrainNodes({ data, reduced }: { data: BrainData; reduced: boolean }) {
  const materialRef = useRef<InstanceType<typeof NodeMaterial>>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(data.phases, 1));
    geo.setAttribute("aActive", new THREE.BufferAttribute(data.activeMask, 1));
    return geo;
  }, [data]);

  useFrame((state) => {
    if (materialRef.current && !reduced) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <points geometry={geometry}>
      <nodeMaterial
        ref={materialRef}
        uReduced={reduced ? 1 : 0}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}