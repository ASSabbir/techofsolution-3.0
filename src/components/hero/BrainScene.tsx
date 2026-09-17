"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateBrain } from "./generateBrain";
import BrainNodes from "./BrainNodes";
import BrainConnections from "./BrainConnections";
import DataSignals from "./DataSignals";

export default function BrainScene({
  reduced,
  mouse,
  scrollT,
}: {
  reduced: boolean;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollT: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const data = useMemo(() => generateBrain(170, 7), []);

  // Smoothed (lerped) values so the brain drifts toward the cursor instead
  // of snapping to it.
  const smoothed = useRef({ rotY: 0, rotX: 0 });

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.elapsedTime;

    if (reduced) {
      // Static, calm pose — no rotation, no float, no signals.
      group.rotation.set(0.05, -0.4, 0);
      group.position.y = 0;
      return;
    }

    // A) very slow, bounded sway rather than a full continuous spin —
    // keeps the shape reading as "held in place", never showing its back.
    const sway = Math.sin(t * ((Math.PI * 2) / 32)) * 0.16;

    // Mouse influence is intentionally tiny — automatic animation dominates.
    const targetOffsetY = mouse.current.x * 0.1;
    const targetOffsetX = -mouse.current.y * 0.06;

    smoothed.current.rotY = THREE.MathUtils.lerp(smoothed.current.rotY, targetOffsetY, delta * 1.4);
    smoothed.current.rotX = THREE.MathUtils.lerp(smoothed.current.rotX, targetOffsetX, delta * 1.4);

    group.rotation.y = -0.36 + sway + smoothed.current.rotY;
    group.rotation.x = 0.05 + smoothed.current.rotX;

    // B) gentle vertical float.
    group.position.y = Math.sin(t * 0.4) * 0.045;

    // Subtle scroll parallax.
    group.position.x = 0.06 + scrollT.current * 0.08;
  });

  return (
    <group ref={groupRef} scale={0.85}>
      <BrainConnections data={data} />
      <BrainNodes data={data} reduced={reduced} />
      <DataSignals data={data} reduced={reduced} />
    </group>
  );
}