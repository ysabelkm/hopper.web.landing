"use client";

import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Section } from './Section';
import { ClosingCTA } from './ClosingCTA';

const EASE = [0.16, 1, 0.3, 1] as const;

export type LegalSection = { title: string; body: ReactNode };

/** A pull-quote rule used by both legal documents for emphasis. */
export const Note = ({ children }: { children: ReactNode }) => (
  <div
    className="pl-5 text-[var(--color-faint)] italic"
    style={{ borderLeft: '1px solid color-mix(in oklab, var(--color-brand-blue) 45%, transparent)' }}
  >
    {children}
  </div>
);

type LegalPageProps = {
  initialTheme: 'dark' | 'light';
  /** Uppercase eyebrow — "Terms" or "Privacy". */
  eyebrow: string;
  /** The two headline lines; the second renders faint. */
  headline: [string, string];
  intro: string;
  effective: string;
  sections: LegalSection[];
};

/**
 * The shared shell for /terms and /privacy. It mirrors the redesigned pages —
 * the same nav pill, type scale, hairline rules, 44px gutters and footer — so
 * the legal documents read as part of the same site rather than as leftovers
 * from the previous build. The document copy itself is passed in untouched.
 */
export const LegalPage = ({
  initialTheme,
  eyebrow,
  headline,
  intro,
  effective,
  sections,
}: LegalPageProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.cookie = `hopper-theme=${theme}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem('hopper-theme', theme);
  }, [theme]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-500 ease-in-out selection:bg-blue-500 selection:text-white">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* ── Header ── */}
      <section className="px-5 pt-[150px] pb-[90px] sm:px-6 md:px-11">
        <div className="mx-auto max-w-[1080px]">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.16 }}
            className="mb-7 block text-[10.5px] font-semibold uppercase tracking-[0.34em] text-[var(--color-brand-blue)]"
          >
            {eyebrow}
          </motion.span>

          <h1 className="m-0 mb-8 font-display text-[clamp(38px,6.4vw,84px)] font-semibold leading-[0.98] tracking-[-0.045em]">
            {/* Masked line reveals, matching the hero treatment elsewhere. */}
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.16em] mb-[-0.10em]">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.24 + i * 0.14, ease: EASE }}
                  className={i === 1 ? 'block text-[var(--color-faint)]' : 'block'}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.56, ease: EASE }}
            className="m-0 max-w-[640px] text-[clamp(16px,1.7vw,19px)] leading-[1.65] text-[var(--color-muted)]"
          >
            {intro}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="m-0 mt-10 border-t border-[var(--color-surface-border)] pt-[18px] text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-faint)]"
          >
            {effective}
          </motion.p>
        </div>
      </section>

      {/* ── Document body ── */}
      <Section className="px-5 pb-[150px] sm:px-6 md:px-11">
        <div className="mx-auto flex max-w-[1080px] flex-col">
          {sections.map(sec => (
            <div
              key={sec.title}
              className="grid gap-6 border-t border-[var(--color-surface-border)] py-[52px] md:grid-cols-[240px_1fr] md:gap-14"
            >
              <h2 className="m-0 font-display text-[17px] font-medium leading-snug tracking-[-0.02em] md:sticky md:top-[110px] md:self-start">
                {sec.title}
              </h2>
              {/* min-w-0 so wide children (the permissions table) scroll
                  within this column rather than stretching the grid. */}
              <div className="flex min-w-0 flex-col gap-4 text-[14.5px] leading-[1.75] text-[var(--color-muted)]">
                {sec.body}
              </div>
            </div>
          ))}
          <div className="border-t border-[var(--color-surface-border)]" />
        </div>
      </Section>

      <ClosingCTA />

      <Footer theme={theme} />
    </main>
  );
};
