"use client";

import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useTheme, Theme } from '../hooks/useTheme';

/** Theme state, navbar and footer around a page's own sections. */
export const PageShell = ({ initialTheme = 'light', children }: { initialTheme?: Theme; children: ReactNode }) => {
  const { theme, toggleTheme } = useTheme(initialTheme);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-500 ease-in-out">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      {children}
      <Footer theme={theme} />
    </main>
  );
};
