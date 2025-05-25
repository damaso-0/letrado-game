import GameContext from "../../states/GameContext";
import { normalizeWord } from "../../service";
import { useContext } from "preact/hooks";
import styles from "./styles.module.css";
import DeleteIcon from "./delete";

const Keyboard = () => {
  const { attemptWords, correctWord } = useContext(GameContext);

  const letters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "delete"],
    ["Z", "X", "C", "V", "B", "N", "M", "enter"],
  ];

  const checkLetterState = (letter: string) => {
    const normalizedLetter = normalizeWord(letter);
    const correctLetters = correctWord.split("").map(normalizeWord);

    let hasMisplace = false;
    let hasCorrect = false;
    let hasBeenTyped = false;

    attemptWords?.forEach((word) => {
      word.forEach((char, index) => {
        if (normalizeWord(char) === normalizedLetter) {
          hasBeenTyped = true;
          if (correctLetters[index] === normalizedLetter) {
            hasCorrect = true;
          } else if (correctLetters.includes(normalizedLetter)) {
            hasMisplace = true;
          }
        }
      });
    });

    if (!hasBeenTyped) return "untyped";
    if (hasCorrect) return "correct";
    if (hasMisplace) return "misplaced";
    if (!correctLetters.includes(normalizedLetter)) return "absent";

    return "untyped";
  };

  return (
    <div className={styles.keyboard}>
      {letters.map((row) => (
        <div key={row.join("")} className={styles.keyboardRow}>
          {row.map((letter) => (
            <div
              key={letter}
              className={[
                styles.keyboardLetter,
                styles[`letter_${checkLetterState(letter)}`],
                ...(letter === "delete" ? [styles.keyboardLetterDelete] : []),
                ...(letter === "enter" ? [styles.keyboardLetterEnter] : []),
              ].join(" ")}
            >
              {letter === "delete" ? (
                <DeleteIcon />
              ) : letter === "enter" ? (
                "⏎"
              ) : (
                letter
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
