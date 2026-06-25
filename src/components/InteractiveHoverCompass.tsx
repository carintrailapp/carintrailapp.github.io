import React, { useState, useRef } from 'react';
import { useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion';

interface InteractiveHoverCompassProps {
  scale?: number;
}

// Watch-screen dimensions within the compass-animation frame (tweak to align overlay).
const BASE_WIDTH = 340;
const BASE_HEIGHT = 420;
const BASE_RADIUS = 85;

// --- Faithful geometry from the watch app's CompassDial (Canvas) ---
const C = 100;        // viewBox center
const R = 92;         // outer radius

// The route-ahead, plotted user-relative (bearing, distance) like the watch's
// glowing guidance line. Centered near straight-up so "rest" reads as on-route.
const ROUTE = Array.from({ length: 12 }, (_, i) => {
  const bearing = Math.sin(i / 3) * 38;          // degrees, meandering around 0
  const distance = i * 22;                        // meters
  const r = Math.min(distance / 250, 1) * R * 0.86;
  const a = (bearing * Math.PI) / 180;
  return { x: C + Math.sin(a) * r, y: C - Math.cos(a) * r };
});
const ROUTE_D = `M ${C} ${C} ` + ROUTE.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
const DEST = ROUTE[ROUTE.length - 1];

// 72 degree-ticks, major every 30 degrees.
const TICKS = Array.from({ length: 72 }, (_, i) => {
  const major = i % 6 === 0;
  const len = major ? 13 : 6;
  const a = (i * 5 * Math.PI) / 180;
  return {
    x1: C + Math.sin(a) * R,
    y1: C - Math.cos(a) * R,
    x2: C + Math.sin(a) * (R - len),
    y2: C - Math.cos(a) * (R - len),
    major,
  };
});

const CARDINALS: [string, number, string, number][] = [
  ['N', 0, '#FF453A', 1],
  ['E', 90, '#FFFFFF', 0.85],
  ['S', 180, '#FFFFFF', 0.85],
  ['W', 270, '#FFFFFF', 0.85],
];

const half = (20 * Math.PI) / 180;
const wr = R * 0.92;
const WEDGE_D =
  `M ${C} ${C} ` +
  `L ${(C + wr * Math.sin(-half)).toFixed(1)} ${(C - wr * Math.cos(-half)).toFixed(1)} ` +
  `L ${(C + wr * Math.sin(half)).toFixed(1)} ${(C - wr * Math.cos(half)).toFixed(1)} Z`;

export const InteractiveHoverCompass: React.FC<InteractiveHoverCompassProps> = ({ scale = 1 }) => {
  // Mouse X steers your heading; the dial (route + card) swings under the fixed marker.
  const heading = useMotionValue(0);
  const smooth = useSpring(heading, { damping: 18, stiffness: 120 });
  const dialRef = useRef<SVGGElement>(null);

  const [offRoute, setOffRoute] = useState(false);
  useMotionValueEvent(smooth, 'change', (v) => {
    setOffRoute(Math.abs(v) > 34);
    dialRef.current?.setAttribute('transform', `rotate(${v.toFixed(2)} ${C} ${C})`);
  });

  const glow = offRoute ? '#D99A2B' : '#5B9148';   // moss / amber
  const core = offRoute ? '#FFD98C' : '#6BFF8C';   // bright green / warm

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2); // -1..1
    heading.set(Math.max(-1, Math.min(1, nx)) * 70);
  };
  const handleMouseLeave = () => heading.set(0);

  const size = BASE_WIDTH * scale;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: BASE_WIDTH * scale, height: BASE_HEIGHT * scale, borderRadius: BASE_RADIUS * scale }}
      className="bg-black overflow-hidden relative flex items-center justify-center shadow-[inset_0_4px_30px_rgba(0,0,0,0.9)] pointer-events-auto"
    >
      {/* Fixed orange lubber marker (your heading), at the top of the dial */}
      <div
        className="absolute z-20"
        style={{ top: `calc(50% - ${size / 2}px + ${4 * scale}px)` }}
      >
        <svg width={14 * scale} height={9 * scale} viewBox="0 0 14 9" aria-hidden="true">
          <polygon points="7,9 0,0 14,0" fill="#D9763B" style={{ filter: 'drop-shadow(0 0 3px rgba(217,118,59,0.8))' }} />
        </svg>
      </div>

      {/* OFF ROUTE pill */}
      {offRoute && (
        <div
          className="absolute z-20 px-2 py-0.5 rounded-full bg-cairn-amber text-black font-bold tracking-wide"
          style={{ top: `calc(50% - ${size / 2}px + ${18 * scale}px)`, fontSize: 9 * scale }}
        >
          OFF ROUTE
        </div>
      )}

      <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
        {/* Concentric rings (fixed) */}
        {[1.0, 0.72, 0.44].map((f) => (
          <circle key={f} cx={C} cy={C} r={R * f} fill="none" stroke="#ffffff" strokeOpacity={f === 1 ? 0.12 : 0.07} strokeWidth={1} />
        ))}

        {/* Heading field-of-view wedge (fixed, points up) */}
        <defs>
          <linearGradient id="fov" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={glow} stopOpacity={0.16} />
            <stop offset="100%" stopColor={glow} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={WEDGE_D} fill="url(#fov)" />

        {/* Rotating dial: ticks, cardinals, route */}
        <g ref={dialRef} transform={`rotate(0 ${C} ${C})`}>
          {TICKS.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="#ffffff"
              strokeOpacity={t.major ? 0.6 : 0.26}
              strokeWidth={t.major ? 1.6 : 1}
            />
          ))}

          {CARDINALS.map(([label, deg, color, op]) => {
            const a = (deg * Math.PI) / 180;
            const r = R - 19;
            return (
              <text
                key={label}
                x={C + Math.sin(a) * r}
                y={C - Math.cos(a) * r}
                fill={color}
                fillOpacity={op}
                fontSize={12}
                fontWeight={800}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {label}
              </text>
            );
          })}

          {/* Glowing route-ahead line */}
          <path d={ROUTE_D} fill="none" stroke={glow} strokeOpacity={0.22} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
          <path d={ROUTE_D} fill="none" stroke={glow} strokeOpacity={0.45} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          <path
            d={ROUTE_D}
            fill="none"
            stroke={core}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `drop-shadow(0 0 4px ${core})` }}
          />
          <circle cx={DEST.x} cy={DEST.y} r={5} fill="#ffffff" />
        </g>

        {/* User position dot (fixed, center) */}
        <circle cx={C} cy={C} r={6} fill="#000000" />
        <circle cx={C} cy={C} r={5} fill="#ffffff" />
      </svg>
    </div>
  );
};
