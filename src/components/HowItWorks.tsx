"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import AnimatedTextCycle from './ui/AnimatedTextCycle';
import { Download, Radio, GitBranch, Shield, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const MockupPhone = ({ src, alt, active }: { src: string; alt: string; active: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.96 }}
    animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="relative w-full max-w-[1152px] sm:max-w-[1280px] mx-auto overflow-visible"
  >
    <Image
      src={src}
      alt={alt}
      width={4000}
      height={3000}
      className="w-full h-auto object-contain scale-[2] origin-center drop-shadow-[0_35px_70px_rgba(0,0,0,0.28)]"
      priority={false}
    />
  </motion.div>
);

// ── Step 01: Install — app welcome / onboarding screen ────────────────────────
const InstallScreen = ({ active }: { active: boolean }) => (
  <MockupPhone
    src="/mockups/onboardingscreen.png"
    alt="Hopper onboarding screen"
    active={active}
  />
);

// ── Step 02: Discover — scanning screen with peer list populating ──────────────
const DiscoverScreen = ({ active }: { active: boolean }) => (
  <MockupPhone
    src="/mockups/chatscreen.png"
    alt="Hopper chats screen"
    active={active}
  />
);

// ── Step 03: Mesh — live topology map ─────────────────────────────────────────
const MeshScreen = ({ active }: { active: boolean }) => (
  <MockupPhone
    src="/mockups/broadcastscreen.png"
    alt="Hopper broadcast screen"
    active={active}
  />
);

// ── Step 04: Deliver — chat screen with encryption badge ──────────────────────
const DeliverScreen = ({ active }: { active: boolean }) => (
  <MockupPhone
    src="/mockups/messagescreen.png"
    alt="Hopper message screen"
    active={active}
  />
);

// ── Step data ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    label: "Install",
    title: "One app.\nNo sign-up.",
    desc: "Download Hopper on iOS or Android. No account, no phone number, no email. Just pick a username — your identity lives only on your device, nowhere else.",
    detail: "iOS 13+  ·  Android 7+",
    icon: Download,
    accent: "blue" as const,
    Screen: InstallScreen,
  },
  {
    number: "02",
    label: "Discover",
    title: "Find peers.\nInstantly.",
    desc: "Hopper quietly scans for other phones running the app nearby. When it finds one, they introduce themselves automatically — no pairing, no contact sharing, no permissions dialog.",
    detail: "Up to 60 m range  ·  connects in under a second",
    icon: Radio,
    accent: "blue" as const,
    Screen: DiscoverScreen,
  },
  {
    number: "03",
    label: "Mesh",
    title: "Route around\nanything.",
    desc: "Hopper maps out everyone nearby and finds the best path to your recipient. If someone moves out of range, it reroutes through others automatically — you won't even notice.",
    detail: "Up to 1,024 people  ·  reroutes in ~1 second",
    icon: GitBranch,
    accent: "emerald" as const,
    Screen: MeshScreen,
  },
  {
    number: "04",
    label: "Deliver",
    title: "End-to-end.\nEvery hop.",
    desc: "Each message is sealed before it leaves your phone. The people passing it along can't open it — only the intended recipient can. Nothing is stored anywhere along the way.",
    detail: "End-to-end encrypted  ·  0 bytes stored at relay",
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
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
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
          <span className="text-[72px] font-bold text-[var(--color-faint)] leading-none tracking-tighter">{step.number}</span>
          <div className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border",
            step.number === "01"
              ? "border-white/40 text-white bg-white/10"
              : accentBlue
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

// ── CTA strip ─────────────────────────────────────────────────────────────────
const CtaStrip = () => (
  <div className="border-t border-current/10 px-10 md:px-20 py-24">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
      <div>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Ready to hop off the{" "}
          <AnimatedTextCycle
            words={["grid?", "towers?", "internet?", "cloud?", "servers?"]}
            interval={3000}
            className="text-3xl md:text-4xl tracking-tight"
          />
        </h3>
        <p className="text-[var(--color-muted)] font-light">Available on iOS and Android. Connect to your community in under 30 seconds.</p>
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
);

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
                { label: "App Store", sub: "iOS 13+" },
                { label: "Google Play", sub: "Android 7+" },
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
      <CtaStrip />
    </section>
  );
};
