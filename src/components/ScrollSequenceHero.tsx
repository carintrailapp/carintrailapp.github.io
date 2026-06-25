import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Watch } from '@phosphor-icons/react';

const FRAME_COUNT = 192;

export const ScrollSequenceHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      // Reading from the high-quality FFmpeg extraction
      img.src = `/intro scroll animation/frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Object-cover equivalent for Canvas
  const drawImageProp = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const iw = img.width;
    const ih = img.height;
    
    // Use Math.max to ensure the image scales to completely fill the canvas
    // We multiply by 1.2 to "zoom in" by 20%, pushing any baked-in black borders off the screen
    const baseScale = Math.max(w / iw, h / ih);
    const scale = baseScale * 1.20;
    
    const nw = iw * scale;
    const nh = ih * scale;
    
    // Calculate offsets to center the image
    const offsetX = (w - nw) / 2;
    const offsetY = (h - nh) / 2;
    
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, iw, ih, offsetX, offsetY, nw, nh);
  }, []);

  // Render the current frame to the canvas
  const renderFrame = useCallback((index: number) => {
    if (images.length === 0 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ensure canvas dimensions match screen, accounting for high-DPI (Retina) displays!
    const dpr = window.devicePixelRatio || 1;
    const targetWidth = window.innerWidth * dpr;
    const targetHeight = window.innerHeight * dpr;

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const img = images[Math.floor(index)];
    if (img && img.complete) {
      drawImageProp(ctx, img);
    }
  }, [images, drawImageProp]);

  // Listen to frame changes via Framer Motion
  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(latest);
  });

  // Handle resize events to redraw
  useEffect(() => {
    const handleResize = () => {
      renderFrame(frameIndex.get());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame, frameIndex]);

  // Initial draw once first image loads
  useEffect(() => {
    if (imagesLoaded > 0) {
      renderFrame(0);
    }
  }, [imagesLoaded, renderFrame]);

  // Hero Text Animation Transforms
  // Fade out hero text quickly during the first 15% of the scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  return (
    // Height set to 400vh to give 4 screen heights of scrolling distance
    <section ref={containerRef} className="relative h-[400vh] w-full bg-zinc-950">
      
      {/* Sticky Container holds the Canvas and the Hero UI */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* The Sequence Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Scrim for legible white text over the photographic frames */}
        <div className="absolute inset-0 z-[5] bg-gradient-to-r from-zinc-950/70 via-zinc-950/30 to-transparent pointer-events-none" />

        {/* Loading Overlay */}
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white font-mono text-sm">
            <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-cairn-forest transition-all duration-300"
                style={{ width: `${(imagesLoaded / FRAME_COUNT) * 100}%` }}
              />
            </div>
            Loading {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
          </div>
        )}

        {/* Hero Text Overlay */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 z-10 flex flex-col justify-center px-4 md:px-8 max-w-7xl mx-auto pointer-events-none"
        >
          <div className="max-w-2xl pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-8 shadow-xl"
            >
              <Watch weight="bold" className="w-4 h-4" />
              iPhone and Apple Watch
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[1.05] text-white text-balance mb-6 drop-shadow-2xl"
            >
              Leave the path. <br />
              Find the trail.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed max-w-[45ch] mb-10 drop-shadow-md"
            >
              Record your hikes, follow them back, and share them, with topographic precision on your wrist and in your pocket.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-cairn-forest text-white font-semibold shadow-[0_8px_20px_-8px_rgba(27,64,34,0.6)] hover:bg-cairn-pine hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all">
                Get Early Access
              </button>
              <a href="#features" className="w-full sm:w-auto text-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 active:scale-95 transition-all">
                See features
              </a>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
