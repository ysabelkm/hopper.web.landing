"use client";

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Network, Radio, ShieldCheck } from 'lucide-react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { TopScrollProgress } from './TopScrollProgress';

const founders = [
  {
    name: 'Ysabel Ezeani',
    initials: 'YE',
    roles: ['Chief Executive Officer', 'Chief Technology Officer'],
    shorthand: 'CEO / CTO',
    focus: 'Company & Technology',
    icon: Network,
  },
  {
    name: 'Abraham Moradeyo',
    initials: 'AM',
    roles: ['Chief Marketing Officer', 'Chief Financial Officer'],
    shorthand: 'CMO / CFO',
    focus: 'Growth & Finance',
    icon: Radio,
  },
  {
    name: 'Ifenna Okoli',
    initials: 'IO',
    roles: ['Chief Operating Officer'],
    shorthand: 'COO',
    focus: 'Operations',
    icon: ShieldCheck,
  },
];

export const TeamPage = ({ initialTheme }: { initialTheme: 'dark' | 'light' }) => {
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
        <section className="relative px-6 pb-24 pt-40 md:px-12 md:pb-32 md:pt-48 lg:px-20">
          <div className="pointer-events-none absolute left-[-12%] top-[-15%] h-[600px] w-[600px] rounded-full bg-blue-900/10 blur-[140px]" />
          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
              className="max-w-5xl"
            >
              <span className="mb-8 block text-[11px] font-bold uppercase tracking-[0.4em] text-blue-500">
                The founding team
              </span>
              <h1 className="mb-10 text-5xl font-bold leading-[0.94] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[104px]">
                Three co-founders.
              </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-[var(--color-muted)] md:text-xl">
                Hopper is led by a multidisciplinary founding team bringing company building, technology, growth, finance, and operations around one mission: communication that keeps working.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-[var(--color-glass-border)] px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto grid max-w-[1500px] gap-4 lg:grid-cols-3">
            {founders.map((founder, index) => {
              const Icon = founder.icon;
              return (
                <motion.article
                  key={founder.name}
                  {...reveal}
                  transition={{ ...('transition' in reveal ? reveal.transition : {}), delay: prefersReducedMotion ? 0 : index * 0.1 }}
                  className="group flex min-h-[620px] flex-col overflow-hidden rounded-[32px] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] md:min-h-[700px]"
                >
                  <div className="relative flex flex-1 items-center justify-center overflow-hidden border-b border-[var(--color-glass-border)] bg-[var(--color-ghost)]">
                    <div className="absolute inset-x-8 top-8 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-faint)]">
                        Co-founder · 0{index + 1}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-glass-border)] text-blue-500">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>

                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(var(--color-muted)_1px,transparent_1px),linear-gradient(90deg,var(--color-muted)_1px,transparent_1px)] [background-size:36px_36px]"
                      aria-hidden="true"
                    />
                    <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-blue-500/10 blur-[80px] transition-colors duration-300 group-hover:bg-blue-500/15" />
                    <span
                      className="relative select-none text-[112px] font-bold tracking-[-0.09em] text-[var(--color-foreground)] sm:text-[148px] lg:text-[112px] xl:text-[148px]"
                      aria-hidden="true"
                    >
                      {founder.initials}
                    </span>
                  </div>

                  <div className="p-7 md:p-9">
                    <div className="mb-7 flex items-start justify-between gap-5">
                      <div>
                        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{founder.name}</h2>
                        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-500">
                          {founder.shorthand}
                        </p>
                      </div>
                      <span className="mt-1 hidden rounded-full border border-[var(--color-glass-border)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--color-faint)] sm:block">
                        {founder.focus}
                      </span>
                    </div>

                    <div className="border-t border-[var(--color-glass-border)] pt-6">
                      {founder.roles.map((role) => (
                        <p key={role} className="text-sm font-light leading-relaxed text-[var(--color-muted)]">
                          {role}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="border-t border-[var(--color-glass-border)] px-6 py-28 md:px-12 md:py-40 lg:px-20">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <motion.div {...reveal}>
              <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.4em] text-blue-500">
                How we lead
              </span>
              <p className="max-w-xs text-sm font-light leading-relaxed text-[var(--color-muted)]">
                Different responsibilities. Shared ownership.
              </p>
            </motion.div>

            <motion.div {...reveal}>
              <h2 className="mb-10 text-4xl font-bold leading-[1.04] tracking-tighter md:text-6xl">
                Built together from day one.
              </h2>
              <p className="max-w-3xl text-lg font-light leading-relaxed text-[var(--color-muted)] md:text-xl">
                Hopper’s founding team works across disciplines, with every decision connected to the same goal: making resilient communication useful, trustworthy, and accessible to the communities that need it.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-4 md:px-6 md:py-6">
          <motion.div
            {...reveal}
            className="relative mx-auto flex min-h-[440px] max-w-[1500px] flex-col items-center justify-center overflow-hidden rounded-[32px] bg-[#0171e3] px-6 py-20 text-center text-white md:rounded-[44px]"
          >
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_center,transparent_0,transparent_2px,rgba(255,255,255,.2)_2.5px,transparent_3px)] [background-size:28px_28px]" />
            <div className="relative z-10">
              <span className="mb-7 block text-[11px] font-bold uppercase tracking-[0.4em] text-white/70">
                The reason behind the work
              </span>
              <h2 className="mx-auto mb-10 max-w-4xl text-4xl font-bold leading-[1] tracking-tighter md:text-7xl">
                Meet the mission that brought us together.
              </h2>
              <a
                href="/about"
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-7 text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111] transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500"
              >
                About Hopper
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
