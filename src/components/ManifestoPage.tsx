"use client";

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { TopScrollProgress } from './TopScrollProgress';

const beliefs = [
  {
    title: 'Connection is a human need.',
    body: 'The ability to reach another person should not disappear because a tower is distant, a network is crowded, or infrastructure has failed.',
  },
  {
    title: 'The network can be the people.',
    body: 'Every phone already carries the ability to communicate nearby. Together, those devices can form infrastructure that moves with the community.',
  },
  {
    title: 'Resilience should be ordinary.',
    body: 'Technology built for difficult moments should remain simple enough for everyday ones. Preparedness works best when it is already part of daily life.',
  },
  {
    title: 'Privacy belongs in the foundation.',
    body: 'People should not have to trade away private communication for access. Security must shape the architecture from the first line of code.',
  },
  {
    title: 'Access should not be a privilege.',
    body: 'Where someone lives, what they earn, and which infrastructure surrounds them should not decide whether they can stay in touch.',
  },
  {
    title: 'Useful technology gets out of the way.',
    body: 'The complexity of mesh networking should live beneath the surface. For the person using Hopper, sending a message should still feel like sending a message.',
  },
];

export const ManifestoPage = ({ initialTheme }: { initialTheme: 'dark' | 'light' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.cookie = `hopper-theme=${theme};path=/;max-age=31536000`;
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  const reveal = prefersReducedMotion
    ? { initial: false as const }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-foreground)]">
      <TopScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <section className="relative flex min-h-[94vh] items-center px-6 pb-24 pt-40 md:px-12 lg:px-20">
          <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-blue-900/10 blur-[150px]" />
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.85 }}
            className="relative mx-auto w-full max-w-7xl"
          >
            <span className="mb-9 block text-[11px] font-bold uppercase tracking-[0.4em] text-blue-500">
              The Hopper Manifesto
            </span>
            <h1 className="max-w-6xl text-5xl font-bold leading-[0.94] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[104px]">
              The network should belong to the people using it.
            </h1>
            <div className="mt-14 flex flex-col items-start justify-between gap-8 border-t border-[var(--color-glass-border)] pt-8 md:flex-row md:items-end">
              <p className="max-w-2xl text-lg font-light leading-relaxed text-[var(--color-muted)] md:text-xl">
                We believe communication can be more resilient, more private, and less dependent on distant infrastructure. This is what guides us as we build Hopper.
              </p>
              <a
                href="#beliefs"
                className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[var(--color-glass-border)] px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)] transition-colors duration-200 hover:border-[var(--color-muted)] hover:text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Read our beliefs
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </section>

        <section id="beliefs" className="border-t border-[var(--color-glass-border)] px-6 py-28 md:px-12 md:py-40 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <motion.div {...reveal} className="mb-16 grid gap-8 md:mb-24 lg:grid-cols-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-blue-500">What we believe</span>
              <h2 className="text-4xl font-bold leading-[1.04] tracking-tighter md:text-6xl">
                Six principles.<br />One direction.
              </h2>
            </motion.div>

            <div className="border-t border-[var(--color-glass-border)]">
              {beliefs.map((belief, index) => (
                <motion.article
                  key={belief.title}
                  {...reveal}
                  className="group grid gap-8 border-b border-[var(--color-glass-border)] py-10 md:grid-cols-[90px_1fr_1fr] md:items-start md:py-14"
                >
                  <span className="font-mono text-[11px] text-[var(--color-faint)]">0{index + 1}</span>
                  <h3 className="max-w-md text-2xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-blue-500 md:text-3xl">
                    {belief.title}
                  </h3>
                  <p className="max-w-xl text-base font-light leading-relaxed text-[var(--color-muted)]">
                    {belief.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-4 md:px-6 md:py-6">
          <motion.div
            {...reveal}
            className="relative mx-auto flex min-h-[480px] max-w-[1500px] flex-col items-center justify-center overflow-hidden rounded-[32px] bg-[#0171e3] px-6 py-24 text-center text-white md:rounded-[44px]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,transparent_0,transparent_2px,rgba(255,255,255,.2)_2.5px,transparent_3px)] [background-size:28px_28px]" />
            <div className="relative z-10">
              <span className="mb-7 block text-[11px] font-bold uppercase tracking-[0.4em] text-white/70">
                Our work begins here
              </span>
              <h2 className="mx-auto mb-8 max-w-4xl text-4xl font-bold leading-[1] tracking-tighter md:text-7xl">
                Built for the moments that matter.
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-white/80 md:text-lg">
                See how these principles are becoming an offline-first communication network.
              </p>
              <a
                href="/how-it-works"
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-7 text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111] transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500"
              >
                See how Hopper works
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer theme={theme} />
    </div>
  );
};
