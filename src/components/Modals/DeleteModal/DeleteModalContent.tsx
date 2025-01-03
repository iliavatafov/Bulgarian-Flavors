import { FC } from "react";

import styles from "./styles.module.css";

export const DeleteModalContent: FC<{ title: string; message: string }> = ({
  title,
  message,
}) => (
  <div className={styles["delete-body"]}>
    <div className={styles.content}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  </div>
);
