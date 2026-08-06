"use client";

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, BriefcaseBusiness } from 'lucide-react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { TopScrollProgress } from './TopScrollProgress';

export const CareersPage = ({ initialTheme }: { initialTheme: 'dark' | 'light' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.cookie = `hopper-theme=${theme};path=/;max-age=31536000`;
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <TopScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="flex min-h-[86vh] items-center px-6 pb-24 pt-40 md:px-12 lg:px-20">
        <motion.section
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          className="mx-auto w-full max-w-4xl text-center"
        >
          <div className="mx-auto mb-10 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] text-blue-500">
            <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="mb-8 block text-[11px] font-bold uppercase tracking-[0.4em] text-blue-500">Careers at Hopper</span>
          <h1 className="mb-8 text-5xl font-bold leading-[0.96] tracking-[-0.05em] sm:text-6xl md:text-8xl">
            No open roles.<br /><span className="text-[var(--color-faint)]">For now.</span>
          </h1>
          <p className="mx-auto mb-12 max-w-xl text-lg font-light leading-relaxed text-[var(--color-muted)]">
            We are not hiring at the moment. When new opportunities become available, they will be posted here.
          </p>
          <a
            href="/about"
            className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[var(--color-glass-border)] px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)] transition-colors duration-200 hover:border-[var(--color-muted)] hover:text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            About Hopper
          </a>
        </motion.section>
      </main>

      <Footer theme={theme} />
    </div>
  );
};
