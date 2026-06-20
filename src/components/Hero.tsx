import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Side: Asymmetric Typography */}
        <div className="col-span-1 md:col-span-7 flex flex-col items-start z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cairn-forest/10 border border-cairn-forest/20 text-cairn-forest text-sm font-semibold mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cairn-forest opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cairn-forest"></span>
            </span>
            WatchOS Counterpart Live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05] text-zinc-950 text-balance mb-6"
          >
            Leave the path. <br />
            <span className="inline-flex items-center gap-4">
              Find the 
              <span className="hidden md:inline-block w-24 h-16 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-xl rotate-3">
                <img src="https://picsum.photos/seed/cairn/400/300" alt="Mountain peak" className="w-full h-full object-cover" />
              </span>
              trail.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-[50ch] mb-10"
          >
            Record your hikes, follow them back, and share them with the community. Cairn brings high-fidelity topographic mapping to your wrist and pocket.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-950 text-white font-semibold shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] hover:bg-zinc-800 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all">
              Download for iOS
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-zinc-200 text-zinc-950 font-semibold hover:bg-zinc-50 active:scale-95 transition-all">
              Explore Routes
            </button>
          </motion.div>
        </div>
        
        {/* Right Side: Visual Asset */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
          className="col-span-1 md:col-span-5 relative hidden md:block"
        >
          <div className="absolute inset-0 bg-cairn-moss/20 rounded-[3rem] blur-3xl transform -rotate-6 scale-105"></div>
          <div className="relative w-full aspect-[4/5] rounded-[2.5rem] bg-white border border-zinc-200 p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
            <img src="https://picsum.photos/seed/hike/800/1000" alt="App interface" className="w-full h-full object-cover rounded-[2rem]" />
            
            {/* Floating Glass Element */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-10 -left-10 bg-white/70 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-cairn-forest flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M240,104a8,8,0,0,1-8,8H215.11a72.16,72.16,0,0,1-19.46,36.56l11.66,11.65a8,8,0,0,1-11.32,11.32L184.34,160A72.16,72.16,0,0,1,147.78,179.46L158.4,198a8,8,0,0,1-13.88,8l-10.61-18.49A71.24,71.24,0,0,1,128,184a71.24,71.24,0,0,1-6.91-1l-10.61,18.49a8,8,0,0,1-13.88-8l10.62-18.5A72.16,72.16,0,0,1,71.66,160l-11.65,11.66a8,8,0,0,1-11.32-11.32l11.65-11.65A72.16,72.16,0,0,1,40.89,112H24a8,8,0,0,1,0-16H40.89A72.16,72.16,0,0,1,60.35,59.44L48.69,47.79a8,8,0,0,1,11.32-11.32L71.66,48.13A72.16,72.16,0,0,1,108.22,28.67L97.6,10.18a8,8,0,0,1,13.88-8L122.09,20.66a70.92,70.92,0,0,1,11.82,0L144.52,2.14a8,8,0,0,1,13.88,8L147.78,28.67A72.16,72.16,0,0,1,184.34,48.13l11.65-11.66a8,8,0,0,1,11.32,11.32L195.65,59.44A72.16,72.16,0,0,1,215.11,96H232A8,8,0,0,1,240,104ZM128,56a56,56,0,1,0,56,56A56.06,56.06,0,0,0,128,56Zm0,96a40,40,0,1,1,40-40A40,40,0,0,1,128,152Z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-950">Summit Reached</p>
                <p className="text-xs text-zinc-500 font-mono">1,572 FT</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
