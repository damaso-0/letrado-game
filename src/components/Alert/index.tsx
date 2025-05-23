import styles from "./styles.module.css";

const Alert = ({ message, fixed }: { message: string; fixed: boolean }) => {
  return (
    <div className={[styles.alert, fixed && styles.alertFixed].join(" ")}>
      {message}
    </div>
  );
};

export default Alert;
