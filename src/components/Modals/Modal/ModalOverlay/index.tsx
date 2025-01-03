import { FC } from "react";

import type { ModalProps } from "../../../../types/modalTypes";

import styles from "./styles.module.css";

export const ModalOverlay: FC<ModalProps> = ({ children }) => {
  return <div className={styles["modal-container"]}>{children}</div>;
};
