import { FC } from "react";

import type { ModalTitleProps } from "../../../types/authTypes";

import styles from "../Auth.module.css";

export const ModalTitle: FC<ModalTitleProps> = ({ text }) => (
  <h2 className={styles.title}>{text}</h2>
);
