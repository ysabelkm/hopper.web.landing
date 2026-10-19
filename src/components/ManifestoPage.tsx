"use client";

import { PageShell } from './PageShell';
import { PageHero } from './PageHero';
import { Section } from './Section';
import { Card } from './ui/Card';
import { LinkButton } from './ui/LinkButton';
import { SectionHeader } from './ui/SectionHeader';
import type { Theme } from '../hooks/useTheme';

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

export const ManifestoPage = ({ initialTheme }: { initialTheme: Theme }) => (
  <PageShell initialTheme={initialTheme}>
    <PageHero
      eyebrow="The Hopper manifesto"
      title="The airwaves"
      highlight="belong to us."
      actions={<LinkButton href="#beliefs" variant="secondary">Read our beliefs</LinkButton>}
    >
      We believe communication can be more resilient, more private, and less dependent on distant
      infrastructure. This is what guides us as we build Hopper.
    </PageHero>

    <Section id="beliefs" className="scroll-mt-24 px-5 pb-[140px] sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader
          eyebrow="What we believe"
          title="Six principles. One direction."
          className="mb-14 md:mb-[72px]"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6">
          {beliefs.map((belief, i) => (
            <Card key={belief.title} className="group flex flex-col p-8 sm:p-10">
              <span className="mb-10 text-[11px] font-semibold tracking-[0.2em] text-[var(--color-brand-blue)]">
                0{i + 1}
              </span>
              <h3 className="m-0 mb-4 font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.025em]">
                {belief.title}
              </h3>
              <p className="m-0 text-[15px] leading-[1.65] text-[var(--color-muted)]">{belief.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  </PageShell>
);
