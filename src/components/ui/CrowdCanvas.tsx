"use client";

/**
 * A crowd of people walking left and right along the bottom of a container.
 *
 * Adapted from Skiper UI's "Skiper 39" (https://skiper-ui.com, by
 * @gurvinder-singh02), itself inspired by https://codepen.io/zadvorsky/pen/xxwbBQV.
 * Illustrations from Open Peeps (https://www.openpeeps.com/, CC0).
 * Skiper UI's free tier asks for attribution, which this comment provides.
 *
 * Changes from the original: people scale with the canvas height instead of
 * drawing at the sprite's native 240×324px; nobody is ever raised far enough
 * to show their cut-off waist (the original relied on a packed crowd to hide
 * it); the crowd size scales with the width; only a real size change rebuilds
 * the crowd (mobile scrolling fires window resizes constantly); and reduced
 * motion gets a still frame.
 */

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type Peep = {
  /** Source rect in the sprite sheet. */
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  x: number;
  y: number;
  /** Resting y, used to paint back rows before front rows. */
  anchorY: number;
  scaleX: 1 | -1;
  walk: gsap.core.Timeline | null;
};

type CrowdCanvasProps = {
  /** Sprite sheet: a grid of equally sized figures. */
  src: string;
  /** Figures per row of the sheet. */
  columns?: number;
  /** Rows of figures in the sheet. */
  rows?: number;
  /** People on screen per figure-width of canvas. Higher is busier. */
  density?: number;
  className?: string;
};

const random = (min: number, max: number) => min + Math.random() * (max - min);
const takeRandom = <T,>(arr: T[]) => arr.splice((Math.random() * arr.length) | 0, 1)[0];

// The figures are busts cut off at the waist, so a waist must never show or
// the person floats. In sheet pixels: each 324px cell has ink from y≈12 to
// y≈291, and the walk bobs 10px up. Sinking a figure at least SINK_MIN below
// the floor keeps its waist hidden even at the top of a bob. Depth comes from
// sinking further: back rows stand tall, front rows sink to head-and-shoulders
// and are painted over the back rows.
const CELL_H = 324;
const SINK_MIN = 48;
const SINK_MAX = 170;
const BOB = 10;
// Tallest visible figure (least sunk, mid-bob) fits the canvas height exactly.
const HEADROOM = CELL_H - SINK_MIN - 12 + BOB + 6;

export const CrowdCanvas = ({ src, columns = 15, rows = 7, density = 2.8, className }: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = new Image();
    const stage = { w: 0, h: 0, scale: 1, dpr: 1 };
    const all: Peep[] = [];
    const available: Peep[] = [];
    const crowd: Peep[] = [];
    let disposed = false;

    const render = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of crowd) {
        ctx.setTransform(stage.dpr * p.scaleX, 0, 0, stage.dpr, p.x * stage.dpr, p.y * stage.dpr);
        ctx.drawImage(img, p.sx, p.sy, p.sw, p.sh, 0, 0, p.sw * stage.scale, p.sh * stage.scale);
      }
    };

    const removeFromCrowd = (p: Peep) => {
      crowd.splice(crowd.indexOf(p), 1);
      available.push(p);
    };

    const addToCrowd = () => {
      const p = takeRandom(available);
      const w = p.sw * stage.scale;
      const h = p.sh * stage.scale;
      const sink = random(SINK_MIN, SINK_MAX) * stage.scale;
      const startY = stage.h - h + sink;
      const rightward = Math.random() > 0.5;

      // A flipped figure draws leftwards from x, so it starts one width in.
      p.scaleX = rightward ? 1 : -1;
      p.x = rightward ? -w : stage.w + w;
      p.y = p.anchorY = startY;

      const walk = gsap.timeline({
        onComplete: () => {
          removeFromCrowd(p);
          addToCrowd();
        },
      });
      walk.timeScale(random(0.5, 1.5));
      walk.to(p, { duration: 10, x: rightward ? stage.w : 0, ease: "none" }, 0);
      walk.to(p, { duration: 0.25, repeat: 40, yoyo: true, y: startY - BOB * stage.scale }, 0);
      p.walk = walk;

      crowd.push(p);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return p;
    };

    const build = () => {
      for (const p of crowd) p.walk?.kill();
      crowd.length = 0;
      available.length = 0;
      available.push(...all);

      const rect = canvas.getBoundingClientRect();
      stage.w = rect.width;
      stage.h = rect.height;
      stage.dpr = Math.min(window.devicePixelRatio || 1, 2);
      stage.scale = stage.h / HEADROOM;
      canvas.width = Math.max(1, Math.round(stage.w * stage.dpr));
      canvas.height = Math.max(1, Math.round(stage.h * stage.dpr));
      if (!all.length || !stage.w || !stage.h) return;

      const figureW = all[0].sw * stage.scale;
      const count = Math.min(all.length, Math.max(8, Math.round((stage.w / figureW) * density)));
      for (let i = 0; i < count; i++) addToCrowd().walk?.progress(Math.random());

      if (reduceMotion) {
        for (const p of crowd) p.walk?.pause();
        render();
      }
    };

    let lastW = 0, lastH = 0;
    const observer = new ResizeObserver(() => {
      const { width, height } = canvas.getBoundingClientRect();
      if (Math.round(width) === lastW && Math.round(height) === lastH) return;
      lastW = Math.round(width);
      lastH = Math.round(height);
      build();
    });

    img.onload = () => {
      if (disposed) return;
      const sw = img.naturalWidth / columns;
      const sh = img.naturalHeight / rows;
      for (let i = 0; i < columns * rows; i++) {
        all.push({ sx: (i % columns) * sw, sy: ((i / columns) | 0) * sh, sw, sh, x: 0, y: 0, anchorY: 0, scaleX: 1, walk: null });
      }
      // Observing fires once straight away, which does the first build.
      observer.observe(canvas);
      if (!reduceMotion) gsap.ticker.add(render);
    };
    img.src = src;

    return () => {
      disposed = true;
      img.onload = null;
      observer.disconnect();
      gsap.ticker.remove(render);
      for (const p of crowd) p.walk?.kill();
    };
  }, [src, columns, rows, density]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
};
