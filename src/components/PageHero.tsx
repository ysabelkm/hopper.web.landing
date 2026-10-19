"use client";

import { ReactNode } from 'react';
import { useMeshCanvas } from '../hooks/useMeshCanvas';
import { Eyebrow, Pill } from './ui/Pill';

type PageHeroProps = {
  eyebrow: string;
  /** First headline line, revealed from below. */
  title: string;
  /** Second headline line, set in the tilted blue pill. */
  highlight: string;
  /** The paragraph under the headline. */
  children?: ReactNode;
  /** Buttons or badges under the paragraph. */
  actions?: ReactNode;
};

/** The centred mesh hero used across the secondary pages (matches the landing). */
export const PageHero = ({ eyebrow, title, highlight, children, actions }: PageHeroProps) => {
  const canvasRef = useMeshCanvas();

  return (
    <section className="relative overflow-hidden px-4 pt-[132px] pb-[90px] sm:px-6 md:pt-[160px] md:pb-[120px]">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 52% at 50% 46%, color-mix(in oklab, var(--color-background) 94%, transparent) 0%, transparent 78%)',
        }}
      />

      <div className="relative mx-auto flex max-w-[980px] flex-col items-center gap-7 px-1 text-center">
        <span className="animate-[hopFade_900ms_ease_160ms_both]">
          <Eyebrow>{eyebrow}</Eyebrow>
        </span>

        <h1 className="m-0 font-display text-[clamp(40px,7vw,104px)] font-semibold leading-[1.02] tracking-[-0.05em]">
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="block animate-[hopReveal_1100ms_cubic-bezier(0.16,1,0.3,1)_240ms_both]">{title}</span>
          </span>
          <span className="mt-[0.06em] inline-block animate-[hopRise_1100ms_cubic-bezier(0.16,1,0.3,1)_400ms_both]">
            <Pill>{highlight}</Pill>
          </span>
        </h1>

        {children && (
          <p className="m-0 max-w-[540px] animate-[hopRise_1000ms_cubic-bezier(0.16,1,0.3,1)_560ms_both] text-[17px] leading-[1.6] text-[var(--color-muted)] sm:text-lg">
            {children}
          </p>
        )}

        {actions && (
          <div className="flex animate-[hopRise_1000ms_cubic-bezier(0.16,1,0.3,1)_680ms_both] flex-wrap justify-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </section>
  );
};
