"use client";

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HopperLogo } from './HopperLogo';

type FooterLink = { label: string; href: string; external?: boolean };

const columns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us',  href: '#' },
      { label: 'The Team',  href: '#' },
      { label: 'Manifesto', href: '#' },
      { label: 'Careers',   href: '#' },
      { label: 'Support',   href: '/support' },
    ],
  },
  {
    heading: 'Features',
    links: [
      { label: 'Mesh Networking',  href: '#' },
      { label: 'Offline Messaging', href: '#' },
      { label: 'File Transfer',    href: '#' },
      { label: 'Node Encryption',  href: '#' },
    ],
  },
  {
    heading: 'Use Cases',
    links: [
      { label: 'Remote Communities', href: '/use-cases/remote-communities' },
      { label: 'Field Operations',   href: '/use-cases/field-operations' },
      { label: 'Campus Networks',    href: '/use-cases/campus-networks' },
      { label: 'Event Venues',       href: '/use-cases/event-venues' },
    ],
  },
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
      { label: 'LinkedIn',    href: '#', external: true },
      { label: 'Instagram',   href: '#', external: true },
    ],
  },
];


const NewsletterForm = ({ isDark }: { isDark: boolean }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const inputBg = isDark ? 'bg-[#2a2a2c] border-white/10 text-[var(--color-foreground)] placeholder:text-[var(--color-faint)]' : 'bg-[#f5f5f7] border-black/8 text-[var(--color-foreground)] placeholder:text-[var(--color-faint)]';

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-sm text-[var(--color-muted)] font-light">
        You're on the list. We'll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-sm">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="name@email.com"
        required
        className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-light outline-none focus:border-blue-500 transition-colors ${inputBg}`}
      />
      <button
        type="submit"
        className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
};

export const Footer = ({ theme }: { theme: 'dark' | 'light' }) => {
  const isDark = theme === 'dark';

  const cardBg    = isDark ? 'bg-[#1c1c1e]'           : 'bg-white';
  const cardBorder = isDark ? 'border-white/8'         : 'border-black/8';
  const dashedLine = isDark ? 'border-white/10'        : 'border-black/8';
  const textMuted  = 'text-[var(--color-muted)]';
  const textFaint  = 'text-[var(--color-faint)]';

  return (
    <footer className="px-4 md:px-6 pb-6 bg-[var(--color-background)]">
      <div className="flex flex-col lg:flex-row gap-4 w-full">

        {/* ── Left card — main nav ── */}
        <div className={`flex-1 rounded-[28px] border ${cardBg} ${cardBorder} overflow-hidden`}>

          {/* Logo hero area */}
          <div className="px-8 pt-8 pb-5">
            <HopperLogo theme={theme} className="h-10 w-auto mb-3" />
            <p className={`text-sm font-light leading-relaxed max-w-xs ${textMuted}`}>
              Decentralized, offline-first communication. Built for a resilient future.
            </p>
          </div>

          {/* Navigation section label embedded in dashed line */}
          <div className={`mx-8 flex items-center gap-4`}>
            <span className={`text-[11px] uppercase tracking-[0.25em] font-medium ${textFaint} shrink-0`}>Navigation</span>
            <div className={`flex-1 border-t border-dashed ${dashedLine}`} />
          </div>

          {/* Columns */}
          <div className="px-8 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-6">
            {columns.map((col) => (
              <div key={col.heading}>
                <h6 className={`text-[12px] font-bold mb-3 ${textFaint} uppercase tracking-[0.1em]`}>
                  {col.heading}
                </h6>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={`text-sm font-light ${textMuted} hover:text-[var(--color-foreground)] transition-colors flex items-center gap-1`}
                      >
                        {link.label}
                        {'external' in link && link.external && (
                          <ArrowUpRight className="w-3 h-3 opacity-50" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="px-8 pb-4">
            <p className={`text-[11px] uppercase tracking-[0.25em] font-medium ${textFaint} mb-3`}>Join our newsletter</p>
            <NewsletterForm isDark={isDark} />
          </div>

          {/* Credit section label embedded in dashed line */}
          <div className={`mx-8 flex items-center gap-4`}>
            <span className={`text-[11px] uppercase tracking-[0.25em] font-medium ${textFaint} shrink-0`}>Credit</span>
            <div className={`flex-1 border-t border-dashed ${dashedLine}`} />
          </div>

          {/* Credit bar */}
          <div className="px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <p className={`text-[11px] ${textFaint}`}>
              © 2026 Hopper Africa. All rights reserved.
            </p>
            <p className={`text-[11px] italic ${textFaint}`}>
              built for the moments that matter — Team Hopper
            </p>
          </div>
        </div>

        {/* ── Right card — QR + download ── */}
        <div className={`lg:w-[340px] rounded-[28px] border ${cardBg} ${cardBorder} flex flex-col p-8 gap-5`}>

          {/* QR code */}
          <div className="flex-1 flex items-center justify-center">
            <img src="/hopperwebqr.svg" alt="Scan to download Hopper" className="w-80 h-80 object-contain" />
          </div>

          {/* Download buttons */}
          <div className="flex flex-col gap-3">
            <p className={`text-[11px] uppercase tracking-[0.2em] font-bold ${textFaint} mb-1`}>
              Download the app
            </p>
            <button className="w-full flex items-center justify-center gap-4 px-6 py-2 rounded-xl bg-white hover:bg-[#f0f0f0] text-[#000000] border border-black/10 transition-colors">
              <img src="/icons/appstoreicon.png" alt="" className="w-7 h-7 shrink-0 object-contain" />
              <span className="font-[Outfit,sans-serif] text-[15px] font-medium tracking-tight">Download on the App Store</span>
            </button>
            <button className={`w-full flex items-center justify-center gap-4 px-6 py-2 rounded-xl transition-colors ${isDark ? 'bg-[#1c1c1e] hover:bg-[#2a2a2c] border border-white/10 text-white' : 'bg-[#1d1d1f] hover:bg-[#2d2d2f] text-white'}`}>
              <img src="/icons/playstoreicon.png" alt="" className="w-7 h-7 shrink-0 object-contain" />
              <span className="font-[Outfit,sans-serif] text-[15px] font-medium tracking-tight">Download on Google Play</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
