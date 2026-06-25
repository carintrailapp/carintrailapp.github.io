import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { InteractiveHoverCompass } from './InteractiveHoverCompass';

const FRAME_COUNT = 192;

export const StickyCompassFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Track if we've handed off to the interactive compass
  const [isHandoffComplete, setIsHandoffComplete] = useState(false);
  
  // Track the dynamic scale of the video canvas to perfectly size the overlay
  const [watchScale, setWatchScale] = useState(1);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/compass%20animation/frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Map scroll progress based on the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map the 192 video frames to the first 75% of the scroll.
  // The last 25% of the scroll will just be a "dead zone" for playing with the compass.
  const frameIndex = useTransform(scrollYProgress, [0, 0.75], [0, FRAME_COUNT - 1]);
  // Canvas NEVER fades out. It stays frozen on the last frame to provide the watch body background.

  // Handle Handoff State
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.74 && !isHandoffComplete) {
      setIsHandoffComplete(true);
    } else if (latest < 0.74 && isHandoffComplete) {
      setIsHandoffComplete(false);
    }
  });

  // Text Animations (Split into 4 phases)
  // Phase 1: 0% to 25%
  const text1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.25], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.05, 0.25], [20, 0, -20]);

  // Phase 2: 25% to 50%
  const text2Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.25, 0.3, 0.5], [20, 0, -20]);

  // Phase 3: 50% to 75%
  const text3Opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.5, 0.55, 0.75], [20, 0, -20]);

  // Phase 4 (The Dead Zone): 75% to 100%
  const promptOpacity = useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1]);
  const promptY = useTransform(scrollYProgress, [0.75, 0.8, 1], [20, 0, 0]);

  // Canvas Drawing Logic
  const drawImageProp = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const iw = img.width;
    const ih = img.height;
    
    const baseScale = Math.max(w / iw, h / ih);
    const scale = baseScale * 1.25; // 25% zoom to crop AI borders
    
    // Save the scale to state so the interactive component can perfectly match it
    setWatchScale(scale);
    
    const nw = iw * scale;
    const nh = ih * scale;
    
    const offsetX = (w - nw) / 2;
    const offsetY = (h - nh) / 2;
    
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, iw, ih, offsetX, offsetY, nw, nh);
  }, []);

  const renderFrame = useCallback(() => {
    if (imagesLoaded < FRAME_COUNT || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // Get actual canvas DOM size
    const rect = canvas.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    
    const targetWidth = rect.width * dpr;
    const targetHeight = rect.height * dpr;

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    if (isHandoffComplete) return;

    const img = imagesRef.current[Math.floor(frameIndex.get())];
    if (img) {
      drawImageProp(ctx, img);
    }
  }, [imagesLoaded, frameIndex, drawImageProp, isHandoffComplete]);

  useEffect(() => {
    let animationFrameId: number;
    const renderLoop = () => {
      renderFrame();
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [renderFrame]);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-zinc-950">
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Features */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center p-8 md:p-24 relative z-10 bg-zinc-950">
          <div className="max-w-md relative w-full h-[200px]">
            
            {/* Feature 1 */}
            <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute inset-0">
              <h3 className="text-3xl font-bold text-white mb-4">Haptic Feedback</h3>
              <p className="text-lg text-zinc-400">
                Subtle wrist taps guide you left or right without ever needing to look at your screen. Keep your eyes on the trail.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute inset-0">
              <h3 className="text-3xl font-bold text-white mb-4">Heading Lock</h3>
              <p className="text-lg text-zinc-400">
                Lock your bearing and stay on course, even if the trail completely disappears into the snow or overgrowth.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute inset-0">
              <h3 className="text-3xl font-bold text-white mb-4">Off-grid Reliability</h3>
              <p className="text-lg text-zinc-400">
                Your compass and downloaded map data work flawlessly without cell service. Trust your wrist, not your signal.
              </p>
            </motion.div>
            
            {/* Interaction Prompt (Phase 4) */}
            <motion.div style={{ opacity: promptOpacity, y: promptY }} className="absolute inset-0 flex flex-col items-start justify-center">
              <h3 className="text-4xl font-bold text-white mb-6">Your turn.</h3>
              <div className="flex items-center gap-4 text-cairn-trail">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cairn-trail opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-cairn-trail"></span>
                </span>
                <span className="font-mono text-lg tracking-widest uppercase font-bold animate-pulse">
                  Hover to test physics
                </span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Right Side: The Compass Video / Interactive Handoff */}
        <div className="w-full md:w-1/2 h-full relative flex items-center justify-center bg-black/50">
          {imagesLoaded < FRAME_COUNT && (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
              <div className="text-zinc-500 font-mono text-sm">
                Loading Assets... {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
              </div>
            </div>
          )}

          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
          />

          <AnimatePresence>
            {isHandoffComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full z-30 flex items-center justify-center pointer-events-none"
              >
                {/* 
                  The overlay wrapper requires pointer-events-none so it doesn't block the screen,
                  but the interactive component inside will have pointer-events-auto.
                */}
                <InteractiveHoverCompass scale={watchScale} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
