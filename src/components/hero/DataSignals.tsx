"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { BrainData } from "./generateBrain";

const SIGNAL_COUNT = 7;
const BASE_COLOR = new THREE.Color("#e3c07f");

type Signal = {
  pair: [number, number];
  t: number;
  speed: number;
  delay: number;
};

function randomPair(pairs: [number, number][]): [number, number] {
  return pairs[Math.floor(Math.random() * pairs.length)];
}

export default function DataSignals({ data, reduced }: { data: BrainData; reduced: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, signals } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(SIGNAL_COUNT * 3);
    const colors = new Float32Array(SIGNAL_COUNT * 3);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));

    const signals: Signal[] = Array.from({ length: SIGNAL_COUNT }, () => ({
      pair: randomPair(data.connectionPairs),
      t: 0,
      speed: 0.18 + Math.random() * 0.12,
      delay: Math.random() * 6,
    }));

    return { geometry: geo, signals };
  }, [data]);

  useFrame((state, delta) => {
    if (reduced || !pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const colAttr = pointsRef.current.geometry.attributes.color as THREE.BufferAttribute;

    signals.forEach((signal, i) => {
      if (signal.delay > 0) {
        signal.delay -= delta;
        colAttr.setXYZ(i, 0, 0, 0);
        return;
      }

      signal.t += delta * signal.speed;
      if (signal.t >= 1) {
        signal.t = 0;
        signal.pair = randomPair(data.connectionPairs);
        signal.delay = 1 + Math.random() * 5;
      }

      const [a, b] = signal.pair;
      const ax = data.positions[a * 3], ay = data.positions[a * 3 + 1], az = data.positions[a * 3 + 2];
      const bx = data.positions[b * 3], by = data.positions[b * 3 + 1], bz = data.positions[b * 3 + 2];

      const x = ax + (bx - ax) * signal.t;
      const y = ay + (by - ay) * signal.t;
      const z = az + (bz - az) * signal.t;
      posAttr.setXYZ(i, x, y, z);

      // fade in/out across the travel so it never feels like a hard blink
      const fade = Math.sin(Math.min(signal.t, 1) * Math.PI);
      const brightness = 0.5 + fade * 0.5;
      colAttr.setXYZ(i, BASE_COLOR.r * brightness, BASE_COLOR.g * brightness, BASE_COLOR.b * brightness);
    });

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  if (reduced) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={5}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}