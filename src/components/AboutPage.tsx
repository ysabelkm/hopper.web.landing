"use client";

import { Globe2, Network, ShieldCheck, Users } from 'lucide-react';
import { PageShell } from './PageShell';
import { PageHero } from './PageHero';
import { Section } from './Section';
import { Card } from './ui/Card';
import { Eyebrow } from './ui/Pill';
import { LinkButton } from './ui/LinkButton';
import { SectionHeader } from './ui/SectionHeader';
import type { Theme } from '../hooks/useTheme';

const principles = [
  {
    icon: Network,
    title: 'Resilience by design',
    description:
      'Hopper is built to keep people connected when towers are unavailable, networks are congested, or the internet simply does not reach.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy is structural',
    description:
      'Communication moves directly between devices. We are designing a network where privacy is part of the architecture, not an optional setting.',
  },
  {
    icon: Users,
    title: 'Every person strengthens the network',
    description:
      'Each Hopper device can help messages travel farther. The network becomes more useful as communities grow together.',
  },
  {
    icon: Globe2,
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

export const AboutPage = ({ initialTheme }: { initialTheme: Theme }) => (
  <PageShell initialTheme={initialTheme}>
    <PageHero
      eyebrow="About Hopper"
      title="Connection shouldn’t"
      highlight="need a signal."
      actions={<LinkButton href="#our-story" variant="secondary">Our story</LinkButton>}
    >
      Hopper is building an offline-first communication network that lets nearby phones connect directly —
      so people can keep talking when conventional infrastructure cannot.
    </PageHero>

    {/* ── Our story ── */}
    <Section id="our-story" className="scroll-mt-24 px-4 pb-[100px] sm:px-6 md:pb-[140px]">
      <Card className="mx-auto grid max-w-[1180px] gap-10 px-7 py-12 sm:rounded-[40px] sm:px-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Eyebrow className="mb-6">Why we began</Eyebrow>
          <h2 className="m-0 font-display text-[clamp(30px,3.8vw,52px)] font-semibold leading-[1.06] tracking-[-0.04em]">
            The devices were already there. The network was missing.
          </h2>
          <p className="m-0 mt-6 text-[15px] leading-[1.6] text-[var(--color-faint)]">
            Built in Africa, for a challenge shared everywhere.
          </p>
        </div>
        <div className="grid content-end gap-6 text-[16px] leading-[1.7] text-[var(--color-muted)] md:grid-cols-2 lg:text-[17px]">
          <p className="m-0">
            Hopper started with a simple observation: billions of people carry powerful radios in their pockets,
            yet communication still stops the moment a tower or internet connection disappears.
          </p>
          <p className="m-0">
            We saw an opportunity to rethink that dependency. By helping phones find one another and securely
            relay information, the people nearby can become the infrastructure.
          </p>
        </div>
      </Card>
    </Section>

    {/* ── From problem to purpose ── */}
    <Section className="px-5 pb-[100px] sm:px-8 md:pb-[140px]">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader
          eyebrow="From problem to purpose"
          title="A different way to think about connectivity."
          className="mb-14 md:mb-[72px]"
        />
        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {steps.map((step, i) => (
            <Card key={step.label} className="flex flex-col p-8 md:p-7 lg:p-10">
              <div className="mb-10 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em]">
                <span className="text-[var(--color-brand-blue)]">{step.label}</span>
                <span className="text-[var(--color-faint)]">0{i + 1}</span>
              </div>
              <h3 className="m-0 mb-4 font-display text-[22px] font-semibold tracking-[-0.025em]">{step.title}</h3>
              <p className="m-0 text-[15px] leading-[1.65] text-[var(--color-muted)]">{step.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>

    {/* ── What guides us ── */}
    <Section className="px-5 pb-[140px] sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader
          eyebrow="What guides us"
          title="Built around people, not infrastructure."
          sub="Four principles shape how we design the product, the network, and the company behind it."
          className="mb-14 md:mb-[72px]"
        />
        <div className="mx-auto grid max-w-[980px] gap-6 md:grid-cols-2">
          {principles.map(principle => (
            <Card key={principle.title} className="flex flex-col gap-5 p-8 sm:p-10">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-brand-blue)_14%,transparent)] text-[var(--color-brand-blue)]">
                <principle.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="m-0 font-display text-[22px] font-semibold tracking-[-0.025em]">{principle.title}</h3>
              <p className="m-0 text-[15px] leading-[1.65] text-[var(--color-muted)]">{principle.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  </PageShell>
);
