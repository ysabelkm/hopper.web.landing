"use client";

import { Fragment } from 'react';
import { PageShell } from './PageShell';
import { PageHero } from './PageHero';
import { Section } from './Section';
import { Card } from './ui/Card';
import { SectionHeader } from './ui/SectionHeader';
import type { Theme } from '../hooks/useTheme';

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

export const TeamPage = ({ initialTheme }: { initialTheme: Theme }) => (
  <PageShell initialTheme={initialTheme}>
    <PageHero eyebrow="The founding team" title="Three" highlight="co-founders.">
      Hopper is led by a multidisciplinary founding team bringing company building, technology, growth,
      finance and operations around one mission: communication that keeps working.
    </PageHero>

    <Section className="px-4 pb-[100px] sm:px-6 md:pb-[140px]">
      <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-3 lg:gap-6">
        {founders.map((founder, index) => {
          const Icon = founder.icon;
          return (
            <Card key={founder.name} className="group flex flex-col overflow-hidden p-3">
              {/* Portrait panel: initials over a soft blue glow until photos exist. */}
              <div className="relative grid aspect-[4/3.4] place-items-center md:aspect-[4/4.4] lg:aspect-[4/3.4] overflow-hidden rounded-[20px] bg-[var(--color-background)]">
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[var(--color-faint)]">
                    Co-founder · 0{index + 1}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-brand-blue)_14%,transparent)] text-[var(--color-brand-blue)]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <div className="pointer-events-none absolute h-56 w-56 rounded-full bg-[color-mix(in_oklab,var(--color-brand-blue)_16%,transparent)] blur-[70px] transition-transform duration-500 group-hover:scale-110" />
                <span
                  aria-hidden="true"
                  className="relative select-none font-display text-[clamp(88px,10vw,128px)] font-semibold md:text-[72px] lg:text-[clamp(96px,9vw,128px)] tracking-[-0.08em]"
                >
                  {founder.initials}
                </span>
              </div>

              <div className="px-5 pt-6 pb-5 md:px-4 lg:px-6">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                  <div className="min-w-0">
                    <h2 className="m-0 font-display text-[24px] font-semibold tracking-[-0.03em] md:text-[20px] lg:text-[24px]">{founder.name}</h2>
                    <p className="m-0 mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-blue)]">
                      {founder.focus}
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 whitespace-nowrap rounded-full border border-[var(--color-surface-border)] px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-faint)]">
                    {founder.shorthand}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[var(--color-surface-border)] pt-5 text-[14px] leading-[1.6] text-[var(--color-muted)]">
                  {founder.roles.map((role, roleIndex) => (
                    <Fragment key={role}>
                      {roleIndex > 0 && (
                        <span aria-hidden="true" className="h-3.5 w-px shrink-0 bg-[var(--color-surface-border)]" />
                      )}
                      <span>{role}</span>
                    </Fragment>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>

    <Section className="px-5 pb-[140px] sm:px-8">
      <SectionHeader
        eyebrow="How we lead"
        title="Built together from day one."
        sub="Hopper’s founding team works across disciplines, with every decision connected to the same goal: making resilient communication useful, trustworthy, and accessible to the communities that need it."
      />
    </Section>
  </PageShell>
);
