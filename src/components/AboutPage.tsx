"use client";

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  Globe2,
  Network,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { TopScrollProgress } from './TopScrollProgress';

const principles = [
  {
    icon: Network,
    number: '01',
    title: 'Resilience by design',
    description:
      'Hopper is built to keep people connected when towers are unavailable, networks are congested, or the internet simply does not reach.',
  },
  {
    icon: ShieldCheck,
    number: '02',
    title: 'Privacy is structural',
    description:
      'Communication moves directly between devices. We are designing a network where privacy is part of the architecture, not an optional setting.',
  },
  {
    icon: Users,
    number: '03',
    title: 'Every person strengthens the network',
    description:
      'Each Hopper device can help messages travel farther. The network becomes more useful as communities grow together.',
  },
  {
    icon: Globe2,
    number: '04',
    title: 'Access should be universal',
    description:
      'Reliable communication should not depend on where someone lives, what infrastructure surrounds them, or what data plan they can afford.',
  },
];

const steps = [
  {
    label: 'The problem',
    title: 'Connectivity is still fragile.',
    body: 'A dead zone, an overloaded event, a remote field site, or damaged infrastructure can turn a modern phone into an isolated device.',
  },
  {
    label: 'The idea',
    title: 'Let nearby phones become the network.',
    body: 'The radios people already carry can discover one another, pass messages device to device, and extend communication beyond direct range.',
  },
  {
    label: 'The mission',
    title: 'Make connection more resilient for everyone.',
    body: 'We are building Hopper so communities can communicate on their own terms—with or without conventional infrastructure.',
  },
];

export const AboutPage = ({ initialTheme }: { initialTheme: 'dark' | 'light' }) => {
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
        <section className="relative min-h-[92vh] px-6 pb-20 pt-40 md:px-12 md:pt-48 lg:px-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blue-900/10 blur-[140px]" />
          <div className="relative mx-auto flex min-h-[65vh] max-w-7xl flex-col justify-between gap-20">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
              className="max-w-5xl"
            >
              <span className="mb-8 block text-[11px] font-bold uppercase tracking-[0.4em] text-blue-500">
                About Hopper
              </span>
              <h1 className="text-5xl font-bold leading-[0.94] tracking-[-0.055em] sm:text-6xl md:text-8xl lg:text-[104px]">
                Connection should not<br className="hidden sm:block" /> depend on a signal.
              </h1>
            </motion.div>

            <div className="flex flex-col items-start justify-between gap-10 border-t border-[var(--color-glass-border)] pt-8 md:flex-row md:items-end">
              <p className="max-w-2xl text-lg font-light leading-relaxed text-[var(--color-muted)] md:text-xl">
                Hopper is building an offline-first communication network that lets nearby phones connect directly—so people can keep talking when conventional infrastructure cannot.
              </p>
              <a
                href="#our-story"
                className="inline-flex min-h-11 items-center gap-3 rounded-full border border-[var(--color-glass-border)] px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)] transition-colors duration-200 hover:border-[var(--color-muted)] hover:text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Our story
                <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="our-story" className="border-t border-[var(--color-glass-border)] px-6 py-28 md:px-12 md:py-40 lg:px-20">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <motion.div {...reveal}>
              <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.4em] text-blue-500">
                Why we began
              </span>
              <p className="max-w-sm text-sm font-light leading-relaxed text-[var(--color-muted)]">
                Built in Africa, for a challenge shared everywhere.
              </p>
            </motion.div>

            <motion.div {...reveal}>
              <h2 className="mb-10 text-4xl font-bold leading-[1.02] tracking-tighter md:text-6xl">
                The devices were already there. The network was missing.
              </h2>
              <div className="grid gap-8 text-base font-light leading-relaxed text-[var(--color-muted)] md:grid-cols-2 md:text-lg">
                <p>
                  Hopper started with a simple observation: billions of people carry powerful radios in their pockets, yet communication still stops the moment a tower or internet connection disappears.
                </p>
                <p>
                  We saw an opportunity to rethink that dependency. By helping phones find one another and securely relay information, the people nearby can become the infrastructure.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-[var(--color-glass-border)] px-6 py-28 md:px-12 md:py-40 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <motion.div {...reveal} className="mb-16 max-w-3xl md:mb-24">
              <span className="mb-7 block text-[11px] font-bold uppercase tracking-[0.4em] text-blue-500">
                From problem to purpose
              </span>
              <h2 className="text-4xl font-bold leading-[1.02] tracking-tighter md:text-6xl">
                A different way to think about connectivity.
              </h2>
            </motion.div>

            <div className="grid border-y border-[var(--color-glass-border)] lg:grid-cols-3">
              {steps.map((step, index) => (
                <motion.article
                  key={step.label}
                  {...reveal}
                  transition={{ ...('transition' in reveal ? reveal.transition : {}), delay: prefersReducedMotion ? 0 : index * 0.1 }}
                  className="border-b border-[var(--color-glass-border)] py-10 last:border-b-0 lg:border-b-0 lg:border-r lg:px-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <div className="mb-12 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-faint)]">
                    <span>{step.label}</span>
                    <span>0{index + 1}</span>
                  </div>
                  <h3 className="mb-5 text-2xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-[var(--color-muted)]">{step.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--color-glass-border)] px-6 py-28 md:px-12 md:py-40 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <motion.div {...reveal} className="mb-16 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
              <div>
                <span className="mb-7 block text-[11px] font-bold uppercase tracking-[0.4em] text-blue-500">
                  What guides us
                </span>
                <h2 className="max-w-3xl text-4xl font-bold leading-[1.02] tracking-tighter md:text-6xl">
                  Built around people, not infrastructure.
                </h2>
              </div>
              <p className="max-w-sm text-sm font-light leading-relaxed text-[var(--color-muted)]">
                Four principles shape how we design the product, the network, and the company behind it.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.article
                    key={principle.title}
                    {...reveal}
                    transition={{ ...('transition' in reveal ? reveal.transition : {}), delay: prefersReducedMotion ? 0 : index * 0.08 }}
                    className="group rounded-[28px] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-7 transition-colors duration-200 hover:border-blue-500/30 md:p-10"
                  >
                    <div className="mb-16 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-glass-border)] text-blue-500">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-[11px] text-[var(--color-faint)]">{principle.number}</span>
                    </div>
                    <h3 className="mb-4 text-2xl font-semibold tracking-tight">{principle.title}</h3>
                    <p className="max-w-lg text-sm font-light leading-relaxed text-[var(--color-muted)] md:text-base">
                      {principle.description}
                    </p>
                  </motion.article>
                );
              })}
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
                The future is peer to peer
              </span>
              <h2 className="mx-auto mb-8 max-w-4xl text-4xl font-bold leading-[1] tracking-tighter md:text-7xl">
                Help us build a world that stays connected.
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-white/80 md:text-lg">
                Discover how Hopper turns the phones around you into a resilient communication network.
              </p>
              <a
                href="/how-it-works"
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-7 text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111] transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-500"
              >
                See how it works
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
