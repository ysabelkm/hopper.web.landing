"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
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

/** Shown only in the mobile menu — the pill has no room for these. */
const MENU_LINKS = [
  ...LINKS,
  { href: '/about', label: 'About us' },
  { href: '/team', label: 'The team' },
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/careers', label: 'Careers' },
  { href: '/support', label: 'Support' },
];

function MenuIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        d={open ? 'M6 6l12 12M18 6L6 18' : 'M3.5 8h17M3.5 16h17'}
      />
    </svg>
  );
}

/**
 * A centred floating pill. The wrapper does the centring with flex — using
 * `left:50%` + `translateX(-50%)` here would be overwritten by the drop-in
 * animation's transform and knock the pill off-centre.
 */
// iconamoon:mode-light-light
function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" strokeLinejoin="round" />
        <path
          strokeLinecap="round"
          d="M20 12h1M3 12h1m8 8v1m0-18v1m5.657 13.657l.707.707M5.636 5.636l.707.707m0 11.314l-.707.707M18.364 5.636l-.707.707"
        />
      </g>
    </svg>
  );
}

// iconamoon:mode-dark-light
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 21a9 9 0 0 0 8.997-9.252a7 7 0 0 1-10.371-8.643A9 9 0 0 0 12 21"
      />
    </svg>
  );
}

export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close on navigation, and whenever the viewport grows past the mobile
  // breakpoint — otherwise the panel would linger over the desktop pill.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="fixed top-[18px] left-0 right-0 z-50 box-border flex max-w-[100vw] justify-center overflow-x-clip overflow-y-visible pb-[420px] -mb-[420px] px-3 pointer-events-none sm:px-4">
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex max-w-full flex-col"
      >
      <div
        className="flex items-center gap-3 rounded-full border border-[var(--color-surface-border)] py-2.5 pl-4 pr-2.5 backdrop-blur-[18px] shadow-[0_4px_16px_-8px_rgba(0,0,0,0.18),0_16px_48px_-24px_rgba(0,0,0,0.35)] sm:gap-5 sm:pl-[22px] sm:pr-3 md:gap-10"
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
            className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border border-[var(--color-surface-border)] leading-none text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-ghost)] [&>svg]:block"
          >
            {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>

          {/* Lands on the homepage price block, where the store badges live. */}
          <a
            href="/#get"
            className="whitespace-nowrap rounded-full bg-[var(--color-foreground)] px-3.5 py-2.5 text-[10px] tracking-[0.18em] text-[var(--color-background)] transition-opacity hover:opacity-85 sm:px-5"
          >
            Download
          </a>

          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border border-[var(--color-surface-border)] leading-none text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-ghost)] sm:hidden [&>svg]:block"
          >
            <MenuIcon open={menuOpen} className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden sm:hidden"
          >
            <div
              className="mt-2 flex flex-col gap-1 rounded-[22px] border border-[var(--color-surface-border)] p-2 backdrop-blur-[18px] shadow-[0_4px_16px_-8px_rgba(0,0,0,0.18),0_16px_48px_-24px_rgba(0,0,0,0.35)]"
              style={{ background: 'color-mix(in oklab, var(--color-background) 92%, transparent)' }}
            >
              {MENU_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'rounded-full px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)] transition-colors hover:bg-[var(--color-ghost)] hover:text-[var(--color-foreground)]',
                    pathname === link.href && 'bg-[var(--color-ghost)] text-[var(--color-foreground)]',
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.nav>
    </div>
  );
};
