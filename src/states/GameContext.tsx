import { createContext } from "preact";
import type { Dispatch, StateUpdater } from "preact/hooks";

interface GameContextValue {
  correctWord: string;
  setCorrectWord: Dispatch<StateUpdater<string>>;
  attempts: number;
  setAttempts: Dispatch<StateUpdater<number>>;
  currentAttempt: string[];
  setCurrentAttempt: Dispatch<StateUpdater<string[]>>;
  gameWon: boolean | null;
  setGameWon: Dispatch<StateUpdater<boolean | null>>;
  attemptWords: string[][];
  setAttemptWords: Dispatch<StateUpdater<string[][]>>;
  message: string;
  setMessage: Dispatch<StateUpdater<string>>;
}

const defaultGameContext: GameContextValue = {
  correctWord: "",
  setCorrectWord: () => {},
  attempts: 0,
  setAttempts: () => {},
  currentAttempt: [],
  setCurrentAttempt: () => {},
  gameWon: null,
  setGameWon: () => {},
  attemptWords: [],
  setAttemptWords: () => {},
  message: "",
  setMessage: () => {},
};

const GameContext = createContext<GameContextValue>(defaultGameContext);

export default GameContext;
