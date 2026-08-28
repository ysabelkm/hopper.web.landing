"use client";

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { MeshHero, HeroHeadline, HeroParagraph } from './MeshHero';

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
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <MeshHero
          eyebrow="The Hopper manifesto"
          topRight={
            <a
              href="#beliefs"
              className="inline-flex items-center rounded-full border border-[var(--color-surface-border)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            >
              Read our beliefs
            </a>
          }
          footnotes={['Resilient · private · independent', 'No towers · no servers']}
        >
          <HeroParagraph>
            We believe communication can be more resilient, more private, and less dependent on
            distant infrastructure. This is what guides us as we build Hopper.
          </HeroParagraph>
          <HeroHeadline lines={['The airwaves', 'belong to us.']} />
        </MeshHero>

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

      </main>

      <Footer theme={theme} />
    </div>
  );
};
