import styles from "./Button.module.css";

export const Button = ({ type, value, color, handler, icon, disabled }) => {
  return (
    <button
      onClick={handler && handler}
      className={styles[`submit-button-${color}`]}
      type={type}
      disabled={disabled}
    >
      {icon && icon}
      {value}
    </button>
  );
};
