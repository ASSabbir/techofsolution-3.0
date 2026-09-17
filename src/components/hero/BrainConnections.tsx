"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { BrainData } from "./generateBrain";

export default function BrainConnections({ data }: { data: BrainData }) {
  const normalGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.normalSegments, 3));
    return geo;
  }, [data]);

  const importantGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.importantSegments, 3));
    return geo;
  }, [data]);

  return (
    <>
      <lineSegments geometry={normalGeometry}>
        <lineBasicMaterial color="#c89b4a" transparent opacity={0.12} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={importantGeometry}>
        <lineBasicMaterial color="#e3c07f" transparent opacity={0.26} depthWrite={false} />
      </lineSegments>
    </>
  );
}