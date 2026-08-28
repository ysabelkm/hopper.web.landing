"use client";

import { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { MeshHero, HeroHeadline, HeroParagraph } from './MeshHero';

export const CareersPage = ({ initialTheme }: { initialTheme: 'dark' | 'light' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);

  const toggleTheme = () => setTheme(current => (current === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.cookie = `hopper-theme=${theme}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem('hopper-theme', theme);
  }, [theme]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-500 ease-in-out selection:bg-blue-500 selection:text-white">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* The page is the hero: there are no roles to list, so the mesh hero
          carries the whole message rather than sitting above an empty board. */}
      <MeshHero
        eyebrow="Careers at Hopper"
        topRight={
          <a
            href="/about"
            className="inline-flex items-center rounded-full border border-[var(--color-surface-border)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-muted)] hover:text-[var(--color-foreground)]"
          >
            About Hopper
          </a>
        }
        footnotes={['Roles posted here when open', 'support@hopperafrica.com']}
      >
        <HeroParagraph>
          We are not hiring at the moment. When new opportunities become available, they will be
          posted here.
        </HeroParagraph>
        <HeroHeadline lines={['No open roles.', 'For now.']} />
      </MeshHero>

      <Footer theme={theme} />
    </main>
  );
};
