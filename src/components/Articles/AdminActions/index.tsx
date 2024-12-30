import { FC } from "react";

import {
  DELETE_ACTION_TEXT,
  EDIT_ACTION_TEXT,
} from "../../../constants/adminActions";
import type { AdminActionsProps } from "../../../types/articlesTypes";

import { ThemedButton } from "../../common/Button";

import styles from "./styles.module.css";

export const AdminActions: FC<AdminActionsProps> = ({
  editArticle,
  openDeleteModal,
}) => {
  return (
    <div className={styles["admin-actions"]}>
      <ThemedButton onClick={editArticle} variant="contained" color="greenCyan">
        {EDIT_ACTION_TEXT}
      </ThemedButton>
      <ThemedButton onClick={openDeleteModal} variant="contained" color="error">
        {DELETE_ACTION_TEXT}
      </ThemedButton>
    </div>
  );
};
