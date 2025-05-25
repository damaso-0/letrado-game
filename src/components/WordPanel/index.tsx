import { useContext, useEffect, useState } from "preact/hooks";
import GameContext from "../../states/GameContext";
import styles from "./styles.module.css";
import Word from "../Word";
import {
  checkCorrectWord,
  checkWordExists,
  normalizeWord,
} from "../../service";

const WordPanel = () => {
  const {
    attempts,
    attemptWords,
    setAttemptWords,
    correctWord,
    gameWon,
    setGameWon,
    setMessage,
  } = useContext(GameContext);

  const [activeAttempt, setActiveAttempt] = useState<string[]>(
    Array(6).fill("")
  );
  const [activeAttemptIndex, setActiveAttemptIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);

  const handleKeyPress = async (event: KeyboardEvent) => {
    if (event.key.match(/^[a-zA-ZÀ-ÿ]$/)) {
      setActiveAttempt((prev) => {
        const newAttempt = [...prev];
        newAttempt[activeLetterIndex] = normalizeWord(event.key);
        return newAttempt;
      });

      setActiveLetterIndex((prev) => {
        const nextEmptyRight = activeAttempt.findIndex(
          (letter, i) => letter === "" && i > prev
        );
        if (nextEmptyRight !== -1) return nextEmptyRight;

        const nextEmptyLeft = activeAttempt.findIndex(
          (letter) => letter === ""
        );
        return nextEmptyLeft !== -1 ? nextEmptyLeft : prev;
      });
    }

    if (event.key === "Backspace") {
      setActiveAttempt((prev) => {
        const newAttempt = [...prev];

        if (newAttempt[activeLetterIndex] !== "") {
          newAttempt[activeLetterIndex] = "";
          return newAttempt;
        }

        if (activeLetterIndex > 0) {
          newAttempt[activeLetterIndex - 1] = "";
          setActiveLetterIndex((prev) => prev - 1);
        }

        return newAttempt;
      });
    }

    if (event.key === "ArrowLeft") {
      setActiveLetterIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
    }

    if (event.key === "ArrowRight") {
      setActiveLetterIndex((prev) => (prev + 1 > 5 ? 5 : prev + 1));
    }

    if (
      event.key === "Enter" &&
      activeAttempt.every((letter) => letter !== "")
    ) {
      const currentWord = activeAttempt.join("").toLowerCase();

      const exists = await checkWordExists(currentWord);

      if (!exists) {
        setMessage("Palavra não encontrada! Tente outra.");
        return;
      }

      setAttemptWords((prev: string[][]) => {
        const newAttempts = [...prev];
        newAttempts[activeAttemptIndex] = [...activeAttempt];
        return newAttempts;
      });

      const correctAttempt = checkCorrectWord(currentWord, correctWord);

      if (correctAttempt) {
        setGameWon(true);
      } else if (activeAttemptIndex === attempts - 1) {
        setGameWon(false);
      }

      if (activeAttemptIndex < attempts - 1 && !gameWon) {
        setActiveAttemptIndex((prev) => prev + 1);
        setActiveLetterIndex(0);
        setActiveAttempt(Array(6).fill(""));
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeLetterIndex, activeAttempt, activeAttemptIndex]);

  return (
    <div className={styles.wordPanel}>
      {Array.from({ length: attempts }).map((_, index) => {
        const isActiveAttempt = index === activeAttemptIndex && !gameWon;
        const value = attemptWords?.[index]?.join("") || "";
        const activeValue = isActiveAttempt ? activeAttempt : [];
        const isLastAttempt = index === attempts - 1;
        const finishedGame = gameWon === true || gameWon === false;

        const endAttempt =
          index < activeAttemptIndex ||
          (finishedGame && index < activeAttemptIndex) ||
          (finishedGame && isLastAttempt && index === activeAttemptIndex);

        return (
          <Word
            key={index}
            value={value}
            activeValue={activeValue}
            active={isActiveAttempt && !endAttempt}
            activeLetterIndex={activeLetterIndex}
            onLetterClick={setActiveLetterIndex}
            endAttempt={endAttempt}
            correctWord={correctWord}
          />
        );
      })}
    </div>
  );
};

export default WordPanel;
