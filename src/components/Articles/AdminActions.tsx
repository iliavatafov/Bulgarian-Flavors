import { FC } from "react";

import { ThemedButton } from "../common/Button";

import styles from "./ArticleDetails.module.css";

interface AdminActionsProps {
  editArticle: () => void;
  openDeleteModal: () => void;
}

export const AdminActions: FC<AdminActionsProps> = ({
  editArticle,
  openDeleteModal,
}) => {
  return (
    <div className={styles["admin-actions"]}>
      <ThemedButton onClick={editArticle} variant="contained" color="greenCyan">
        Редактирай
      </ThemedButton>
      <ThemedButton onClick={openDeleteModal} variant="contained" color="error">
        Изтрий
      </ThemedButton>
    </div>
  );
};
