import { useEffect, useState } from "react";
import { Sparkles, Gem, Diamond } from "lucide-react";

interface IdleScreenProps {
  onProximity: () => void;
}

const IdleScreen = ({ onProximity }: IdleScreenProps) => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Simulate proximity detection after 2 seconds
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      onClick={onProximity}
    >
      {/* Liquid Chrome Ripple Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-card">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-[hsl(var(--aura-glow))] to-[hsl(var(--aura-shimmer))] blur-3xl animate-ripple" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[hsl(var(--aura-shimmer))] to-[hsl(var(--aura-glow))] blur-3xl animate-ripple" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl animate-ripple" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      {/* Mirror Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[hsl(var(--aura-glow))]/40" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[hsl(var(--aura-glow))]/40" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[hsl(var(--aura-glow))]/40" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[hsl(var(--aura-glow))]/40" />

      {/* Floating Geometric Elements */}
      <div className="absolute top-1/4 left-1/4 animate-float opacity-20">
        <Diamond className="w-12 h-12 text-[hsl(var(--aura-shimmer))]" strokeWidth={1} />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float opacity-30" style={{ animationDelay: "1s" }}>
        <Gem className="w-16 h-16 text-[hsl(var(--aura-glow))]" strokeWidth={1} />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float opacity-25" style={{ animationDelay: "2s" }}>
        <Sparkles className="w-10 h-10 text-primary" strokeWidth={1} />
      </div>
      <div className="absolute bottom-1/4 right-1/3 animate-float opacity-20" style={{ animationDelay: "1.5s" }}>
        <Diamond className="w-14 h-14 text-[hsl(var(--aura-shimmer))]" strokeWidth={1} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 animate-in fade-in duration-1500">
        {/* Main Title with Animated Gradient */}
        <div className="relative">
          <h1 className="text-9xl font-bold tracking-wider relative">
            <span 
              className="bg-gradient-to-r from-[hsl(280_60%_60%)] via-[hsl(320_90%_60%)] to-[hsl(180_100%_70%)] bg-clip-text text-transparent animate-shimmer"
              style={{
                backgroundSize: "200% 100%",
                animation: "shimmer 4s linear infinite",
              }}
            >
              AURA
            </span>
          </h1>
          {/* Crystal effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--aura-glow))]/10 to-transparent blur-xl" />
        </div>

        {/* Subtitle with Decorative Lines */}
        <div className="flex items-center justify-center gap-6">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[hsl(var(--aura-glow))]/60" />
          <h2 className="text-2xl tracking-[0.5em] font-light text-foreground/80">
            SYNAPSE MIRROR
          </h2>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[hsl(var(--aura-glow))]/60" />
        </div>

        {/* Tagline */}
        <p className="text-lg tracking-[0.3em] text-foreground/60 font-light">
          Discover Your Style DNA
        </p>
      </div>

      {/* Approach Prompt */}
      {showPrompt && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--aura-glow))] animate-glow-pulse" />
            <div className="text-foreground/60 text-sm tracking-[0.3em] uppercase font-light">
              Approach to begin
            </div>
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--aura-glow))] animate-glow-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      )}

      {/* Additional Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[hsl(var(--aura-shimmer))] opacity-40 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default IdleScreen;
