import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Delete, Sparkles } from 'lucide-react';

const TARGET_WORD = "JUNGKOOK";
const MAX_GUESSES = 6;
const WORD_LENGTH = TARGET_WORD.length;

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

const GameScreen = ({ onNext }) => {
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(""));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing', 'won', 'lost'
  const [showHint, setShowHint] = useState(false);
  const [invalidShake, setInvalidShake] = useState(false);

  const handleKeyPress = useCallback((key) => {
    if (gameStatus !== "playing") return;

    if (key === "ENTER") {
      if (currentGuess.length !== WORD_LENGTH) {
        setInvalidShake(true);
        setTimeout(() => setInvalidShake(false), 500);
        return;
      }
      
      const newGuesses = [...guesses];
      newGuesses[currentGuessIndex] = currentGuess;
      setGuesses(newGuesses);
      
      if (currentGuess === TARGET_WORD) {
        setGameStatus("won");
        setTimeout(() => onNext(), 1500);
      } else if (currentGuessIndex + 1 >= MAX_GUESSES) {
        setGameStatus("lost");
        setTimeout(() => onNext(), 3000); // 3 seconds to read failure message
      } else {
        setCurrentGuessIndex(currentGuessIndex + 1);
        setCurrentGuess("");
      }
    } else if (key === "BACKSPACE" || key === "DELETE") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key)) {
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  }, [currentGuess, currentGuessIndex, gameStatus, guesses, onNext]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let key = e.key.toUpperCase();
      if (key === "BACKSPACE" || key === "ENTER" || /^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  // Compute letter statuses for the keyboard
  const getKeyStatuses = () => {
    const statuses = {};
    guesses.slice(0, currentGuessIndex).forEach(guess => {
      for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = guess[i];
        if (TARGET_WORD[i] === letter) {
          statuses[letter] = "correct";
        } else if (TARGET_WORD.includes(letter) && statuses[letter] !== "correct") {
          statuses[letter] = "present";
        } else if (!statuses[letter]) {
          statuses[letter] = "absent";
        }
      }
    });
    return statuses;
  };

  const keyStatuses = getKeyStatuses();

  const getTileStatusClass = (letter, index, guess, isCurrentRow) => {
    if (isCurrentRow || !guess) return "bg-white/5 border-white/20";
    if (TARGET_WORD[index] === letter) return "bg-emerald-500 border-emerald-500 text-white";
    if (TARGET_WORD.includes(letter)) return "bg-yellow-500 border-yellow-500 text-white";
    return "bg-slate-700 border-slate-700 text-slate-300";
  };

  const getKeyClass = (key) => {
    const status = keyStatuses[key];
    const baseClass = "m-0.5 rounded flex items-center justify-center font-bold font-sans cursor-pointer select-none transition-colors ";
    const sizeClass = (key === "ENTER" || key === "BACKSPACE") ? "px-2 py-3 text-xs sm:px-3 sm:py-4" : "w-[28px] h-[44px] text-sm sm:w-[36px] sm:h-[52px] sm:text-base";
    
    if (status === "correct") return baseClass + sizeClass + " bg-emerald-500 text-white hover:bg-emerald-400";
    if (status === "present") return baseClass + sizeClass + " bg-yellow-500 text-white hover:bg-yellow-400";
    if (status === "absent") return baseClass + sizeClass + " bg-slate-700 text-white hover:bg-slate-600";
    return baseClass + sizeClass + " bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm";
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-full max-w-lg mx-auto"
    >
      {/* Aashni image floats above the box */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mb-4"
      >
        <img src="aashni.png" alt="Aashni" className="h-20 md:h-28 w-auto object-contain drop-shadow-lg mx-auto" />
      </motion.div>

      {/* Blurred glass box containing all game elements */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 w-full p-4 sm:p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-pink-200 mb-4">Guess the Word ✨</h2>

        <div className="flex flex-col gap-1 w-full max-w-[320px] sm:max-w-sm mb-6 p-2 mx-auto">
          {guesses.map((guess, i) => {
            const isCurrentRow = i === currentGuessIndex;
            const displayGuess = isCurrentRow ? currentGuess.padEnd(WORD_LENGTH, " ") : guess.padEnd(WORD_LENGTH, " ");
            
            return (
              <motion.div 
                key={i} 
                className={`grid grid-cols-8 gap-1 w-full`}
                animate={isCurrentRow && invalidShake ? { x: [-5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {displayGuess.split('').map((letter, j) => (
                  <div 
                    key={j}
                    className={`flex items-center justify-center border-2 rounded ${getTileStatusClass(letter, j, guess, isCurrentRow)} font-bold text-lg sm:text-xl aspect-square uppercase transition-colors duration-500`}
                  >
                    {letter.trim()}
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-center w-full max-w-sm mb-4 pb-2">
          {KEYBOARD_ROWS.map((row, i) => (
            <div key={i} className="flex justify-center w-full mb-1">
              {row.map((key) => (
                <button 
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={getKeyClass(key)}
                >
                  {key === "BACKSPACE" ? <Delete size={18} /> : key}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center min-h-[60px] flex flex-col items-center justify-center">
          {gameStatus === "playing" ? (
            <>
              <button 
                onClick={() => setShowHint(true)}
                className="text-pink-300 hover:text-pink-200 text-sm flex items-center gap-1 transition-colors underline underline-offset-2 mb-2"
              >
                <Sparkles size={14} /> Get a Hint ✨
              </button>
              {showHint && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-purple-200 font-medium"
                >
                  Hint: The Golden Maknae!
                </motion.p>
              )}
            </>
          ) : gameStatus === "won" ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-emerald-400 font-bold text-xl drop-shadow-md"
            >
              Splendid! You guessed it! 💜
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-pink-300 font-bold text-lg drop-shadow-md max-w-xs text-center"
            >
              Nice try! But it's your birthday, so you win anyway! 🎉
            </motion.div>
          )}
        </div>
      </div>

    </motion.div>
  );
};

export default GameScreen;
