import { useState } from "preact/hooks";
import GameContext from "./GameContext";
import type React from "preact/compat";

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [correctWord, setCorrectWord] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [currentAttempt, setCurrentAttempt] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState<boolean | null>(null);
  const [attemptWords, setAttemptWords] = useState<string[][]>([]);
  const [message, setMessage] = useState<string>("");

  return (
    <GameContext.Provider
      value={{
        correctWord,
        setCorrectWord,
        attempts,
        setAttempts,
        currentAttempt,
        setCurrentAttempt,
        gameWon,
        setGameWon,
        attemptWords,
        setAttemptWords,
        message,
        setMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
