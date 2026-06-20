import { motion } from 'framer-motion';
import { useRef } from 'react';

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

/* ── Card visual components ── */
const CommunityTrailsVisual = () => (
  <div className="w-full h-full bg-gradient-to-br from-cairn-forest/5 to-cairn-moss/10 flex items-center justify-center p-5 relative overflow-hidden">
    {/* Stacked trail cards */}
    <div className="relative w-full h-full flex items-center justify-center">
      {[
        { name: 'Sunset Ridge', author: 'Alex M.', miles: '5.3 mi', rotate: -6, z: 1 },
        { name: 'Cedar Falls Loop', author: 'Jordan K.', miles: '3.1 mi', rotate: 2, z: 2 },
        { name: 'Eagle Peak', author: 'Sam T.', miles: '8.7 mi', rotate: -1, z: 3 },
      ].map((trail, i) => (
        <motion.div
          key={trail.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.2 + i * 0.15 }}
          className="absolute bg-white rounded-2xl border border-zinc-200/80 p-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] w-[180px]"
          style={{ transform: `rotate(${trail.rotate}deg)`, zIndex: trail.z, top: `${20 + i * 18}px` }}
        >
          <div className="w-full h-14 rounded-xl bg-cairn-forest/10 mb-2 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2A6238" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l6-6 4 4 8-8" />
              <polyline points="17 7 21 7 21 11" />
            </svg>
          </div>
          <p className="text-xs font-bold text-zinc-950 truncate">{trail.name}</p>
          <p className="text-[10px] text-zinc-400 font-mono">{trail.author} · {trail.miles}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const SharePlayVisual = () => (
  <div className="w-full h-full bg-gradient-to-br from-cairn-sky/5 to-cairn-sky/10 flex items-center justify-center p-5 relative overflow-hidden">
    <div className="flex flex-col items-center gap-4">
      {/* User dots on a "map" */}
      <div className="relative w-40 h-28 rounded-2xl bg-white/60 border border-zinc-200/50">
        {/* Trail line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 112">
          <path d="M20 90 Q60 20 80 50 Q100 80 140 30" fill="none" stroke="#5B9148" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
        </svg>
        {/* User dots */}
        {[
          { x: 38, y: 60, color: 'bg-cairn-forest' },
          { x: 78, y: 48, color: 'bg-cairn-trail' },
          { x: 110, y: 38, color: 'bg-cairn-sky' },
        ].map((dot, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
            className={`absolute w-3 h-3 rounded-full ${dot.color} border-2 border-white shadow-md`}
            style={{ left: dot.x, top: dot.y }}
          />
        ))}
      </div>
      {/* Avatars strip */}
      <div className="flex items-center -space-x-2">
        {['bg-cairn-forest', 'bg-cairn-trail', 'bg-cairn-sky'].map((bg, i) => (
          <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center`}>
            <span className="text-white text-[10px] font-bold">{['A', 'J', 'S'][i]}</span>
          </div>
        ))}
        <div className="w-8 h-8 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center">
          <span className="text-zinc-400 text-[10px] font-bold">+2</span>
        </div>
      </div>
      <span className="text-[10px] font-mono text-cairn-sky font-semibold">SharePlay Active</span>
    </div>
  </div>
);

const RatingsVisual = () => (
  <div className="w-full h-full bg-gradient-to-br from-cairn-amber/5 to-cairn-trail/10 flex items-center justify-center p-5 relative overflow-hidden">
    <div className="flex flex-col items-center gap-4">
      {/* Star rating */}
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.3 + i * 0.1 }}
            width="24" height="24" viewBox="0 0 24 24"
            fill={i < 4 ? '#D99A2B' : 'none'}
            stroke="#D99A2B"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </motion.svg>
        ))}
      </div>
      <p className="text-2xl font-bold text-zinc-950">4.8</p>
      <p className="text-[10px] text-zinc-400 font-mono">1,247 reviews</p>

      {/* Mini review snippet */}
      <div className="bg-white/80 rounded-xl border border-zinc-200/50 px-4 py-2.5 max-w-[200px]">
        <p className="text-[11px] text-zinc-600 leading-relaxed italic">
          &ldquo;Best trail mapping app I've ever used. Offline maps saved me twice.&rdquo;
        </p>
        <p className="text-[9px] text-zinc-400 font-mono mt-1">— Verified Hiker</p>
      </div>
    </div>
  </div>
);

const GpxVisual = () => (
  <div className="w-full h-full bg-gradient-to-br from-cairn-moss/5 to-cairn-forest/10 flex items-center justify-center p-5 relative overflow-hidden">
    <div className="flex flex-col items-center gap-4">
      {/* File icon */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="w-16 h-20 rounded-xl bg-white border border-zinc-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center relative"
      >
        <div className="absolute top-0 right-0 w-5 h-5 bg-cairn-forest/10 rounded-bl-xl" />
        <span className="text-xs font-mono font-bold text-cairn-forest">.GPX</span>
      </motion.div>

      {/* Flow arrows & services */}
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B9148" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="7 13 12 18 17 13" />
          <polyline points="7 6 12 11 17 6" />
        </svg>
      </div>

      <div className="flex items-center gap-3">
        {['AllTrails', 'Gaia', 'Strava'].map((svc) => (
          <div key={svc} className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)]">
            <span className="text-[10px] font-semibold text-zinc-700">{svc}</span>
          </div>
        ))}
      </div>

      <p className="text-[10px] font-mono text-zinc-400">Import & Export</p>
    </div>
  </div>
);

/* ── Card data ── */
const cards = [
  {
    title: 'Community Trails',
    description: 'Browse and save trails published by hikers around the world. Discover hidden gems near you.',
    Visual: CommunityTrailsVisual,
    accent: 'border-cairn-forest/20',
  },
  {
    title: 'SharePlay Group Hike',
    description: 'Share your live location with friends. See everyone on the map in real time.',
    Visual: SharePlayVisual,
    accent: 'border-cairn-sky/20',
  },
  {
    title: 'Ratings & Reviews',
    description: 'Read honest reviews from the community. Rate trails and help fellow hikers choose the right path.',
    Visual: RatingsVisual,
    accent: 'border-cairn-amber/20',
  },
  {
    title: 'GPX Import / Export',
    description: 'Round-trip your trail data with AllTrails, Gaia GPS, Strava, and any GPX-compatible app.',
    Visual: GpxVisual,
    accent: 'border-cairn-moss/20',
  },
];

/* ── Main Component ── */
export const SocialCommunity = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 w-full">
      {/* Section header */}
      <div className="px-4 md:px-8 max-w-7xl mx-auto mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={spring}
          className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-950 mb-4"
        >
          Hike together.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...spring, delay: 0.1 }}
          className="text-lg text-zinc-600 max-w-[60ch]"
        >
          Share routes, hike with friends in real-time, and build a community around the trails you love.
        </motion.p>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-4 md:px-8 pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
      >
        {/* Left spacer for centering on large screens */}
        <div className="shrink-0 w-0 md:w-[max(0px,calc((100vw-1280px)/2))]" />

        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...spring, delay: i * 0.1 }}
            className="shrink-0 w-[300px] scroll-snap-align-start"
            style={{ scrollSnapAlign: 'start' }}
          >
            <motion.div
              whileHover={{ scale: 0.97 }}
              transition={spring}
              className={`bg-white rounded-[2.5rem] border ${card.accent} shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer h-full flex flex-col`}
            >
              {/* Visual area */}
              <div className="w-full h-[220px]">
                <card.Visual />
              </div>

              {/* Text area */}
              <div className="p-6 pt-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-zinc-950 tracking-tight mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Right spacer */}
        <div className="shrink-0 w-4 md:w-[max(0px,calc((100vw-1280px)/2))]" />
      </div>
    </section>
  );
};
