import { motion } from 'framer-motion';

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const safetyFeatures = [
  {
    title: 'Offline Maps',
    description: 'Download high-resolution topographic tiles for entire regions. Navigate confidently in dead zones, deep canyons, and backcountry with zero signal.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
        <line x1="2" y1="20" x2="5" y2="20" />
        <line x1="19" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    title: 'Waypoints & POIs',
    description: 'Drop pins across 10 categories — water, shelter, viewpoint, and more. Proximity cues alert you as you approach each waypoint.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="12" x2="15" y2="14" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'HealthKit Workouts',
    description: 'Automatically logs heart rate zones, elevation gain, distance, pace, and calories burned. Every hike becomes a workout with rich health data.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        <polyline points="3 12 7 12 9 8 12 16 15 10 17 12 21 12" />
      </svg>
    ),
  },
  {
    title: 'Haptic Turn-by-Turn',
    description: 'Distinct left vs. right wrist taps guide you at every junction. Off-route alerts vibrate urgently so you never miss a turn, even with your phone stowed.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M9 14l3-3 3 3" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <circle cx="8" cy="2" r="1" fill="currentColor" />
        <circle cx="16" cy="2" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export const SafetySection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-zinc-950 relative overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cairn-forest/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={spring}
            className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4"
          >
            Built for the backcountry.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...spring, delay: 0.1 }}
            className="text-lg text-zinc-400 max-w-[52ch]"
          >
            Works offline. Tracks your health. Keeps you on the trail.
          </motion.p>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safetyFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...spring, delay: i * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={spring}
                className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-[2.5rem] p-8 md:p-10 cursor-pointer h-full group"
              >
                <div className="flex items-start gap-5">
                  {/* Green glow dot */}
                  <div className="relative shrink-0 mt-1">
                    <motion.div
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ repeat: Infinity, duration: 3, delay: i * 0.3 }}
                      className="absolute inset-0 w-3 h-3 rounded-full bg-cairn-moss blur-md"
                    />
                    <div className="relative w-3 h-3 rounded-full bg-cairn-moss" />
                  </div>

                  <div className="flex-1">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-cairn-forest/10 border border-cairn-forest/20 flex items-center justify-center text-cairn-moss mb-5 group-hover:bg-cairn-forest/15 transition-colors">
                      {feature.icon}
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-[15px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
