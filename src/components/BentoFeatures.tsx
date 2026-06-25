import { motion } from 'framer-motion';
import { Mountains, Watch, Broadcast, WifiSlash } from '@phosphor-icons/react';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export const BentoFeatures = () => {
  return (
    <section id="features" className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-14 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-cairn-pine mb-4">
          Navigation, perfected.
        </h2>
        <p className="text-lg text-zinc-600 max-w-[50ch]">
          Everything you need to stay on the trail, engineered into one fluid, tactile interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(260px,1fr)] gap-5">

        {/* A — 3D terrain (wide) */}
        <motion.div
          {...reveal}
          className="md:col-span-2 relative overflow-hidden rounded-[2rem] p-8 flex flex-col justify-end bg-gradient-to-br from-cairn-moss/15 to-cairn-forest/10 border border-cairn-forest/10"
        >
          <ContourTexture />
          <div className="relative">
            <IconChip className="bg-cairn-forest/12 text-cairn-forest">
              <Mountains weight="bold" className="w-6 h-6" />
            </IconChip>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-cairn-pine">See the terrain in 3D</h3>
            <p className="mt-2 text-zinc-600 max-w-[42ch]">
              Realistic elevation and satellite layers, so the climb ahead is never a surprise.
            </p>
          </div>
        </motion.div>

        {/* B — Apple Watch (tall) */}
        <motion.div
          {...reveal}
          id="watch"
          className="md:row-span-2 relative overflow-hidden rounded-[2rem] p-8 flex flex-col bg-cairn-pine text-white"
        >
          <IconChip className="bg-white/10 text-white">
            <Watch weight="bold" className="w-6 h-6" />
          </IconChip>
          <h3 className="mt-5 text-2xl font-bold tracking-tight">On your wrist</h3>
          <p className="mt-2 text-white/70 max-w-[34ch]">
            Compass guidance, haptic turn cues, and live stats on Apple Watch, even with your phone stowed.
          </p>
          <div className="flex-1 flex items-center justify-center py-8">
            <CompassDial />
          </div>
        </motion.div>

        {/* C — Live Activities (with the live pulse) */}
        <motion.div
          {...reveal}
          className="relative overflow-hidden rounded-[2rem] p-8 flex flex-col bg-white border border-zinc-200/70 shadow-[0_20px_40px_-24px_rgba(27,64,34,0.25)]"
        >
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-cairn-trail/10 flex items-center justify-center"
            >
              <Broadcast weight="bold" className="w-8 h-8 text-cairn-trail" />
            </motion.div>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-950">Live Activities</h3>
          <p className="mt-1 text-zinc-600 max-w-[32ch]">
            Distance and elevation on your lock screen and Dynamic Island.
          </p>
        </motion.div>

        {/* D — Offline */}
        <motion.div
          {...reveal}
          className="relative overflow-hidden rounded-[2rem] p-8 flex flex-col justify-end bg-cairn-sand/60 border border-cairn-sand"
        >
          <IconChip className="bg-cairn-clay/12 text-cairn-clay">
            <WifiSlash weight="bold" className="w-6 h-6" />
          </IconChip>
          <h3 className="mt-5 text-xl font-bold tracking-tight text-cairn-pine">Works offline</h3>
          <p className="mt-1 text-zinc-600 max-w-[32ch]">
            Download a trail's map and follow it with zero signal.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

const IconChip = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${className}`}>{children}</div>
);

// Subtle topographic contour texture, bottom-right of the wide cell.
const ContourTexture = () => (
  <svg
    viewBox="0 0 400 300"
    className="absolute -right-10 -bottom-10 w-[60%] h-auto text-cairn-forest/15"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    {[120, 96, 72, 48, 26].map((r) => (
      <ellipse key={r} cx={260} cy={210} rx={r * 1.4} ry={r} />
    ))}
  </svg>
);

// Simple compass dial for the watch cell.
const CompassDial = () => (
  <svg viewBox="0 0 200 200" className="w-44 h-44" aria-hidden="true">
    <circle cx="100" cy="100" r="92" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
    {Array.from({ length: 24 }).map((_, i) => {
      const a = (i / 24) * Math.PI * 2;
      const inner = i % 6 === 0 ? 72 : 80;
      return (
        <line
          key={i}
          x1={100 + Math.sin(a) * inner}
          y1={100 - Math.cos(a) * inner}
          x2={100 + Math.sin(a) * 88}
          y2={100 - Math.cos(a) * 88}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={i % 6 === 0 ? 2.5 : 1}
        />
      );
    })}
    <polygon points="100,38 112,104 100,92 88,104" fill="var(--color-cairn-trail)" />
    <polygon points="100,162 112,96 100,108 88,96" fill="rgba(255,255,255,0.5)" />
    <circle cx="100" cy="100" r="6" fill="white" />
  </svg>
);
