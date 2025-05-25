import { useContext, useEffect } from "preact/hooks";
import WordPanel from "./components/WordPanel";
import GameContext from "./states/GameContext";
import { Fragment } from "preact/jsx-runtime";
import Keyboard from "./components/Keyboard";
import { getRandomWord } from "./service";
import Alert from "./components/Alert";
import "./app.css";

const GameContent = () => {
  const { setCorrectWord, setAttempts } = useContext(GameContext);

  const generateNewWord = () => {
    getRandomWord().then((newWord) => setCorrectWord(newWord));
    setAttempts(7);
  };

  useEffect(() => {
    generateNewWord();
  }, []);

  return (
    <Fragment>
      <Alert />
      <WordPanel />
      <Keyboard />
    </Fragment>
  );
};

export function App() {
  return (
    <div className="app-container">
      <GameContent />
    </div>
  );
}
