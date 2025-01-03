import { FC } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../../../store";

import styles from "./styles.module.css";

export const ErrorModalContents: FC = () => {
  const { title, message } = useSelector(
    (state: RootState) => state.modal.errorData
  );

  return (
    <div className={styles["error-body"]}>
      <div className={styles.errorMessage}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};
