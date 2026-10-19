"use client";

import { Section } from "./Section";
import { StoreBadges } from "./ui/StoreBadges";

export const ClosingCTA = ({
  id,
  blurb = "Available on iOS and Android. Connected to your community in under 30 seconds.",
}: {
  id?: string;
  blurb?: string;
}) => (
  <Section id={id} className="px-5 pb-[150px] sm:px-8 md:px-11">
    <div className="mx-auto max-w-[1180px] border-t border-[var(--color-surface-border)] pt-[110px] text-center">
      <h2 className="m-0 mb-[18px] font-display text-[clamp(30px,4.6vw,60px)] font-semibold leading-[1.04] tracking-[-0.04em]">
        Ready to hop off the grid?
      </h2>
      <p className="mx-auto mb-[42px] max-w-[420px] text-base leading-[1.6] text-[var(--color-muted)]">
        {blurb}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <StoreBadges height={52} />
      </div>
    </div>
  </Section>
);
