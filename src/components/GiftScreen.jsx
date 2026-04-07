import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';


const GiftScreen = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Track window resize for confetti without needing an extra library
  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOpenGift = () => {
    setIsOpen(true);
    setTimeout(() => {
      onNext();
    }, 4000); // Wait 4 seconds after opening before transitioning
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      {isOpen && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height}
          colors={['#fbcfe8', '#e879f9', '#c084fc', '#818cf8', '#fcd34d', '#fef08a']} // Custom colors based on Borahae+Gold
          recycle={true}
          numberOfPieces={400}
        />
      )}

      <div className="flex flex-col items-center mb-6">
        <img src="/aashni.png" alt="Aashni" className="h-32 md:h-40 w-auto object-contain mb-4 drop-shadow-lg" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-md text-center px-4">
          You unlocked it! Tap the gift for your reward.
        </h1>
      </div>

      <div className="relative mb-12">
        <motion.button
           onClick={!isOpen ? handleOpenGift : undefined}
           animate={isOpen ? { scale: [1, 1.2, 0], rotate: [0, -10, 10, -10, 10, 0] } : { scale: 1, y: [0, -15, 0] }}
           transition={isOpen ? { duration: 0.6 } : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
           className={`text-[12rem] md:text-[15rem] origin-bottom drop-shadow-2xl focus:outline-none ${!isOpen ? 'hover:scale-110 active:scale-95 transition-transform cursor-pointer' : 'cursor-default'}`}
        >
          {isOpen ? "✨" : "🎁"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GiftScreen;
