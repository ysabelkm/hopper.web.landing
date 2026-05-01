"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Bluetooth, Zap, Users, ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { HopperLogo } from './components/HopperLogo';
import { Section } from './components/Section';
import { cn } from './lib/utils';

import { PhoneMockup } from './components/PhoneMockup';

const Navbar = ({ theme, toggleTheme }: { theme: 'dark' | 'light', toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-10 py-8 flex justify-between items-center transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/50 to-transparent backdrop-blur-[2px] -z-10" />

      {/* Left: Logo + primary nav links */}
      <div className="hidden md:flex items-center gap-10">
        <HopperLogo theme={theme} className="h-8 w-auto" />
        <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-[var(--color-muted)]">
          <a href="#mission" className="hover:text-[var(--color-foreground)] transition-colors">Vision</a>
          <a href="#segments" className="hover:text-[var(--color-foreground)] transition-colors">Impact</a>
          <a href="#how-it-works" className="hover:text-[var(--color-foreground)] transition-colors">Technology</a>
        </div>
      </div>

      {/* Mobile: Logo only */}
      <div className="flex md:hidden items-center gap-3">
        <HopperLogo theme={theme} className="h-8 w-auto" />
      </div>

      {/* Right: secondary nav links + theme + download */}
      <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-[var(--color-muted)]">
        <a href="/how-it-works" className="hover:text-[var(--color-foreground)] transition-colors">How It Works</a>
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
            <a href="#mission" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Vision</a>
            <a href="#segments" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Impact</a>
            <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">Technology</a>
            <a href="/how-it-works" onClick={() => setIsOpen(false)} className="text-3xl font-light tracking-tight">How It Works</a>
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

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-10 md:px-20 overflow-hidden pt-32 pb-20">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-20 relative z-10">
      <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-3/5"
        >
      <h1 className="text-[64px] md:text-[90px] leading-[0.95] font-bold tracking-tighter mb-10">
            Stay connected.<br />
            <span className="flex flex-wrap">
              {"Even when the world disconnects.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="text-[var(--color-faint)] hover:text-[var(--color-foreground)] transition-colors cursor-default mr-[0.2em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-muted)] leading-relaxed mb-12 max-w-xl font-light">
            Hopper is a decentralized, infrastructure-free communication system. 
            It bypasses traditional cell towers and ISPs using peer-to-peer 
            routing, ensuring your voice is heard even in total blackouts.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <motion.button 
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="bg-[var(--color-foreground)] text-[var(--color-background)] px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(var(--color-foreground),0.1)]"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </motion.button>
            <button className="flex items-center gap-4 group">
              <span className="w-14 h-14 rounded-full border border-current opacity-20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Zap className="w-5 h-5 fill-current" />
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-widest font-bold text-[var(--color-muted)] group-hover:text-[var(--color-foreground)] transition-colors">Watch Scenario</span>
                <span className="text-[9px] text-[var(--color-faint)] tracking-[0.2em]">02:14 MIN TRANSIT</span>
              </div>
            </button>
          </div>
          
          <div className="mt-20 grid grid-cols-2 gap-10 max-w-md border-t border-current/10 pt-10">
            <div>
              <div className="text-2xl font-bold mb-1 tracking-tight">100%</div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] font-bold">Node Encryption</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1 tracking-tight">0.0ms</div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] font-bold">Cloud Latency</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:w-2/5 flex justify-center"
        >
          <PhoneMockup />
          {/* Abstract Hand Overlay (Visual hint via shadow/blur) */}
          <div className="absolute -inset-20 bg-gradient-to-t from-black/60 to-transparent blur-3xl -z-10" />
          
          {/* Floating Connectivity Badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-10 -right-10 glass p-5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Mesh Peer Found</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-10 md:left-20 flex flex-col items-start gap-4">
        <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-faint)]">SCROLL TO EXPLORE ARCHITECTURE</div>
        <div className="w-64 h-px bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ left: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 w-1/2 h-full bg-blue-500/50" 
          />
        </div>
      </div>
    </div>
  );
};

const Segments = () => {
  const segments = [
    { 
      id: "01", 
      title: "Rural and Under-served Communities", 
      desc: "People living in remote areas with poor or no mobile network coverage, especially in developing countries.",
      specs: "Low Coverage • Digital Inclusion",
      image: "/ruralareas.jpg"
    },
    { 
      id: "02", 
      title: "Students and Schools", 
      desc: "Educational institutions in low-infrastructure areas where internet access is unreliable or unaffordable.",
      specs: "Campus Mesh • Affordable Access",
      image: "/campuses.jpg"
    },
    { 
      id: "03", 
      title: "Field Workers and NGOs", 
      desc: "Teams operating in isolated environments, including humanitarian missions and medical camps, that need offline coordination.",
      specs: "Offline Coordination • Mission Reliability",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000"
    },
    { 
      id: "04", 
      title: "Event Attendees", 
      desc: "Participants at festivals, conferences, or crowded venues where mobile networks often get congested.",
      specs: "Congestion Resilience • Crowd Connectivity",
      image: "/festivals.jpg"
    },
  ];

  return (
    <Section id="segments" className="py-48 px-10 md:px-20">
      <div className="max-w-7xl mx-auto">
        <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[20px] mb-8 block">IMPACT</span>
        <div className="flex flex-col gap-48">
        {segments.map((s, i) => (
          <div 
            key={i} 
            className={cn(
              "flex flex-col md:flex-row items-center gap-20",
              i % 2 !== 0 && "md:flex-row-reverse"
            )}
          >
            <div className="w-full md:w-1/2">
              <span className="text-[84px] font-bold text-[var(--color-ghost)] leading-none mb-6 block tracking-tighter">{s.id}</span>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">{s.title}</h3>
              <p className="text-[var(--color-muted)] text-lg md:text-xl font-light leading-relaxed mb-10">
                {s.desc}
              </p>
              <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-blue-600 dark:text-blue-500/60 border-l border-blue-500/20 pl-6">
                {s.specs}
              </div>
            </div>
            <div className="w-full md:w-1/2 h-80 glass rounded-[60px] flex items-center justify-center group overflow-hidden relative">
               {s.image && (
                 <motion.img 
                   src={s.image} 
                   alt={s.title}
                   className="absolute inset-0 w-full h-full object-cover rounded-[60px] opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                   referrerPolicy="no-referrer"
                 />
               )}
               <motion.div 
                 whileHover={{ scale: 1.1 }}
                 className="relative z-10 w-32 h-32 rounded-full border border-white/5 flex items-center justify-center backdrop-blur-sm"
               >
                 <div className="w-16 h-16 rounded-full border-2 border-white/10" />
                 <div className="absolute w-12 h-12 rounded-full border border-white/10" />
               </motion.div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </Section>
  );
};

const Demo = () => {
  return (
    <Section id="how-it-works" className="py-48 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
      <div className="max-w-7xl mx-auto px-10 md:px-20 mb-32">
        <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block text-[var(--color-faint)]">Operational Scenarios</span>
        <h2 className="text-5xl md:text-[110px] leading-[0.9] font-bold tracking-tighter mb-10 py-2">
          Experience the<br />
          <span className="flex flex-wrap">
            {"signal path.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className="text-[var(--color-faint)] hover:text-[var(--color-foreground)] transition-colors cursor-default mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h2>
        <p className="max-w-2xl text-[var(--color-muted)] text-lg md:text-xl font-light leading-relaxed">
          The Hopper protocol creates a self-healing mesh that intelligently routes data. 
          Each device is a relay point, strengthening the collective network with every new node.
        </p>
      </div>

      <div className="flex flex-col gap-64 px-10 md:px-20 max-w-7xl mx-auto">
        {/* Scenario 1 - Messaging */}
        <div className="flex flex-col lg:flex-row items-center gap-32">
          <div className="flex-1">
            <div className="w-12 h-px bg-blue-500 mb-8" />
            <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Adaptive Routing Architecture</h3>
            <p className="text-[var(--color-muted)] text-lg font-light leading-relaxed mb-10">
              Traditional networks are top-down. Hopper is horizontal. By utilizing Bluetooth Low Energy (BLE) 
              and Wi-Fi Direct concurrently, our routing engine identifies the most cost-effective path 
              to delivery without ever touching a centralized server.
            </p>
            <div className="space-y-6 mb-12">
               <div className="flex items-start gap-4">
                  <div className="p-2 glass rounded-lg border-current/10"><Bluetooth className="w-4 h-4 text-blue-500" /></div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest mb-1">Path Discovery</div>
                    <p className="text-xs text-[var(--color-muted)] font-light">Nodes broadcast status every 400ms to maintain real-time topology maps.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="p-2 glass rounded-lg border-current/10"><Zap className="w-4 h-4 text-emerald-500" /></div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest mb-1">Collision Avoidance</div>
                    <p className="text-xs text-[var(--color-muted)] font-light">Traffic is distributed across multiple sub-nets to prevent bottle-necking in crowds.</p>
                  </div>
               </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="px-5 py-2 glass rounded-full text-[10px] font-mono text-[var(--color-foreground)] uppercase tracking-widest border-current/40">Delivered 0.4s</div>
              <div className="px-5 py-2 glass rounded-full text-[10px] font-mono text-blue-600 dark:text-blue-500 uppercase tracking-widest border-current/40">Protocol v4.2</div>
              <div className="px-5 py-2 glass rounded-full text-[10px] font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-widest border-current/40">3 Nodes Scanned</div>
            </div>
          </div>
          
          <div className="flex-1 relative w-full h-[600px]">
            <div className="absolute inset-0 bg-white/[0.05] dark:bg-white/[0.02] backdrop-blur-3xl rounded-[60px] border border-current/10 shadow-2xl overflow-hidden p-12">
              <div className="flex justify-between items-center mb-16 border-b border-current/10 pb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs uppercase font-bold tracking-[0.2em] text-[var(--color-muted)] text-glow">Signal Active</span>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-mono text-[var(--color-faint)] tracking-widest">PACKET_HEADER_0x44F</span>
                   <span className="text-[8px] font-mono text-blue-600 dark:text-blue-400">ENCRYPTION: AES-256-GCM</span>
                </div>
              </div>
              
              <div className="space-y-10">
                <motion.div 
                   initial={{ x: -20, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   viewport={{ once: true }}
                   className="bg-current/5 p-6 rounded-3xl rounded-tl-none max-w-[85%] border border-current/10"
                >
                  <p className="text-sm font-light text-[var(--color-muted)] leading-relaxed italic">"Initiating peer handshake. Searching for optimal route via neighboring devices..."</p>
                </motion.div>
                
                <motion.div 
                   initial={{ x: 20, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 }}
                   className="bg-blue-100 dark:bg-blue-600/10 p-6 rounded-3xl rounded-tr-none border border-blue-300/50 dark:border-blue-500/20 ml-auto max-w-[90%] shadow-[0_8px_24px_-14px_rgba(59,130,246,0.2)]"
                >
                  <p className="text-sm leading-relaxed font-medium text-black dark:text-white">Secondary path established. Hops 01 and 02 validated. Relaying through Community Hub.</p>
                </motion.div>
                
                <div className="pt-16 flex flex-col items-center gap-8">
                   <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                   <div className="flex gap-8 items-center">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-30 shadow-inner">
                        <Users className="w-5 h-5" />
                      </div>
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_30px_rgba(59,130,246,1)]" 
                      />
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_15px_40px_rgba(255,255,255,0.2)]">
                        <ArrowRight className="w-6 h-6 text-black" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-[var(--color-background)] border border-current/10 p-8 rounded-[40px] shadow-2xl w-64 hidden md:block backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-muted)] mb-5 font-bold">Protocol Health</p>
              <div className="flex items-center gap-4">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <div className="h-px flex-1 bg-current/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-current/20" />
                <div className="h-px flex-1 bg-current/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-current/20" />
              </div>
              <div className="flex justify-between mt-5 text-[11px] font-mono text-[var(--color-muted)] tracking-tighter uppercase leading-none">
                 <span>Status</span>
                 <span className="text-blue-600 dark:text-blue-400">Synced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario 02 - Zero Cloud */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-32">
          <div className="flex-1">
             <div className="w-12 h-px bg-blue-500 mb-8" />
             <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Zero-Cloud Integrity Protocol</h3>
             <p className="text-[var(--color-muted)] text-lg font-light leading-relaxed mb-10">
               In a post-cloud era, your data belongs strictly to you. Hopper eliminates the dependency 
               on remote data centers. Every file transfer and message exchange occurs over a 
               cryptographically verified bridge established directly between hardware interfaces.
             </p>
             <ul className="space-y-6 mb-12">
               {[
                 { label: "AES-256 Handshake", desc: "Military-grade encryption for every single node packet." },
                 { label: "Metadata Stripping", desc: "We don't log. We don't store. We don't track. Your footprints vanish instantly." },
                 { label: "Hardware Isolation", desc: "Keys are stored in the secure enclave, isolated from the OS layer." }
               ].map((item, i) => (
                 <li key={i} className="flex items-start gap-5 text-[var(--color-muted)] font-light group">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 group-hover:scale-150 transition-transform" />
                   <div>
                     <span className="block font-bold text-[var(--color-foreground)] text-sm uppercase tracking-widest mb-1">{item.label}</span>
                     <span className="block text-sm opacity-100 leading-relaxed max-w-sm">{item.desc}</span>
                   </div>
                 </li>
               ))}
             </ul>
             <div className="p-6 bg-current/5 border border-current/10 rounded-3xl backdrop-blur-md">
                <p className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-[0.2em] mb-3">Technical Note</p>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed font-light italic">
                  "No packets are ever transcoded or cached at relay points. 
                  Privacy is built into the protocol's fundamental physics."
                </p>
             </div>
          </div>
          
          <div className="flex-1 flex justify-center py-20 relative">
            {/* Background Data Stream Effect */}
            <div className="absolute inset-x-0 top-0 bottom-0 opacity-10 pointer-events-none overflow-hidden">
               {[...Array(5)].map((_, i) => (
                 <motion.div 
                   key={i}
                   animate={{ y: ["0%", "100%"] }}
                   transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                   className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                   style={{ left: `${20 + i * 15}%` }}
                 />
               ))}
            </div>

            <div className="w-full max-w-md h-[500px] glass rounded-[80px] relative p-12 flex flex-col justify-center items-center group shadow-inner">
               <motion.div 
                 animate={{ y: [0, -15, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-10"
               >
                 <div className="w-32 h-32 bg-white text-black rounded-[40px] flex items-center justify-center shadow-[0_0_80px_-10px_rgba(255,255,255,0.4)]">
                   <Zap className="w-12 h-12 fill-current" />
                 </div>
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-white rounded-[40px] blur-3xl -z-10"
                 />
               </motion.div>
               
               <div className="mt-20 w-full text-center relative z-10">
                  <div className="text-[11px] uppercase font-bold tracking-[0.5em] text-[var(--color-muted)] mb-6 flex items-center justify-center gap-3">
                    <span className="w-4 h-px bg-current/20" /> Transmitting <span className="w-4 h-px bg-current/20" />
                  </div>
                  <div className="h-1.5 w-full bg-current/5 rounded-full overflow-hidden mb-6 border border-current/10">
                    <motion.div 
                      initial={{ left: "-100%" }}
                      whileInView={{ left: "0%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 relative rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between items-end px-2">
                    <div className="flex flex-col items-start gap-1">
                       <span className="text-[10px] font-mono text-[var(--color-faint)] uppercase tracking-widest">Filename</span>
                       <span className="text-xs font-mono text-blue-500">RESILIENCE_CORE.DTA</span>
                    </div>
                    <div className="text-right">
                       <span className="text-2xl font-bold tracking-tighter">84%</span>
                    </div>
                  </div>
               </div>
               
               {/* Background Orbit Effect */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[80%] h-[80%] border border-white/5 rounded-full animate-[spin_12s_linear_infinite] opacity-50" />
                  <div className="w-[100%] h-[100%] border border-white/5 rounded-full animate-[spin_18s_linear_infinite_reverse] opacity-50" />
               </div>
               
               {/* Detail Labels */}
               <div className="absolute top-10 left-10 text-[9px] font-mono text-[var(--color-muted)] uppercase tracking-widest">E2E_ENCRYPTED</div>
               <div className="absolute bottom-10 right-10 text-[9px] font-mono text-[var(--color-muted)] uppercase tracking-widest">MESH_NODE_04</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};


const Mission = () => {
  return (
    <Section id="mission" className="py-64 px-10 md:px-20 bg-[var(--color-background)] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <span className="text-blue-500 uppercase font-bold tracking-[0.4em] text-[11px] mb-8 block">Our Manifesto</span>
          <h2 className="text-4xl md:text-[84px] font-bold tracking-tighter leading-[1] mb-12">
            Built for the moments<br />
            <span className="flex flex-wrap">
              {"where everything else fails.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="text-[var(--color-faint)] hover:text-[var(--color-foreground)] transition-colors cursor-default mr-[0.2em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-[var(--color-muted)] font-light leading-relaxed max-w-3xl">
            In emergencies, connectivity isn't just a utility—it's safety. When the towers go dark, 
            Hopper stays on, creating an indelible bridge between nodes.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 border-t border-white/5 pt-24 text-left">
          <div className="group">
            <h5 className="text-[12px] uppercase tracking-[0.4em] font-bold mb-8">The Philosophy</h5>
            <p className="text-[var(--color-muted)] text-lg md:text-xl font-light leading-relaxed mb-6">
              We believe that being able to connect with your community shouldn't be a privilege 
              granted by a centralized grid. It is a fundamental resilient right.
            </p>
            <p className="text-sm text font-light leading-relaxed border-l border-blue-500/30 pl-6">
              Communication should be physics-based, not contract-based. By utilizing the ambient 
              radio waves already present in our devices, we reclaim the airwaves.
            </p>
          </div>
          <div className="group">
            <h5 className="text-[12px] uppercase tracking-[0.4em] font-bold mb-8">The Global Vision</h5>
            <p className="text-[var(--color-muted)] text-lg md:text-xl font-light leading-relaxed mb-6">
              To turn every mobile device into a bridge, forming a global emergency 
              infrastructure that remains active through any disaster or shutdown.
            </p>
            <p className="text-sm text font-light leading-relaxed border-l border-emerald-500/30 pl-6">
              Our goal is 1 billion active relay points by 2030, ensuring that no territory on 
              earth is ever truly "offline" or isolated from the human collective.
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative large text in background */}
      <div className="absolute -bottom-20 -right-20 text-[20vw] font-bold text-[var(--color-ghost)] pointer-events-none select-none tracking-tighter uppercase transition-colors duration-500">
        Collective
      </div>
      <div className="absolute -top-20 -left-20 text-[20vw] font-bold text-[var(--color-ghost)] pointer-events-none select-none tracking-tighter uppercase transition-colors duration-500">
        Resilient
      </div>
    </Section>
  );
};

const Footer = ({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <footer className="pt-48 pb-20 px-10 md:px-20 border-t border-white/5 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-48">
          <div className="max-w-sm">
            <HopperLogo theme={theme} className="h-8 w-auto mb-10" />
            <p className="text-[var(--color-muted)] font-light leading-relaxed">
              Democratizing communication infrastructure. Decentralized, offline-first, and built for a resilient future.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
            <div>
              <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold text mb-8">Navigation</h6>
              <ul className="flex flex-col gap-5 text-[var(--color-muted)] text-sm font-light">
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Technology</a></li>
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Impact</a></li>
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Mission</a></li>
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold text mb-8">Company</h6>
              <ul className="flex flex-col gap-5 text-[var(--color-muted)] text-sm font-light">
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Newsroom</a></li>
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold text mb-8">Resources</h6>
              <ul className="flex flex-col gap-5 text-[var(--color-muted)] text-sm font-light">
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Open Source</a></li>
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t border-white/5">
          <div className="flex items-center gap-12">
            <span className="text-[10px] items-center flex gap-1 uppercase tracking-widest font-bold text-[var(--color-muted)]">
              <Zap className="w-3 h-3 fill-current" /> est. 2024
            </span>
            <span className="text-[10px] font-mono text-[var(--color-faint)] hidden md:block uppercase tracking-widest">Beyond Infrastructure Protocol</span>
          </div>
          
          <div className="flex gap-12 text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-faint)]">
            <a href="#" className="hover:text-[var(--color-foreground)] transition-colors">X (Twitter)</a>
            <a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Github</a>
            <a href="#" className="hover:text-[var(--color-foreground)] transition-colors">Discord</a>
          </div>
          
          <p className="text-[10px] text-[var(--color-faint)] uppercase tracking-[0.2em] font-bold">© 2026 Hopper Protocol Labs</p>
        </div>
      </div>
    </footer>
  );
};

export default function App({ initialTheme = 'dark' }: { initialTheme?: 'dark' | 'light' }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme);
  const { scrollYProgress } = useScroll();

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.cookie = `hopper-theme=${theme}; path=/; max-age=31536000; samesite=lax`;
    window.localStorage.setItem('hopper-theme', theme);
  }, [theme]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] selection:bg-blue-500 selection:text-white transition-colors duration-500 ease-in-out">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-foreground)] z-[100] origin-left shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        style={{ scaleX: scrollYProgress }}
      />
      <ParticleBackground theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <Hero />

      <Mission />
      
      <Segments />
      
      <Demo />

      {/* Final CTA */}
      <Section className="py-48 px-10 md:px-20 text-center relative overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
          <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tight">Connect communities.<br />One hop at a time.</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <motion.button 
               whileHover={{ scale: 1.2 }}
               whileTap={{ scale: 0.8 }}
               className="px-12 py-6 bg-blue-600 rounded-full text-lg font-bold shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)] transition-all text-white"
             >
               Download Hopper
             </motion.button>
             <motion.button 
               whileHover={{ scale: 1.2 }}
               whileTap={{ scale: 0.8 }}
               className="px-12 py-6 glass rounded-full text-lg font-bold hover:bg-white/10 transition-all"
             >
               Partner with us
             </motion.button>
          </div>
        </motion.div>
      </Section>

      <Footer theme={theme} />
    </main>
  );
}
