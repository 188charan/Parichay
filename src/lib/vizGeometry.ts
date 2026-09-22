/**
 * Deterministic geometry helpers for the Living Systems visuals.
 *
 * Positions are derived from a seeded pseudo-random generator so the server and
 * client render identical networks (no hydration mismatch) and the layout is
 * stable between renders.
 */

export interface VizNode {
  id: number;
  x: number;
  y: number;
  r: number;
}

export interface VizEdge {
  a: number;
  b: number;
  /** 0..1 closeness weight (closer = stronger line). */
  w: number;
}

/** Mulberry32 seeded PRNG — small, fast, deterministic. */
function seeded(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate a network of `count` nodes within a `width`×`height` viewBox and the
 * edges between nodes closer than `linkDist`.
 */
export function buildNetwork(
  count: number,
  width: number,
  height: number,
  seed = 7,
  linkDist = 34,
): { nodes: VizNode[]; edges: VizEdge[] } {
  const rand = seeded(seed);
  // Round to 3 decimals so server and client render byte-identical attributes
  // (JS trig/float ops are not guaranteed bit-identical across engines).
  const round = (n: number) => Math.round(n * 1000) / 1000;
  const nodes: VizNode[] = Array.from({ length: count }, (_, id) => ({
    id,
    x: round(rand() * width),
    y: round(rand() * height),
    r: round(0.8 + rand() * 1.6),
  }));

  const edges: VizEdge[] = [];
  const linkSq = linkDist * linkDist;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const distSq = dx * dx + dy * dy;
      if (distSq < linkSq) {
        edges.push({ a: i, b: j, w: 1 - distSq / linkSq });
      }
    }
  }
  return { nodes, edges };
}

/**
 * Deterministic 0..1 value for a given index (for staggered delays etc).
 * Rounded to 4 decimals to stay byte-identical between server and client
 * render (trig is not guaranteed bit-identical across JS engines).
 */
export function jitter(index: number, seed = 1): number {
  const x = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return Math.round((x - Math.floor(x)) * 10000) / 10000;
}
