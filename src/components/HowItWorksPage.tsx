"use client";

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { HowItWorks } from './HowItWorks';
import { useTheme, Theme } from '../hooks/useTheme';

export const HowItWorksPage = ({ initialTheme = 'light' }: { initialTheme?: Theme }) => {
  const { theme, toggleTheme } = useTheme(initialTheme);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-500 ease-in-out">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <HowItWorks />
      <Footer theme={theme} />
    </main>
  );
};
