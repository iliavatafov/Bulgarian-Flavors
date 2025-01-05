import { FC } from "react";

import styles from "./styles.module.css";

export const ArticleManagementTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <header>
      <h2 className={styles["manage-article-header"]}>{title}</h2>
    </header>
  );
};
