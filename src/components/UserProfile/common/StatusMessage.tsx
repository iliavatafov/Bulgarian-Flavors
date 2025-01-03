import { FC } from "react";
import type { StatusMessageProps } from "../../../types/authTypes";

import styles from "../Auth.module.css";

export const StatusMessage: FC<StatusMessageProps> = ({ message, type }) => {
  const className = type === "error" ? styles.errorMessage : styles.message;
  const role = type === "error" ? "alert" : "status";

  return (
    <div className={className} role={role}>
      <p>{message}</p>
    </div>
  );
};
