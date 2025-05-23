import { useEffect, useState } from "preact/hooks";
import styles from "./styles.module.css";
import Letter from "../Letter";
import { checkWordExists, normalizeWord } from "../../service";

interface IWord {
  value: string;
  active: boolean;
  activeValue: string[];
  correctWord: string;
  endAttempt: boolean;
  activeLetterIndex: number;
  onLetterClick: (index: number) => void;
}

const Word = ({
  value,
  active,
  activeValue,
  activeLetterIndex,
  correctWord,
  endAttempt,
  onLetterClick,
}: IWord) => {
  const [existingWord, setExistingWord] = useState<string | null>(null);

  const letters: string[] =
    activeValue.length > 0
      ? activeValue
      : (existingWord ?? value).padEnd(6, " ").split("");

  const handleLetterState = (letter: string, index: number) => {
    if (!endAttempt || letter.trim() === "") return null;

    if (normalizeWord(letter) === normalizeWord(correctWord?.[index])) {
      return "correct";
    } else if (normalizeWord(correctWord)?.includes(normalizeWord(letter))) {
      return "present";
    } else {
      return "absent";
    }
  };

  useEffect(() => {
    if (endAttempt && !active) {
      const checkWord = async () => {
        const normalizedInput = normalizeWord(value);
        const matchedWord = await checkWordExists(normalizedInput);
        if (matchedWord) {
          setExistingWord(matchedWord);
        }
      };

      checkWord();
    }
  }, [endAttempt, value, active]);

  return (
    <div className={styles.word}>
      {letters.map((letter, index) => {
        let attemptLetter: string;

        if (
          endAttempt &&
          normalizeWord(letter) === normalizeWord(correctWord?.[index])
        ) {
          attemptLetter = correctWord?.[index] ?? letter;
        } else if (!active && existingWord && index < existingWord.length) {
          attemptLetter = existingWord[index];
        } else {
          attemptLetter = letter;
        }

        return (
          <Letter
            key={index}
            index={index}
            active={active}
            value={attemptLetter}
            state={handleLetterState(letter, index)}
            focused={active && activeLetterIndex === index}
            onClick={() => active && onLetterClick(index)}
          />
        );
      })}
    </div>
  );
};

export default Word;
