"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Bluetooth, CheckCircle, Send, Wifi, Zap } from 'lucide-react';
import { PageShell } from './PageShell';
import { PageHero } from './PageHero';
import { Section } from './Section';
import { Card } from './ui/Card';
import { Eyebrow } from './ui/Pill';
import { FaqList } from './ui/FaqList';
import { LinkButton } from './ui/LinkButton';
import { SectionHeader } from './ui/SectionHeader';
import type { Theme } from '../hooks/useTheme';

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
      viewBox="-14 -10 528 258"
      className="block h-auto w-full"
    >
      {/* Connection lines */}
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="color-mix(in oklab, var(--color-brand-blue) 35%, transparent)"
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
          fill="var(--color-brand-blue)"
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
              fill="color-mix(in oklab, var(--color-brand-blue) 15%, transparent)"
            />
          )}
          {/* Circle fill */}
          <circle
            cx={n.x} cy={n.y} r={R}
            fill={isEndpoint(i) ? 'var(--color-brand-blue)' : 'var(--color-background)'}
            stroke={isEndpoint(i) ? 'var(--color-brand-blue)' : 'var(--color-faint)'}
            strokeWidth="1.5"
          />
          {/* Label inside circle */}
          <text
            x={n.x} y={n.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.05em"
            fill={isEndpoint(i) ? '#ffffff' : 'var(--color-foreground)'}
            style={{ textTransform: 'uppercase', fontFamily: 'inherit' }}
          >
            {i === 0 ? 'YOU' : i === nodes.length - 1 ? 'RCVR' : `0${i}`}
          </text>
          {/* Label below circle */}
          <text
            x={n.x} y={n.y + R + 16}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
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

const FIELD =
  'w-full rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-background)] px-4 py-3 text-[15px] text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-faint)] focus:border-[var(--color-brand-blue)]';
const LABEL = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-faint)]';

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 py-16 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-brand-blue)_14%,transparent)] text-[var(--color-brand-blue)]">
          <CheckCircle className="h-6 w-6" />
        </span>
        <h3 className="m-0 font-display text-[24px] font-semibold tracking-[-0.03em]">Message received</h3>
        <p className="m-0 max-w-sm text-[15px] leading-[1.65] text-[var(--color-muted)]">
          We&rsquo;ll get back to you within one business day. In the meantime, check the FAQ above.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={LABEL}>First name</span>
          <input
            required
            placeholder="Ada"
            value={form.firstName}
            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
            className={FIELD}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className={LABEL}>Last name</span>
          <input
            required
            placeholder="Obi"
            value={form.lastName}
            onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
            className={FIELD}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={LABEL}>Email</span>
        <input
          required
          type="email"
          placeholder="name@email.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className={FIELD}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className={LABEL}>How can we help?</span>
        <textarea
          required
          rows={6}
          placeholder="Tell us what’s going on…"
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className={`${FIELD} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="mt-1 inline-flex items-center gap-2.5 self-start rounded-full bg-[var(--color-brand-blue)] px-7 py-3.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white transition-[transform,opacity] duration-[220ms] hover:-translate-y-0.5 hover:opacity-90"
      >
        Send message
        <Send className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
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

const transports = [
  { icon: Bluetooth, label: 'Bluetooth', note: 'Discovers nearby Hopper users within ~30–100m' },
  { icon: Wifi, label: 'Wi-Fi Direct', note: 'Transfers files and messages faster than Bluetooth alone' },
  { icon: Zap, label: 'Mesh hopping', note: 'Extends range by relaying through intermediate devices' },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export const SupportPage = ({ initialTheme }: { initialTheme: Theme }) => (
  <PageShell initialTheme={initialTheme}>
    <PageHero
      eyebrow="Help centre"
      title="How can we"
      highlight="help you?"
      actions={
        <>
          <LinkButton href="#contact">Contact us</LinkButton>
          <LinkButton href="#faq" variant="secondary">Read the FAQ</LinkButton>
        </>
      }
    >
      Step-by-step guides, troubleshooting and answers — built for everyone from students to field teams
      operating without internet.
    </PageHero>

    {/* ── FAQ ── */}
    <Section id="faq" className="scroll-mt-24 px-5 pb-[100px] sm:px-8 md:pb-[140px]">
      <SectionHeader eyebrow="FAQ" title="Frequently asked questions." className="mb-12" />
      <FaqList items={faqs} />
    </Section>

    {/* ── "No internet" explainer ── */}
    <Section className="px-5 pb-[100px] sm:px-8 md:pb-[140px]">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Core concept"
            title="No internet. No towers. No problem."
          />
          <p className="m-0 mt-6 text-[17px] leading-[1.65] text-[var(--color-muted)]">
            Traditional messaging relies on cell towers and internet servers. When those go down — during
            disasters, in remote areas, or at overcrowded events — you lose contact.
          </p>
          <p className="m-0 mt-4 text-[17px] leading-[1.65] text-[var(--color-muted)]">
            Hopper works differently. It uses the{' '}
            <strong className="font-semibold text-[var(--color-foreground)]">Bluetooth</strong> and{' '}
            <strong className="font-semibold text-[var(--color-foreground)]">Wi-Fi Direct</strong> radios already
            inside your phone to talk directly to nearby devices — no data plan required.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            {transports.map(item => (
              <Card key={item.label} className="flex items-center gap-4 rounded-[20px] p-4 sm:p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-brand-blue)_14%,transparent)] text-[var(--color-brand-blue)]">
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.2em]">{item.label}</span>
                  <span className="block text-[14px] text-[var(--color-muted)]">{item.note}</span>
                </span>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-4 sm:rounded-[40px] sm:p-10">
          <Eyebrow className="mb-8">Message route · live simulation</Eyebrow>
          <MeshDiagram />
          <p
            className="m-0 mt-8 pl-5 text-[14px] leading-[1.6] text-[var(--color-muted)]"
            style={{ borderLeft: '1px solid color-mix(in oklab, var(--color-brand-blue) 45%, transparent)' }}
          >
            Your message securely bounces through nearby Hopper devices until it reaches its destination — even
            if the recipient is far out of direct range.
          </p>
        </Card>
      </div>
    </Section>

    {/* ── Setup guide ── */}
    <Section className="px-5 pb-[100px] sm:px-8 md:pb-[140px]">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader
          eyebrow="Getting started"
          title="Set up in 5 steps."
          sub="Granting the right permissions takes under a minute. Here’s exactly what to do."
          className="mb-14 md:mb-[72px]"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
          {permissionSteps.map((s, i) => (
            <Card key={s.step} className="flex flex-col gap-4 rounded-[24px] p-6 sm:p-7">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-brand-blue)] text-[13px] font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="m-0 font-display text-[19px] font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="m-0 text-[14px] leading-[1.6] text-[var(--color-muted)]">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>

    {/* ── Contact ── */}
    <Section id="contact" className="scroll-mt-24 px-4 pb-[140px] sm:px-6">
      <Card className="mx-auto grid max-w-[1180px] gap-12 px-7 py-12 sm:rounded-[40px] sm:px-14 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col justify-between gap-10">
          <SectionHeader
            align="left"
            eyebrow="Contact"
            title="Get in touch."
            sub="Whether you have a question about our technology, need help getting connected, or want to report an issue — our team is ready to assist you."
          />
          <div className="flex flex-col gap-6">
            <div>
              <p className="m-0 mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-faint)]">Email</p>
              <a
                href="mailto:support@hopperafrica.com"
                className="font-display text-[19px] font-semibold tracking-[-0.02em] text-[var(--color-foreground)] hover:text-[var(--color-brand-blue)]"
              >
                support@hopperafrica.com
              </a>
            </div>
            <div>
              <p className="m-0 mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-faint)]">Response time</p>
              <p className="m-0 font-display text-[19px] font-semibold tracking-[-0.02em]">Within one business day</p>
              <p className="m-0 mt-1 text-[14px] text-[var(--color-muted)]">Monday to Friday, 9 AM – 6 PM WAT</p>
            </div>
          </div>
        </div>
        <div className="rounded-[24px] border border-[var(--color-surface-border)] bg-[var(--color-background)] p-6 sm:p-8">
          <ContactForm />
        </div>
      </Card>
    </Section>
  </PageShell>
);
