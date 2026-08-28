"use client";

import { Fragment, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { MeshHero, HeroHeadline, HeroParagraph } from './MeshHero';

// solar:structure-line-duotone
function OrganizationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 5C8 6.65685 6.65685 8 5 8C3.34315 8 2 6.65685 2 5C2 3.34315 3.34315 2 5 2C6.65685 2 8 3.34315 8 5Z" />
        <path d="M22 5C22 6.65685 20.6569 8 19 8C17.3431 8 16 6.65685 16 5C16 3.34315 17.3431 2 19 2C20.6569 2 22 3.34315 22 5Z" />
        <path d="M8 19C8 20.6569 6.65685 22 5 22C3.34315 22 2 20.6569 2 19C2 17.3431 3.34315 16 5 16C6.65685 16 8 17.3431 8 19Z" />
        <path d="M22 19C22 20.6569 20.6569 22 19 22C17.3431 22 16 20.6569 16 19C16 17.3431 17.3431 16 19 16C20.6569 16 22 17.3431 22 19Z" />
        <path strokeLinecap="round" d="M8 19H16" opacity=".5" />
        <path strokeLinecap="round" d="M8 5H16" opacity=".5" />
        <path strokeLinecap="round" d="M19 16L19 8" opacity=".5" />
        <path strokeLinecap="round" d="M5 16L5 8" opacity=".5" />
      </g>
    </svg>
  );
}

// streamline-flex:decent-work-and-economic-growth-remix
function GrowthIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.852.317c.897-.09 1.41-.09 2.274 0c.294.03.526.263.557.557c.09.864.09 1.377 0 2.274a.625.625 0 0 1-1.064.38l-.507-.506C10.786 4.57 9.22 6.074 7.667 7.207a.625.625 0 0 1-.81-.063L5.112 5.401a15.3 15.3 0 0 0-3.721 3.847a.625.625 0 0 1-1.033-.704a16.6 16.6 0 0 1 4.473-4.473a.625.625 0 0 1 .794.075l1.73 1.73c1.352-1.046 2.709-2.376 3.87-3.741l-.755-.754a.625.625 0 0 1 .38-1.064M9.042 8.1c1.236-.951 2.458-2.096 3.561-3.296a1.7 1.7 0 0 0 1.147.23v1.39l-.235 5.586l-.002.034a1.6 1.6 0 0 1-1.516 1.514c-.733.044-1.828.105-2.932.145h-.018a59 59 0 0 1-2.086.046c-1.65 0-3.94-.124-5.13-.196a1.6 1.6 0 0 1-1.489-1.389a10 10 0 0 1-.069-1.328c.754.36 1.68.127 2.164-.585c.75-1.1 1.58-2.04 2.544-2.874v5.076l.023.001q.032.001.064.006a56 56 0 0 0 1.893.039c.628 0 1.356-.019 2.081-.046z"
      />
    </svg>
  );
}

// clarity:shield-check-solid
function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M31.25 7.4a44 44 0 0 1-6.62-2.35a45 45 0 0 1-6.08-3.21L18 1.5l-.54.35a45 45 0 0 1-6.08 3.21A44 44 0 0 1 4.75 7.4L4 7.59v8.34c0 13.39 13.53 18.4 13.66 18.45l.34.12l.34-.12c.14 0 13.66-5.05 13.66-18.45V7.59Zm-4.57 6.65L15.51 24.9l-6.32-6.33a1.4 1.4 0 0 1 2-2L15.54 21l9.19-9a1.4 1.4 0 1 1 2 2Z" />
    </svg>
  );
}

const founders = [
  {
    name: 'Ysabel Ezeani',
    initials: 'YE',
    roles: ['Chief Executive Officer', 'Chief Technology Officer'],
    shorthand: 'CEO / CTO',
    focus: 'Company & Technology',
    icon: OrganizationIcon,
  },
  {
    name: 'Abraham Moradeyo',
    initials: 'AM',
    roles: ['Chief Marketing Officer', 'Chief Financial Officer'],
    shorthand: 'CMO / CFO',
    focus: 'Growth & Finance',
    icon: GrowthIcon,
  },
  {
    name: 'Ifenna Okoli',
    initials: 'IO',
    roles: ['Chief Operating Officer'],
    shorthand: 'COO',
    focus: 'Operations',
    icon: ShieldCheckIcon,
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
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <MeshHero
          eyebrow="The founding team"
          footnotes={['Company building · technology · growth', 'Finance · operations']}
        >
          <HeroParagraph>
            Hopper is led by a multidisciplinary founding team bringing company building,
            technology, growth, finance and operations around one mission: communication that
            keeps working.
          </HeroParagraph>
          <HeroHeadline lines={['Three', 'co-founders.']} />
        </MeshHero>

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
                      <div className="min-w-0">
                        <h2 className="whitespace-nowrap text-[clamp(1.375rem,2.1vw,1.875rem)] font-semibold tracking-tight">{founder.name}</h2>
                        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-500">
                          {founder.focus}
                        </p>
                      </div>
                      <span className="mt-1 hidden shrink-0 whitespace-nowrap rounded-full border border-[var(--color-glass-border)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--color-faint)] sm:block">
                        {founder.shorthand}
                      </span>
                    </div>

                    <div className="border-t border-[var(--color-glass-border)] pt-6">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-nowrap text-[clamp(0.6875rem,0.95vw,0.875rem)] font-light leading-relaxed text-[var(--color-muted)]">
                        {founder.roles.map((role, roleIndex) => (
                          <Fragment key={role}>
                            {roleIndex > 0 && (
                              <span aria-hidden="true" className="h-3.5 w-px shrink-0 bg-[var(--color-glass-border)]" />
                            )}
                            <span>{role}</span>
                          </Fragment>
                        ))}
                      </div>
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

      </main>

      <Footer theme={theme} />
    </div>
  );
};
