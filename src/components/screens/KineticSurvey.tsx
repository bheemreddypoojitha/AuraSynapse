import React, { useEffect, useRef, useState, FC } from 'react';
import styled, { keyframes } from 'styled-components';
import { gsap } from 'gsap';

// --- TYPE DEFINITIONS ---
export type StylePreferences = { /* ... */ };
type CornerId = "bold" | "classic" | "minimal" | "organic";
interface KineticSurveyProps {
  onComplete: (preferences: StylePreferences) => void;
  selectionGoal?: number;
}

// --- STYLED COMPONENTS ---

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  /* FIXED: New dark purplish background color */
  background-color: #12091f; 
  color: white;
  font-family: 'Cormorant Garamond', serif;
  overflow: hidden;
  position: relative;
`;

// Beautiful Animated Galaxy Background
const nebulaDrift = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg) scale(1.5); }
  100% { transform: translate(-50%, -50%) rotate(360deg) scale(1.5); }
`;
const starfieldMove = keyframes`
  from { background-position: 0 0; }
  to { background-position: 100% 100%; }
`;

const GalaxyBG = styled.div`
  position: absolute; inset: -100%; z-index: 1; opacity: 0.9;
  
  &::before {
    content: ''; position: absolute; top: 50%; left: 50%; width: 300vw; height: 300vh;
    background: 
      radial-gradient(circle at 30% 70%, rgba(47, 12, 62, 0.4) 0%, transparent 40%),
      radial-gradient(circle at 70% 30%, rgba(10, 44, 55, 0.3) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(255, 105, 180, 0.25) 0%, transparent 35%),
      radial-gradient(circle at 10% 90%, rgba(255, 215, 0, 0.2) 0%, transparent 30%);
    animation: ${nebulaDrift} 120s linear infinite;
    filter: blur(80px);
  }

  &::after {
    content: ''; position: absolute; inset: 0;
    background-image: 
      radial-gradient(1.5px 1.5px at 20% 80%, white, transparent),
      radial-gradient(2px 2px at 50% 50%, white, transparent),
      radial-gradient(1.5px 1.5px at 90% 90%, white, transparent);
    background-size: 300px 300px, 250px 250px, 200px 200px;
    opacity: 0.6;
    animation: ${keyframes`0%,100%{opacity:0.8} 50%{opacity:0.4}`} 5s infinite alternate, ${starfieldMove} 300s linear infinite;
  }
`;

// FIXED: Floating Gems instead of hexagons
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;
const twinkle = keyframes`
  0%, 100% { filter: brightness(1) drop-shadow(0 0 5px #fff); }
  50% { filter: brightness(1.5) drop-shadow(0 0 15px #fff); }
`;

const FloatingGem = styled.div`
  position: absolute;
  width: var(--size);
  height: var(--size);
  opacity: 0;
  z-index: 5;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, white, rgba(255, 215, 0, 0.5) 80%);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); /* Diamond shape */
    animation: 
      ${float} var(--duration) ease-in-out infinite,
      ${twinkle} 3s ease-in-out infinite alternate;
  }
`;


const UIOverlay = styled.div`
  position: absolute; 
  top: 6vh; /* FIXED: Moved up */
  left: 50%;
  transform: translateX(-50%); text-align: center;
  color: #e2d8f3; pointer-events: none; z-index: 100;
  opacity: 0;
`;

const Title = styled.h2`
  font-size: 3.5rem; margin: 0; letter-spacing: 0.18em;
  text-shadow: 0 0 25px rgba(255,255,255,0.4), 0 0 50px rgba(148,0,211,0.5);
`;

const Instruction = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem; margin-top: 1em; opacity: 0.8;
  letter-spacing: 0.05em;
  transition: opacity 0.5s;
`;

const SceneContainer = styled.div`
  position: absolute; inset: 0;
  display: flex; justify-content: center; align-items: center;
  perspective: 1500px;
  z-index: 10;
`;

const Gallery = styled.div`
  position: relative; width: 1px; height: 1px;
  transform-style: preserve-3d;
`;

const Hologram = styled.div`
  position: absolute;
  top: 0; left: 0; width: 280px; height: 350px;
  margin-left: -140px; margin-top: -175px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0));
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 15px; backdrop-filter: blur(8px);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  cursor: pointer; transform-origin: center center; opacity: 0;
  box-shadow: 0 0 20px 5px rgba(var(--style-color-rgb), 0);
  transition: box-shadow 0.4s ease-out, border-color 0.4s ease-out;
  
  &.selected {
    border-color: var(--style-color);
    box-shadow: 0 0 40px 10px rgba(var(--style-color-rgb), 0.5);
  }
`;

const HologramImage = styled.img`
  width: 85%; height: 60%; object-fit: cover;
  border-radius: 10px; opacity: 0.8;
`;

const HologramLabel = styled.p`
  margin-top: 20px; font-size: 1.8rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: white; text-shadow: 0 0 10px rgba(255,255,255,0.5);
`;

const HintText = styled.div`
  position: absolute; bottom: 5vh; left: 50%;
  transform: translateX(-50%); color: rgba(255, 255, 255, 0.6);
  font-family: 'Poppins', sans-serif; font-size: 0.95rem;
  letter-spacing: 0.05em; opacity: 0;
  pointer-events: none; z-index: 100;
  transition: opacity 0.8s ease-out;
  text-shadow: 0 0 5px rgba(0,0,0,0.5);
`;

// --- THE REACT COMPONENT ---
export const KineticSurvey: FC<KineticSurveyProps> = ({ onComplete, selectionGoal = 2 }) => {
  const [selectedStyles, setSelectedStyles] = useState<Set<CornerId>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const hologramRefs = useRef<HTMLDivElement[]>([]);
  const uiRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const gemRefs = useRef<HTMLDivElement[]>([]);

  const surveyOptions = [
    { name: 'bold', color: '#ff69b4', image: 'https://images.unsplash.com/photo-1627704442358-61c8e05c7bf4?w=500' },
    { name: 'classic', color: '#ffd700', image: 'https://images.unsplash.com/photo-1758551038941-a67e29026bff?w=500' },
    { name: 'minimal', color: '#add8e6', image: 'https://plus.unsplash.com/premium_vector-1736967617027-c9f55396949f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880' },
    { name: 'organic', color: '#98ff98', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const gallery = galleryRef.current;
      const holograms = hologramRefs.current;
      const gems = gemRefs.current;
      let isCarouselMode = false;

      const staggeredLayout = [
        { x: -450, y: 0, z: 150, rotationY: 25, scale: 1 },
        { x: -150, y: 0, z: -150, rotationY: 15, scale: 0.9 },
        { x: 150, y: 0, z: -150, rotationY: -15, scale: 0.9 },
        { x: 450, y: 0, z: 150, rotationY: -25, scale: 1 },
      ];

      const carouselRadius = 350;
      const carouselLayout = holograms.map((_, i) => ({
        x: Math.sin(i / holograms.length * Math.PI * 2) * carouselRadius,
        z: Math.cos(i / holograms.length * Math.PI * 2) * carouselRadius,
        rotationY: -(i / holograms.length * 360),
        scale: 1,
      }));

      gsap.set(holograms, { x: 0, y: 0, z: 0, scale: 0.5, opacity: 0 });
      gsap.set(gems, { opacity: 0, scale: 0 });

      gsap.to(uiRef.current, { opacity: 1, duration: 1, delay: 0.5 });

      const handleFirstMouseMove = () => {
        gsap.to(hintRef.current, { opacity: 1, duration: 1, delay: 0.5 });
        holograms.forEach((hologram, i) => {
          gsap.to(hologram, {
            ...staggeredLayout[i],
            opacity: 1,
            duration: 1.8,
            delay: 0.8 + i * 0.15,
            ease: 'power3.out',
          });
        });
        gsap.to(gems, {
            opacity: 0.7,
            scale: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            delay: 1
        });
        setJourneyStarted(true);
        window.removeEventListener('mousemove', handleFirstMouseMove);
      };
      window.addEventListener('mousemove', handleFirstMouseMove);

      let mouseMoveHandler = (e: MouseEvent) => {
        if (!journeyStarted || isComplete) return;
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        const carouselThreshold = 0.3;

        if (Math.abs(mouseX) > carouselThreshold && !isCarouselMode) {
          isCarouselMode = true;
          holograms.forEach((h, i) => gsap.to(h, { ...carouselLayout[i], duration: 0.8, ease: 'power3.inOut' }));
        } else if (Math.abs(mouseX) <= carouselThreshold && isCarouselMode) {
          isCarouselMode = false;
          holograms.forEach((h, i) => gsap.to(h, { ...staggeredLayout[i], duration: 0.8, ease: 'power3.inOut' }));
        }

        if (isCarouselMode) {
          gsap.to(gallery, { rotationY: -mouseX * 60, z: 0, rotationX: 0, duration: 1.5, ease: 'power2.out' });
        } else {
          gsap.to(gallery, {
            z: -mouseY * 200,
            rotationY: mouseX * 10,
            rotationX: -mouseY * 5,
            duration: 1.5,
            ease: 'power2.out'
          });
        }
      };
      window.addEventListener('mousemove', mouseMoveHandler);
      
      return () => {
        window.removeEventListener('mousemove', handleFirstMouseMove);
        window.removeEventListener('mousemove', mouseMoveHandler);
      };
    });
    return () => ctx.revert();
  }, [journeyStarted, isComplete]);
  
  const handleSelect = (id: CornerId) => {
    if (selectedStyles.has(id) || isComplete || selectedStyles.size >= selectionGoal) return;
    const newSelectionSet = new Set(selectedStyles);
    newSelectionSet.add(id);
    setSelectedStyles(newSelectionSet);
  };
  
  useEffect(() => {
    if (selectedStyles.size >= selectionGoal) {
      setIsComplete(true);
      gsap.to([hologramRefs.current, uiRef.current, hintRef.current, gemRefs.current], { 
        opacity: 0, 
        duration: 1.5, 
        ease: 'power2.inOut',
        onComplete: () => {
            const preferences = surveyOptions.reduce((acc, opt) => ({ ...acc, [opt.name]: selectedStyles.has(opt.name as CornerId) }), {});
            onComplete(preferences as StylePreferences);
        }
      });
    }
  }, [selectedStyles, selectionGoal, onComplete, surveyOptions]);

  const remaining = Math.max(0, selectionGoal - selectedStyles.size);

  return (
    <PageWrapper>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Poppins:wght@300&display=swap" rel="stylesheet" />
      <GalaxyBG />
      
      <FloatingGem ref={el => gemRefs.current[0] = el!} style={{ '--size': '20px', '--duration': '25s', top: '15%', left: '10%' } as React.CSSProperties} />
      <FloatingGem ref={el => gemRefs.current[1] = el!} style={{ '--size': '30px', '--duration': '35s', bottom: '20%', right: '15%' } as React.CSSProperties} />
      <FloatingGem ref={el => gemRefs.current[2] = el!} style={{ '--size': '15px', '--duration': '20s', top: '50%', right: '5%' } as React.CSSProperties} />
      <FloatingGem ref={el => gemRefs.current[3] = el!} style={{ '--size': '25px', '--duration': '30s', bottom: '10%', left: '30%' } as React.CSSProperties} />

      <UIOverlay ref={uiRef}>
        <Title>Discover Your Aura</Title>
        <Instruction>
            {isComplete ? 'Thank you for your journey!' : journeyStarted ? `Select ${remaining} more style${remaining > 1 ? 's':''}` : 'Move your cursor to begin'}
        </Instruction>
      </UIOverlay>
      
      <SceneContainer>
        <Gallery ref={galleryRef}>
          {surveyOptions.map((style, index) => (
            <Hologram 
              key={style.name} 
              ref={el => hologramRefs.current[index] = el!}
              className={selectedStyles.has(style.name as CornerId) ? 'selected' : ''}
              onClick={() => handleSelect(style.name as CornerId)}
              data-index={index}
              style={{ '--style-color-rgb': style.color.match(/\w\w/g)?.map(x => parseInt(x, 16)).join(','), '--style-color': style.color } as React.CSSProperties}
            >
              <HologramImage src={style.image} alt={style.name} />
              <HologramLabel>{style.name}</HologramLabel>
            </Hologram>
          ))}
        </Gallery>
      </SceneContainer>
      
      <HintText ref={hintRef}>
        Hint: Move mouse left/right to orbit
      </HintText>
    </PageWrapper>
  );
};

export default KineticSurvey;