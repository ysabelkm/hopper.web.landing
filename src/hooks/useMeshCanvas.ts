"use client";

import { useEffect, useRef } from 'react';

type MeshNode = { x: number; y: number; vx: number; vy: number; glow: number };

type MeshOptions = {
  /** Scales the node count — the pricing hero runs a slightly sparser field. */
  density?: number;
};

/**
 * Animated mesh background: a jittered grid of drifting nodes and hairline
 * links between near neighbours, brightening around the pointer.
 *
 * The theme is re-read from `<html>` on every frame, so the canvas never needs
 * re-mounting when the user flips the toggle.
 */
export function useMeshCanvas({ density: densityScale = 1 }: MeshOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let nodes: MeshNode[] = [];
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
    };

    const linkDist = () => Math.max(120, Math.min(W, H) * 0.22);

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

      raf = requestAnimationFrame(draw);
    };

    // Watch the canvas itself, not the window: a hero sized by its content
    // (e.g. once images load) grows without any window resize, and a stale
    // backing store would be stretched by CSS into smeared vertical streaks.
    let lastW = 0, lastH = 0;
    const observer = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      if (Math.round(rect.width) === lastW && Math.round(rect.height) === lastH) return;
      lastW = Math.round(rect.width);
      lastH = Math.round(rect.height);
      build();
    });
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    observer.observe(canvas);
    window.addEventListener('pointermove', onMove);
    build();
    draw();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [densityScale]);

  return canvasRef;
}
