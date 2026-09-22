"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * 2D canvas hero environment: a subtle technical node network.
 *
 * Design intent — "premium fintech infrastructure + AI laboratory", not a
 * hacker/cyberpunk scene. Nodes drift slowly, near neighbours connect with
 * faint blue lines, and occasional teal data pulses travel along connections
 * to imply live data flow. The whole field parallaxes gently toward the mouse.
 *
 * Performance: node count scales with viewport, connections use a squared-
 * distance check (no sqrt in the hot loop), DPR is capped at 2, and the field
 * pauses when off-screen. Fully static (single frame) under reduced motion.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Pulse {
  a: number; // source node index
  b: number; // target node index
  t: number; // 0..1 progress
  speed: number;
}

const LINK_DIST = 140; // px threshold for drawing a connection
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let running = true;

    // Pointer parallax (smoothed toward target).
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const seedNodes = () => {
      // Density scales with area but is capped for performance.
      const target = Math.min(90, Math.floor((width * height) / 18000));
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.6,
      }));
      pulses = [];
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    };

    const drawGrid = () => {
      // Faint technical grid, brightening slightly toward the top.
      const gridSize = 64;
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.strokeStyle = "rgba(122,168,255,0.035)";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.strokeStyle = "rgba(122,168,255,0.035)";
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      // Smooth parallax toward the pointer.
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const px = mouse.x * 18; // max parallax offset in px
      const py = mouse.y * 18;

      // Move nodes (skip when reduced motion — static field).
      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }

      // Connections.
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DIST_SQ) {
            const alpha = (1 - distSq / LINK_DIST_SQ) * 0.28;
            ctx.strokeStyle = `rgba(79,140,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x + px, a.y + py);
            ctx.lineTo(b.x + px, b.y + py);
            ctx.stroke();

            // Occasionally spawn a data pulse along a close link.
            if (!reduced && Math.random() < 0.0006 && pulses.length < 14) {
              pulses.push({ a: i, b: j, t: 0, speed: 0.012 + Math.random() * 0.02 });
            }
          }
        }
      }

      // Nodes.
      for (const n of nodes) {
        ctx.fillStyle = "rgba(180,205,255,0.55)";
        ctx.beginPath();
        ctx.arc(n.x + px, n.y + py, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Teal data pulses traveling along connections.
      if (!reduced) {
        pulses = pulses.filter((p) => p.t <= 1);
        for (const p of pulses) {
          const a = nodes[p.a];
          const b = nodes[p.b];
          if (!a || !b) {
            p.t = 2;
            continue;
          }
          p.t += p.speed;
          const x = a.x + (b.x - a.x) * p.t + px;
          const y = a.y + (b.y - a.y) * p.t + py;
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 6);
          glow.addColorStop(0, "rgba(85,224,204,0.9)");
          glow.addColorStop(1, "rgba(85,224,204,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (running && !reduced) {
        raf = requestAnimationFrame(render);
      }
    };

    const onMouse = (e: MouseEvent) => {
      // Normalize to -1..1 around the viewport center.
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    // Pause rendering when the hero scrolls out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduced) {
          raf = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    io.observe(canvas);

    // Reduced motion: render a single static frame.
    if (reduced) {
      render();
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      io.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
