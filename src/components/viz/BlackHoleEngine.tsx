"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Cinematic black hole (canvas 2D) — a single pure-black sphere wrapped by one
 * glowing ring. The ring is alive: rotating light "hotspots" sweep around it
 * and tiny particles orbit the hole (inner ones faster), a few spiralling
 * inward. Warm palette (deep orange → amber → white-hot) to match the
 * reference. Everything shares ONE near-circular axis — no stray ellipses.
 *
 * Smooth gradient rendering (not dotty), crisp on high-DPI, single rAF loop,
 * IntersectionObserver pause, reduced-motion static.
 */

interface Orbiter {
  r: number;
  theta: number;
  speed: number;
  size: number;
  alpha: number;
  drift: number;
}

function makeGlow(rgb: [number, number, number], size = 48) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},1)`);
  g.addColorStop(0.4, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.45)`);
  g.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

// Slight vertical squash so the ring reads as a disk seen just off edge-on,
// while staying on a single axis.
const FLATTEN = 0.94;

export function BlackHoleEngine({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let raf = 0;
    let running = true;
    let last = performance.now();
    let reveal = 0;

    const mouse = { x: 0, y: 0, active: false };
    const particleGlow = makeGlow([255, 196, 120]);
    const hotGlow = makeGlow([255, 236, 205], 96);

    let stars: { x: number; y: number; a: number; s: number }[] = [];
    let orbiters: Orbiter[] = [];

    const build = () => {
      const mobile = w < 768;
      stars = Array.from({ length: mobile ? 40 : 90 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        a: 0.05 + Math.random() * 0.2,
        s: Math.random() * 1.3 + 0.3,
      }));
      const n = mobile ? 70 : 150;
      orbiters = Array.from({ length: n }, () => spawnOrbiter());
    };

    const spawnOrbiter = (): Orbiter => {
      const r = R * (1.04 + Math.pow(Math.random(), 1.6) * 1.1);
      return {
        r,
        theta: Math.random() * Math.PI * 2,
        speed: (0.9 / Math.pow(r / R, 1.3)) * (0.7 + Math.random() * 0.5),
        size: 3 + Math.random() * 5,
        alpha: 0.25 + Math.random() * 0.5,
        drift: 0.002 + Math.random() * 0.01, // slow inward spiral
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
      R = Math.min(w, h) * (w < 768 ? 0.17 : 0.15);
      build();
    };

    const draw = (now: number, dt: number) => {
      const ox = mouse.active ? (mouse.x - cx) * 0.012 : 0;
      const oy = mouse.active ? (mouse.y - cy) * 0.012 : 0;

      // ---- space ----
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#06070c";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = "#cfe0ff";
      for (const st of stars) {
        ctx.globalAlpha = st.a * reveal * (0.6 + 0.4 * Math.sin(now * 0.001 + st.x));
        ctx.fillRect(st.x + ox * 4, st.y + oy * 4, st.s, st.s);
      }
      ctx.globalAlpha = 1;

      // ---- soft outer bloom ----
      const bloom = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 3);
      bloom.addColorStop(0, `rgba(255,168,80,${0.06 * reveal})`);
      bloom.addColorStop(1, "rgba(255,168,80,0)");
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 3, 0, Math.PI * 2);
      ctx.fill();

      // ---- base ring glow (steady, hugging the sphere) ----
      const ring = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.6);
      ring.addColorStop(0, "rgba(255,240,210,0)");
      ring.addColorStop(0.16, `rgba(255,246,226,${0.85 * reveal})`);
      ring.addColorStop(0.4, `rgba(255,162,64,${0.5 * reveal})`);
      ring.addColorStop(1, "rgba(255,120,30,0)");
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, FLATTEN);
      ctx.fillStyle = ring;
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ---- rotating light hotspots sweeping around the ring ----
      const HOTS = 5;
      const baseA = now * 0.00035;
      for (let i = 0; i < HOTS; i++) {
        const a = baseA + (i / HOTS) * Math.PI * 2;
        const hx = cx + Math.cos(a) * R * 1.08;
        const hy = cy + Math.sin(a) * R * 1.08 * FLATTEN;
        // brighter on the left ("approaching") side
        const beam = 0.4 + 0.6 * (0.5 - 0.5 * Math.cos(a));
        const flick = 0.8 + 0.2 * Math.sin(now * 0.002 + i);
        const s = R * (1.1 + 0.15 * Math.sin(now * 0.0013 + i));
        ctx.globalAlpha = 0.5 * beam * flick * reveal;
        ctx.drawImage(hotGlow, hx - s / 2, hy - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      // ---- orbiting particles ----
      const spin = dt * 0.001;
      for (const p of orbiters) {
        p.theta += p.speed * spin;
        p.r -= p.drift * dt * 0.03;
        if (p.r < R * 1.03) {
          // consumed → respawn on the outer edge
          Object.assign(p, spawnOrbiter());
          p.r = R * (1.9 + Math.random() * 0.3);
        }
        const px = cx + Math.cos(p.theta) * p.r;
        const py = cy + Math.sin(p.theta) * p.r * FLATTEN;
        // hide the far/back arc behind the sphere for depth
        const behind = Math.sin(p.theta) < 0 && Math.hypot(px - cx, py - cy) < R * 1.02;
        if (behind) continue;
        const beam = 0.55 + 0.65 * (0.5 - 0.5 * Math.cos(p.theta));
        ctx.globalAlpha = Math.min(1, p.alpha * beam * reveal);
        ctx.drawImage(particleGlow, px - p.size / 2, py - p.size / 2, p.size, p.size);
      }
      ctx.globalAlpha = 1;

      // ---- pure black event horizon (on top → hides anything inside) ----
      ctx.globalCompositeOperation = "source-over";
      const core = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.02);
      core.addColorStop(0, "rgba(0,0,0,1)");
      core.addColorStop(0.86, "rgba(0,0,0,1)");
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2);
      ctx.fill();

      // ---- crisp thin photon rim just outside the horizon ----
      ctx.globalCompositeOperation = "lighter";
      const rim = ctx.createRadialGradient(cx, cy, R * 0.98, cx, cy, R * 1.14);
      rim.addColorStop(0, "rgba(255,244,222,0)");
      rim.addColorStop(0.5, `rgba(255,244,222,${0.6 * reveal})`);
      rim.addColorStop(1, "rgba(255,244,222,0)");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.14, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const step = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      reveal = Math.min(1, reveal + dt * 0.0009);
      draw(now, dt);
      if (running) raf = requestAnimationFrame(step);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduced) {
          last = performance.now();
          raf = requestAnimationFrame(step);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);
    io.observe(canvas);

    if (reduced) {
      reveal = 1;
      draw(0, 16);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
      io.disconnect();
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
