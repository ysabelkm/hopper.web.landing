"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Section } from './Section';
import { StoreBadges } from './ui/StoreBadges';
import { ClosingCTA } from './ClosingCTA';
import { cn } from '../lib/utils';
import { useTheme, Theme } from '../hooks/useTheme';
import { useMeshCanvas } from '../hooks/useMeshCanvas';
import { Eyebrow, Pill } from './ui/Pill';
import { FaqList } from './ui/FaqList';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The capability split mirrors the app's own gating: free is view-only plus
 * broadcasts; one-on-one messaging and everything else needs a subscription.
 */
const FREE_FEATURES = [
  'Read messages and broadcasts nearby',
  'Send broadcast messages',
  'Bluetooth LE mesh relay',
  'No account, no metadata',
];

const PREMIUM_FEATURES = [
  'Encrypted one-on-one messages',
  'QR key verification',
  'Wi-Fi Direct file transfer',
  'Broadcast media — photo and audio',
  'Large Venue Mode — 16-hop reach',
  'Priority relay for your traffic',
];

const FAQS = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your account on this site and you keep premium access until the end of the billing period you already paid for.',
  },
  {
    q: 'Does Hopper work without a subscription?',
    a: 'Yes, in view-only mode. Without a subscription you can read messages and broadcasts on the mesh and send broadcasts of your own. One-on-one messaging, file transfer, broadcast media and Large Venue Mode need a subscription.',
  },
  {
    q: 'Is my payment data stored by Hopper?',
    a: 'Your card details are handled entirely by Flutterwave and never reach us. For a paid plan we keep only your name and email against the subscription — nothing about who you message or what you send.',
  },
  {
    q: 'What happens if my subscription lapses?',
    a: 'Your app goes back to view-only: you can still read the mesh and send broadcasts, but one-on-one messaging pauses. Message history, contacts and files stay on your device — only access changes, nothing is deleted.',
  },
  {
    q: 'Do I need internet to subscribe?',
    a: 'Once, to complete the purchase. Everything after that — discovery, handshakes, messaging, relaying — runs entirely offline.',
  },
];

const PLANS = {
  monthly: {
    price: '₦867',
    period: '/ month',
    note: 'Billed monthly. Cancel anytime and keep access to the end of the period.',
    cta: 'Subscribe monthly',
  },
  yearly: {
    price: '₦9,500',
    period: '/ year',
    note: 'That is ₦792 a month, billed once a year. Cancel anytime and keep access to the end of the period.',
    cta: 'Subscribe yearly',
  },
};

/** Monthly / Yearly segmented pill; the active fill slides between options. */
const BillingToggle = ({ yearly, onChange }: { yearly: boolean; onChange: (v: boolean) => void }) => {
  const option = (isYearly: boolean, label: string) => {
    const active = yearly === isYearly;
    return (
      <button
        type="button"
        onClick={() => onChange(isYearly)}
        aria-pressed={active}
        className={cn(
          'relative flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200',
          active ? 'text-[var(--color-background)]' : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]',
        )}
      >
        {active && (
          <motion.span
            layoutId="billing-fill"
            className="absolute inset-0 rounded-full bg-[var(--color-foreground)]"
            transition={{ duration: 0.4, ease: EASE }}
          />
        )}
        <span className="relative">{label}</span>
        {isYearly && (
          <span className="relative rounded-full bg-[var(--color-brand-blue)] px-1.5 py-0.5 text-[9.5px] tracking-[0.1em] text-white">
            −9%
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="inline-flex rounded-full border border-[var(--color-surface-border)] bg-[var(--color-surface-1)] p-1">
      {option(false, 'Monthly')}
      {option(true, 'Yearly')}
    </div>
  );
};

const Hero = ({ yearly, setYearly }: { yearly: boolean; setYearly: (v: boolean) => void }) => {
  const canvasRef = useMeshCanvas({ density: 0.8 });
  const plan = yearly ? PLANS.yearly : PLANS.monthly;

  return (
    <section className="relative overflow-hidden px-4 pt-[132px] pb-[100px] sm:px-6 md:pt-[150px]">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 56% at 26% 48%, color-mix(in oklab, var(--color-background) 94%, transparent) 0%, transparent 78%)',
        }}
      />

      {/* Copy on the left, price card on the right; stacked and centred below lg. */}
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-x-14 gap-y-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-center gap-7 px-1 text-center lg:items-start lg:text-left">
          <span className="animate-[hopFade_900ms_ease_160ms_both]">
            <Eyebrow>Pricing · one plan</Eyebrow>
          </span>

          <h1 className="m-0 font-display text-[clamp(42px,7vw,96px)] font-semibold leading-[1.02] tracking-[-0.05em] lg:text-[clamp(56px,5.6vw,88px)]">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="block animate-[hopReveal_1100ms_cubic-bezier(0.16,1,0.3,1)_240ms_both]">One plan.</span>
            </span>
            <span className="mt-[0.06em] inline-block animate-[hopRise_1100ms_cubic-bezier(0.16,1,0.3,1)_400ms_both]">
              <Pill className="origin-left">Every feature.</Pill>
            </span>
          </h1>

          <p className="m-0 max-w-[470px] animate-[hopRise_1000ms_cubic-bezier(0.16,1,0.3,1)_560ms_both] text-[17px] leading-[1.6] text-[var(--color-muted)] sm:text-lg">
            Read the mesh and send broadcasts for free. One subscription unlocks one-on-one messaging and
            everything else — no surprise charges.
          </p>

          <div className="animate-[hopRise_1000ms_cubic-bezier(0.16,1,0.3,1)_680ms_both]">
            <BillingToggle yearly={yearly} onChange={setYearly} />
          </div>
        </div>

        {/* The price card — the same rounded surface as the landing page's. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.8, ease: EASE }}
          className="mx-auto flex w-full max-w-[560px] flex-col gap-8 rounded-[28px] border border-[var(--color-surface-border)] bg-[var(--color-surface-1)] px-7 py-10 sm:rounded-[40px] sm:px-12 sm:py-14"
        >
          {/* A size container, so the price scales with the card rather than the
              viewport and "₦9,500 / year" always fits on one line. */}
          <div className="@container">
            <Eyebrow className="mb-6">Premium</Eyebrow>
            <div className="flex flex-nowrap items-end gap-[clamp(8px,3cqw,16px)] whitespace-nowrap">
              {/* Re-keyed on the billing period, so the figure rises in fresh. */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={plan.price}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="font-display text-[min(120px,17cqw)] font-semibold leading-[0.8] tracking-[-0.055em] text-[var(--color-foreground)]"
                >
                  {plan.price}
                </motion.span>
              </AnimatePresence>
              <span className="pb-1 font-display text-[clamp(15px,5cqw,28px)] font-semibold tracking-[-0.03em] text-[var(--color-faint)]">
                {plan.period}
              </span>
            </div>
            <p
              className="m-0 mt-7 max-w-[380px] pl-[18px] text-[13.5px] leading-[1.6] text-[var(--color-faint)]"
              style={{ borderLeft: '1px solid color-mix(in oklab, var(--color-brand-blue) 45%, transparent)' }}
            >
              {plan.note}
            </p>
          </div>

          <div className="flex flex-col gap-6 border-t border-[var(--color-surface-border)] pt-8">
            <p className="m-0 text-[16px] leading-[1.6] text-[var(--color-muted)]">
              One subscription. Both platforms. Every feature. No towers needed.
            </p>
            <a
              href="#get"
              className="self-start rounded-full bg-[var(--color-brand-blue)] px-8 py-[15px] text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-90"
            >
              {plan.cta}
            </a>
            <div className="flex flex-wrap items-center gap-3">
              <StoreBadges height={42} />
            </div>
            <span className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-faint)]">
              iOS 13+ · Android 7+
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TierCard = ({
  name,
  price,
  lead,
  features,
  premium,
}: {
  name: string;
  price: string;
  lead: string;
  features: string[];
  premium?: boolean;
}) => (
  <div
    className={cn(
      'flex flex-col gap-7 rounded-[28px] border bg-[var(--color-surface-1)] p-8 sm:p-10',
      premium
        ? 'border-[color-mix(in_oklab,var(--color-brand-blue)_45%,transparent)]'
        : 'border-[var(--color-surface-border)]',
    )}
  >
    <div className="flex items-baseline justify-between gap-4">
      <div className="font-display text-[22px] font-semibold tracking-[-0.025em]">{name}</div>
      <div
        className={cn(
          'text-[14px] font-semibold tracking-[-0.01em]',
          premium ? 'text-[var(--color-brand-blue)]' : 'text-[var(--color-faint)]',
        )}
      >
        {price}
      </div>
    </div>
    <p className="m-0 text-[15px] leading-[1.6] text-[var(--color-muted)]">{lead}</p>
    <ul className="m-0 flex list-none flex-col gap-0 p-0">
      {features.map(f => (
        <li
          key={f}
          className="flex items-center gap-3 border-t border-[var(--color-surface-border)] py-4 text-[15px] leading-[1.45]"
        >
          <span
            className={cn(
              'grid h-5 w-5 shrink-0 place-items-center rounded-full',
              premium ? 'bg-[var(--color-brand-blue)] text-white' : 'bg-[var(--color-ghost)] text-[var(--color-muted)]',
            )}
          >
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
          </span>
          {f}
        </li>
      ))}
    </ul>
  </div>
);

export const PricingPage = ({ initialTheme = 'light' }: { initialTheme?: Theme }) => {
  const { theme, toggleTheme } = useTheme(initialTheme);
  const [yearly, setYearly] = useState(false);
  const plan = yearly ? PLANS.yearly : PLANS.monthly;

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-500">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <Hero yearly={yearly} setYearly={setYearly} />

      {/* ── Free vs Premium ── */}
      <Section className="px-5 py-[100px] sm:px-8 md:pt-[60px] md:pb-[140px]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-14 max-w-[640px] text-center md:mb-[72px]">
            <Eyebrow className="mb-[22px]">What the subscription unlocks</Eyebrow>
            <h2 className="m-0 font-display text-[clamp(32px,4.6vw,62px)] font-semibold leading-[1.04] tracking-[-0.04em]">
              Free to listen. Premium to talk.
            </h2>
          </div>

          <div className="mx-auto grid max-w-[980px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6 lg:gap-8">
            <TierCard
              name="Free"
              price="₦0 forever"
              lead="View-only: read what’s happening around you and broadcast to everyone nearby. No account needed."
              features={FREE_FEATURES}
            />
            <TierCard
              name="Premium"
              price={`${plan.price} ${plan.period}`}
              lead="Everything in Free, plus private one-on-one messaging and the rest."
              features={PREMIUM_FEATURES}
              premium
            />
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section className="px-5 pb-[140px] sm:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-12 max-w-[640px] text-center">
            <Eyebrow className="mb-[22px]">FAQ</Eyebrow>
            <h2 className="m-0 font-display text-[clamp(32px,4.6vw,62px)] font-semibold leading-[1.04] tracking-[-0.04em]">
              Common questions.
            </h2>
          </div>

          <FaqList items={FAQS} />
        </div>
      </Section>

      {/* ── Closing CTA ── */}
      <ClosingCTA id="get" blurb="Download free to read and broadcast. Subscribe to message one-on-one. iOS 13+ and Android 7+." />

      <Footer theme={theme} />
    </main>
  );
};
