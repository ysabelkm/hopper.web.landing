"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Footer } from './Footer';
import { TopScrollProgress } from './TopScrollProgress';
import { Navbar } from './Navbar';

// ─── Types ───────────────────────────────────────────────────────────────────

export type UseCasePageProps = {
  initialTheme: 'dark' | 'light';
  category: string;
  headline: string;
  subheadline: string;
  image: string;
  imageAlt: string;
  stats: { value: string; label: string }[];
  sections: { title: string; body: React.ReactNode }[];
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const UseCasePage = ({
  initialTheme,
  category,
  headline,
  subheadline,
  image,
  imageAlt,
  stats,
  sections,
}: UseCasePageProps) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.classList.add('light');
    else root.classList.remove('light');
    document.cookie = `hopper-theme=${theme};path=/;max-age=31536000`;
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const cardBg     = theme === 'dark' ? 'bg-[#1c1c1e]' : 'bg-white';
  const cardBorder = theme === 'dark' ? 'border-white/8' : 'border-black/8';
  const divider    = theme === 'dark' ? 'border-white/8' : 'border-black/8';

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <TopScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Hero */}
      <section className="pt-40 pb-0 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--color-faint)] hover:text-[var(--color-muted)] transition-colors mb-10"
        >
          <ArrowLeft className="w-3 h-3" /> Back
        </a>
        <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-faint)] mb-4">Use Case</p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 max-w-3xl leading-[1.05]">
          {headline}
        </h1>
        <p className="text-[var(--color-muted)] text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-16">
          {subheadline}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-12 mb-16">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-4xl font-semibold tracking-tight text-[var(--color-foreground)]">{s.value}</p>
              <p className="text-sm text-[var(--color-muted)] font-light mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hero image */}
      <section className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto mb-24">
        <div className={`w-full h-[420px] md:h-[520px] rounded-[28px] overflow-hidden border ${cardBorder}`}>
          <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Content sections */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 max-w-4xl mx-auto">
        <div className={`border-t ${divider} flex flex-col divide-y divide-[var(--color-ghost)]`}>
          {sections.map(sec => (
            <div key={sec.title} className="py-12 grid md:grid-cols-[240px_1fr] gap-8">
              <h2 className="text-[15px] font-semibold text-[var(--color-foreground)] leading-snug">{sec.title}</h2>
              <div className="flex flex-col gap-4 text-[var(--color-muted)] text-sm font-light leading-relaxed">
                {sec.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 max-w-6xl mx-auto">
        <div className={`rounded-[28px] border ${cardBg} ${cardBorder} px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8`}>
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-faint)] mb-3">{category}</p>
            <h3 className="text-3xl font-semibold tracking-tight max-w-sm">Ready to deploy Hopper?</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-8 py-3.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors">
              Download the App
            </button>
            <a href="/support" className="px-8 py-3.5 rounded-full border border-current/20 text-sm font-medium hover:bg-current/5 transition-colors text-center">
              Talk to Us
            </a>
          </div>
        </div>
      </section>

      <Footer theme={theme} />
    </div>
  );
};
