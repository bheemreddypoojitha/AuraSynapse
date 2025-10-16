import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { StylePreferences } from "@/pages/Index";

interface RevealScreenProps {
  stylePreferences: StylePreferences;
  onContinue: () => void;
}

// Sample jewelry images (replace with your own)
const jewelryImages = [
  "https://images.unsplash.com/photo-1721103418218-416182aca079?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
  "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=500",
];

const RevealScreen = ({ stylePreferences, onContinue }: RevealScreenProps) => {
  const [showContent, setShowContent] = useState(false);

  const getArchetype = () => {
    if (stylePreferences.bold && stylePreferences.minimal) return "The Modern Edge";
    if (stylePreferences.bold && stylePreferences.organic) return "The Bold Bohemian";
    if (stylePreferences.classic && stylePreferences.minimal) return "The Timeless Minimalist";
    if (stylePreferences.classic && stylePreferences.organic) return "The Romantic Naturalist";
    if (stylePreferences.minimal && stylePreferences.organic) return "The Zen Purist";
    return "The Eclectic Visionary";
  };

  const getCelebConstellation = () => {
    if (stylePreferences.bold) return "70% Zendaya • 30% Rihanna";
    if (stylePreferences.classic) return "65% Audrey Hepburn • 35% Grace Kelly";
    if (stylePreferences.minimal) return "75% Phoebe Philo • 25% Gwyneth Paltrow";
    if (stylePreferences.organic) return "60% Florence Welch • 30% Sienna Miller";
    return "50% Iris Apfel • 50% Tilda Swinton";
  };

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background flex items-center justify-center">
      {/* ✨ Background Aura Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--aura-glow))]/25 via-[hsl(var(--aura-shimmer))]/20 to-background blur-3xl" />

      {/* ✨ Soft Animated Blobs */}
      <motion.div
        className="absolute -top-32 -left-40 w-[40rem] h-[40rem] rounded-full bg-[hsl(var(--concept-bold))]/20 blur-3xl"
        animate={{ x: [0, 40, -40, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[35rem] h-[35rem] rounded-full bg-[hsl(var(--aura-shimmer))]/20 blur-3xl"
        animate={{ x: [0, -50, 30, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      {/* ✨ Content Reveal */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 w-full max-w-6xl px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-16"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* 🧬 Left Section: Text */}
            <div className="flex-1 space-y-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/60 font-light">
                  Your Style Archetype
                </p>
                <h1 className="text-5xl md:text-6xl font-light leading-tight text-foreground animate-chromatic">
                  {getArchetype()}
                </h1>
              </div>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/60 font-light">
                  Celebrity Constellation
                </p>
                <p className="text-2xl font-light text-foreground/80">{getCelebConstellation()}</p>
              </div>

              <div className="pt-8">
                <Button
                  onClick={onContinue}
                  className="bg-gradient-to-r from-[hsl(var(--aura-glow))] to-[hsl(var(--aura-shimmer))] text-background px-10 py-6 text-lg hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--aura-glow))] transition-all duration-300"
                >
                  Explore Your Collection
                </Button>
              </div>
            </div>

            {/* 🎨 Right Section: Moodboard Card */}
            <motion.div
              className="flex-1 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            >
              <div className="relative w-full max-w-md aspect-[3/4]">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-card to-muted/80 backdrop-blur-2xl border border-primary/30 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 flex flex-col p-6 gap-4">
                    {/* Replace gradients with actual images */}
                    <div className="flex-1 rounded-2xl overflow-hidden">
                      <img
                        src={jewelryImages[0]}
                        alt="Moodboard Top"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 aspect-square rounded-2xl overflow-hidden">
                        <img
                          src={jewelryImages[1]}
                          alt="Moodboard Left"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 aspect-square rounded-2xl overflow-hidden">
                        <img
                          src={jewelryImages[2]}
                          alt="Moodboard Right"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--aura-glow))]/15 to-transparent" />
                </div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-card/80 backdrop-blur-xl rounded-full border border-primary/30 shadow-sm">
                  <span className="text-xs tracking-widest uppercase text-foreground/60">
                    Your Aura Moodboard
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RevealScreen;
