import styles from "./Button.module.css";

export const Button = ({ type, value, color, handler, icon }) => {
  return (
    <button
      onClick={handler && handler}
      className={styles[`submit-button-${color}`]}
      type={type}
    >
      {icon && icon}
      {value}
    </button>
  );
};
