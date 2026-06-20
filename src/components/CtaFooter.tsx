import { motion } from 'framer-motion';

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Community', href: '#community' },
  { label: 'Safety', href: '#safety' },
  { label: 'GitHub', href: 'https://github.com' },
];

export const CtaFooter = () => {
  return (
    <>
      {/* ── CTA Section ── */}
      <section className="relative py-32 px-4 md:px-8 overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
            className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full bg-cairn-forest/6 blur-[100px]"
          />
          <motion.div
            animate={{
              x: [0, -50, 40, 0],
              y: [0, 40, -30, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
            className="absolute -bottom-1/4 -right-1/4 w-[55%] h-[55%] rounded-full bg-cairn-trail/6 blur-[100px]"
          />
          <motion.div
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -20, 20, 0],
            }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/3 w-[40%] h-[40%] rounded-full bg-cairn-moss/5 blur-[80px]"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={spring}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-950 mb-8 text-balance"
          >
            Your next trail is waiting.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...spring, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-950 text-white font-semibold shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] hover:bg-zinc-800 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all">
              Download for iOS
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-zinc-300 text-zinc-950 font-semibold hover:bg-zinc-50 hover:border-zinc-400 active:scale-95 transition-all">
              View on GitHub
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-zinc-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Logo + copyright */}
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="w-8 h-8 rounded-lg bg-cairn-forest flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 22h20L12 2z" />
              </svg>
            </div>
            <span className="font-semibold text-zinc-950 tracking-tight">Cairn</span>
            <span className="text-zinc-400 text-sm font-mono ml-1">&copy; 2026</span>
          </div>

          {/* Right: Nav links */}
          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-zinc-500 hover:text-zinc-950 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
};
