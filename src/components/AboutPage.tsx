"use client";

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Globe2,
  Network,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { MeshHero, HeroHeadline, HeroParagraph } from './MeshHero';

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
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <MeshHero
          eyebrow="About Hopper"
          topRight={
            <a
              href="#our-story"
              className="inline-flex items-center rounded-full border border-[var(--color-surface-border)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
              Our story
            </a>
          }
          footnotes={['Built in Africa · for everywhere', 'Offline-first by design']}
        >
          <HeroParagraph>
            Hopper is building an offline-first communication network that lets nearby phones
            connect directly — so people can keep talking when conventional infrastructure cannot.
          </HeroParagraph>
          <HeroHeadline lines={['Connection should', 'not need a signal.']} />
        </MeshHero>

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

      </main>

      <Footer theme={theme} />
    </div>
  );
};
