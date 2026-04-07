import React from 'react';
import { motion } from 'framer-motion';

const LandingScreen = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center text-center p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 max-w-md w-full"
    >
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mb-8"
      >
        <img src="/aashni.png" alt="Aashni" className="h-32 md:h-48 w-auto object-contain drop-shadow-lg mx-auto" />
      </motion.div>
      <h1 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300 drop-shadow-sm flex flex-col items-center gap-2">
        <span>Ready for a birthday challenge?</span>
      </h1>
      <p className="text-purple-100 mb-8 max-w-sm">
        A special puzzle awaits you. Do you have what it takes?
      </p>
      
      <button 
        onClick={onNext}
        className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-purple-900 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-full hover:scale-105 transition-transform duration-200 shadow-[0_0_20px_rgba(216,180,254,0.5)] active:scale-95"
      >
        <span className="absolute w-full h-full rounded-full animate-ping bg-purple-400 opacity-20"></span>
        <span className="relative z-10 flex items-center gap-2">
          Start Game ✨
        </span>
      </button>
    </motion.div>
  );
};

export default LandingScreen;
