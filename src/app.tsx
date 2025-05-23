import { useEffect, useState } from "preact/hooks";
import "./app.css";
import WordPanel from "./components/WordPanel";
import { getRandomWord } from "./service";
import Alert from "./components/Alert";
import Keyboard from "./components/Keyboard";
import { makeItRain } from "./confetti";

export function App() {
  const attempts = 7;
  const [attemptWords, setAttemptWords] = useState<string[][]>(
    Array.from({ length: attempts }, () => Array(6).fill(""))
  );
  const [gameWon, setGameWon] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");
  const [word, setWord] = useState<string>("");

  const generateNewWord = () => getRandomWord().then((word) => setWord(word));

  useEffect(() => {
    generateNewWord();
  }, []);

  useEffect(() => {
    if (gameWon !== null) {
      setTimeout(() => setMessage(`Palavra correta: ${word}`), 1200);
    }

    if (gameWon) {
      setTimeout(() => makeItRain(), 1200);
    }
  }, [gameWon]);

  useEffect(() => {
    if (gameWon === null) setTimeout(() => setMessage(""), 3000);
  }, [message]);

  return (
    <div className="app-container">
      {message && <Alert message={message} fixed={gameWon !== null} />}

      {/* <ReloadButton onClick={makeItRain} /> */}

      <WordPanel
        attempts={attempts}
        attemptWords={attemptWords}
        setAttemptWords={setAttemptWords}
        correctWord={word}
        gameWon={gameWon}
        setGameWon={setGameWon}
        setMessage={setMessage}
      />

      <Keyboard words={attemptWords} correctWord={word} />
    </div>
  );
}
