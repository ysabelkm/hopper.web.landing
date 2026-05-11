"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { TopScrollProgress } from './TopScrollProgress';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Download, ArrowRight, Quote, Users, Radio, Shield, Zap, MapPin, Building, GraduationCap, Heart, Music } from 'lucide-react';
import { cn } from '../lib/utils';

// ── Data ──────────────────────────────────────────────────────────────────────
const SEGMENTS = [
  {
    id: "01",
    icon: MapPin,
    category: "Rural Communities",
    title: "Where towers never reached.",
    desc: "For people in remote regions, Hopper isn't a backup plan — it's the only plan. Villages with no cell coverage use Hopper to coordinate everything from healthcare to agriculture, forming permanent mesh networks across entire communities.",
    stat: { value: "340+", label: "Rural deployments" },
    accent: "blue",
    quote: "We haven't had reliable signal in years. Hopper connected our whole village in one afternoon.",
    author: "Amara D.",
    role: "Community leader, Mali",
    image: "/images/ruralareas.jpg",
  },
  {
    id: "02",
    icon: GraduationCap,
    category: "Schools & Universities",
    title: "Learning without limits.",
    desc: "Schools in low-infrastructure areas use Hopper to build campus-wide mesh networks. Students share files, coordinate study groups, and stay connected during classes — no internet subscription required.",
    stat: { value: "120+", label: "Campuses connected" },
    accent: "blue",
    quote: "Our students can collaborate on projects even when the school's internet goes down, which is often.",
    author: "Prof. Fatima K.",
    role: "IT Director, University of Nairobi",
    image: "/images/campuses.jpg",
  },
  {
    id: "03",
    icon: Heart,
    category: "NGOs & Field Workers",
    title: "Coordination that saves lives.",
    desc: "Humanitarian teams, medical missions, and disaster-response units operate in the world's most disconnected places. Hopper keeps teams in sync across remote field sites without relying on satellite uplinks or expensive equipment.",
    stat: { value: "80+", label: "Active NGO missions" },
    accent: "emerald",
    quote: "During the floods, every other comms system failed within hours. Hopper kept our medical teams coordinated for three days straight.",
    author: "Dr. Kwame A.",
    role: "Field Director, MedReach International",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "04",
    icon: Music,
    category: "Events & Festivals",
    title: "Signal-proof gatherings.",
    desc: "When tens of thousands of people converge, cell towers buckle. Event staff, security teams, and attendees use Hopper to communicate reliably — no matter how congested the airwaves get.",
    stat: { value: "500k+", label: "Event users served" },
    accent: "emerald",
    quote: "We ran staff comms for 40,000 attendees across a 3-day festival. Zero dropped messages. The carrier networks were completely saturated.",
    author: "Maya R.",
    role: "Operations Lead, SoundWave Festival",
    image: "/images/festivals.jpg",
  },
];

const TESTIMONIALS = [
  {
    quote: "After the hurricane knocked out towers for three days, Hopper was the only thing keeping our neighbourhood connected. We organised supply drops, checked on elderly residents — all offline.",
    name: "Carlos M.",
    role: "Community organiser, Puerto Rico",
    accent: "blue",
  },
  {
    quote: "Our security team communicates across a 200-acre venue with perfect reliability. We've retired our walkie-talkie system entirely.",
    name: "James O.",
    role: "Head of security, Glastonbury",
    accent: "blue",
  },
  {
    quote: "I work in a rural clinic 90 km from the nearest cell tower. Hopper connects our staff across three buildings. It's become as essential as electricity.",
    name: "Dr. Priya S.",
    role: "Medical director, rural Karnataka",
    accent: "emerald",
  },
  {
    quote: "We piloted Hopper across 12 schools in our district. Teacher-to-teacher and student-to-student communication improved dramatically, and the cost was negligible.",
    name: "Samuel T.",
    role: "Education commissioner, Ghana",
    accent: "emerald",
  },
  {
    quote: "During wildfire evacuations we use Hopper to keep track of teams in areas where radio is unreliable. It's become standard equipment.",
    name: "Lt. Rachel V.",
    role: "Search & Rescue coordinator, California",
    accent: "blue",
  },
  {
    quote: "The $2/month price made it easy to roll out across our entire volunteer network. No budget approval needed — anyone can just subscribe.",
    name: "Tobias N.",
    role: "Operations, Red Cross chapter",
    accent: "emerald",
  },
];

const STATS = [
  { value: "50k+",  label: "Active nodes worldwide",   icon: Radio },
  { value: "120+",  label: "Countries deployed",        icon: MapPin },
  { value: "99.9%", label: "Message delivery rate",     icon: Shield },
  { value: "4.9★",  label: "Average app store rating",  icon: Zap },
];

// ── Animated canvas mesh (reused from HowItWorks) ─────────────────────────────
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
    const nodes = Array.from({ length: 22 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(1,113,227,${0.12 * (1 - dist / 150)})`; ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x, n.y, 2, 0, Math.PI * 2); ctx.fillStyle = 'rgba(1,113,227,0.35)'; ctx.fill(); });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ── Segment card ──────────────────────────────────────────────────────────────
const SegmentCard = ({ seg, index }: { seg: typeof SEGMENTS[0]; index: number }) => {
  const isEven = index % 2 === 0;
  const accentBlue = seg.accent === "blue";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col gap-16 items-center",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* Text */}
      <div className="flex-1 max-w-lg">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[72px] font-bold text-[var(--color-ghost)] leading-none tracking-tighter">{seg.id}</span>
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border",
            accentBlue ? "border-blue-500/30 text-blue-500 bg-blue-500/5" : "border-emerald-500/30 text-emerald-500 bg-emerald-500/5"
          )}>
            <seg.icon className="w-3 h-3" />
            {seg.category}
          </div>
        </div>

        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-6">{seg.title}</h3>
        <p className="text-[var(--color-muted)] text-lg font-light leading-relaxed mb-10">{seg.desc}</p>

        {/* Stat */}
        <div className={cn(
          "flex items-center gap-4 p-5 rounded-2xl border",
          accentBlue ? "border-blue-500/15 bg-blue-500/5" : "border-emerald-500/15 bg-emerald-500/5"
        )}>
          <div>
            <div className={cn("text-3xl font-bold tracking-tighter", accentBlue ? "text-blue-400" : "text-emerald-400")}>{seg.stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-muted)] mt-0.5">{seg.stat.label}</div>
          </div>
        </div>

        {/* Pull quote */}
        <div className="mt-8 border-l-2 border-current/10 pl-6">
          <Quote className="w-4 h-4 text-[var(--color-faint)] mb-3" />
          <p className="text-[var(--color-muted)] text-sm font-light leading-relaxed italic mb-3">"{seg.quote}"</p>
          <div className="text-[11px] font-bold uppercase tracking-widest">{seg.author}</div>
          <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest mt-0.5">{seg.role}</div>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1 w-full">
        <div className="relative h-[420px] glass rounded-[60px] overflow-hidden group border border-current/10">
          {seg.image && (
            <motion.img
              src={seg.image}
              alt={seg.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
          )}
          {/* Overlay badge */}
          <div className="absolute bottom-8 left-8">
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md",
              accentBlue ? "border-blue-500/30 bg-blue-500/20 text-blue-300" : "border-emerald-500/30 bg-emerald-500/20 text-emerald-300"
            )}>
              <div className={cn("w-1.5 h-1.5 rounded-full", accentBlue ? "bg-blue-400" : "bg-emerald-400")} />
              {seg.category}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────

// ── Page ──────────────────────────────────────────────────────────────────────
export const CustomersPage = ({ initialTheme = 'dark' }: { initialTheme?: 'dark' | 'light' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

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

      {/* ── Hero ── */}
      <section ref={containerRef} className="relative overflow-hidden pt-48 pb-32 px-10 md:px-20">
        <HeaderMesh />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/60 via-transparent to-[var(--color-background)] pointer-events-none" />

        <motion.div style={{ y }} className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[11px] mb-8 block">Customers</span>
            <h1 className="text-6xl md:text-[100px] font-bold tracking-tighter leading-[0.92] mb-10">
              Real people.<br />
              <span className="flex flex-wrap">
                {"Real blackouts.".split(" ").map((word, i) => (
                  <motion.span key={i}
                    whileHover={{ color: "var(--color-foreground)", scale: 1.05 }}
                    className="text-[var(--color-faint)] transition-colors cursor-default mr-[0.2em]">
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="text-[var(--color-muted)] text-xl font-light leading-relaxed max-w-2xl">
              From hurricane relief to music festivals, from remote clinics to university campuses —
              Hopper users share one thing in common: they needed to communicate when the grid couldn't help them.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10"
          >
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <s.icon className="w-4 h-4 text-blue-500 shrink-0" />
                  <div className="text-3xl md:text-4xl font-bold tracking-tighter">{s.value}</div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--color-muted)]">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Testimonial wall ── */}
      <section className="border-t border-current/10 py-32 px-10 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--color-muted)] mb-4 block">In their words</span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-[32px] border border-current/10 p-8 flex flex-col gap-6 group hover:border-current/20 transition-colors"
              >
                <Quote className={cn("w-5 h-5", t.accent === "blue" ? "text-blue-500/40" : "text-emerald-500/40")} />
                <p className="text-[var(--color-muted)] font-light leading-relaxed text-sm flex-1">
                  "{t.quote}"
                </p>
                <div className={cn(
                  "border-t pt-5 flex items-start gap-3",
                  t.accent === "blue" ? "border-blue-500/10" : "border-emerald-500/10"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5",
                    t.accent === "blue" ? "bg-blue-500/10 text-blue-400" : "bg-emerald-500/10 text-emerald-400"
                  )}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mt-0.5">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Segment stories ── */}
      <section className="px-10 md:px-20 pb-48 max-w-7xl mx-auto flex flex-col gap-40 border-t border-current/10 pt-32">
        {SEGMENTS.map((seg, i) => (
          <SegmentCard key={seg.id} seg={seg} index={i} />
        ))}
      </section>

      {/* ── Use case categories strip ── */}
      <section className="border-t border-current/10 py-24 px-10 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--color-muted)] mb-4 block">Every use case</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Who uses Hopper</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: MapPin,         label: "Rural communities",    sub: "Permanent mesh networks" },
              { icon: GraduationCap,  label: "Schools & campuses",   sub: "Campus-wide comms" },
              { icon: Heart,          label: "NGOs & aid workers",   sub: "Field coordination" },
              { icon: Music,          label: "Events & festivals",   sub: "Crowd-scale messaging" },
              { icon: Building,       label: "First responders",     sub: "Disaster response" },
              { icon: Users,          label: "Community groups",     sub: "Neighbourhood networks" },
              { icon: Shield,         label: "Security teams",       sub: "Venue & site comms" },
              { icon: Zap,            label: "Researchers",          sub: "Remote fieldwork" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-[28px] border border-current/10 p-6 hover:border-blue-500/20 transition-colors group cursor-default"
              >
                <item.icon className="w-5 h-5 text-[var(--color-muted)] group-hover:text-blue-400 transition-colors mb-4" />
                <div className="font-bold text-sm mb-1">{item.label}</div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--color-muted)]">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-current/10 py-32 px-10 md:px-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-500/8 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">
              Your community<br />
              <span className="flex flex-wrap justify-center">
                {"next?".split(" ").map((word, i) => (
                  <motion.span key={i}
                    whileHover={{ color: "var(--color-foreground)", scale: 1.05 }}
                    className="text-[var(--color-faint)] transition-colors cursor-default mr-[0.2em]">
                    {word}
                  </motion.span>
                ))}
              </span>
            </h2>
            <p className="text-[var(--color-muted)] text-xl font-light mb-12 max-w-xl mx-auto">
              Join 50,000+ nodes already on the mesh. $2/month. No towers needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-sm uppercase tracking-widest shadow-[0_0_50px_-10px_rgba(1,113,227,0.5)] hover:bg-blue-500 transition-colors">
                <Download className="w-4 h-4" />
                Download on iOS
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 px-10 py-5 glass rounded-full font-bold text-sm uppercase tracking-widest">
                Get on Android
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
            <a href="/pricing" className="inline-flex items-center gap-2 mt-8 text-[11px] uppercase tracking-widest font-bold text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
              View pricing <ArrowRight className="w-3 h-3" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer theme={theme} />
    </main>
  );
};
