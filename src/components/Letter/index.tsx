import styles from "./styles.module.css";

interface ILetter {
  active: boolean;
  focused: boolean;
  value: string;
  state: null | "correct" | "present" | "absent";
  index: number;
  onClick: () => void;
}

const Letter = ({ active, focused, value, index, state, onClick }: ILetter) => {
  return (
    <div
      className={[
        styles.letter,
        active && styles.letterActive,
        focused && styles.letterFocused,
        state && styles[`letter_${state}`],
      ].join(" ")}
      style={{ animationDelay: `${index * 0.2}s` }}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default Letter;
