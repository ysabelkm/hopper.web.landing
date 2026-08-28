"use client";

import { useEffect, useRef } from 'react';

type MeshNode = { x: number; y: number; vx: number; vy: number; glow: number };
type MeshPulse = { a: number; b: number; t: number; sp: number; done?: boolean };

type MeshOptions = {
  /** Accent colour of the travelling packets. Defaults to the brand blue. */
  accent?: string;
  /** Scales the node count — the pricing hero runs a slightly sparser field. */
  density?: number;
};

/**
 * Animated mesh background: a jittered grid of drifting nodes, hairline links
 * between near neighbours, and accent-coloured packets that hop from node to
 * node — each arrival has a 72% chance of spawning a further hop, so the field
 * reads as a message being relayed rather than as decoration.
 *
 * The theme is re-read from `<html>` on every frame, so the canvas never needs
 * re-mounting when the user flips the toggle.
 */
export function useMeshCanvas({ accent = '#0171e3', density: densityScale = 1 }: MeshOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hex = accent.replace('#', '');
    const n32 = parseInt(hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex, 16);
    const ar = (n32 >> 16) & 255, ag = (n32 >> 8) & 255, ab = n32 & 255;

    let W = 0, H = 0, frame = 0;
    let nodes: MeshNode[] = [];
    let pulses: MeshPulse[] = [];
    let raf: number | null = null;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width; H = rect.height;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = Math.max(22, Math.min(84, Math.round((W * H) / 22000 * densityScale)));
      const cols = Math.max(4, Math.round(Math.sqrt(density * (W / Math.max(H, 1)))));
      const rows = Math.max(3, Math.ceil(density / cols));
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({
            x: ((c + 0.5) / cols) * W + (Math.random() - 0.5) * (W / cols) * 0.85,
            y: ((r + 0.5) / rows) * H + (Math.random() - 0.5) * (H / rows) * 0.85,
            vx: (Math.random() - 0.5) * 0.12,
            vy: (Math.random() - 0.5) * 0.12,
            glow: 0,
          });
        }
      }
      pulses = [];
    };

    const linkDist = () => Math.max(120, Math.min(W, H) * 0.22);

    const spawnHop = (from: number | null) => {
      const i = from == null ? Math.floor(Math.random() * nodes.length) : from;
      if (!nodes[i]) return;
      const D = linkDist();
      const near: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = nodes[j].x - nodes[i].x, dy = nodes[j].y - nodes[i].y;
        if (dx * dx + dy * dy < D * D) near.push(j);
      }
      if (!near.length) return;
      pulses.push({ a: i, b: near[Math.floor(Math.random() * near.length)], t: 0, sp: 0.012 + Math.random() * 0.012 });
    };

    const draw = () => {
      const light = document.documentElement.classList.contains('light');
      const base = light ? '0,0,0' : '255,255,255';
      const D = linkDist();
      ctx.clearRect(0, 0, W, H);

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const target = md < 160 ? 1 - md / 160 : 0;
        n.glow += (target - n.glow) * 0.08;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x, dy = nodes[j].y - nodes[i].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > D) continue;
          const near = Math.max(nodes[i].glow, nodes[j].glow);
          const a = (1 - d / D) * (light ? 0.13 : 0.16) + near * 0.22;
          ctx.strokeStyle = `rgba(${base},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(${base},${((light ? 0.2 : 0.26) + n.glow * 0.7).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5 + n.glow * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (frame % 46 === 0 && pulses.length < 7) spawnHop(null);
      for (const p of pulses) {
        p.t += p.sp;
        const A = nodes[p.a], B = nodes[p.b];
        if (!A || !B) { p.t = 2; continue; }
        const x = A.x + (B.x - A.x) * p.t, y = A.y + (B.y - A.y) * p.t;
        const g = ctx.createLinearGradient(A.x, A.y, x, y);
        g.addColorStop(0, `rgba(${ar},${ag},${ab},0)`);
        g.addColorStop(1, `rgba(${ar},${ag},${ab},0.85)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${ar},${ag},${ab},0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx.fill();
        if (p.t >= 1 && !p.done) {
          p.done = true;
          if (nodes[p.b]) nodes[p.b].glow = 1;
          if (Math.random() < 0.72 && pulses.length < 9) spawnHop(p.b);
        }
      }
      pulses = pulses.filter(p => p.t < 1.05);

      frame++;
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => build();
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove);
    build();
    draw();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [accent, densityScale]);

  return canvasRef;
}
