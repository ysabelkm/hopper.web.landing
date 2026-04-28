import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export const PhoneMockup = () => {
  return (
    <div className="relative w-[300px] h-[600px] bg-[var(--color-background)] rounded-[50px] border-[8px] border-current/10 shadow-2xl overflow-hidden group transition-colors duration-500">
      {/* Dynamic Screen Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-background)]">
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-20 h-20 bg-[var(--color-foreground)] text-[var(--color-background)] rounded-3xl flex items-center justify-center shadow-[0_0_80px_rgba(var(--color-foreground),0.2)]">
            <Zap className="w-10 h-10 fill-current" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-current rounded-3xl -z-10 blur-2xl"
          />
        </motion.div>
        
        <div className="mt-12 text-center">
          <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--color-muted)] mb-2">Hopper Protocol</div>
          <div className="text-sm font-mono text-blue-600 dark:text-blue-500">SECURE_MESH_ACTIVE</div>
        </div>
      </div>

      {/* Gloss Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Side Buttons */}
      <div className="absolute right-[-10px] top-24 w-1 h-12 bg-zinc-800 rounded-l-md" />
      <div className="absolute right-[-10px] top-40 w-1 h-12 bg-zinc-800 rounded-l-md" />
      <div className="absolute left-[-10px] top-32 w-1 h-20 bg-zinc-800 rounded-r-md" />
      
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-20" />
    </div>
  );
};
