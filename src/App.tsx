"use client";

import Image from 'next/image';
import { motion } from 'motion/react';
import { Section } from './components/Section';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { StoreBadges } from './components/ui/StoreBadges';
import { DemoVideo } from './components/DemoVideo';
import { Eyebrow, Pill } from './components/ui/Pill';
import { useMeshCanvas } from './hooks/useMeshCanvas';
import { useTheme, Theme } from './hooks/useTheme';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Hero phones, left to right. Each sits lower or higher and tilts slightly. */
const MOCKUPS = [
  { name: 'step-02-discover', offset: 'mt-[7%]', tilt: '-rotate-3', delay: 0.76 },
  { name: 'step-04-relay', offset: 'mt-[3%]', tilt: 'rotate-0', delay: 0.86 },
  { name: 'step-05-deliver', offset: 'mt-[7%]', tilt: 'rotate-3', delay: 0.96 },
];

const MARQUEE = [
  'Rural communities',
  'Campuses',
  'Field operations',
  'Festivals',
  'Emergencies',
  'Community halls',
  'Markets',
  'Remote clinics',
];

const USE_CASES = [
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

const Hero = ({ theme }: { theme: Theme }) => {
  const canvasRef = useMeshCanvas();

  return (
    <section id="top" className="relative overflow-hidden px-5 pt-[132px] sm:px-6 md:pt-[150px]">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 42% at 50% 30%, color-mix(in oklab, var(--color-background) 94%, transparent) 0%, transparent 78%)',
        }}
      />

      <div className="relative mx-auto flex max-w-[980px] flex-col items-center gap-7 text-center">
        <span className="animate-[hopFade_900ms_ease_160ms_both]">
          <Eyebrow>No signal? No problem.</Eyebrow>
        </span>

        <h1 className="m-0 font-display text-[clamp(42px,7.4vw,112px)] font-semibold leading-[1.02] tracking-[-0.05em]">
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="block animate-[hopReveal_1100ms_cubic-bezier(0.16,1,0.3,1)_240ms_both]">
              Connects communities,
            </span>
          </span>
          <span className="mt-[0.06em] flex flex-wrap items-center justify-center gap-x-[0.22em] gap-y-[0.1em]">
            <span className="inline-block animate-[hopRise_1100ms_cubic-bezier(0.16,1,0.3,1)_400ms_both]">
              <Pill>one hop</Pill>
            </span>
            <span className="animate-[hopRise_1100ms_cubic-bezier(0.16,1,0.3,1)_500ms_both]">at a time.</span>
          </span>
        </h1>

        <p className="m-0 max-w-[470px] animate-[hopRise_1000ms_cubic-bezier(0.16,1,0.3,1)_560ms_both] text-[17px] leading-[1.6] text-[var(--color-muted)] sm:text-lg">
          Your message hops phone to phone until it arrives. No SIM, no Wi-Fi, no towers.
        </p>

        <div className="flex animate-[hopRise_1000ms_cubic-bezier(0.16,1,0.3,1)_680ms_both] flex-wrap justify-center gap-3">
          <StoreBadges height={48} />
        </div>
      </div>

      {/* Phones crop at the bottom edge. The light page shows the dark app
          screens and vice versa, so the phones always contrast the canvas. */}
      <div className="relative mx-auto mt-10 flex h-[min(640px,64vw)] max-w-[1000px] items-start justify-center gap-2 overflow-hidden sm:gap-5">
        {MOCKUPS.map(m => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: m.delay, ease: EASE }}
            className={`min-w-0 flex-[0_1_300px] ${m.offset}`}
          >
            <img
              src={theme === 'light' ? `/mockups/${m.name}.webp` : `/mockups/light/${m.name}.png`}
              alt=""
              width={804}
              height={1748}
              className={`block h-auto w-full ${m.tilt}`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Marquee = () => {
  // Rendered twice so a -50% translate loops seamlessly.
  const run = (copy: number) => (
    <div className="flex flex-none items-center" aria-hidden={copy > 0}>
      {MARQUEE.map(word => (
        <span
          key={word}
          className="flex items-center gap-5 whitespace-nowrap pr-5 font-display text-[22px] font-semibold tracking-[-0.03em] sm:gap-7 sm:pr-7 sm:text-[30px]"
        >
          {word}
          <span className="h-2 w-2 rounded-full bg-[var(--color-brand-blue)] sm:h-2.5 sm:w-2.5" />
        </span>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden border-y border-[var(--color-surface-border)] bg-[var(--color-surface-1)] py-5 sm:py-[26px]">
      <div className="hop-marquee flex w-max animate-[hopMarquee_36s_linear_infinite]">
        {run(0)}
        {run(1)}
      </div>
    </section>
  );
};

const UseCases = () => (
  <Section id="impact" className="px-5 py-[100px] sm:px-8 md:py-[140px]">
    <div className="mx-auto max-w-[1180px]">
      <div className="mx-auto mb-14 max-w-[640px] text-center md:mb-[72px]">
        <Eyebrow className="mb-[22px]">Use cases</Eyebrow>
        <h2 className="m-0 mb-[18px] font-display text-[clamp(32px,4.6vw,62px)] font-semibold leading-[1.04] tracking-[-0.04em]">
          Made for places{' '}
          <span className="text-[var(--color-brand-blue)]">the towers don&rsquo;t reach.</span>
        </h2>
        <p className="m-0 text-[17px] leading-[1.6] text-[var(--color-muted)]">
          Pick your door. They all lead to your people.
        </p>
      </div>

      <div className="mx-auto grid max-w-[980px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-x-8 gap-y-14">
        {USE_CASES.map(item => (
          <div key={item.num} className="flex flex-col gap-[18px]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[var(--color-surface-1)]">
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 474px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <div className="mb-2 text-[11px] font-semibold tracking-[0.2em] text-[var(--color-brand-blue)]">
                {item.num}
              </div>
              <div className="mb-2 font-display text-[22px] font-semibold tracking-[-0.025em]">{item.title}</div>
              <div className="text-[15px] leading-[1.6] text-[var(--color-muted)]">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const Demo = () => (
  <Section id="how-it-works" className="px-4 pb-[100px] sm:px-6 md:pb-[140px]">
    <div className="mx-auto max-w-[1180px]">
      <div className="mx-auto mb-12 max-w-[640px] text-center md:mb-14">
        <Eyebrow className="mb-[22px]">How it works</Eyebrow>
        <h2 className="m-0 font-display text-[clamp(32px,4.6vw,62px)] font-semibold leading-[1.04] tracking-[-0.04em]">
          See it in action.
        </h2>
      </div>
      <div className="mx-auto max-w-[1080px]">
        <DemoVideo />
      </div>
    </div>
  </Section>
);

const PricingCard = () => (
  <Section id="get" className="px-4 pb-[100px] sm:px-6">
    <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-end gap-14 rounded-[28px] border border-[var(--color-surface-border)] bg-[var(--color-surface-1)] px-7 py-14 sm:rounded-[40px] sm:px-14 sm:py-20">
      <div>
        <Eyebrow className="mb-6">Pricing</Eyebrow>
        <div className="flex flex-wrap items-end gap-4">
          <span className="font-display text-[clamp(80px,13vw,190px)] font-semibold leading-[0.8] tracking-[-0.055em] text-[var(--color-foreground)]">
            ₦867
          </span>
          <span className="pb-1.5 font-display text-[clamp(20px,2.6vw,34px)] font-semibold tracking-[-0.03em] text-[var(--color-faint)]">
            / month
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="m-0 max-w-[400px] text-[17px] leading-[1.6] text-[var(--color-muted)]">
          One subscription. Both platforms. Every feature. No towers needed.
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          <StoreBadges height={48} />
        </div>
        <a
          href="/pricing"
          className="self-start text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-blue)] transition-opacity hover:opacity-70"
        >
          See full pricing →
        </a>
      </div>
    </div>
  </Section>
);

export default function App({ initialTheme = 'light' }: { initialTheme?: Theme }) {
  const { theme, toggleTheme } = useTheme(initialTheme);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-500 ease-in-out">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <Marquee />
      <UseCases />
      <Demo />
      <PricingCard />
      <Footer theme={theme} />
    </main>
  );
}
