"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Zap, Download, ArrowRight } from 'lucide-react';
import { HowItWorks } from './HowItWorks';

const Navbar = ({ theme, toggleTheme }: { theme: 'dark' | 'light'; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-10 py-8 flex justify-between items-center transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/50 to-transparent backdrop-blur-[2px] -z-10" />

      {/* Left: Logo + primary nav */}
      <div className="hidden md:flex items-center gap-10">
        <a href="/" className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-current rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-current" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">Hopper</span>
        </a>
        <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-[var(--color-muted)]">
          <a href="/#mission" className="hover:text-[var(--color-foreground)] transition-colors">Vision</a>
          <a href="/#segments" className="hover:text-[var(--color-foreground)] transition-colors">Impact</a>
          <a href="/#how-it-works" className="hover:text-[var(--color-foreground)] transition-colors">Technology</a>
        </div>
      </div>

      {/* Mobile: Logo */}
      <a href="/" className="flex md:hidden items-center gap-3">
        <div className="w-6 h-6 border-2 border-current rotate-45 flex items-center justify-center">
          <div className="w-2 h-2 bg-current" />
        </div>
        <span className="text-xl font-bold tracking-tighter uppercase">Hopper</span>
      </a>

      {/* Right: secondary nav + theme + download */}
      <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-[var(--color-muted)]">
        <a href="/how-it-works" className="text-[var(--color-foreground)] transition-colors">How It Works</a>
        <a href="/pricing" className="hover:text-[var(--color-foreground)] transition-colors">Pricing</a>
        <a href="/customers" className="hover:text-[var(--color-foreground)] transition-colors">Customers</a>

        <button
          onClick={toggleTheme}
          className="p-2 border border-current/10 rounded-full hover:bg-current/5 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="px-6 py-2 border border-current/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
        >
          Download
        </motion.button>
      </div>

      <div className="flex items-center gap-4 md:hidden">
        <button onClick={toggleTheme} className="p-2 opacity-60 hover:opacity-100 transition-opacity">
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="text-current" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-[var(--color-background)] backdrop-blur-xl p-10 flex flex-col gap-8 md:hidden border-b border-white/10"
          >
            <a href="/#mission" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Vision</a>
            <a href="/#segments" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Impact</a>
            <a href="/how-it-works" onClick={() => setIsOpen(false)} className="text-3xl font-bold tracking-tight">How It Works</a>
            <a href="/pricing" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Pricing</a>
            <a href="/customers" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Customers</a>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="w-full py-5 bg-current text-[var(--color-background)] rounded-lg font-bold uppercase tracking-widest text-xs"
            >
              Download Hopper
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="pt-24 pb-16 px-10 md:px-20 border-t border-current/10 bg-[var(--color-background)]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <a href="/" className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-current rotate-45 flex items-center justify-center">
          <div className="w-2 h-2 bg-current" />
        </div>
        <span className="text-xl font-bold tracking-tighter uppercase">Hopper</span>
      </a>
      <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-faint)]">
        <a href="/#mission" className="hover:text-[var(--color-foreground)] transition-colors">Vision</a>
        <a href="/#segments" className="hover:text-[var(--color-foreground)] transition-colors">Impact</a>
        <a href="/how-it-works" className="text-[var(--color-foreground)] transition-colors">How It Works</a>
        <a href="/pricing" className="hover:text-[var(--color-foreground)] transition-colors">Pricing</a>
      </div>
      <p className="text-[10px] text-[var(--color-faint)] uppercase tracking-[0.2em] font-bold">© 2026 Hopper Protocol Labs</p>
    </div>
  </footer>
);

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
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <HowItWorks />
      <Footer />
    </main>
  );
};
