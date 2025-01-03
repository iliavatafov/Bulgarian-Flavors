import { FC, ReactNode } from "react";

import styles from "./styles.module.css";

export const DeleteModalWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => <div className={styles["delete-container"]}>{children}</div>;
