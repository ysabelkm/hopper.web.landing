"use client";

import { Section } from "./Section";
import { StoreBadges } from "./MeshHero";
import AnimatedTextCycle from "./ui/AnimatedTextCycle";

export const ClosingCTA = ({
  id,
  blurb = "Available on iOS and Android. Connected to your community in under 30 seconds.",
}: {
  id?: string;
  blurb?: string;
}) => (
  <Section id={id} className="px-5 pb-[150px] sm:px-6 md:px-11">
    <div className="mx-auto max-w-[1080px] border-t border-[var(--color-surface-border)] pt-[110px] text-center">
      <h2 className="m-0 mb-7 font-display text-[clamp(38px,7.4vw,104px)] font-semibold leading-[1.02] tracking-[-0.045em]">
        Ready to hop off the{" "}
        <AnimatedTextCycle
          words={["grid?", "towers?", "network?", "map?"]}
          interval={2600}
          className="text-[var(--color-faint)]"
        />
      </h2>
      <p className="mx-auto mb-14 max-w-[560px] text-[clamp(16px,1.5vw,20px)] leading-[1.6] text-[var(--color-muted)]">
        {blurb}
      </p>
      <div className="flex flex-wrap justify-center gap-5">
        <StoreBadges height={60} />
      </div>
    </div>
  </Section>
);
