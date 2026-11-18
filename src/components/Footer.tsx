"use client";

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HopperLogo } from './HopperLogo';
import { APP_STORE_URL, PLAY_STORE_URL } from '../lib/links';

type FooterLink = { label: string; href: string; external?: boolean };

/** Columns whose entries are links… */
const LINK_COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',  href: '/about' },
      { label: 'The Team',  href: '/team' },
      { label: 'Manifesto', href: '/manifesto' },
      { label: 'Careers',   href: '/careers' },
      { label: 'Support',   href: '/support' },
    ],
  },
];

/** …and columns that are plain text, because those entries point nowhere. */
const TEXT_COLUMNS: { heading: string; items: string[] }[] = [
  {
    heading: 'Features',
    items: ['Mesh Networking', 'Offline Messaging', 'File Transfer', 'Node Encryption'],
  },
  {
    heading: 'Use Cases',
    items: ['Remote Communities', 'Field Operations', 'Campus Networks', 'Event Venues'],
  },
];

const TAIL_COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy',   href: '/privacy' },
    ],
  },
  {
    heading: 'Socials',
    links: [
      { label: 'Twitter / X', href: '#', external: true },
      { label: 'LinkedIn',    href: 'https://www.linkedin.com/company/hopperafrica', external: true },
      { label: 'Instagram',   href: '#', external: true },
    ],
  },
];

const HEADING = 'm-0 text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-faint)]';
const ITEM = 'text-sm font-light text-[var(--color-muted)]';
const LINK = `${ITEM} transition-colors hover:text-[var(--color-foreground)]`;
function FooterAnchor({ link }: { link: FooterLink }) {
  if (!link.external) {
    return <a href={link.href} className={LINK}>{link.label}</a>;
  }
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${LINK} inline-flex items-center gap-1.5`}
    >
      {link.label}
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </a>
  );
}

const RULE_LABEL = 'shrink-0 text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--color-faint)]';

/** A section label sitting inside a dashed hairline rule. */
const SectionRule = ({ label }: { label: string }) => (
  <div className="mx-6 flex sm:mx-8 items-center gap-4">
    <span className={RULE_LABEL}>{label}</span>
    <span className="flex-1 border-t border-dashed border-[var(--color-surface-border)]" />
  </div>
);

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not subscribe');
      setSubmitted(true);
    } catch {
      setError('We could not add you right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <p className="m-0 text-sm font-light text-[var(--color-muted)]">You&rsquo;re on the list. We&rsquo;ll be in touch.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-96 flex-wrap gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="name@email.com"
        aria-label="Email address"
        required
        className="min-w-[180px] flex-1 rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-ghost)] px-4 py-2.5 text-sm font-light text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-faint)] focus:border-[var(--color-brand-blue)]"
      />
      <button
        type="submit"
        disabled={loading}
        className="shrink-0 rounded-xl bg-[var(--color-brand-blue)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-[0.88] disabled:opacity-60"
      >
        {loading ? 'Joining…' : 'Subscribe'}
      </button>
      {error && <p className="basis-full text-xs text-red-400">{error}</p>}
    </form>
  );
};

export const Footer = ({ theme }: { theme: 'dark' | 'light' }) => {
  const card = 'rounded-[28px] border border-[var(--color-surface-border)] bg-[var(--color-surface-1)]';

  return (
    <footer className="px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="flex flex-wrap items-stretch gap-4">

        {/* ── Left card — nav, newsletter, credit ── */}
        <div className={`${card} flex-[1_1_560px] overflow-hidden`}>
          <div className="flex flex-col gap-3 px-6 pt-8 pb-5 sm:px-8">
            {/* self-start keeps the flex column from stretching the logo wide */}
            <HopperLogo theme={theme} className="h-[34px] w-auto self-start" />
            <p className="m-0 max-w-[320px] text-sm font-light leading-[1.6] text-[var(--color-muted)]">
              Decentralized, offline-first communication. Built for a resilient future.
            </p>
          </div>

          <SectionRule label="Navigation" />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(130px,100%),1fr))] gap-x-8 gap-y-6 px-6 py-6 sm:px-8">
            {LINK_COLUMNS.map(col => (
              <div key={col.heading} className="flex flex-col gap-3">
                <h6 className={HEADING}>{col.heading}</h6>
                {col.links.map(link => (
                  <FooterAnchor key={link.label} link={link} />
                ))}
              </div>
            ))}
            {TEXT_COLUMNS.map(col => (
              <div key={col.heading} className="flex flex-col gap-3">
                <h6 className={HEADING}>{col.heading}</h6>
                {col.items.map(item => (
                  <span key={item} className={ITEM}>{item}</span>
                ))}
              </div>
            ))}
            {TAIL_COLUMNS.map(col => (
              <div key={col.heading} className="flex flex-col gap-3">
                <h6 className={HEADING}>{col.heading}</h6>
                {col.links.map(link => (
                  <FooterAnchor key={link.label} link={link} />
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 px-6 pb-5 sm:px-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[var(--color-faint)]">
              Join our newsletter
            </span>
            <NewsletterForm />
          </div>

          <SectionRule label="Credit" />

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5 px-6 pt-4 pb-5 sm:px-8">
            <span className="text-[11px] text-[var(--color-faint)]">© 2026 Hopper Africa. All rights reserved.</span>
            <span className="text-[11px] italic text-[var(--color-faint)]">
              built for the moments that matter — Team Hopper
            </span>
          </div>
        </div>

        {/* ── Right card — QR + store buttons ──
            A sidebar beside the main card on desktop; below lg it spans the
            full width with the QR beside the buttons, so no gap is left. */}
        <div id="download" className={`${card} scroll-mt-24 flex flex-[1_1_300px] flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8 lg:flex-[0_1_340px] lg:flex-col lg:items-stretch lg:gap-5`}>
          <div className="grid place-items-center sm:flex-[0_0_200px] lg:flex-1">
            {/* No tile: the QR is painted through a CSS mask so its modules take
                the text colour (near-black in light, white in dark) and its
                background stays transparent — a plain <img> can't recolour
                the SVG's fills. */}
            <span
              role="img"
              aria-label="Scan to download Hopper"
              className="block aspect-square w-full max-w-[232px] bg-[var(--color-foreground)]"
              style={{
                WebkitMaskImage: 'url(/hopperwebqr.svg)',
                maskImage: 'url(/hopperwebqr.svg)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            />
          </div>

          <div className="flex flex-col gap-5 sm:flex-1 lg:flex-none">
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-faint)]">
                Download the app
              </span>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${storeButton} border-black/10 bg-white text-black hover:border-black/25`}
              >
                <img src="/icons/appstoreicon.png" alt="" className={storeIcon} />
                <span className="text-sm font-medium tracking-[-0.01em]">Download on the App Store</span>
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${storeButton} border-[var(--color-surface-border)] bg-[var(--color-background)] text-[var(--color-foreground)] hover:border-[color-mix(in_oklab,var(--color-foreground)_28%,transparent)]`}
              >
                <img src="/icons/playstoreicon.png" alt="" className={storeIcon} />
                <span className="text-sm font-medium tracking-[-0.01em]">Get it on Google Play</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

/* Store buttons: on hover they lift with a soft shadow, the border firms up
   and the icon nudges; pressing sinks them back down. Motion is skipped for
   people who prefer reduced motion, leaving the border and shadow change. */
const storeButton =
  'group flex items-center justify-center gap-4 rounded-xl border px-6 py-[9px] ' +
  'transition-[translate,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'hover:shadow-[0_10px_24px_-12px_rgb(0_0_0/0.35)] motion-safe:hover:-translate-y-0.5 ' +
  'motion-safe:active:translate-y-0 active:shadow-none active:duration-100 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-blue)]';

const storeIcon =
  'h-7 w-7 shrink-0 object-contain transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110';
