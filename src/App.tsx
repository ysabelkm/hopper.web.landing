"use client";

import { useState, useEffect } from 'react';
import { Section } from './components/Section';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { MeshHero, HeroHeadline, HeroParagraph, StoreBadges } from './components/MeshHero';
import { StickyPanelList, PanelRow } from './components/StickyPanelList';

const SEGMENTS: PanelRow[] = [
  {
    num: '01',
    title: 'Rural communities',
    desc: 'Remote areas with poor or no mobile coverage. No data, no towers, no cost.',
    img: '/images/ruralareas.jpg',
  },
  {
    num: '02',
    title: 'Students & schools',
    desc: 'Campuses where internet is unreliable or unaffordable. Chat without Wi-Fi.',
    img: '/images/campuses.jpg',
  },
  {
    num: '03',
    title: 'Field workers & NGOs',
    desc: 'Humanitarian missions and medical camps that need coordination that never drops.',
    img: '/images/fieldwokers.jpg',
  },
  {
    num: '04',
    title: 'Event attendees',
    desc: 'Festivals and venues where mobile networks get congested. Fast even when towers fail.',
    img: '/images/festivals.jpg',
  },
];

const Vision = () => (
  <Section id="vision" className="relative overflow-hidden px-5 pt-[max(200px,28vw)] pb-[max(200px,25vw)] sm:px-8">
    {/* Each watermark spans the viewport exactly once horizontally. The two
        sizes differ because Sora's uppercase advance makes "COLLECTIVE" (10
        glyphs, 5.99em wide) wider per point than "RESILIENT" (9 glyphs,
        4.90em) — 100/4.90 and 100/5.99 vw respectively.

        Both sit flush inside the section rather than being pulled outwards:
        `leading-[0.8]` makes the line box shorter than the glyphs it holds, so
        any negative offset pushes the letterforms past the section's
        `overflow-hidden` edge and shears their tops and bottoms off. The
        `py-[0.14em]` restores the room the tight leading removes.

        The section's vertical padding is tied to the same vw units as the type
        (`22vw` / `19vw`), so the copy always starts below "RESILIENT" and ends
        above "COLLECTIVE" — they never overlap the text at any width. */}
    <div className="pointer-events-none absolute top-0 left-0 w-full select-none whitespace-nowrap py-[0.25em] font-display text-[20vw] font-bold uppercase leading-[0.8] tracking-[-0.05em] text-[var(--color-ghost)]">
      Resilient
    </div>
    <div className="pointer-events-none absolute bottom-0 left-0 w-full select-none whitespace-nowrap py-[0.14em] text-right font-display text-[16.4vw] font-bold uppercase leading-[0.8] tracking-[-0.05em] text-[var(--color-ghost)]">
      Collective
    </div>

    <div className="relative mx-auto max-w-[1080px]">
      <span className="mb-7 block text-[10.5px] font-semibold uppercase tracking-[0.34em] text-[var(--color-brand-blue)]">
        Why we built this
      </span>
      <h2 className="m-0 mb-8 font-display text-[clamp(34px,5.4vw,76px)] font-semibold leading-[1.02] tracking-[-0.04em]">
        Built for the moments<br />
        <span className="text-[var(--color-faint)]">where everything else fails.</span>
      </h2>
      <p className="m-0 max-w-[640px] text-[clamp(17px,2vw,21px)] leading-[1.6] text-[var(--color-muted)]">
        In an emergency, reaching your people isn&rsquo;t a nice-to-have. It&rsquo;s everything.
        When the towers go dark, Hopper stays on.
      </p>

      <div className="mt-[120px] grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-16 border-t border-[var(--color-surface-border)] pt-16">
        <div>
          <h5 className="m-0 mb-6 font-display text-[11px] font-semibold uppercase tracking-[0.34em]">The philosophy</h5>
          <p className="m-0 mb-5 text-lg leading-[1.6] text-[var(--color-muted)]">
            Connecting with your community shouldn&rsquo;t be a privilege granted by a centralized
            grid. It is a fundamental, resilient right.
          </p>
          <p
            className="m-0 pl-5 text-sm leading-[1.65] text-[var(--color-faint)]"
            style={{ borderLeft: '1px solid color-mix(in oklab, var(--color-brand-blue) 45%, transparent)' }}
          >
            Communication should be physics-based, not contract-based. By using the radio waves
            already in our devices, we reclaim the airwaves.
          </p>
        </div>
        <div>
          <h5 className="m-0 mb-6 font-display text-[11px] font-semibold uppercase tracking-[0.34em]">The global vision</h5>
          <p className="m-0 mb-5 text-lg leading-[1.6] text-[var(--color-muted)]">
            Turn every mobile device into a bridge — a global emergency layer that stays active
            through any disaster or shutdown.
          </p>
          <p
            className="m-0 pl-5 text-sm leading-[1.65] text-[var(--color-faint)]"
            style={{ borderLeft: '1px solid color-mix(in oklab, var(--color-brand-blue) 45%, transparent)' }}
          >
            One billion active relay points by 2030, so no territory on earth is ever truly offline.
          </p>
        </div>
      </div>
    </div>
  </Section>
);

const Impact = () => (
  <Section id="impact" className="px-5 pt-10 pb-[180px] sm:px-8">
    <div className="mx-auto max-w-[1080px]">
      <span className="mb-6 block text-[10.5px] font-semibold uppercase tracking-[0.34em] text-[var(--color-brand-blue)]">
        Who it&rsquo;s for
      </span>
      <h2 className="m-0 mb-14 font-display text-[clamp(30px,4.2vw,52px)] font-semibold leading-[1.06] tracking-[-0.035em]">
        No signal? <span className="text-[var(--color-faint)]">No problem.</span>
      </h2>
      <StickyPanelList rows={SEGMENTS} variant="segments" fit="cover" />
    </div>
  </Section>
);

const GetHopper = () => (
  <Section id="get" className="px-5 pb-[180px] sm:px-8">
    <div className="mx-auto max-w-[1080px] border-t border-[var(--color-surface-border)] pt-[120px] text-center">
      {/* Two stacked lines rather than one long one — the price reads as the
          headline it is, with the promise sitting under it in faint. */}
      <h2 className="m-0 mb-8 font-display text-[clamp(38px,7.4vw,104px)] font-semibold leading-[1.06] tracking-[-0.045em]">
        ₦867 a month.<br />
        <span className="text-[var(--color-faint)]">Infinite reach.</span>
      </h2>
      <p className="mx-auto mb-14 max-w-[560px] text-[clamp(16px,1.5vw,20px)] leading-[1.6] text-[var(--color-muted)]">
        One subscription. Both platforms. Every feature. No towers needed.
      </p>
      <div className="flex flex-wrap justify-center gap-5">
        <StoreBadges height={60} />
      </div>
    </div>
  </Section>
);

export default function App({ initialTheme = 'dark' }: { initialTheme?: 'dark' | 'light' }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.cookie = `hopper-theme=${theme}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem('hopper-theme', theme);
  }, [theme]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-500 ease-in-out selection:bg-blue-500 selection:text-white">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <MeshHero
        eyebrow="Off-grid mesh network"
        footnotes={['Phone to phone · up to 1,024 peers', 'End-to-end encrypted · 0 bytes stored']}
      >
        <HeroParagraph>
          Your message hops phone to phone until it arrives. No SIM, no Wi-Fi, no towers — just the
          radios already around you.
        </HeroParagraph>
        <HeroHeadline lines={['The network is', 'everyone here.']} />
      </MeshHero>

      <Vision />
      <Impact />
      <GetHopper />

      <Footer theme={theme} />
    </main>
  );
}
