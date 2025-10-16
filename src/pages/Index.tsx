import { useState } from "react";
import IdleScreen from "@/components/screens/IdleScreen";
import InvitationScreen from "@/components/screens/InvitationScreen";
import KineticSurvey from "@/components/screens/KineticSurvey";
import SynthesisScreen from "@/components/screens/SynthesisScreen";
import RevealScreen from "@/components/screens/RevealScreen";
import CollectionScreen from "@/components/screens/CollectionScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";

export type StylePreferences = {
  bold: boolean;
  classic: boolean;
  minimal: boolean;
  organic: boolean;
};

const Index = () => {
  const [screen, setScreen] = useState<number>(0);
  const [stylePreferences, setStylePreferences] = useState<StylePreferences>({
    bold: false,
    classic: false,
    minimal: false,
    organic: false,
  });
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleProximity = () => setScreen(1);
  
  const handleStyleComplete = (preferences: StylePreferences) => {
    setStylePreferences(preferences);
    setScreen(3);
  };

  const handleSynthesisComplete = () => setScreen(4);
  
  const handleExploreCollection = () => setScreen(5);
  
  const handleViewProfile = (selectedFavorites: string[]) => {
    setFavorites(selectedFavorites);
    setScreen(6);
  };
  
  const handleRestart = () => {
    setScreen(0);
    setStylePreferences({ bold: false, classic: false, minimal: false, organic: false });
    setFavorites([]);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {screen === 0 && <IdleScreen onProximity={handleProximity} />}
      {screen === 1 && <InvitationScreen onContinue={() => setScreen(2)} />}
      {screen === 2 && <KineticSurvey onComplete={handleStyleComplete} />}
      {screen === 3 && <SynthesisScreen onComplete={handleSynthesisComplete} />}
      {screen === 4 && <RevealScreen stylePreferences={stylePreferences} onContinue={handleExploreCollection} />}
      {screen === 5 && <CollectionScreen stylePreferences={stylePreferences} onComplete={handleViewProfile} />}
      {screen === 6 && <ProfileScreen stylePreferences={stylePreferences} favorites={favorites} onRestart={handleRestart} />}
    </div>
  );
};

export default Index;
