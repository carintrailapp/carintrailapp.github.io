import { motion } from 'framer-motion';

export const BentoFeatures = () => {
  return (
    <section id="features" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-950 mb-4">
          Navigation, perfected.
        </h2>
        <p className="text-lg text-zinc-600 max-w-[50ch]">
          Every tool you need to stay on the trail, engineered into a fluid, tactile interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Apple Watch Radar */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <motion.div 
            whileHover={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full h-[400px] bg-white rounded-[2.5rem] border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative flex items-center justify-center cursor-pointer"
          >
            {/* Perpetual Radar Animation */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute w-[600px] h-[600px] border border-cairn-forest/20 rounded-full flex items-center justify-center"
            >
              <div className="w-[400px] h-[400px] border border-cairn-forest/10 rounded-full" />
              <div className="absolute top-0 w-1 h-24 bg-gradient-to-b from-cairn-forest to-transparent blur-sm" />
            </motion.div>
            
            <div className="relative z-10 w-48 h-48 bg-zinc-950 rounded-full border-4 border-zinc-800 shadow-2xl flex items-center justify-center">
              <span className="text-cairn-forest font-bold tracking-widest">RADAR</span>
            </div>
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-zinc-950 tracking-tight">WatchOS Radar Compass</h3>
            <p className="text-zinc-600 mt-1 max-w-[45ch]">Follow your heading perfectly with a native, haptic-enabled watchOS companion app that taps your wrist if you drift off-route.</p>
          </div>
        </div>

        {/* Card 2: Live Status */}
        <div className="col-span-1 flex flex-col gap-6">
          <motion.div 
            whileHover={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full h-[400px] bg-white rounded-[2.5rem] border border-slate-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative flex flex-col p-8 cursor-pointer"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              {/* Perpetual Pulse */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-24 h-24 rounded-full bg-cairn-trail/10 flex items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-cairn-trail shadow-[0_0_20px_rgba(217,118,59,0.5)]" />
              </motion.div>
              
              <div className="bg-zinc-50 border border-zinc-100 px-4 py-2 rounded-xl flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cairn-trail opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cairn-trail"></span>
                </span>
                <span className="text-sm font-mono text-zinc-950 font-bold">12.4 MILES</span>
              </div>
            </div>
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-zinc-950 tracking-tight">Dynamic Live Activities</h3>
            <p className="text-zinc-600 mt-1 max-w-[35ch]">Keep an eye on your elevation gain and distance right from the lock screen.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
