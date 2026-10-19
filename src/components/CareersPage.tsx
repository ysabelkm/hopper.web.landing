"use client";

import { Mail } from 'lucide-react';
import { PageShell } from './PageShell';
import { PageHero } from './PageHero';
import { Section } from './Section';
import { Card } from './ui/Card';
import { LinkButton } from './ui/LinkButton';
import type { Theme } from '../hooks/useTheme';

const CONTACT_EMAIL = 'support@hopperafrica.com';

export const CareersPage = ({ initialTheme }: { initialTheme: Theme }) => (
  <PageShell initialTheme={initialTheme}>
    {/* There are no roles to list, so the hero carries the message and a
        single card says where openings will appear. */}
    <PageHero
      eyebrow="Careers at Hopper"
      title="No open roles."
      highlight="For now."
      actions={<LinkButton href="/about" variant="secondary">About Hopper</LinkButton>}
    >
      We are not hiring at the moment. When new opportunities become available, they will be posted here.
    </PageHero>

    <Section className="px-4 pb-[140px] sm:px-6">
      <Card className="mx-auto flex max-w-[760px] flex-col items-center gap-5 px-7 py-12 text-center sm:px-12 sm:py-14">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-brand-blue)_14%,transparent)] text-[var(--color-brand-blue)]">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="m-0 font-display text-[clamp(24px,3vw,32px)] font-semibold tracking-[-0.03em]">
          Roles are posted here when they open.
        </h2>
        <p className="m-0 max-w-[460px] text-[15px] leading-[1.65] text-[var(--color-muted)]">
          Questions in the meantime? Reach the team at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-[var(--color-brand-blue)] hover:opacity-80">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Card>
    </Section>
  </PageShell>
);
