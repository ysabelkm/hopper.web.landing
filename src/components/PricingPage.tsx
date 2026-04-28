"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TopScrollProgress } from './TopScrollProgress';
import { Sun, Moon, Menu, X, Download, ArrowRight, Check, Zap, Shield, Radio, Wifi, Users, Lock, MessageCircle, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

// ── Shared Navbar ─────────────────────────────────────────────────────────────
const Navbar = ({ theme, toggleTheme }: { theme: 'dark' | 'light'; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-10 py-8 flex justify-between items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/50 to-transparent backdrop-blur-[2px] -z-10" />
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
      <a href="/" className="flex md:hidden items-center gap-3">
        <div className="w-6 h-6 border-2 border-current rotate-45 flex items-center justify-center">
          <div className="w-2 h-2 bg-current" />
        </div>
        <span className="text-xl font-bold tracking-tighter uppercase">Hopper</span>
      </a>
      <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-[var(--color-muted)]">
      <a href="/how-it-works" className="hover:text-[var(--color-foreground)] transition-colors">How It Works</a>
        <a href="/pricing" className="text-[var(--color-foreground)]">Pricing</a>
        <a href="/customers" className="hover:text-[var(--color-foreground)] transition-colors">Customers</a>
        <button onClick={toggleTheme} className="p-2 border border-current/10 rounded-full hover:bg-current/5 transition-colors" aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="px-6 py-2 border border-current/20 rounded-full text-[10px] uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
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
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-[var(--color-background)] backdrop-blur-xl p-10 flex flex-col gap-8 md:hidden border-b border-white/10">
            <a href="/#mission" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Vision</a>
            <a href="/how-it-works" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">How It Works</a>
            <a href="/pricing" onClick={() => setIsOpen(false)} className="text-3xl font-bold tracking-tight">Pricing</a>
            <a href="/customers" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Customers</a>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="w-full py-5 bg-current text-[var(--color-background)] rounded-lg font-bold uppercase tracking-widest text-xs">
              Download Hopper
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ── Features list ─────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: MessageCircle, label: "Unlimited encrypted messages" },
  { icon: Radio,         label: "Full BLE mesh access" },
  { icon: Wifi,          label: "Wi-Fi Direct file transfer" },
  { icon: Shield,        label: "AES-256-GCM end-to-end encryption" },
  { icon: Users,         label: "Up to 1,024 mesh peers" },
  { icon: Lock,          label: "Zero metadata logging" },
  { icon: RefreshCw,     label: "Auto mesh failover (1.2 s)" },
  { icon: Zap,           label: "Priority message routing" },
];

// ── Billing toggle ────────────────────────────────────────────────────────────
const Toggle = ({ yearly, onChange }: { yearly: boolean; onChange: (v: boolean) => void }) => (
  <div className="flex items-center gap-4">
    <button
      onClick={() => onChange(false)}
      className={cn("text-sm font-bold uppercase tracking-widest transition-colors",
        !yearly ? "text-[var(--color-foreground)]" : "text-[var(--color-muted)]")}
    >
      Monthly
    </button>
    <button
      onClick={() => onChange(!yearly)}
      className="relative w-14 h-7 rounded-full border border-current/20 bg-current/5 flex items-center px-1 transition-colors"
      aria-label="Toggle billing period"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={cn("w-5 h-5 rounded-full", yearly ? "bg-blue-500 ml-auto" : "bg-[var(--color-muted)]")}
      />
    </button>
    <button
      onClick={() => onChange(true)}
      className={cn("text-sm font-bold uppercase tracking-widest transition-colors",
        yearly ? "text-[var(--color-foreground)]" : "text-[var(--color-muted)]")}
    >
      Yearly
    </button>
    <AnimatePresence>
      {yearly && (
        <motion.span
          initial={{ opacity: 0, x: -8, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -8, scale: 0.9 }}
          className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-full"
        >
          Save 8%
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

// ── Main plan card ────────────────────────────────────────────────────────────
const PlanCard = ({ yearly }: { yearly: boolean }) => {
  const price = yearly ? 22 : 2;
  const period = yearly ? "year" : "month";
  const perMonth = yearly ? (22 / 12).toFixed(2) : null;

  return (
    <motion.div
      layout
      className="relative w-full"
    >
      {/* Glow */}
      <div className="absolute -inset-px rounded-[40px] bg-gradient-to-br from-blue-500/30 via-transparent to-emerald-500/20 pointer-events-none" />

      <div className="relative glass rounded-[40px] border border-current/10 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-emerald-500" />

        <div className="p-10">
          {/* Plan label */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-500 block mb-1">Hopper Pro</span>
              <span className="text-[var(--color-muted)] text-sm font-light">Everything. No limits.</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <div className="w-5 h-5 border-[2px] border-blue-400 rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-blue-400" />
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mb-2">
            <div className="flex items-end gap-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={price}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="text-7xl md:text-8xl font-bold tracking-tighter leading-none"
                >
                  ${price}
                </motion.span>
              </AnimatePresence>
              <div className="mb-3">
                <span className="text-[var(--color-muted)] text-sm font-light">/ {period}</span>
              </div>
            </div>
            <AnimatePresence>
              {perMonth && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[var(--color-muted)] text-sm font-light"
                >
                  That's just <span className="text-[var(--color-foreground)] font-bold">${perMonth}</span>/month
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-px bg-current/10 my-8" />

          {/* Features */}
          <ul className="flex flex-col gap-4 mb-10">
            {FEATURES.map((f, i) => (
              <motion.li
                key={f.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-sm text-[var(--color-muted)] font-light">{f.label}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] hover:bg-blue-500 transition-colors flex items-center justify-center gap-3"
          >
            <Download className="w-4 h-4" />
            Get Started — {yearly ? "Yearly" : "Monthly"}
          </motion.button>

          <p className="text-center text-[10px] text-[var(--color-faint)] uppercase tracking-widest mt-4 font-bold">
            Cancel anytime · No hidden fees
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ── Comparison table ──────────────────────────────────────────────────────────
const COMPARE_ROWS = [
  { label: "Encrypted messaging",      free: true,  pro: true  },
  { label: "BLE mesh (basic)",         free: true,  pro: true  },
  { label: "Wi-Fi Direct transfers",   free: false, pro: true  },
  { label: "Priority routing",         free: false, pro: true  },
  { label: "1,024-node mesh",          free: false, pro: true  },
  { label: "Auto failover",            free: false, pro: true  },
  { label: "Zero metadata logging",    free: true,  pro: true  },
  { label: "Early access features",    free: false, pro: true  },
];

const CompareTable = () => (
  <div className="max-w-2xl mx-auto">
    <div className="grid grid-cols-3 text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-muted)] pb-4 border-b border-current/10 px-2">
      <span>Feature</span>
      <span className="text-center">Free</span>
      <span className="text-center text-blue-500">Pro</span>
    </div>
    {COMPARE_ROWS.map((row, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.04 }}
        className="grid grid-cols-3 items-center py-4 border-b border-current/10 px-2 hover:bg-current/[0.02] transition-colors rounded-lg"
      >
        <span className="text-sm text-[var(--color-muted)] font-light">{row.label}</span>
        <div className="flex justify-center">
          {row.free
            ? <Check className="w-4 h-4 text-[var(--color-muted)]" />
            : <span className="w-4 h-px bg-current/20 block mt-2" />}
        </div>
        <div className="flex justify-center">
          {row.pro
            ? <Check className="w-4 h-4 text-blue-400" />
            : <span className="w-4 h-px bg-current/20 block mt-2" />}
        </div>
      </motion.div>
    ))}
  </div>
);

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from the app or your App Store / Google Play subscription settings at any time. You keep access until the end of your billing period.",
  },
  {
    q: "Does Hopper work without a subscription?",
    a: "Yes — basic BLE mesh messaging is free. A subscription unlocks Wi-Fi Direct, priority routing, the full 1,024-node mesh, and early access to new features.",
  },
  {
    q: "Is my payment data stored by Hopper?",
    a: "Never. Payments are processed entirely by Apple or Google through their respective stores. Hopper never sees your card details.",
  },
  {
    q: "What happens if I let my subscription lapse?",
    a: "Your account drops to the free tier. Your message history stays on your device — we don't hold any data on servers to delete.",
  },
  {
    q: "Do I need an internet connection to subscribe?",
    a: "You need a connection once to complete the in-app purchase, but after that Hopper works entirely offline.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-2">
      {FAQS.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="border border-current/10 rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-current/[0.03] transition-colors"
          >
            <span className="font-medium text-sm">{faq.q}</span>
            <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
              <ArrowRight className="w-4 h-4 text-[var(--color-muted)] shrink-0" />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="px-6 pb-5 text-sm text-[var(--color-muted)] font-light leading-relaxed border-t border-current/10 pt-4">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
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
        <a href="/#mission"     className="hover:text-[var(--color-foreground)] transition-colors">Vision</a>
        <a href="/how-it-works" className="hover:text-[var(--color-foreground)] transition-colors">How It Works</a>
        <a href="/pricing"      className="text-[var(--color-foreground)]">Pricing</a>
        <a href="/#segments"    className="hover:text-[var(--color-foreground)] transition-colors">Customers</a>
      </div>
      <p className="text-[10px] text-[var(--color-faint)] uppercase tracking-[0.2em] font-bold">© 2026 Hopper Protocol Labs</p>
    </div>
  </footer>
);

// ── Page ──────────────────────────────────────────────────────────────────────
export const PricingPage = ({ initialTheme = 'dark' }: { initialTheme?: 'dark' | 'light' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const [yearly, setYearly] = useState(false);

  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.cookie = `hopper-theme=${theme}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem('hopper-theme', theme);
  }, [theme]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] selection:bg-blue-500 selection:text-white transition-colors duration-500">
      <TopScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* ── Hero + Plan card ── */}
      <section className="relative pt-48 pb-32 px-10 md:px-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/8 blur-[120px] pointer-events-none" />
        <div className="absolute top-32 left-1/4 w-64 h-64 rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-start gap-20">

          {/* Left: text + toggle */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 pt-4"
          >
            <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[11px] mb-8 block">Pricing</span>
            <h1 className="text-6xl md:text-[84px] font-bold tracking-tighter leading-[0.92] mb-8">
              One plan.<br />
              <span className="flex flex-wrap">
                {"Every feature.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ color: "var(--color-foreground)", scale: 1.05 }}
                    className="text-[var(--color-faint)] transition-colors cursor-default mr-[0.2em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="text-[var(--color-muted)] text-xl font-light leading-relaxed max-w-lg mb-12">
              No tiers. No feature gating. No surprise charges.
              Pay once a month or lock in the year and save.
            </p>

            <Toggle yearly={yearly} onChange={setYearly} />

            {/* Store badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 mt-12"
            >
              {["App Store · iOS 15+", "Google Play · Android 10+"].map((label, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-current/10">
                  <Download className="w-3 h-3 text-[var(--color-muted)]" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-muted)]">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: plan card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[520px] lg:shrink-0"
          >
            <PlanCard yearly={yearly} />
          </motion.div>

        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-32 px-10 md:px-20 border-t border-current/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--color-muted)] mb-4 block">In their words</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.95]">
              Heard from the<br />
              <span className="flex flex-wrap">
                {"field.".split(" ").map((word, i) => (
                  <motion.span key={i}
                    whileHover={{ color: "var(--color-foreground)", scale: 1.05 }}
                    className="text-[var(--color-faint)] transition-colors cursor-default mr-[0.2em]">
                    {word}
                  </motion.span>
                ))}
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Used Hopper at a festival with 40,000 people. While everyone else lost signal, our group stayed connected the whole time.",
                name: "Maya R.",
                role: "Event coordinator",
              },
              {
                quote: "$2 a month is nothing for the peace of mind. We deployed it across our rural health clinics — it just works.",
                name: "Dr. Kwame A.",
                role: "NGO field director",
              },
              {
                quote: "After the hurricane knocked out towers for three days, Hopper was the only thing keeping our neighbourhood together.",
                name: "Carlos M.",
                role: "Community organiser",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-[32px] border border-current/10 p-8 flex flex-col gap-6"
              >
                <p className="text-[var(--color-muted)] font-light leading-relaxed text-sm flex-1">
                  "{t.quote}"
                </p>
                <div className="border-t border-current/10 pt-5">
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mt-0.5">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <section className="border-y border-current/10 py-16 px-10 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {[
              { value: "50k+",  label: "Active mesh nodes" },
              { value: "99.9%", label: "Delivery rate" },
              { value: "0",     label: "Servers required" },
              { value: "4.9★",  label: "App Store rating" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-1">{s.value}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--color-muted)]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compare table ── */}
      <section className="py-32 px-10 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--color-muted)] mb-4 block">Free vs Pro</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">What's included</h2>
          </motion.div>
          <CompareTable />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-10 md:px-20 border-t border-current/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--color-muted)] mb-4 block">FAQ</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Common questions</h2>
          </motion.div>
          <FAQ />
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 px-10 md:px-20 border-t border-current/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/8 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">
              $2 a month.<br />
              <span className="flex flex-wrap justify-center">
                {"Infinite reach.".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ color: "var(--color-foreground)", scale: 1.05 }}
                    className="text-[var(--color-faint)] transition-colors cursor-default mr-[0.2em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h2>
            <p className="text-[var(--color-muted)] text-xl font-light mb-12 max-w-xl mx-auto">
              One subscription. Both platforms. Every feature. No towers needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-sm uppercase tracking-widest shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)] hover:bg-blue-500 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download on iOS
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-10 py-5 glass rounded-full font-bold text-sm uppercase tracking-widest"
              >
                Get on Android
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
