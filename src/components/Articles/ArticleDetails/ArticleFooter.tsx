import { FC } from "react";

import { ActionBar } from "../../ActionBar";

import styles from "./styles.module.css";

export const ArticleFooter: FC = () => (
  <div className={styles["footer"]}>
    <ActionBar />
  </div>
);
