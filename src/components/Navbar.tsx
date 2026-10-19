"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { HopperLogo } from './HopperLogo';
import { cn } from '../lib/utils';
import { TESTFLIGHT_URL } from '../lib/links';

type NavbarProps = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

const LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
];

/** Shown only in the mobile menu — the bar has no room for these. */
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

// iconamoon:mode-light
function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="4" strokeLinejoin="round" />
        <path
          strokeLinecap="round"
          d="M20 12h1M3 12h1m8 8v1m0-18v1m5.657 13.657l.707.707M5.636 5.636l.707.707m0 11.314l-.707.707M18.364 5.636l-.707.707"
        />
      </g>
    </svg>
  );
}

// iconamoon:mode-dark-duotone
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <path
          fill="currentColor"
          opacity=".16"
          d="M12 21a9 9 0 0 0 8.997-9.252a7 7 0 0 1-10.371-8.643A9 9 0 0 0 12 21"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 21a9 9 0 0 0 8.997-9.252a7 7 0 0 1-10.371-8.643A9 9 0 0 0 12 21"
        />
      </g>
    </svg>
  );
}

export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  // At the top of the page the bar is a bare, full-width row; once the page
  // scrolls it condenses into a blurred floating pill.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // An open mobile menu needs the solid bar behind it even at the top.
  const condensed = scrolled || menuOpen;

  // Close on navigation, and whenever the viewport grows past the mobile
  // breakpoint — otherwise the panel would linger over the desktop pill.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // The wrapper does the centring with flex — `left:50%` + `translateX(-50%)`
  // on the bar would be overwritten by the drop-in animation's transform.
  return (
    <div className="fixed top-[14px] left-0 right-0 z-50 box-border flex max-w-[100vw] justify-center overflow-x-clip overflow-y-visible pb-[420px] -mb-[420px] px-3 pointer-events-none sm:px-4">
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'pointer-events-auto flex w-full flex-col transition-[max-width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          condensed ? 'max-w-[780px]' : 'max-w-[1180px]',
        )}
      >
      <div
        className={cn(
          'flex items-center justify-between gap-4 border py-2.5 transition-[background-color,border-color,border-radius,box-shadow,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:gap-10',
          condensed
            ? 'rounded-full border-[var(--color-surface-border)] pl-5 pr-2.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.18)] backdrop-blur-[18px] sm:pl-6'
            : 'rounded-[10px] border-transparent pl-2 pr-0 sm:pl-3 sm:pr-1',
        )}
        style={{
          background: condensed
            ? 'color-mix(in oklab, var(--color-background) 80%, transparent)'
            : 'transparent',
        }}
      >
        {/* The wordmark's PNG reserves descender room it never fills — its ink
            spans only the top 78% of the canvas, putting the visible centroid
            ~10% of the height above centre. Centring the box therefore makes
            the mark ride high, so it is nudged down by that measured amount. */}
        <a href="/" aria-label="Hopper home" className="group flex items-center">
          {scrolled ? (
            <img
              src={theme === 'light' ? '/hopper_icon_black.png' : '/hopper_icon_white.png'}
              alt="Hopper"
              draggable={false}
              // A quick spin-and-grow on hover; springs back when the pointer leaves.
              className="h-[22px] w-auto transition-[rotate,scale] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-safe:group-hover:rotate-[360deg] motion-safe:group-hover:scale-125"
            />
          ) : (
            <HopperLogo theme={theme} className="h-[22px] w-auto translate-y-[2px]" />
          )}
        </a>

        <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)] md:gap-[26px]">
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'hidden whitespace-nowrap transition-colors hover:text-[var(--color-foreground)] md:inline',
                pathname === link.href && 'text-[var(--color-foreground)]',
              )}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-[30px] w-[30px] shrink-0 place-items-center overflow-hidden rounded-full border border-[var(--color-surface-border)] leading-none text-[var(--color-foreground)] transition-[background-color,transform] hover:bg-[var(--color-ghost)] active:scale-90"
          >
            {/* Both icons share one grid cell, so the outgoing one spins away
                while the incoming one spins in from the opposite side. */}
            <AnimatePresence initial={false}>
              <motion.span
                key={theme}
                className="[grid-area:1/1] [&>svg]:block"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.4 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.4 }}
                transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* The iOS beta. Phones get the short label so the bar still fits. */}
          <a
            href={TESTFLIGHT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[color-mix(in_oklab,var(--color-brand-blue)_14%,transparent)] py-1.5 pl-1.5 pr-3.5 text-[10px] font-semibold tracking-[0.18em] text-[var(--color-brand-blue)] transition-colors hover:bg-[color-mix(in_oklab,var(--color-brand-blue)_22%,transparent)] sm:pr-4 [:root.dark_&]:text-white"
          >
            <img
              src="/images/testflight.webp"
              alt=""
              width={22}
              height={22}
              className="block h-[22px] w-[22px] rounded-[6px]"
            />
            <span className="sm:hidden">TestFlight</span>
            <span className="hidden sm:inline">Try on TestFlight</span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
            />
          </a>

          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border border-[var(--color-surface-border)] leading-none text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-ghost)] md:hidden [&>svg]:block"
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
            className="overflow-hidden md:hidden"
          >
            <div
              className="mt-2 flex flex-col gap-1 rounded-[22px] border border-[var(--color-surface-border)] p-2 backdrop-blur-[18px]"
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
