import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import GameScreen from './components/GameScreen';
import GiftScreen from './components/GiftScreen';
import FinalMessageScreen from './components/FinalMessageScreen';
import Ballpit from './components/Ballpit';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  // Screens: 'landing', 'game', 'gift', 'final'

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onNext={() => setCurrentScreen('game')} />;
      case 'game':
        return <GameScreen onNext={() => setCurrentScreen('gift')} />;
      case 'gift':
        return <GiftScreen onNext={() => setCurrentScreen('final')} />;
      case 'final':
        return <FinalMessageScreen onReset={() => setCurrentScreen('landing')} />;
      default:
        return <LandingScreen onNext={() => setCurrentScreen('game')} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#3b2b40] via-[#785b7a] to-[#48304d] text-white font-sans overflow-hidden flex flex-col relative">
      {/* Decorative Star Particles Optional */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c4a9c6]/20 via-transparent to-transparent"></div>

      {/* Interactive Ballpit Background */}
      <div className="absolute inset-0 z-0 text-white" style={{ width: '100%', height: '100%' }}>
        <Ballpit
          count={300}
          gravity={0}
          friction={1}
          wallBounce={0.95}
          followCursor={false}
          colors={["#5227FF","#7cff67","#ff6b6b","#c10bf4"]}
        />
      </div>

      <main className="flex-1 w-full flex items-center justify-center relative z-10 p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-lg flex items-center justify-center flex-col">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
}

export default App;
