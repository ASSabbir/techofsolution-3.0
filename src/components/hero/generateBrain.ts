export type BrainData = {
  positions: Float32Array; // nodeCount * 3
  nodeCount: number;
  activeMask: Float32Array; // 0..1 per node — how "important" a node is
  phases: Float32Array; // per-node pulse phase offset
  normalSegments: Float32Array; // pairs of vec3 for the quiet, low-opacity connections
  importantSegments: Float32Array; // pairs of vec3 for the few brighter hub connections
  connectionPairs: [number, number][]; // node index pairs, reused by the data-signal travellers
};

// Small deterministic pseudo-random so the brain looks the same on every
// render/reload instead of reshuffling (a "designed" shape, not noise).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateBrain(nodeCount = 170, seed = 7): BrainData {
  const rand = mulberry32(seed);
  const positions = new Float32Array(nodeCount * 3);
  const activeMask = new Float32Array(nodeCount);
  const phases = new Float32Array(nodeCount);

  const rx = 1.2;
  const ry = 0.92;
  const rz = 0.8;

  for (let i = 0; i < nodeCount; i++) {
    // Random point on a unit sphere (uniform-ish distribution).
    const u = rand();
    const v = rand();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = Math.sin(phi) * Math.cos(theta);
    let y = Math.cos(phi);
    let z = Math.sin(phi) * Math.sin(theta);

    // Pull points slightly toward the surface (hollow-ish shell rather than
    // a solid ball) so connections read as a structure, not a blob.
    const shell = 0.78 + rand() * 0.22;
    x *= rx * shell;
    y *= ry * shell;
    z *= rz * shell;

    // Two-lobe bias: nudge each point away from the center split so a faint
    // hemisphere gap appears, echoing a brain silhouette without being literal.
    const split = 0.09;
    x += x >= 0 ? split : -split;

    // Organic wobble instead of a perfect ellipsoid.
    const wobble = Math.sin(x * 3.1 + y * 4.7) * 0.05 + Math.cos(z * 3.9 + y * 2.1) * 0.05;
    x += wobble;
    y += wobble * 0.6;
    z += wobble * 0.8;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Only a small minority of nodes are ever "active" / bright / pulsing.
    activeMask[i] = rand() > 0.88 ? 0.6 + rand() * 0.4 : rand() * 0.15;
    phases[i] = rand() * Math.PI * 2;
  }

  // Nearest-neighbour connections (k=2), deduplicated.
  const seen = new Set<string>();
  const pairs: [number, number][] = [];
  const maxDist = 0.42;

  for (let i = 0; i < nodeCount; i++) {
    const ax = positions[i * 3];
    const ay = positions[i * 3 + 1];
    const az = positions[i * 3 + 2];
    const candidates: { j: number; d: number }[] = [];

    for (let j = 0; j < nodeCount; j++) {
      if (i === j) continue;
      const dx = ax - positions[j * 3];
      const dy = ay - positions[j * 3 + 1];
      const dz = az - positions[j * 3 + 2];
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (d < maxDist) candidates.push({ j, d });
    }

    candidates.sort((a, b) => a.d - b.d);
    for (const { j } of candidates.slice(0, 2)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push([i, j]);
    }
  }

  const importantCount = Math.round(pairs.length * 0.08);
  const normal: number[] = [];
  const important: number[] = [];

  pairs.forEach(([a, b], idx) => {
    const bucket = idx % Math.round(pairs.length / Math.max(importantCount, 1)) === 0 ? important : normal;
    bucket.push(
      positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2],
      positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]
    );
  });

  return {
    positions,
    nodeCount,
    activeMask,
    phases,
    normalSegments: new Float32Array(normal),
    importantSegments: new Float32Array(important),
    connectionPairs: pairs,
  };
}