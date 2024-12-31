import { FC } from "react";

import type { ButtonProps } from "../../types/buttonTypes";

import styles from "./styles.module.css";

export const Button: FC<ButtonProps> = ({
  type = "button",
  value = "",
  color = "default",
  handler = () => {},
  icon = null,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={handler}
      className={styles[`submit-button-${color}`]}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {value}
    </button>
  );
};
