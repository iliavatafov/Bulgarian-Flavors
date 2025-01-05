import { FC } from "react";

import type { ActionBarProps } from "../../../types/articlesTypes";

import styles from "./styles.module.css";

export const ActionBar: FC<ActionBarProps> = ({ actions }) => {
  return (
    <ul className={styles["actions-wrapper"]}>
      {actions.map((action) => (
        <li key={action.id}>{action.icon}</li>
      ))}
    </ul>
  );
};
