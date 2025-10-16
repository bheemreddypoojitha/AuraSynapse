import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { motion, useMotionValue, useTransform, type Variants } from 'framer-motion';

// Define the props our component will accept
interface InvitationScreenProps {
  onContinue: () => void;
}

// --- ANIMATION DEFINITIONS ---
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1 },
  }),
};

const rotatingGraphicVariant: Variants = {
  hidden: { opacity: 0, rotate: 0 },
  visible: {
    opacity: 1,
    rotate: -360,
    transition: {
      opacity: { duration: 0.8, delay: 0.6 },
      rotate: { ease: "linear", duration: 30, repeat: Infinity }
    },
  },
};

const InvitationScreen: FC<InvitationScreenProps> = ({ onContinue }) => {
  // --- 3D MOUSE PARALLAX LOGIC ---
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  const bgParallaxX = useTransform(mouseX, [0, windowSize.width], [15, -15]);
  const bgParallaxY = useTransform(mouseY, [0, windowSize.height], [15, -15]);
  
  const fgParallaxX = useTransform(mouseX, [0, windowSize.width], [-20, 20]);
  const fgParallaxY = useTransform(mouseY, [0, windowSize.height], [-20, 20]);
  const fgSlightParallaxX = useTransform(mouseX, [0, windowSize.width], [-10, 10]);
  const fgSlightParallaxY = useTransform(mouseY, [0, windowSize.height], [-10, 10]);

  return (
    <motion.div 
      className="container" 
      onClick={onContinue}
      onMouseMove={handleMouseMove}
    >
      <div className="top-bar flex justify-center items-center gap-2 text-center">
  Handcrafted Perfection | Free Worldwide Shipping
</div>


      <main className="main-content">
        <div className="grid-layout">
          
          <motion.div className="grid-item item-headline" style={{ x: bgParallaxX, y: bgParallaxY }}>
            <h1>AURA</h1>
          </motion.div>

          <motion.div className="grid-item item-model-image" variants={fadeIn} initial="hidden" animate="visible" custom={2} style={{ x: fgSlightParallaxX, y: fgSlightParallaxY }}>
            <img src="https://images.unsplash.com/photo-1625503339883-6ddd78909177?q=80&w=687" alt="Model wearing an elegant necklace" />
          </motion.div>

          <motion.div className="grid-item item-about-us" variants={fadeIn} initial="hidden" animate="visible" custom={3}>
            <h2>ABOUT US</h2>
            <p>Timeless pieces, crafted with intention. We believe in beauty that lasts beyond a single season. Discover our story.</p>
          </motion.div>
          
          {/* This is the original framed sticker */}
          <motion.div className="grid-item item-ring-image sticker" variants={fadeIn} initial="hidden" animate="visible" custom={4} style={{ x: fgParallaxX, y: fgParallaxY }}>
            <img src="https://images.unsplash.com/photo-1589674668791-4889d2bba4c6?q=80&w=2070" alt="Close-up of a diamond ring" />
          </motion.div>

          <motion.div className="grid-item item-cutout-ring-sticker sticker-cutout" variants={fadeIn} initial="hidden" animate="visible" custom={4} style={{ x: fgParallaxX, y: fgParallaxY }}>
            <img src="/image1.png" alt="Close-up of a diamond ring" />
          </motion.div>

          <motion.div className="grid-item item-brand-name" variants={fadeIn} initial="hidden" animate="visible" custom={5}>
            <h3>ELARA <span>V</span></h3>
          </motion.div>

          <motion.div
            className="grid-item item-rotating-graphic"
            variants={rotatingGraphicVariant}
            initial="hidden"
            animate="visible"
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'invert(1)', width: '100%', height: '100%' }}>
              <path id="circlePath" fill="none" d="M10,50a40,40 0 1,0 80,0a40,40 0 1,0 -80,0" />
              <text fill="#fff" style={{ fontSize: '11px', fontFamily: 'sans-serif', letterSpacing: '4px' }}>
                <textPath href="#circlePath">HANDCRAFTED WITH PASSION • HANDCRAFTED WITH PASSION •</textPath>
              </text>
            </svg>
          </motion.div>

          <motion.div className="grid-item item-text-sticker sticker" variants={fadeIn} initial="hidden" animate="visible" custom={6} style={{ x: fgSlightParallaxX, y: fgSlightParallaxY }}>
            <p className="sticker-text">Limited Edition</p>
          </motion.div>

          <motion.div className="grid-item item-earring-sticker sticker" variants={fadeIn} initial="hidden" animate="visible" custom={7} style={{ x: fgParallaxX, y: fgParallaxY }}>
            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500" alt="Close up of a gold earring" />
          </motion.div>
        </div>
      </main>

      {/* --- ALL CSS STYLES ARE EMBEDDED HERE --- */}
      <style>{`
        .container {
          background-color: #1a1a1a;
          color: #f3f4f6;
          min-height: 100vh;
          font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          overflow: hidden;
          cursor: pointer;
        }
        .main-content {
          padding: 2rem;
          position: relative;
          height: calc(100vh - 40px);
          pointer-events: none;
        }
        .grid-layout {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(12, 1fr);
          gap: 1rem;
          width: 100%;
          height: 100%;
        }
        .grid-item {
          position: relative;
          will-change: transform;
        }
        .grid-item img, .grid-item svg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .sticker {
          padding: 0.75rem;
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4);
        }
        .sticker:hover {
          transform: scale(1.05);
        }
        .sticker img {
          border-radius: 0.25rem;
        }
        .sticker-text {
          color: #1a1a1a;
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
          font-size: 1.25rem;
        }

        /* NEW: Style for cut-out stickers with no background */
        .sticker-cutout {
          filter: drop-shadow(8px 8px 10px rgba(0,0,0,0.4));
        }
        .sticker-cutout img {
          object-fit: contain; /* Prevents image from being cropped */
        }


        /* --- POLISHED GRID PLACEMENT & LAYERING --- */
        .item-headline {
          grid-column: 1 / span 6;
          grid-row: 2 / span 4;
          display: flex; align-items: center; justify-content: center;
          z-index: 5;
        }
        .item-headline h1 { font-size: 10rem; font-weight: 800; color: white; mix-blend-mode: overlay; }
        
        .item-model-image {
          grid-column: 5 / span 4;
          grid-row: 3 / span 6;
          border-radius: 0.375rem; overflow: hidden;
          z-index: 10;
        }
        
        .item-about-us {
          grid-column: 8 / span 5;
          grid-row: 10 / span 3;
          display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-end; text-align: right;
          z-index: 20;
        }
        .item-about-us h2 { font-size: 5rem; font-weight: 700; }
        .item-about-us p { font-family: ui-sans-serif; font-size: 0.875rem; color: #9ca3af; max-width: 24rem; margin-top: 0.5rem; }
        
        /* This is the original framed sticker */
        .item-ring-image {
          grid-column: 10 / span 3;
          grid-row: 1 / span 4;
          transform: rotate(5deg);
          z-index: 30;
        }

        /* This is your image1.png, moved to a new empty place */
        .item-cutout-ring-sticker {
            grid-column: 1 / span 4;
            grid-row: 5 / span 4;
            transform: rotate(10deg);
            z-index: 28;
        }
        
        .item-brand-name {
          grid-column: 1 / span 5;
          grid-row: 10 / span 2;
          display: flex; align-items: center;
          z-index: 20;
        }
        .item-brand-name h3 { font-size: 6rem; font-weight: 700; color: #ca8a04; }
        .item-brand-name span { color: #4b5563; }
        
        .item-rotating-graphic {
          grid-column: 1 / span 4;
          grid-row: 6 / span 4;
          z-index: 15;
          opacity: 0.5; /* Made it more subtle */
        }

        .item-text-sticker {
          grid-column: 2 / span 3;
          grid-row: 1 / span 2;
          transform: rotate(-8deg);
          display: flex; align-items: center; justify-content: center;
          z-index: 25;
        }
        
        .item-earring-sticker {
          grid-column: 8 / span 3;
          grid-row: 6 / span 4;
          transform: rotate(3deg);
          z-index: 25;
        }
      `}</style>
    </motion.div>
  );
};

export default InvitationScreen;
