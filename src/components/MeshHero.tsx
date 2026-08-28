"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { useMeshCanvas } from "../hooks/useMeshCanvas";
import { cn } from "../lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The eyebrow / headline / footnote entry timings, shared by all three heroes. */
export const HERO_DELAY = {
  eyebrow: 0.16,
  badges: 0.3,
  lineOne: 0.24,
  lineTwo: 0.38,
  paragraph: 0.56,
  footnotes: 0.8,
};

export const HeroLine = ({
  children,
  delay,
  faint,
}: {
  children: ReactNode;
  delay: number;
  faint?: boolean;
}) => (
  <span className="block overflow-hidden pb-[0.16em] mb-[-0.10em]">
    <motion.span
      initial={{ y: "105%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={cn("block", faint && "text-[var(--color-faint)]")}
    >
      {children}
    </motion.span>
  </span>
);

export const StoreBadges = ({
  href = "/pricing",
  height = 42,
}: {
  href?: string;
  height?: number;
}) => (
  <>
    <a
      href={href}
      aria-label="Download on the App Store"
      className="block transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-85"
    >
      <img
        src="/images/appstorebutton.png"
        alt="Download on the App Store"
        style={{ height }}
        className="block w-auto"
      />
    </a>
    <a
      href={href}
      aria-label="Get it on Google Play"
      className="block transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-85"
    >
      <img
        src="/images/playstorebutton.png"
        alt="Get it on Google Play"
        style={{ height }}
        className="block w-auto"
      />
    </a>
  </>
);

type MeshHeroProps = {
  /** Row 1 left — the uppercase eyebrow. */
  eyebrow: string;
  /** Row 1 right — store badges by default, the billing control on pricing. */
  topRight?: ReactNode;
  /** Row 2 — the bottom-anchored block (paragraph over headline). */
  children: ReactNode;
  /** Row 3 — the two uppercase footnotes on the hairline rule. */
  footnotes: [string, string];
  /** Pricing centres its price line instead of anchoring it to the bottom. */
  align?: "end" | "center";
  /** Pricing runs a sparser field and a wider, centred scrim. */
  density?: number;
  scrim?: string;
};

const DEFAULT_SCRIM =
  "radial-gradient(ellipse 52% 46% at 42% 62%, color-mix(in oklab, var(--color-background) 90%, transparent) 0%, transparent 76%)";

export const MeshHero = ({
  eyebrow,
  topRight,
  children,
  footnotes,
  align = "end",
  density,
  scrim = DEFAULT_SCRIM,
}: MeshHeroProps) => {
  const canvasRef = useMeshCanvas({ density });

  return (
    <section className="relative min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full pointer-events-none"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: scrim }}
      />

      <div className="relative grid min-h-screen grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] px-5 pt-[104px] pb-[30px] sm:px-6 md:px-11">
        {/* Row 1 — eyebrow · store badges */}
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-5">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: HERO_DELAY.eyebrow }}
            className="text-[10.5px] font-semibold uppercase tracking-[0.34em] text-[var(--color-faint)]"
          >
            {eyebrow}
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: HERO_DELAY.badges, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            {topRight ?? <StoreBadges />}
          </motion.div>
        </div>

        {/* Row 2 — the headline block */}
        <div
          className={cn(
            "relative flex flex-col gap-[26px]",
            align === "end" ? "self-end" : "self-center",
          )}
        >
          {children}
        </div>

        {/* Row 3 — footnotes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: HERO_DELAY.footnotes }}
          className="relative mt-[30px] flex flex-wrap justify-between gap-x-10 gap-y-2.5 border-t border-[var(--color-surface-border)] pt-[18px] text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-faint)]"
        >
          <span>{footnotes[0]}</span>
          <span>{footnotes[1]}</span>
        </motion.div>
      </div>
    </section>
  );
};

/** The paragraph that sits above the headline in rows anchored to the bottom. */
export const HeroParagraph = ({ children }: { children: ReactNode }) => (
  <motion.p
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: HERO_DELAY.paragraph, ease: EASE }}
    className="m-0 max-w-[400px] text-base leading-[1.65] text-[var(--color-muted)]"
  >
    {children}
  </motion.p>
);

/** The oversized two-line hero headline. */
export const HeroHeadline = ({ lines }: { lines: [string, string] }) => (
  <h1 className="m-0 font-display font-semibold tracking-[-0.05em] leading-[0.82] text-[clamp(46px,10.4vw,168px)]">
    <HeroLine delay={HERO_DELAY.lineOne}>{lines[0]}</HeroLine>
    <HeroLine delay={HERO_DELAY.lineTwo} faint>
      {lines[1]}
    </HeroLine>
  </h1>
);
