"use client";

import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { HopperLogo } from './HopperLogo';
import { cn } from '../lib/utils';

type NavbarProps = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

const LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
];

/**
 * A centred floating pill. The wrapper does the centring with flex — using
 * `left:50%` + `translateX(-50%)` here would be overwritten by the drop-in
 * animation's transform and knock the pill off-centre.
 */
export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <div className="fixed top-[18px] left-0 right-0 z-50 box-border flex max-w-[100vw] justify-center overflow-hidden px-3 pointer-events-none sm:px-4">
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex max-w-full items-center gap-3 rounded-full border border-[var(--color-surface-border)] py-2.5 pl-4 pr-2.5 backdrop-blur-[18px] shadow-[0_10px_40px_-18px_rgba(0,0,0,0.55)] sm:gap-5 sm:pl-[22px] sm:pr-3 md:gap-10"
        style={{ background: 'color-mix(in oklab, var(--color-background) 76%, transparent)' }}
      >
        {/* The wordmark's PNG reserves descender room it never fills — its ink
            spans only the top 78% of the canvas, putting the visible centroid
            ~10% of the height above centre. Centring the box therefore makes
            the mark ride high, so it is nudged down by that measured amount. */}
        <a href="/" aria-label="Hopper home" className="flex items-center">
          <HopperLogo theme={theme} className="h-[22px] w-auto translate-y-[2px]" />
        </a>

        <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)] sm:gap-4 md:gap-[26px]">
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'hidden transition-colors hover:text-[var(--color-foreground)] sm:inline',
                pathname === link.href && 'text-[var(--color-foreground)]',
              )}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-[30px] w-[30px] place-items-center rounded-full border border-[var(--color-surface-border)] text-xs text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-ghost)]"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          {/* Lands on the homepage price block, where the store badges live. */}
          <a
            href="/#get"
            className="whitespace-nowrap rounded-full bg-[var(--color-foreground)] px-3.5 py-2.5 text-[10px] tracking-[0.18em] text-[var(--color-background)] transition-opacity hover:opacity-85 sm:px-5"
          >
            Download
          </a>
        </div>
      </motion.nav>
    </div>
  );
};
