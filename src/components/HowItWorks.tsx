"use client";

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Download, Radio, GitBranch, Shield, ArrowRight, Bluetooth, Wifi, Lock, CheckCircle, MessageCircle, Users, Signal } from 'lucide-react';
import { cn } from '../lib/utils';
import { HopperLogo } from './HopperLogo';

// ── Phone shell ──────────────────────────────────────────────────────────────
const Phone = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("relative mx-auto", className)} style={{ width: 220 }}>
    {/* outer shell */}
    <div className="relative rounded-[44px] bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-800 p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
      {/* screen bezel */}
      <div className="rounded-[42px] bg-black overflow-hidden" style={{ minHeight: 420 }}>
        {/* notch */}
        <div className="relative flex justify-center pt-3 pb-1 bg-black">
          <div className="w-20 h-5 bg-zinc-900 rounded-full flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          </div>
        </div>
        {/* screen content */}
        <div className="bg-[#0a0a0f] min-h-[380px] flex flex-col">
          {children}
        </div>
      </div>
    </div>
    {/* side buttons */}
    <div className="absolute -right-[3px] top-20 w-[3px] h-12 bg-zinc-700 rounded-r-sm" />
    <div className="absolute -left-[3px] top-16 w-[3px] h-8 bg-zinc-700 rounded-l-sm" />
    <div className="absolute -left-[3px] top-28 w-[3px] h-10 bg-zinc-700 rounded-l-sm" />
    <div className="absolute -left-[3px] top-[160px] w-[3px] h-10 bg-zinc-700 rounded-l-sm" />
  </div>
);

// Status bar inside phone
const StatusBar = () => (
  <div className="flex justify-between items-center px-5 py-1.5">
    <span className="text-[9px] font-bold text-white/60">9:41</span>
    <div className="flex items-center gap-1">
      <Signal className="w-2.5 h-2.5 text-white/60" />
      <Wifi className="w-2.5 h-2.5 text-white/60" />
      <div className="w-4 h-2 border border-white/40 rounded-[2px] relative">
        <div className="absolute inset-[1px] right-[3px] bg-white/60 rounded-[1px]" />
        <div className="absolute -right-[2px] top-[2px] w-[2px] h-[4px] bg-white/40 rounded-r-[1px]" />
      </div>
    </div>
  </div>
);

// ── Step 01: Install — app welcome / onboarding screen ────────────────────────
const InstallScreen = ({ active }: { active: boolean }) => (
  <Phone>
    <StatusBar />
    <div className="flex-1 flex flex-col items-center justify-between px-5 py-6">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-3 mt-4"
      >
        <div className="w-16 h-16 rounded-[22px] bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(1,113,227,0.5)]">
          <HopperLogo theme="dark" className="h-10 w-auto" />
        </div>
        <span className="text-white/40 text-[10px] uppercase tracking-widest">Mesh Communication</span>
      </motion.div>

      {/* Key generation animation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full bg-white/5 rounded-2xl p-4 border border-white/10"
      >
        <div className="flex items-center gap-2 mb-3">
          <Lock className="w-3 h-3 text-blue-400" />
          <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Generating keys</span>
        </div>
        {[
          { label: "Ed25519 keypair", done: true, delay: 0.7 },
          { label: "Secure enclave store", done: true, delay: 1.0 },
          { label: "No account needed", done: true, delay: 1.3 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ delay: item.delay, duration: 0.4 }}
            className="flex items-center gap-2 py-1.5"
          >
            <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="text-[10px] text-white/70">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="w-full"
      >
        <div className="w-full py-3 bg-blue-600 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(1,113,227,0.4)]">
          <span className="text-white font-bold text-sm">Enter the Mesh</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
        <p className="text-center text-[9px] text-white/30 mt-3 uppercase tracking-widest">No email · No password · No cloud</p>
      </motion.div>
    </div>
  </Phone>
);

// ── Step 02: Discover — scanning screen with peer list populating ──────────────
const DiscoverScreen = ({ active }: { active: boolean }) => {
  const peers = [
    { name: "Node A7F2", rssi: -52, strong: true, delay: 0.5 },
    { name: "Node 3C8E", rssi: -68, strong: true, delay: 0.9 },
    { name: "Node B1D0", rssi: -74, strong: false, delay: 1.3 },
  ];

  return (
    <Phone>
      <StatusBar />
      <div className="flex-1 flex flex-col px-4 py-3">
        {/* App header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-white font-bold text-sm tracking-tight">Nearby Peers</span>
          <motion.div
            animate={active ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Bluetooth className="w-4 h-4 text-blue-400" />
          </motion.div>
        </div>

        {/* Radar / pulse rings */}
        <div className="relative flex items-center justify-center h-28 mb-4">
          {[1, 2, 3].map(r => (
            <motion.div
              key={r}
              className="absolute rounded-full border border-blue-500/30"
              style={{ width: r * 52, height: r * 52 }}
              animate={active ? { scale: [1, 1.15, 1], opacity: [0.5, 0.15, 0.5] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: r * 0.4 }}
            />
          ))}
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(1,113,227,0.6)]">
            <Bluetooth className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Peer list */}
        <div className="flex flex-col gap-2">
          {peers.map((peer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{ delay: peer.delay, duration: 0.4 }}
              className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2.5 border border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", peer.strong ? "bg-emerald-400" : "bg-yellow-400")} />
                <span className="text-[11px] text-white/80 font-medium">{peer.name}</span>
              </div>
              <span className="text-[9px] font-mono text-white/40">{peer.rssi} dBm</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-3 text-center text-[9px] text-emerald-400 uppercase tracking-widest font-bold"
        >
          3 peers · mesh ready
        </motion.div>
      </div>
    </Phone>
  );
};

// ── Step 03: Mesh — live topology map ─────────────────────────────────────────
const MeshScreen = ({ active }: { active: boolean }) => {
  const nodes = [
    { id: "You",   x: 50, y: 75, color: "blue",    size: 11 },
    { id: "A",     x: 25, y: 45, color: "white",   size: 8  },
    { id: "B",     x: 75, y: 45, color: "red",     size: 8  },
    { id: "C",     x: 50, y: 20, color: "emerald", size: 8  },
  ];
  const edges = [
    { x1: 50, y1: 75, x2: 25, y2: 45, ok: true  },
    { x1: 50, y1: 75, x2: 75, y2: 45, ok: false },
    { x1: 25, y1: 45, x2: 50, y2: 20, ok: true  },
    { x1: 75, y1: 45, x2: 50, y2: 20, ok: false },
  ];

  return (
    <Phone>
      <StatusBar />
      <div className="flex-1 flex flex-col px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-bold text-sm">Mesh Topology</span>
          <motion.div
            animate={active ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="flex items-center gap-1.5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-bold">Live</span>
          </motion.div>
        </div>

        {/* Network graph */}
        <div className="relative flex-1 bg-white/[0.03] rounded-2xl border border-white/10 overflow-hidden mb-3" style={{ minHeight: 200 }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {edges.map((e, i) => (
              <motion.line
                key={i}
                x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                stroke={e.ok ? "rgba(16,185,129,0.5)" : "rgba(239,68,68,0.25)"}
                strokeWidth="0.8"
                strokeDasharray={e.ok ? "0" : "2 2"}
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: i * 0.2 + 0.3 }}
              />
            ))}
          </svg>
          {nodes.map((n, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 280 }}
              className="absolute flex flex-col items-center gap-0.5"
              style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)" }}
            >
              <div className={cn(
                "rounded-full border-2 flex items-center justify-center",
                n.color === "blue"    && "border-blue-500 bg-blue-500/30 shadow-[0_0_10px_rgba(1,113,227,0.5)]",
                n.color === "emerald" && "border-emerald-500 bg-emerald-500/20",
                n.color === "red"     && "border-red-500/50 bg-red-500/10",
                n.color === "white"   && "border-white/30 bg-white/10",
              )} style={{ width: n.size * 2.5, height: n.size * 2.5 }}>
                {n.color === "red" && <span className="text-[6px] text-red-400">✕</span>}
              </div>
              <span className="text-[7px] text-white/50 uppercase tracking-wider whitespace-nowrap">{n.id}</span>
            </motion.div>
          ))}
          {/* packet travelling the good path */}
          {active && (
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.9)]"
              initial={{ left: "50%", top: "75%", opacity: 0 }}
              animate={{ left: ["50%", "25%", "50%"], top: ["75%", "45%", "20%"], opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.4, duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
              style={{ transform: "translate(-50%,-50%)" }}
            />
          )}
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.6 }}
          className="flex items-center justify-between text-[9px] uppercase tracking-widest font-bold"
        >
          <span className="text-white/40">Node B failed</span>
          <span className="text-emerald-400">Rerouted · 1.1s</span>
        </motion.div>
      </div>
    </Phone>
  );
};

// ── Step 04: Deliver — chat screen with encryption badge ──────────────────────
const DeliverScreen = ({ active }: { active: boolean }) => {
  const messages = [
    { text: "Are you safe? Meet at the plaza.", out: true,  delay: 0.4 },
    { text: "Yes, on my way. ETA 10 min.",      out: false, delay: 1.1 },
    { text: "Roger. Staying offline. 🔒",        out: true,  delay: 1.8 },
  ];

  return (
    <Phone>
      <StatusBar />
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-white/10">
          <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center">
            <Users className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold text-white">Node D9B1</div>
            <div className="text-[8px] text-emerald-400 uppercase tracking-widest">3 hops · E2E encrypted</div>
          </div>
          <Lock className="w-3.5 h-3.5 text-blue-400" />
        </div>

        {/* Encryption badge */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
          transition={{ delay: 0.2 }}
          className="mx-4 mt-3 mb-1 bg-blue-500/10 border border-blue-500/20 rounded-xl px-3 py-2 flex items-center gap-2"
        >
          <Lock className="w-2.5 h-2.5 text-blue-400 shrink-0" />
          <span className="text-[8px] text-blue-400 uppercase tracking-widest font-bold">AES-256-GCM · Relay nodes cannot read this</span>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 flex flex-col justify-end gap-2 px-3 pb-3 pt-1">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.95 }}
              transition={{ delay: msg.delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={cn("flex", msg.out ? "justify-end" : "justify-start")}
            >
              <div className={cn(
                "max-w-[80%] rounded-2xl px-3 py-2 text-[10px] leading-relaxed",
                msg.out
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white/10 text-white/80 rounded-bl-sm border border-white/10"
              )}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 px-3 pb-4 pt-1">
          <div className="flex-1 bg-white/5 rounded-full px-3 py-2 border border-white/10 flex items-center">
            <span className="text-[9px] text-white/20">Message (encrypted)</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
    </Phone>
  );
};

// ── Step data ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    label: "Install",
    title: "One app.\nNo sign-up.",
    desc: "Download Hopper on iOS or Android. No account, no phone number, no email. A cryptographic keypair is generated locally and never leaves your device.",
    detail: "iOS 15+  ·  Android 10+",
    icon: Download,
    accent: "blue" as const,
    Screen: InstallScreen,
  },
  {
    number: "02",
    label: "Discover",
    title: "Find peers.\nInstantly.",
    desc: "Hopper pulses a Bluetooth LE advertisement every 400 ms. Nearby devices respond with a signed hello. A cryptographic handshake completes in under 80 ms — no pairing, no permissions dialog.",
    detail: "60 m BLE range  ·  80 ms handshake",
    icon: Radio,
    accent: "blue" as const,
    Screen: DiscoverScreen,
  },
  {
    number: "03",
    label: "Mesh",
    title: "Route around\nanything.",
    desc: "Every node shares its peer table. Hopper builds a live topology graph and reroutes automatically if a relay drops. The mesh self-heals in under 1.2 seconds.",
    detail: "1,024 nodes max  ·  1.2 s failover",
    icon: GitBranch,
    accent: "emerald" as const,
    Screen: MeshScreen,
  },
  {
    number: "04",
    label: "Deliver",
    title: "End-to-end.\nEvery hop.",
    desc: "Each message is AES-256-GCM encrypted to the recipient's public key before it enters the mesh. Relay nodes are blind couriers — they forward bytes they can never read.",
    detail: "AES-256-GCM  ·  0 bytes stored at relay",
    icon: Shield,
    accent: "emerald" as const,
    Screen: DeliverScreen,
  },
];

// ── Step card ─────────────────────────────────────────────────────────────────
const StepCard = ({ step, index }: { step: typeof STEPS[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isEven = index % 2 === 0;
  const accentBlue = step.accent === "blue";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col gap-16 items-center",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* Text side */}
      <div className="flex-1 max-w-lg">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[72px] font-bold text-[var(--color-ghost)] leading-none tracking-tighter">{step.number}</span>
          <div className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border",
            accentBlue
              ? "border-blue-500/30 text-blue-500 bg-blue-500/5"
              : "border-emerald-500/30 text-emerald-500 bg-emerald-500/5"
          )}>
            {step.label}
          </div>
        </div>

        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-6 whitespace-pre-line">
          {step.title}
        </h3>

        <p className="text-[var(--color-muted)] text-lg font-light leading-relaxed mb-8">
          {step.desc}
        </p>

        <div className={cn(
          "inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest",
          accentBlue ? "text-blue-500" : "text-emerald-500"
        )}>
          <div className={cn("w-1.5 h-1.5 rounded-full", accentBlue ? "bg-blue-500" : "bg-emerald-500")} />
          {step.detail}
        </div>
      </div>

      {/* Phone side */}
      <div className="flex-1 flex justify-center items-center py-8 relative">
        {/* Glow behind phone */}
        <div className={cn(
          "absolute w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-opacity duration-700",
          accentBlue ? "bg-blue-500/15" : "bg-emerald-500/15",
          inView ? "opacity-100" : "opacity-0"
        )} />
        <step.Screen active={inView} />
      </div>
    </motion.div>
  );
};

// ── Mesh diagram (bare, no card) ──────────────────────────────────────────────
const MeshDiagramCard = () => {
  const nodes = [
    { label: 'You',       x: 72,  y: 132 },
    { label: 'Node A',    x: 222, y: 54  },
    { label: 'Node B',    x: 372, y: 186 },
    { label: 'Node C',    x: 480, y: 72  },
    { label: 'Recipient', x: 552, y: 156 },
  ];
  const edges = [[0,1],[1,2],[2,3],[3,4],[1,3]] as const;
  const path  = [[0,1],[1,2],[2,3],[3,4]] as const;
  const R = 26;
  const isEndpoint = (i: number) => i === 0 || i === nodes.length - 1;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-muted)]">
        Message Route — Live Mesh Simulation
      </p>
      <svg viewBox="0 0 600 264" className="w-full h-auto" style={{ overflow: 'visible' }}>
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(1,113,227,0.25)"
            strokeWidth="1.2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.12 }}
          />
        ))}
        {path.map(([a, b], i) => (
          <motion.circle
            key={`pkt-${i}`}
            r={6}
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
        {nodes.map((n, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
          >
            {isEndpoint(i) && (
              <circle cx={n.x} cy={n.y} r={R + 7} fill="rgba(1,113,227,0.15)" />
            )}
            <circle
              cx={n.x} cy={n.y} r={R}
              fill={isEndpoint(i) ? '#0171e3' : 'var(--color-background)'}
              stroke={isEndpoint(i) ? '#2d8ef0' : 'var(--color-muted)'}
              strokeWidth="1.5"
            />
            <text
              x={n.x} y={n.y}
              textAnchor="middle" dominantBaseline="central"
              fontSize="10.8" fontWeight="700" letterSpacing="0.05em"
              fill={isEndpoint(i) ? '#ffffff' : 'var(--color-foreground)'}
              style={{ textTransform: 'uppercase', fontFamily: 'inherit' }}
            >
              {i === 0 ? 'YOU' : i === nodes.length - 1 ? 'RCVR' : `0${i}`}
            </text>
            <text
              x={n.x} y={n.y + R + 16}
              textAnchor="middle" dominantBaseline="central"
              fontSize="9" fontWeight="700" letterSpacing="0.12em"
              fill="var(--color-muted)"
              style={{ textTransform: 'uppercase', fontFamily: 'inherit' }}
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
      <div className="border-l-2 border-blue-500/40 pl-4">
        <p className="text-sm font-light text-[var(--color-muted)] leading-relaxed">
          Your message securely bounces through nearby Hopper devices until it reaches its destination — even if the recipient is far out of direct range.
        </p>
      </div>
    </div>
  );
};

// ── Animated mesh canvas for the hero header ──────────────────────────────────
const HeaderMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const nodes = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(1,113,227,${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(1,113,227,0.4)';
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ── Main export ───────────────────────────────────────────────────────────────
export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section id="how-it-works" ref={containerRef} className="relative bg-[var(--color-background)] border-t border-current/10">

      {/* Hero header */}
      <div className="relative overflow-hidden py-48 px-10 md:px-20">
        <HeaderMesh />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/60 via-transparent to-[var(--color-background)] pointer-events-none" />

        <motion.div style={{ y }} className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

          {/* Left: text content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[11px] mb-8 block">How It Works</span>
              <h2 className="text-6xl md:text-[80px] font-bold tracking-tighter leading-[0.92] mb-10">
                No towers.<br />
                No servers.<br />
                <span className="text-[var(--color-faint)]">
                  {"Just physics.".split(" ").map((word, i) => (
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
              <p className="text-[var(--color-muted)] text-xl font-light leading-relaxed max-w-xl">
                Hopper builds a live encrypted mesh from the radio chips already inside your iPhone or Android.
                Here's exactly how a message travels from you to anyone, anywhere, offline.
              </p>
            </motion.div>

            {/* Store badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              {[
                { label: "App Store", sub: "iOS 15+" },
                { label: "Google Play", sub: "Android 10+" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 glass rounded-2xl border border-current/10">
                  <Download className="w-4 h-4 text-[var(--color-muted)]" />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest">{b.label}</div>
                    <div className="text-[9px] text-[var(--color-muted)] uppercase tracking-widest">{b.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 flex flex-wrap gap-x-16 gap-y-8"
            >
              {[
                { value: "400ms", label: "Discovery Pulse" },
                { value: "80ms",  label: "Handshake" },
                { value: "1.2s",  label: "Failover" },
                { value: "99.9%", label: "Delivery Rate" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold tracking-tighter">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--color-muted)] mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: mesh diagram card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[576px] shrink-0"
          >
            <MeshDiagramCard />
          </motion.div>

        </motion.div>
      </div>

      {/* Step cards */}
      <div className="px-10 md:px-20 pb-48 max-w-7xl mx-auto flex flex-col gap-40">
        {STEPS.map((step, i) => (
          <StepCard key={step.number} step={step} index={i} />
        ))}
      </div>

      {/* CTA strip */}
      <div className="border-t border-current/10 px-10 md:px-20 py-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Ready to hop off the grid?</h3>
            <p className="text-[var(--color-muted)] font-light">Available on iOS and Android. Join the mesh in under 30 seconds.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-full font-bold text-sm uppercase tracking-widest"
            >
              <Download className="w-4 h-4" />
              App Store
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 glass rounded-full font-bold text-sm uppercase tracking-widest"
            >
              Google Play
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
