"use client";

import { motion, useScroll } from 'motion/react';
import { Bluetooth, Zap, Users, ArrowRight, Radio, GraduationCap, HeartHandshake, Music } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Video02Icon } from '@hugeicons/core-free-icons';
import { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Section } from './components/Section';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ExpandingCards, CardItem } from './components/ui/expanding-cards';


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
            Connect communities.<br />
            <span className="flex flex-wrap">
              {"One hop at a time.".split(" ").map((word, i) => (
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
            Hopper lets you chat, share files, and stay in touch with people nearby — no SIM card, no Wi-Fi, no data needed. Just you and the people around you.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="bg-[var(--color-foreground)] text-[var(--color-background)] px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-transform flex items-center gap-3 shadow-[0_0_30px_rgba(var(--color-foreground),0.1)]"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 group"
            >
              <span className="w-14 h-14 rounded-full border border-current opacity-20 flex items-center justify-center group-hover:opacity-100 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-300">
                <HugeiconsIcon icon={Video02Icon} className="group-hover:text-blue-500 transition-colors duration-300" />
              </span>
              <div className="flex flex-col items-start">
                <span className="text-[11px] uppercase tracking-widest font-bold text-[var(--color-muted)] group-hover:text-blue-500 transition-colors duration-300">See it in action</span>
                <span className="text-[9px] text-[var(--color-faint)] tracking-[0.2em] group-hover:text-blue-400 transition-colors duration-300">2 MIN DEMO</span>
              </div>
            </motion.button>
          </div>
          
          <div className="mt-20 grid grid-cols-2 gap-10 max-w-md border-t border-current/10 pt-10">
            <div>
              <div className="text-2xl font-bold mb-1 tracking-tight">100%</div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] font-bold">Your messages are private</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1 tracking-tight">0.0ms</div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] font-bold">No internet required</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:w-2/5 flex justify-center"
        >
          <img
            src="/herosection.png"
            alt="Hopper app screens"
            className="w-full h-auto object-contain drop-shadow-2xl scale-[1.4]"
          />

        </motion.div>
      </div>

      <div className="absolute bottom-12 left-10 md:left-20 flex flex-col items-start gap-4">
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

const hopperSegments: CardItem[] = [
  {
    id: "rural",
    title: "Rural Communities",
    description: "People living in remote areas with poor or no mobile coverage. Hopper keeps them connected — no data, no towers, no cost.",
    imgSrc: "/images/ruralareas.jpg",
    icon: <Radio size={24} />,
    linkHref: "#",
  },
  {
    id: "students",
    title: "Students & Schools",
    description: "Educational institutions in low-infrastructure areas where internet is unreliable or unaffordable. Chat on campus, no Wi-Fi needed.",
    imgSrc: "/images/campuses.jpg",
    icon: <GraduationCap size={24} />,
    linkHref: "#",
  },
  {
    id: "ngos",
    title: "Field Workers & NGOs",
    description: "Teams in isolated environments — humanitarian missions, medical camps — that need offline coordination that never drops.",
    imgSrc: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000",
    icon: <HeartHandshake size={24} />,
    linkHref: "#",
  },
  {
    id: "events",
    title: "Event Attendees",
    description: "Participants at festivals, conferences, or crowded venues where mobile networks get congested. Hopper stays fast even when towers fail.",
    imgSrc: "/images/festivals.jpg",
    icon: <Music size={24} />,
    linkHref: "#",
  },
];

const Segments = () => {
  return (
    <Section id="segments" className="py-48 px-10 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full mb-16">
          <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[11px] mb-6 block">Who It's For</span>
          <h2 className="text-5xl md:text-[84px] font-bold tracking-tighter leading-[0.9] mb-6">
            No signal?<br />
            <span className="text-[var(--color-faint)]">No problem.</span>
          </h2>
          <p className="text-[var(--color-muted)] text-lg font-light max-w-xl leading-relaxed">
            Hover or tap a card to learn who Hopper is built for.
          </p>
        </div>
        <ExpandingCards items={hopperSegments} defaultActiveIndex={0} className="w-full" />
      </div>
    </Section>
  );
};

const Demo = () => {
  return (
    <Section id="how-it-works" className="py-48 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent">
      <div className="max-w-7xl mx-auto px-10 md:px-20 mb-32">
        <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block text-[var(--color-faint)]">How it works</span>
        <h2 className="text-5xl md:text-[110px] leading-[0.9] font-bold tracking-tighter mb-10 py-2">
          Simple to use.<br />
          <span className="flex flex-wrap">
            {"Powerful when it matters.".split(" ").map((word, i) => (
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
          Open Hopper. See who's nearby. Start chatting. When you're too far apart, other Hopper users in between quietly pass the message along — like a chain of hands.
        </p>
      </div>

      <div className="flex flex-col gap-64 px-10 md:px-20 max-w-7xl mx-auto">
        {/* Scenario 1 - Messaging */}
        <div className="flex flex-col lg:flex-row items-center gap-32">
          <div className="flex-1">
            <div className="w-12 h-px bg-blue-500 mb-8" />
            <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Messages find their way</h3>
            <p className="text-[var(--color-muted)] text-lg font-light leading-relaxed mb-10">
              Hopper works like a neighbourhood. If you can't reach someone directly, someone nearby passes the message along. No towers. No internet. No middleman.
            </p>
            <div className="space-y-6 mb-12">
               <div className="flex items-start gap-4">
                  <div className="p-2 glass rounded-lg border-current/10"><Bluetooth className="w-4 h-4 text-blue-500" /></div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest mb-1">Finds people nearby</div>
                    <p className="text-xs text-[var(--color-muted)] font-light">Hopper quietly scans for other users in range. When it finds someone, you're connected instantly.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="p-2 glass rounded-lg border-current/10"><Zap className="w-4 h-4 text-emerald-500" /></div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest mb-1">Works in crowds</div>
                    <p className="text-xs text-[var(--color-muted)] font-light">Even at a packed festival or protest, Hopper stays fast because it doesn't rely on a tower everyone's fighting over.</p>
                  </div>
               </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="px-5 py-2 glass rounded-full text-[10px] font-mono text-[var(--color-foreground)] uppercase tracking-widest border-current/40">Delivered 0.4s</div>
              <div className="px-5 py-2 glass rounded-full text-[10px] font-mono text-blue-600 dark:text-blue-500 uppercase tracking-widest border-current/40">Encrypted</div>
              <div className="px-5 py-2 glass rounded-full text-[10px] font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-widest border-current/40">3 people nearby</div>
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
                   <span className="text-[10px] font-mono text-[var(--color-faint)] tracking-widest">Signal Active</span>
                   <span className="text-[8px] font-mono text-blue-600 dark:text-blue-400">Encrypted</span>
                </div>
              </div>
              
              <div className="space-y-10">
                <motion.div 
                   initial={{ x: -20, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   viewport={{ once: true }}
                   className="bg-current/5 p-6 rounded-3xl rounded-tl-none max-w-[85%] border border-current/10"
                >
                  <p className="text-sm font-light text-[var(--color-muted)] leading-relaxed italic">"Are you guys at the stage yet? Signal is gone up here 😭"</p>
                </motion.div>
                
                <motion.div 
                   initial={{ x: 20, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 }}
                   className="bg-blue-100 dark:bg-blue-600/10 p-6 rounded-3xl rounded-tr-none border border-blue-300/50 dark:border-blue-500/20 ml-auto max-w-[90%] shadow-[0_8px_24px_-14px_rgba(1,113,227,0.2)]"
                >
                  <p className="text-sm leading-relaxed font-light signal-bubble-text">Yeah! Walk towards the big screen — Amara and I are right there, I'll send you our exact spot.</p>
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
                        className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_30px_rgba(1,113,227,1)]" 
                      />
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_15px_40px_rgba(255,255,255,0.2)]">
                        <ArrowRight className="w-6 h-6 text-black" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-[var(--color-background)] border border-current/10 p-8 rounded-[40px] shadow-2xl w-64 hidden md:block backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-muted)] mb-5 font-bold">Connection status</p>
              <div className="flex items-center gap-4">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(1,113,227,0.5)]" />
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
             <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Your messages stay yours</h3>
             <p className="text-[var(--color-muted)] text-lg font-light leading-relaxed mb-10">
               Hopper has no servers. Your messages go directly from your phone to theirs — nothing is stored in the cloud, nothing passes through a company's systems. When you delete a message, it's gone. Simple.
             </p>
             <ul className="space-y-6 mb-12">
               {[
                 { label: "Your messages are encrypted", desc: "Every message is scrambled before it leaves your phone. Only the person you're talking to can read it." },
                 { label: "We don't log anything", desc: "We have no servers, so there's nothing to hand over, leak, or sell. Ever." },
                 { label: "Your keys live on your phone", desc: "The key that unlocks your messages never leaves your device — not even we can read them." }
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
          </div>
          
          <div className="flex-1 relative" style={{ marginLeft: 'calc(-1 * (50vw - 50%))' }}>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="translate-x-[10%]"
            >
              <img
                src="/holdingphonemockup.png"
                alt="Hopper app"
                className="w-full h-auto object-contain object-left scale-[1.2]"
              />
            </motion.div>
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
          <span className="text-blue-500 uppercase font-bold tracking-[0.4em] text-[11px] mb-8 block">Why we built this</span>
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
            In an emergency, being able to reach your people isn't a nice-to-have. It's everything. When the towers go dark, Hopper stays on.
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
          <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tight">Stay close to the people who matter.<br />Even when the signal doesn't.</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <motion.button 
               whileHover={{ scale: 1.2 }}
               whileTap={{ scale: 0.8 }}
               className="px-12 py-6 bg-blue-600 rounded-full text-lg font-bold shadow-[0_0_50px_-10px_rgba(1,113,227,0.5)] transition-all text-white"
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
