"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Section } from './Section';
import { MeshHero } from './MeshHero';
import { ClosingCTA } from './ClosingCTA';
import { cn } from '../lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

/** The capability split mirrors the app's own gating. */
const COMPARE: { label: string; tier: 'Free' | 'Premium' }[] = [
  { label: 'Encrypted direct messages', tier: 'Free' },
  { label: 'Bluetooth LE mesh relay', tier: 'Free' },
  { label: 'QR key verification', tier: 'Free' },
  { label: 'No account, no metadata', tier: 'Free' },
  { label: 'Wi-Fi Direct file transfer', tier: 'Premium' },
  { label: 'Broadcast media — photo and audio', tier: 'Premium' },
  { label: 'Large Venue Mode — 16-hop reach', tier: 'Premium' },
  { label: 'Priority relay for your traffic', tier: 'Premium' },
];

const FAQS = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your account on this site and you keep premium access until the end of the billing period you already paid for.',
  },
  {
    q: 'Does Hopper work without a subscription?',
    a: 'Yes. Encrypted messaging over the mesh is free for as long as you use the app. A subscription unlocks file transfer, broadcast media, Large Venue Mode and early features.',
  },
  {
    q: 'Is my payment data stored by Hopper?',
    a: 'Never. Payments are handled by Flutterwave — your card details never reach us, and there is no account record to leak.',
  },
  {
    q: 'What happens if my subscription lapses?',
    a: 'Your app drops to the free tier. Message history, contacts and files stay on your device — only access changes, nothing is deleted.',
  },
  {
    q: 'Do I need internet to subscribe?',
    a: 'Once, to complete the purchase. Everything after that — discovery, handshakes, messaging, relaying — runs entirely offline.',
  },
];

/** Monthly · | · Yearly · −9% — a text control, not a switch. */
const BillingToggle = ({ yearly, onChange }: { yearly: boolean; onChange: (v: boolean) => void }) => {
  const label = 'cursor-pointer border-none bg-transparent p-0 text-[10.5px] font-semibold uppercase tracking-[0.28em] transition-colors duration-200';

  return (
    <div className="flex items-center gap-[18px]">
      <button
        onClick={() => onChange(false)}
        className={cn(label, yearly ? 'text-[var(--color-faint)]' : 'text-[var(--color-foreground)]')}
      >
        Monthly
      </button>
      <span className="h-3 w-px bg-[var(--color-surface-border)]" />
      <button
        onClick={() => onChange(true)}
        className={cn(label, yearly ? 'text-[var(--color-foreground)]' : 'text-[var(--color-faint)]')}
      >
        Yearly
      </button>
      <span
        aria-hidden={!yearly}
        className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-blue)] transition-opacity duration-[240ms]"
        style={{ opacity: yearly ? 1 : 0 }}
      >
        −9%
      </span>
    </div>
  );
};

const FaqItem = ({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Measure the answer once it is laid out, and again on resize, so the
  // max-height transition always animates to the real height rather than to a
  // guessed one.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [a]);

  return (
    <div className="border-t border-[var(--color-surface-border)]">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-6 border-none bg-transparent py-6 text-left text-[var(--color-foreground)]"
      >
        <span className="text-[16.5px] font-medium tracking-[-0.01em]">{q}</span>
        {/* The + rotates 45° to read as an × */}
        <span
          aria-hidden
          className="shrink-0 text-lg text-[var(--color-faint)] transition-transform duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          maxHeight: open ? height : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <div ref={bodyRef}>
          <p className="m-0 mb-[26px] max-w-[560px] text-[15px] leading-[1.7] text-[var(--color-muted)]">{a}</p>
        </div>
      </div>
    </div>
  );
};

export const PricingPage = ({ initialTheme = 'dark' }: { initialTheme?: 'dark' | 'light' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.cookie = `hopper-theme=${theme}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem('hopper-theme', theme);
  }, [theme]);

  const price = yearly ? '₦9,500' : '₦867';
  const period = yearly ? 'a year' : 'a month';
  const billingNote = yearly
    ? 'That is ₦792 a month, billed once a year. Cancel anytime and keep access to the end of the period.'
    : 'Billed monthly. Cancel anytime and keep access to the end of the period.';

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-500 selection:bg-blue-500 selection:text-white">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* ── Hero: the price is the headline ── */}
      <MeshHero
        eyebrow="Pricing · one plan"
        topRight={<BillingToggle yearly={yearly} onChange={setYearly} />}
        footnotes={['Payments by Flutterwave · card details never touch us', 'iOS 13+ · Android 7+']}
        align="center"
        density={0.8}
        scrim="radial-gradient(ellipse 56% 50% at 50% 58%, color-mix(in oklab, var(--color-background) 90%, transparent) 0%, transparent 76%)"
      >
        <div className="flex flex-col gap-[34px] py-[60px]">
          <div className="flex flex-wrap items-end gap-x-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.32 }}
              className="font-display font-semibold leading-[0.78] tracking-[-0.055em] text-[clamp(88px,21vw,340px)]"
            >
              {price}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.44 }}
              className="font-display font-semibold leading-none tracking-[-0.04em] text-[clamp(24px,4vw,62px)] text-[var(--color-faint)] pb-[clamp(8px,2vw,26px)]"
            >
              {period}
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.52, ease: EASE }}
            className="flex flex-wrap items-start gap-x-16 gap-y-7"
          >
            <p className="m-0 max-w-[380px] text-base leading-[1.65] text-[var(--color-muted)]">
              Messaging over the mesh is free forever. One subscription unlocks everything else —
              no tiers, no gating, no surprise charges.
            </p>
            <span
              className="max-w-[260px] pl-[18px] text-[13.5px] leading-[1.6] text-[var(--color-faint)]"
              style={{ borderLeft: '1px solid color-mix(in oklab, var(--color-brand-blue) 45%, transparent)' }}
            >
              {billingNote}
            </span>
            <a
              href="#get"
              className="inline-flex items-center rounded-full bg-[var(--color-foreground)] px-8 py-[15px] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-background)] transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-90"
            >
              {yearly ? 'Subscribe yearly' : 'Subscribe monthly'}
            </a>
          </motion.div>
        </div>
      </MeshHero>

      {/* ── Free vs Premium ── */}
      <Section className="px-5 pt-[150px] pb-10 sm:px-6 md:px-11">
        <div className="mx-auto max-w-[1180px]">
          <span className="mb-[22px] block text-[10.5px] font-semibold uppercase tracking-[0.34em] text-[var(--color-brand-blue)]">
            What the subscription unlocks
          </span>
          <h2 className="m-0 mb-14 font-display text-[clamp(30px,4.2vw,52px)] font-semibold leading-[1.06] tracking-[-0.035em]">
            Free keeps you talking.{' '}
            <span className="text-[var(--color-faint)]">Premium moves everything else.</span>
          </h2>

          {/* Column-major over four rows, so the four Free capabilities fill the
              left column and the four Premium ones the right, rather than
              interleaving the way row-major flow would. */}
          <div className="grid grid-cols-1 gap-x-14 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4">
            {COMPARE.map(row => (
              <div
                key={row.label}
                className="grid grid-cols-[1fr_auto] items-baseline gap-5 border-t border-[var(--color-surface-border)] py-5"
              >
                <span className="text-[15px] leading-[1.45] text-[var(--color-muted)]">{row.label}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-faint)]">
                  {row.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── FAQ ── */}
      <Section className="px-5 pb-[150px] sm:px-6 md:px-11">
        <div className="mx-auto max-w-[1180px] border-t border-[var(--color-surface-border)] pt-[110px]">
          <span className="mb-[22px] block text-center text-[10.5px] font-semibold uppercase tracking-[0.34em] text-[var(--color-brand-blue)]">
            FAQ
          </span>
          <h2 className="m-0 mb-12 text-center font-display text-[clamp(30px,4.2vw,52px)] font-semibold leading-[1.06] tracking-[-0.035em]">
            Common questions.
          </h2>

          <div className="mx-auto flex w-full max-w-[720px] flex-col">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
            <div className="border-t border-[var(--color-surface-border)]" />
          </div>
        </div>
      </Section>

      {/* ── Closing CTA ── */}
      <ClosingCTA id="get" blurb="Download free, subscribe when you need the rest. iOS 13+ and Android 7+." />

      <Footer theme={theme} />
    </main>
  );
};
