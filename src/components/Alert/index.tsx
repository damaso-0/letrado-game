import { useContext, useEffect, useState } from "preact/hooks";
import GameContext from "../../states/GameContext";
import { makeItRain } from "../../confetti";
import styles from "./styles.module.css";

const Alert = () => {
  const { message, setMessage, gameWon, correctWord } = useContext(GameContext);
  const finishedGame = gameWon !== null;

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!message) return setShowMessage(false);

    setShowMessage(true);

    if (finishedGame) return;

    const hideTimeout = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(hideTimeout);
  }, [finishedGame, message]);

  useEffect(() => {
    if (finishedGame) {
      setTimeout(() => {
        setMessage(`Palavra correta: ${correctWord}`);
        setShowMessage(true);

        if (gameWon) makeItRain();
      }, 1400);
    }
  }, [finishedGame]);

  if (!showMessage) return null;

  return (
    <div
      className={[
        styles.alert,
        ...(finishedGame ? [styles.alertFixed] : []),
      ].join(" ")}
    >
      {message}
    </div>
  );
};

export default Alert;
