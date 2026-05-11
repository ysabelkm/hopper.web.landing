"use client";

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TopScrollProgress } from './TopScrollProgress';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Zap, Download, ArrowRight } from 'lucide-react';
import { HowItWorks } from './HowItWorks';

export const HowItWorksPage = ({ initialTheme = 'dark' }: { initialTheme?: 'dark' | 'light' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.cookie = `hopper-theme=${theme}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem('hopper-theme', theme);
  }, [theme]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] selection:bg-blue-500 selection:text-white transition-colors duration-500 ease-in-out">
      <TopScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <HowItWorks />
      <Footer theme={theme} />
    </main>
  );
};
