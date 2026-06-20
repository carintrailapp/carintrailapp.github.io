import { motion } from 'framer-motion';

export const LiquidGlassNav = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
    >
      <nav className="flex items-center justify-between px-6 py-4 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cairn-moss to-cairn-forest flex items-center justify-center text-white font-bold text-lg">C</div>
          <span className="font-bold tracking-tight text-xl text-zinc-950">Cairn</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-700">
          <a href="#features" className="hover:text-cairn-forest transition-colors">Features</a>
          <a href="#watch" className="hover:text-cairn-forest transition-colors">Watch Companion</a>
          <a href="#community" className="hover:text-cairn-forest transition-colors">Community</a>
        </div>
        
        <button className="px-5 py-2.5 rounded-full bg-cairn-forest text-white font-medium text-sm shadow-[0_4px_14px_0_rgba(42,98,56,0.39)] hover:scale-95 active:scale-90 transition-all">
          Get Early Access
        </button>
      </nav>
    </motion.header>
  );
};
