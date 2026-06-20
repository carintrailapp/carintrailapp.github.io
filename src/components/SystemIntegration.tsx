import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

/* ── Siri command typewriter ── */
const siriCommands = [
  'Hey Siri, start recording my hike',
  'Find trails near me',
  'What are my stats this week?',
  'Navigate to the summit',
  'How far have I hiked today?',
  'Share my location with the group',
  'Set a waypoint here',
  'Resume my last trail',
  "What's the elevation gain?",
  'End my hike and save',
];

const useTypewriter = (phrases: string[], typingSpeed = 55, pause = 2200) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          timeout = setTimeout(tick, pause);
          return;
        }
      } else {
        setText(current.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          setPhraseIndex((p) => (p + 1) % phrases.length);
          return;
        }
      }
      timeout = setTimeout(tick, deleting ? 30 : typingSpeed);
    };

    timeout = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timeout);
  }, [phraseIndex, phrases, typingSpeed, pause]);

  return text;
};

/* ── Dynamic Island mock ── */
const DynamicIslandVisual = () => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setExpanded((e) => !e), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-zinc-50 rounded-[2.5rem] overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, #2A6238 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div className="flex flex-col items-center gap-6">
        {/* The pill */}
        <motion.div
          layout
          animate={{
            width: expanded ? 320 : 126,
            height: expanded ? 84 : 36,
            borderRadius: expanded ? 28 : 18,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="bg-zinc-950 relative overflow-hidden cursor-pointer"
          onClick={() => setExpanded((e) => !e)}
        >
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute inset-0 flex items-center justify-between px-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cairn-forest flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 22h20L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">Hawk Mountain</p>
                    <p className="text-zinc-400 text-[10px] font-mono">2.4 mi remaining</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 rounded-full bg-cairn-trail"
                  />
                  <span className="text-cairn-trail text-xs font-mono font-bold">LIVE</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="text-xs text-zinc-400 font-mono tracking-wide">
          {expanded ? 'Expanded view' : 'Tap to expand'}
        </p>
      </div>
    </div>
  );
};

/* ── Siri visual ── */
const SiriVisual = () => {
  const typed = useTypewriter(siriCommands);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-zinc-50 rounded-[2.5rem] overflow-hidden">
      <div className="flex flex-col items-center gap-6 px-8">
        {/* Siri waveform */}
        <div className="flex items-end gap-1">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [8, 20 + Math.random() * 16, 8] }}
              transition={{ repeat: Infinity, duration: 1 + Math.random() * 0.5, delay: i * 0.08 }}
              className="w-1 rounded-full bg-gradient-to-t from-cairn-forest to-cairn-moss"
            />
          ))}
        </div>

        {/* Command display */}
        <div className="bg-white border border-zinc-200 rounded-2xl px-5 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] max-w-[280px] w-full">
          <p className="text-sm text-zinc-950 font-medium min-h-[1.25rem]">
            &ldquo;{typed}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
              className="inline-block w-[2px] h-[14px] bg-cairn-forest ml-0.5 align-text-bottom"
            />
            &rdquo;
          </p>
        </div>

        <p className="text-xs text-zinc-500 font-mono">
          10 voice commands
        </p>
      </div>
    </div>
  );
};

/* ── Widgets visual ── */
const WidgetsVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center bg-zinc-50 rounded-[2.5rem] overflow-hidden p-6">
    <div className="grid grid-cols-4 gap-3 w-full max-w-[300px]">
      {/* Small widget */}
      <motion.div
        whileHover={{ scale: 0.95 }}
        transition={spring}
        className="col-span-2 row-span-2 aspect-square rounded-3xl bg-cairn-forest/10 border border-cairn-forest/20 flex flex-col items-center justify-center gap-2 p-3"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2A6238" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 22h20L12 2z" />
        </svg>
        <span className="text-cairn-forest text-xs font-bold">1,247 ft</span>
        <span className="text-cairn-forest/60 text-[9px] font-mono">ELEVATION</span>
      </motion.div>

      {/* Two small squares */}
      <motion.div
        whileHover={{ scale: 0.95 }}
        transition={spring}
        className="col-span-2 aspect-square rounded-3xl bg-cairn-trail/10 border border-cairn-trail/20 flex flex-col items-center justify-center gap-1 p-3"
      >
        <span className="text-cairn-trail text-sm font-bold">4.2</span>
        <span className="text-cairn-trail/60 text-[9px] font-mono">MILES</span>
      </motion.div>
      <motion.div
        whileHover={{ scale: 0.95 }}
        transition={spring}
        className="col-span-2 aspect-square rounded-3xl bg-cairn-sky/10 border border-cairn-sky/20 flex flex-col items-center justify-center gap-1 p-3"
      >
        <span className="text-cairn-sky text-sm font-bold">2:14</span>
        <span className="text-cairn-sky/60 text-[9px] font-mono">HOURS</span>
      </motion.div>

      {/* Medium widget (wide) */}
      <motion.div
        whileHover={{ scale: 0.97 }}
        transition={spring}
        className="col-span-4 h-16 rounded-3xl bg-cairn-moss/10 border border-cairn-moss/20 flex items-center justify-between px-5"
      >
        <div>
          <p className="text-cairn-moss text-xs font-bold">Next Hike</p>
          <p className="text-cairn-moss/60 text-[9px] font-mono">Appalachian Trail — Sat</p>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B9148" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.div>
    </div>
  </div>
);

/* ── Spotlight visual ── */
const SpotlightVisual = () => {
  const results = [
    { name: 'Hawk Mountain Trail', distance: '3.2 mi', type: 'Moderate' },
    { name: 'Blue Ridge Summit', distance: '7.8 mi', type: 'Difficult' },
    { name: 'Pinnacle Overlook', distance: '4.1 mi', type: 'Easy' },
  ];

  return (
    <div className="relative w-full h-full flex items-start justify-center bg-zinc-50 rounded-[2.5rem] overflow-hidden pt-12 px-6">
      <div className="w-full max-w-[300px]">
        {/* Search bar */}
        <div className="bg-white border border-zinc-200 rounded-2xl px-4 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex items-center gap-3 mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-sm text-zinc-400">Search trails...</span>
        </div>

        {/* Results */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden divide-y divide-zinc-100">
          <div className="px-4 py-2">
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Cairn — Trails</p>
          </div>
          {results.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...spring, delay: 0.5 + i * 0.15 }}
              className="px-4 py-3 flex items-center justify-between hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cairn-forest/10 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2A6238" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 22h20L12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-950">{r.name}</p>
                  <p className="text-[10px] text-zinc-400 font-mono">{r.distance}</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-cairn-forest bg-cairn-forest/10 px-2 py-0.5 rounded-full">
                {r.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Zig-zag feature data ── */
const features = [
  {
    title: 'Live Activities & Dynamic Island',
    description: 'Your hike stays visible across the lock screen and Dynamic Island. See distance, elevation, and pace without ever opening the app.',
    Visual: DynamicIslandVisual,
  },
  {
    title: 'Siri & App Intents',
    description: 'Control Cairn hands-free with 10 built-in voice commands. Start recording, find nearby trails, or check your stats — all without touching a screen.',
    Visual: SiriVisual,
  },
  {
    title: 'Home & Lock Screen Widgets',
    description: 'Pin your stats, upcoming hikes, and trail progress right on your home screen. Small, medium, and large sizes — all customizable.',
    Visual: WidgetsVisual,
  },
  {
    title: 'Spotlight Search',
    description: 'Your saved trails, waypoints, and recent hikes surface in Spotlight. Find anything in Cairn without even opening the app.',
    Visual: SpotlightVisual,
  },
];

/* ── Main Component ── */
export const SystemIntegration = () => {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Section header */}
      <div className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={spring}
          className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-950 mb-4"
        >
          Deeply integrated.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...spring, delay: 0.1 }}
          className="text-lg text-zinc-600 max-w-[56ch]"
        >
          Cairn lives across your entire device — lock screen, Siri, Spotlight, widgets.
        </motion.p>
      </div>

      {/* Zig-zag layout */}
      <div className="flex flex-col gap-24">
        {features.map((feature, i) => {
          const isReversed = i % 2 === 1;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...spring, delay: 0.1 }}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${isReversed ? 'md:direction-rtl' : ''}`}
            >
              {/* Text side */}
              <div className={`col-span-1 md:col-span-5 flex flex-col gap-4 ${isReversed ? 'md:order-2 md:direction-ltr' : 'md:order-1'}`}>
                <span className="text-xs font-mono text-cairn-forest font-semibold uppercase tracking-wider">
                  0{i + 1}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-950">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed max-w-[42ch]">
                  {feature.description}
                </p>
              </div>

              {/* Visual side */}
              <div className={`col-span-1 md:col-span-7 ${isReversed ? 'md:order-1 md:direction-ltr' : 'md:order-2'}`}>
                <motion.div
                  whileHover={{ scale: 0.98 }}
                  transition={spring}
                  className="w-full h-[340px] md:h-[400px] bg-white rounded-[2.5rem] border border-zinc-200/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer"
                >
                  <feature.Visual />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
