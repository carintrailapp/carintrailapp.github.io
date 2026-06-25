import { motion } from 'framer-motion';

// Cairn stacked-stones mark — matches the iOS app's launch mark.
const CairnMark = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <ellipse cx="16" cy="26" rx="11" ry="4.2" fill="var(--color-cairn-forest)" />
    <ellipse cx="16" cy="19.5" rx="8.5" ry="3.6" fill="var(--color-cairn-moss)" />
    <ellipse cx="16" cy="13.8" rx="6" ry="3" fill="var(--color-cairn-forest)" />
    <ellipse cx="16" cy="9" rx="3.6" ry="2.3" fill="var(--color-cairn-moss)" />
  </svg>
);

export const LiquidGlassNav = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
    >
      <nav className="flex items-center justify-between px-6 py-3.5 rounded-[2rem] bg-white/55 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(27,64,34,0.08),inset_0_1px_0_rgba(255,255,255,0.5)]">
        <a href="#top" className="flex items-center gap-2.5">
          <CairnMark className="w-7 h-7" />
          <span className="font-bold tracking-tight text-xl text-cairn-pine">Cairn</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-700">
          <a href="#features" className="hover:text-cairn-forest transition-colors">Features</a>
          <a href="#watch" className="hover:text-cairn-forest transition-colors">Watch</a>
          <a href="#community" className="hover:text-cairn-forest transition-colors">Community</a>
        </div>

        <button className="px-5 py-2.5 rounded-full bg-cairn-forest text-white font-medium text-sm shadow-[0_4px_14px_0_rgba(42,98,56,0.35)] hover:bg-cairn-pine hover:-translate-y-px active:translate-y-0 active:scale-95 transition-all">
          Get Early Access
        </button>
      </nav>
    </motion.header>
  );
};
