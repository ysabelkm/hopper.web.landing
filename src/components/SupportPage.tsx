"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TopScrollProgress } from './TopScrollProgress';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import {
  Bluetooth, Wifi,
  Zap, ArrowRight,
  Send, CheckCircle, ArrowDown
} from 'lucide-react';

// ─── FAQ Item ──────────────────────────────────────────────────────────────────

const FAQItem = ({ q, a, index, open, onToggle }: { q: string; a: string; index: number; open: boolean; onToggle: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06 }}
    className="border border-current/10 rounded-2xl overflow-hidden"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-current/[0.03] transition-colors"
    >
      <span className="font-medium text-sm">{q}</span>
      <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
        <ArrowRight className="w-4 h-4 text-[var(--color-muted)] shrink-0" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="px-6 pb-5 text-sm text-[var(--color-muted)] font-light leading-relaxed border-t border-current/10 pt-4">
            {a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ─── Mesh Hop Diagram ──────────────────────────────────────────────────────────

const MeshDiagram = () => {
  // All coordinates are in the SVG viewBox (0 0 500 220)
  const nodes = [
    { label: 'You',       x: 60,  y: 110 },
    { label: 'Node A',    x: 185, y: 45  },
    { label: 'Node B',    x: 310, y: 155 },
    { label: 'Node C',    x: 400, y: 60  },
    { label: 'Recipient', x: 460, y: 130 },
  ];

  const edges = [[0,1],[1,2],[2,3],[3,4],[1,3]] as const;
  const path  = [[0,1],[1,2],[2,3],[3,4]] as const;

  // Node radius in SVG units
  const R = 22;

  const isEndpoint = (i: number) => i === 0 || i === nodes.length - 1;

  return (
    <svg
      viewBox="0 0 500 220"
      className="w-full h-auto"
      style={{ overflow: 'visible' }}
    >
      {/* Connection lines */}
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(1,113,227,0.25)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.12 }}
        />
      ))}

      {/* Animated packet dot travelling the main path */}
      {path.map(([a, b], i) => (
        <motion.circle
          key={`pkt-${i}`}
          r={5}
          fill="#0171e3"
          initial={{ cx: nodes[a].x, cy: nodes[a].y, opacity: 0 }}
          animate={{
            cx: [nodes[a].x, nodes[b].x],
            cy: [nodes[a].y, nodes[b].y],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.1,
            delay: 1 + i * 1.1,
            repeat: Infinity,
            repeatDelay: 3.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Node circles + labels — all in SVG so coords match perfectly */}
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
        >
          {/* Outer glow for endpoints */}
          {isEndpoint(i) && (
            <circle
              cx={n.x} cy={n.y} r={R + 6}
              fill="rgba(1,113,227,0.15)"
            />
          )}
          {/* Circle fill */}
          <circle
            cx={n.x} cy={n.y} r={R}
            fill={isEndpoint(i) ? '#0171e3' : 'var(--color-background)'}
            stroke={isEndpoint(i) ? '#2d8ef0' : 'var(--color-muted)'}
            strokeWidth="1.5"
          />
          {/* Label inside circle */}
          <text
            x={n.x} y={n.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="9"
            fontWeight="700"
            letterSpacing="0.05em"
            fill={isEndpoint(i) ? '#ffffff' : 'var(--color-foreground)'}
            style={{ textTransform: 'uppercase', fontFamily: 'inherit' }}
          >
            {i === 0 ? 'YOU' : i === nodes.length - 1 ? 'RCVR' : `0${i}`}
          </text>
          {/* Label below circle */}
          <text
            x={n.x} y={n.y + R + 14}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="0.12em"
            fill="var(--color-muted)"
            style={{ textTransform: 'uppercase', fontFamily: 'inherit' }}
          >
            {n.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

// ─── Contact Form ──────────────────────────────────────────────────────────────

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass = "w-full bg-[var(--color-ghost)] border border-[var(--color-glass-border)] rounded-full px-6 py-4 text-sm font-light text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-muted)] transition-colors";
  const textareaClass = "w-full bg-[var(--color-ghost)] border border-[var(--color-glass-border)] rounded-2xl px-6 py-4 text-sm font-light text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-muted)] transition-colors resize-none";

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 py-20 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">Message received</h3>
        <p className="text-[var(--color-muted)] font-light max-w-sm leading-relaxed">
          We'll get back to you within one business day. In the meantime, check our FAQ above.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[var(--color-foreground)]">First Name</label>
          <input
            required
            placeholder="Enter your first name..."
            value={form.firstName}
            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[var(--color-foreground)]">Last Name</label>
          <input
            required
            placeholder="Enter your last name..."
            value={form.lastName}
            onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--color-foreground)]">Email</label>
        <input
          required
          type="email"
          placeholder="Enter your email address..."
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--color-foreground)]">How can we help you?</label>
        <textarea
          required
          rows={6}
          placeholder="Enter your message..."
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className={textareaClass}
        />
      </div>

      <div className="flex justify-end mt-2">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 pl-8 pr-3 py-3 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full font-bold text-sm"
        >
          Send Message
          <span className="w-8 h-8 rounded-full bg-[var(--color-background)] text-[var(--color-foreground)] flex items-center justify-center">
            <Send className="w-3.5 h-3.5" />
          </span>
        </motion.button>
      </div>
    </form>
  );
};

// ─── Data ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'Do I need an internet connection to use Hopper?',
    a: 'No. Hopper communicates entirely through the Bluetooth and Wi-Fi Direct radios already built into your phone. Messages travel device-to-device without touching a cell tower, router, or the internet. An internet connection is only needed to download the app and submit support requests.',
  },
  {
    q: 'What is mesh networking and how does my message "hop"?',
    a: 'A mesh network turns every Hopper user\'s phone into both a sender and a relay. When you send a message, it travels to the nearest Hopper device in range. That device then passes it on to the next nearest one — and so on — until it reaches your recipient. This "hopping" can carry messages kilometres beyond direct Bluetooth range.',
  },
  {
    q: 'Are my messages private?',
    a: 'Yes. Hopper has no central server — there is no company database that stores your conversations. Messages are encrypted before they leave your device, so relay nodes only see encrypted data they cannot read. Peer-to-peer encryption is a core design principle, not an afterthought.',
  },
  {
    q: 'How does Hopper affect my battery life?',
    a: 'Hopper performs background Bluetooth scanning to discover nearby nodes. We use adaptive scanning intervals — faster when movement is detected, slower when you are stationary — to minimise drain. On average, expect an additional 5–10% battery usage per day. The in-app Battery Settings screen lets you tune this for your needs.',
  },
  {
    q: 'Why can\'t Hopper find any nearby devices?',
    a: 'The most common causes are: (1) Bluetooth is off — enable it in your phone settings. (2) Location permission is denied — Hopper needs Location to perform Bluetooth discovery on Android. (3) The other device is not running Hopper or has the app backgrounded. Check our Troubleshooting guide for step-by-step fixes.',
  },
  {
    q: 'What permissions does Hopper need and why?',
    a: 'Bluetooth — to discover and communicate with nearby Hopper nodes. Location — required by Android for Bluetooth discovery; we never store or share your GPS coordinates. Local Network (iOS) — allows Wi-Fi Direct transfers for faster file and message delivery. Notifications — so you don\'t miss messages when the app is in the background.',
  },
  {
    q: 'How far can a message travel on the mesh?',
    a: 'Each individual hop covers roughly 30–100 metres depending on obstacles and environment. With enough Hopper nodes in between, messages can travel several kilometres. Dense areas like urban neighbourhoods, university campuses, and event venues provide the best reach.',
  },
  {
    q: 'What platforms does Hopper support?',
    a: 'Hopper is available for iOS and Android. A Linux and macOS daemon is in active development and targeted for our Q3 2026 release.',
  },
];

const permissionSteps = [
  { step: '01', title: 'Open Settings', desc: 'Go to your phone\'s Settings app and find Hopper in your installed apps list.' },
  { step: '02', title: 'Enable Bluetooth', desc: 'Under Permissions, set Bluetooth to "Allow" so Hopper can discover nearby nodes.' },
  { step: '03', title: 'Allow Location', desc: 'Set Location to "Allow while using app" — required on Android for Bluetooth scanning.' },
  { step: '04', title: 'Local Network (iOS)', desc: 'Tap "Allow" when Hopper prompts for Local Network access to enable Wi-Fi Direct transfers.' },
  { step: '05', title: 'Open Hopper', desc: 'Launch the app. Within seconds you\'ll see nearby nodes appear on your mesh map.' },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export const SupportPage = ({ initialTheme }: { initialTheme: 'dark' | 'light' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.cookie = `hopper-theme=${theme};path=/;max-age=31536000`;
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <TopScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* ── Hero ── */}
      {/* ── Hero ── */}
      <section className="relative pt-48 pb-32 px-10 md:px-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[60%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[11px] mb-8 block">Help Center</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1] mb-8">
              How can we help<br />
              <span className="flex flex-wrap justify-center">
                {'you get connected?'.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="text-[var(--color-faint)] hover:text-[var(--color-foreground)] transition-colors cursor-default mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="text-[var(--color-muted)] text-xl font-light leading-relaxed max-w-xl mx-auto mb-14">
              Step-by-step guides, troubleshooting, and answers — built for everyone from students to field teams operating without internet.
            </p>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[var(--color-glass-border)] text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-muted)] transition-all"
              >
                Contact us
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-10 md:px-20 border-t border-[var(--color-glass-border)]">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[11px] mb-4 block">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Frequently asked questions</h2>
          </motion.div>

          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                index={i}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── "No Internet" Explainer ── */}
      <section className="py-32 px-10 md:px-20 border-t border-[var(--color-glass-border)]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[11px] mb-8 block">Core Concept</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] mb-8">
              No internet.<br />No towers.<br />
              <span className="text-[var(--color-muted)]">No problem.</span>
            </h2>
            <p className="text-[var(--color-muted)] text-lg font-light leading-relaxed mb-8">
              Traditional messaging relies on cell towers and internet servers. When those go down — during disasters, in remote areas, or at overcrowded events — you lose contact.
            </p>
            <p className="text-[var(--color-muted)] text-lg font-light leading-relaxed mb-10">
              Hopper works differently. It uses the <strong className="font-semibold text-[var(--color-foreground)]">Bluetooth</strong> and <strong className="font-semibold text-[var(--color-foreground)]">Wi-Fi Direct</strong> radios already inside your phone to talk directly to nearby devices — no data plan required.
            </p>
            <div className="flex flex-col gap-5">
              {[
                { icon: <Bluetooth className="w-4 h-4" />, label: 'Bluetooth', note: 'Discovers nearby Hopper users within ~30–100m' },
                { icon: <Wifi className="w-4 h-4" />, label: 'Wi-Fi Direct', note: 'Transfers files and messages faster than Bluetooth alone' },
                { icon: <Zap className="w-4 h-4" />, label: 'Mesh Hopping', note: 'Extends range by relaying through intermediate devices' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)]">
                  <div className="text-blue-500">{item.icon}</div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] font-bold mb-0.5">{item.label}</div>
                    <div className="text-[var(--color-muted)] text-xs font-light">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mesh Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            <div className="p-10 rounded-[40px] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)]">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-muted)] mb-8">Message route — live mesh simulation</p>
              <MeshDiagram />
              <p className="text-[11px] text-[var(--color-muted)] font-light leading-relaxed mt-8 border-l border-blue-500/30 pl-5">
                Your message securely bounces through nearby Hopper devices until it reaches its destination — even if the recipient is far out of direct range.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Permission Setup Guide ── */}
      <section className="py-32 px-10 md:px-20 border-t border-[var(--color-glass-border)]">
        <div className="max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[11px] mb-8 block">Getting Started</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Set up in 5 steps</h2>
            <p className="text-[var(--color-muted)] text-lg font-light leading-relaxed max-w-xl">
              Granting the right permissions takes under a minute. Here's exactly what to do.
            </p>
          </motion.div>

          <div className="relative flex flex-col">
            {permissionSteps.map((s, i) => {
              const isLast = i === permissionSteps.length - 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center">
                    <div className={`w-px flex-none ${i === 0 ? 'h-6 bg-transparent' : 'h-6 bg-[var(--color-foreground)]/20'}`} />
                    {/* Filled circle with number */}
                    <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold bg-[var(--color-foreground)] text-[var(--color-background)] shadow-[0_0_0_4px_var(--color-background),0_0_0_5px_var(--color-foreground)]">
                      {i + 1}
                    </div>
                    {!isLast && <div className="w-px flex-1 min-h-[40px] bg-[var(--color-foreground)]/20" />}
                  </div>

                  {/* Card — all highlighted */}
                  <div className="mb-3 flex-1 rounded-[20px] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-7">
                    <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--color-muted)] mb-1">Step {i + 1}</p>
                    <h4 className="text-xl font-bold tracking-tight mb-3">{s.title}</h4>
                    <p className="text-[var(--color-muted)] text-sm font-light leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section id="contact" className="py-32 px-10 md:px-20 border-t border-[var(--color-glass-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

            {/* Left — info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-2/5 flex flex-col justify-between gap-12"
            >
              <div>
                <h2 className="text-4xl md:text-7xl font-medium tracking-tight leading-[1.1] mb-4">
                  Get in <span className="inline-flex items-center gap-4">—</span><br />touch with us
                </h2>
                <p className="text-[var(--color-muted)] text-base font-light leading-relaxed">
                  Whether you have a question about our technology, need help getting connected, or want to report an issue — our team is ready to assist you.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-sm text-[var(--color-muted)] mb-1">Email:</p>
                  <p className="text-lg font-semibold tracking-tight">support@hopperafrica.com</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-muted)] mb-1">Response time:</p>
                  <p className="text-lg font-semibold tracking-tight">Within one business day</p>
                  <p className="text-sm text-[var(--color-muted)] mt-1">Monday to Friday, 9 AM – 6 PM GMT</p>
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-3/5 bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] rounded-[32px] p-10 md:p-12"
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      <Footer theme={theme} />
    </div>
  );
};
