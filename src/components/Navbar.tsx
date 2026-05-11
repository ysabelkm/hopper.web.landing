"use client";

import { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HopperLogo } from './HopperLogo';

type NavbarProps = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

export const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-10 py-8 flex justify-between items-center transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/50 to-transparent backdrop-blur-[2px] -z-10" />

      {/* Left: Logo + primary nav links */}
      <div className="hidden md:flex items-center gap-10">
        <a href="/" aria-label="Hopper home">
          <HopperLogo theme={theme} className="h-8 w-auto" />
        </a>
        <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-[var(--color-muted)]">
          <a href="/#mission"     className="hover:text-[var(--color-foreground)] transition-colors">Vision</a>
          <a href="/#segments"    className="hover:text-[var(--color-foreground)] transition-colors">Impact</a>
          <a href="/#how-it-works" className="hover:text-[var(--color-foreground)] transition-colors">Technology</a>
        </div>
      </div>

      {/* Mobile: Logo only */}
      <a href="/" aria-label="Hopper home" className="flex md:hidden items-center">
        <HopperLogo theme={theme} className="h-8 w-auto" />
      </a>

      {/* Right: secondary links + theme toggle + download */}
      <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-[var(--color-muted)]">
        <a href="/how-it-works" className="hover:text-[var(--color-foreground)] transition-colors">How It Works</a>
        <a href="/pricing"      className="hover:text-[var(--color-foreground)] transition-colors">Pricing</a>
        <a href="/customers"    className="hover:text-[var(--color-foreground)] transition-colors">Customers</a>
        <button
          onClick={toggleTheme}
          className="p-2 border border-current/10 rounded-full hover:bg-current/5 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 border border-current/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-all"
        >
          Download
        </motion.button>
      </div>

      {/* Mobile: theme + hamburger */}
      <div className="flex items-center gap-4 md:hidden">
        <button onClick={toggleTheme} className="p-2 opacity-60 hover:opacity-100 transition-opacity">
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="text-current" onClick={() => setIsOpen(o => !o)} aria-label="Toggle menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-[var(--color-background)] backdrop-blur-xl p-10 flex flex-col gap-8 md:hidden border-b border-[var(--color-surface-border)]"
          >
            <a href="/#mission"      onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Vision</a>
            <a href="/#segments"     onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Impact</a>
            <a href="/#how-it-works" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Technology</a>
            <a href="/how-it-works"  onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">How It Works</a>
            <a href="/pricing"       onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Pricing</a>
            <a href="/customers"     onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Customers</a>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-lg font-bold uppercase tracking-widest text-xs"
            >
              Download Hopper
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
