import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';



const FinalMessageScreen = ({ onReset }) => {
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center text-center p-4 w-full h-full relative"
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height}
          colors={['#fff0bc', '#e3c283', '#a38ca4', '#ffffff', '#785b7a']}
          recycle={true}
          numberOfPieces={80}
          gravity={0.03}
          opacity={0.7}
        />
      </div>
      
      {/* Decorative background gifts (simulated via rotated emojis/elements) */}
      <div className="absolute font-sans text-9xl opacity-70 blur-[1px] transform -rotate-12 translate-x-32 -translate-y-32 z-0">
        🎁
      </div>
      <div className="absolute font-sans text-9xl opacity-70 blur-[1px] transform rotate-12 -translate-x-32 translate-y-32 z-0 scale-75">
        🎁
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 p-1 rounded-2xl bg-white/10 backdrop-blur-2xl shadow-[0_15px_50px_rgba(30,15,30,0.6)] border border-[#e3c283]/40 max-w-lg w-full mx-auto"
      >
        <div className="border border-[#e3c283]/30 rounded-xl px-8 py-10 flex flex-col items-center relative overflow-hidden">
          
          {/* Subtle warm glow inside card */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#e3c283]/10 to-transparent pointer-events-none rounded-xl"></div>
          
          <img src="/airang.png" alt="Airang" className="w-48 md:w-64 h-auto object-contain mb-8 drop-shadow-xl z-10" />
          
          <div className="text-xl text-[#fdfbf6] font-serif mb-8 leading-snug drop-shadow-md z-10 px-2 tracking-wide font-medium flex flex-col items-center">
            <span className="mb-2">Hope your day is as golden as the golden maknae himself. Keep shining brightly,</span>
            <img src="/aashni.png" alt="Aashni" className="h-16 md:h-20 w-auto object-contain drop-shadow-md mb-2 mt-4" />
            <span className="mb-6">💜🐰✨</span>

            <div className="text-base md:text-lg text-[#e1caa1] font-sans leading-relaxed tracking-normal max-w-sm mt-4 italic opacity-90 border-t border-[#e3c283]/30 pt-6">
              <p className="mb-3">"I just wanted to say thank you for being my best friend.</p>
              <p>For always showing up, even when you didn’t have to. For listening to my nonsense, understanding my silence, and standing by me through everything. Having you in my life is honestly one of the best things that’s ever happened to me."</p>
            </div>
          </div>
          
          <button 
            onClick={onReset}
            className="z-10 px-8 py-2.5 bg-gradient-to-b from-[#e1caa1] to-[#b39562] text-white/95 rounded-full font-sans font-bold shadow-lg border border-[#f5e4c0] hover:scale-105 transition-all active:scale-95 drop-shadow-xl text-shadow-sm flex items-center justify-center gap-2"
          >
            Play Again <span className="text-sm">🔄</span>
          </button>

          <p className="z-10 mt-6 text-[10px] text-[#e3c283]/80 italic font-serif tracking-width shadow-sm">
            *A birthday surprise for a special ARMY.*
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FinalMessageScreen;
