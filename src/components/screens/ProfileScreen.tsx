import { Button } from "@/components/ui/button";
import type { StylePreferences } from "@/pages/Index";

interface ProfileScreenProps {
  stylePreferences: StylePreferences;
  favorites: string[];
  onRestart: () => void;
}

const ProfileScreen = ({ stylePreferences, favorites, onRestart }: ProfileScreenProps) => {
  const getArchetype = () => {
    if (stylePreferences.bold && stylePreferences.minimal) return "The Modern Edge";
    if (stylePreferences.bold && stylePreferences.organic) return "The Bold Bohemian";
    if (stylePreferences.classic && stylePreferences.minimal) return "The Timeless Minimalist";
    if (stylePreferences.classic && stylePreferences.organic) return "The Romantic Naturalist";
    if (stylePreferences.minimal && stylePreferences.organic) return "The Zen Purist";
    return "The Eclectic Visionary";
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-background flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[hsl(var(--aura-glow))] to-[hsl(var(--aura-shimmer))] opacity-10 blur-3xl rounded-full animate-glow-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-12 text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="space-y-6">
          <h2 className="text-6xl font-light tracking-wider text-foreground animate-chromatic">
            Your Aura Profile
          </h2>
          <p className="text-foreground/60 text-sm tracking-[0.3em] uppercase">
            {getArchetype()}
          </p>
        </div>

        {/* QR Code Section */}
        <div className="relative mx-auto w-80 h-80 rounded-3xl bg-card/50 backdrop-blur-xl border border-primary/30 shadow-2xl flex items-center justify-center overflow-hidden group">
          {/* QR Code Placeholder */}
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 grid grid-cols-8 gap-1">
              {[...Array(64)].map((_, i) => (
                <div
                  key={i}
                  className={`${Math.random() > 0.5 ? "bg-foreground" : "bg-transparent"} rounded-sm transition-colors duration-300 group-hover:bg-[hsl(var(--aura-glow))]`}
                  style={{ transitionDelay: `${i * 10}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--aura-glow))]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="space-y-4">
          <p className="text-2xl font-light text-foreground">
            Scan to Keep Your Aura
          </p>
          <p className="text-foreground/60 text-sm">
            Your personalized moodboard, style archetype, and favorite pieces
          </p>
        </div>

        {/* Favorite Count */}
        <div className="inline-block px-6 py-3 rounded-full bg-card/50 backdrop-blur-xl border border-primary/30">
          <span className="text-foreground/60 text-sm tracking-widest uppercase">
            {favorites.length} Favorite Pieces Selected
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center pt-8">
          <Button
            onClick={onRestart}
            variant="secondary"
            className="px-8 py-6 text-lg"
          >
            Create Another Aura
          </Button>
          <Button
            className="bg-gradient-to-r from-[hsl(var(--aura-glow))] to-[hsl(var(--aura-shimmer))] text-background px-8 py-6 text-lg"
          >
            Visit Evol Jewels
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[hsl(var(--aura-shimmer))] opacity-40 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ProfileScreen;
