"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Section } from './components/Section';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { StoreBadges } from './components/ui/StoreBadges';
import { CrowdCanvas } from './components/ui/CrowdCanvas';
import { PhoneFrame } from './components/ui/PhoneFrame';
import { DemoVideo } from './components/DemoVideo';
import { Eyebrow, Pill } from './components/ui/Pill';
import { useMeshCanvas } from './hooks/useMeshCanvas';
import { useTheme, Theme } from './hooks/useTheme';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Hero phones, fanned: two tilted behind, one upright in front (listed last so it paints on top). */
const MOCKUPS = [
  {
    name: 'step-02-discover',
    place: 'left-0 top-[9%] w-[40%]',
    tilt: 'rotateY(24deg) rotateZ(-5deg)',
    hoverTilt: 'rotateY(16deg) rotateZ(-9deg)',
    hoverMove: 'motion-safe:group-hover:-translate-x-[22%] motion-safe:group-hover:-translate-y-[5%]',
    // Starts tucked behind the centre phone and slides out.
    enter: { x: '30%', delay: 0.14 },
  },
  {
    name: 'step-05-deliver',
    place: 'right-0 top-[9%] w-[40%]',
    tilt: 'rotateY(-24deg) rotateZ(5deg)',
    hoverTilt: 'rotateY(-16deg) rotateZ(9deg)',
    hoverMove: 'motion-safe:group-hover:translate-x-[22%] motion-safe:group-hover:-translate-y-[5%]',
    enter: { x: '-30%', delay: 0.14 },
  },
  {
    name: 'step-04-relay',
    place: 'left-1/2 top-0 w-[48%] -translate-x-1/2',
    tilt: 'rotateX(8deg) rotateY(-12deg) rotateZ(-2deg)',
    hoverTilt: 'rotateX(3deg) rotateY(-4deg) rotateZ(0deg)',
    hoverMove: 'motion-safe:group-hover:-translate-y-[7%] motion-safe:group-hover:scale-[1.03]',
    enter: { x: '0%', delay: 0 },
  },
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

const mockupSrc = (name: string, theme: Theme) =>
  theme === 'light' ? `/mockups/${name}.webp` : `/mockups/light/${name}.png`;

/**
 * True once every hero screenshot has downloaded and decoded, so the phones
 * enter with their screens already painted instead of as empty frames that
 * fill in mid-fade. Gives up after 2.5s so a slow connection still sees them.
 */
function useMockupsReady(theme: Theme) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let done = false;
    const finish = () => !done && (done = true, setReady(true));
    const timeout = window.setTimeout(finish, 2500);
    Promise.all(
      MOCKUPS.map(m => {
        const img = new window.Image();
        img.src = mockupSrc(m.name, theme);
        return img.decode().catch(() => undefined);
      }),
    ).then(finish);
    return () => window.clearTimeout(timeout);
    // Only the first theme gates the entrance; a later toggle just swaps images.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ready;
}

const Hero = ({ theme }: { theme: Theme }) => {
  const canvasRef = useMeshCanvas();
  const mockupsReady = useMockupsReady(theme);

  return (
    // The hero fills the first screen. Layering, back to front: mesh, phones,
    // crowd, text — so people walk in front of the phones but never over the
    // headline or the store badges. Only the columns set a z-index; the grid
    // itself stays out of the stacking order so the crowd can sit between them.
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden lg:max-h-[1080px] lg:min-h-[680px]"
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block h-full w-full" />
      {/* Softens the mesh behind the text: centred when stacked, left beside the phones. */}
      <div
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 28%, color-mix(in oklab, var(--color-background) 94%, transparent) 0%, transparent 78%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            'radial-gradient(ellipse 42% 50% at 28% 44%, color-mix(in oklab, var(--color-background) 94%, transparent) 0%, transparent 78%)',
        }}
      />

      <div className="mx-auto grid w-full max-w-[1240px] flex-1 grid-rows-[auto_1fr] gap-6 px-5 pt-[96px] sm:gap-8 sm:px-8 sm:pt-[112px] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-8 lg:px-12 lg:pt-[96px]">
        <div className="relative z-20 flex flex-col items-center gap-4 text-center sm:gap-5 lg:items-start lg:gap-7 lg:self-center lg:pb-[110px] lg:text-left">
          <span className="animate-[hopFade_900ms_ease_160ms_both]">
            <Eyebrow>No signal? No problem.</Eyebrow>
          </span>

          <h1 className="m-0 font-display text-[clamp(34px,9.4vw,58px)] font-semibold leading-[1.02] tracking-[-0.05em] lg:text-[clamp(50px,4.4vw,68px)]">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="block animate-[hopReveal_1100ms_cubic-bezier(0.16,1,0.3,1)_240ms_both]">
                Connects communities,
              </span>
            </span>
            <span className="mt-[0.06em] flex flex-wrap items-center justify-center gap-x-[0.22em] gap-y-[0.1em] lg:justify-start">
              <span className="inline-block animate-[hopRise_1100ms_cubic-bezier(0.16,1,0.3,1)_400ms_both]">
                <Pill>one hop</Pill>
              </span>
              <span className="animate-[hopRise_1100ms_cubic-bezier(0.16,1,0.3,1)_500ms_both]">at a time.</span>
            </span>
          </h1>

          <p className="m-0 max-w-[400px] animate-[hopRise_1000ms_cubic-bezier(0.16,1,0.3,1)_560ms_both] text-[15px] leading-[1.55] text-[var(--color-muted)] sm:max-w-[460px] sm:text-lg sm:leading-[1.6]">
            <strong className="font-semibold text-[var(--color-foreground)]">The offline chat app.</strong>{' '}
            Your message hops phone to phone until it arrives. No SIM, no Wi-Fi, no towers.
          </p>

          <div className="flex animate-[hopRise_1000ms_cubic-bezier(0.16,1,0.3,1)_680ms_both] flex-wrap justify-center gap-3 lg:justify-start">
            <StoreBadges imgClassName="h-[40px] sm:h-[46px] lg:h-[48px]" />
          </div>
        </div>

        {/* Phones rise from the bottom edge and crop there. The light page
            shows the dark app screens and vice versa, so they always contrast
            the background. */}
        {/* Stacked, the fan is sized by the height left under the text (cqh)
            as well as the width, so most of each phone stays visible above
            the crowd on short and tall phones alike. */}
        <div className="relative z-0 min-h-[200px] [container-type:size] lg:min-h-0">
          <div className="group absolute inset-y-0 left-1/2 w-[min(100%,440px,92cqh)] -translate-x-1/2 lg:top-[3%] lg:w-[min(100%,580px)]">
            {MOCKUPS.map(m => (
              <div key={m.name} className={`absolute [perspective:1800px] ${m.place}`}>
                {/* Hovering the fan lifts all three and spreads them apart. */}
                <div className={`transition-[translate,scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${m.hoverMove}`}>
                  {/* One entrance once all three screens are ready: the centre
                      phone rises, then the side phones slide out from behind it. */}
                  <motion.div
                    initial={{ opacity: 0, y: 40, x: m.enter.x }}
                    animate={mockupsReady ? { opacity: 1, y: 0, x: '0%' } : undefined}
                    transition={{
                      opacity: { duration: 0.6, delay: m.enter.delay, ease: 'easeOut' },
                      default: { duration: 1.1, delay: m.enter.delay, ease: EASE },
                    }}
                  >
                    <PhoneFrame
                      src={mockupSrc(m.name, theme)}
                      tilt={m.tilt}
                      hoverTilt={m.hoverTilt}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The crowd walks along the bottom across the full width: the people
          the mesh above connects. */}
      <CrowdCanvas
        src="/images/crowd-peeps.png"
        density={3}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 block h-[min(130px,30vw)] w-full animate-[hopFade_1200ms_ease_900ms_both] lg:h-[clamp(180px,26.4vh,252px)]"
      />
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
