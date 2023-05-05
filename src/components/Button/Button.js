import styles from "./Button.module.css";

export const Button = ({ type, value, color, handler }) => {
  return (
    <button
      onClick={handler && handler}
      className={styles[`submit-button-${color}`]}
      type={type}
    >
      {value}
    </button>
  );
};
