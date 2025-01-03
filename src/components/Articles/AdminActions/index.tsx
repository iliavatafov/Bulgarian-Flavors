import { FC } from "react";

import {
  DELETE_ACTION_TEXT,
  EDIT_ACTION_TEXT,
} from "../../../constants/adminActions";
import type { AdminActionsProps } from "../../../types/articlesTypes";

import { StyledButton } from "../../common/StyledButton";

import styles from "./styles.module.css";

export const AdminActions: FC<AdminActionsProps> = ({
  editArticle,
  openDeleteModal,
}) => {
  return (
    <div className={styles["admin-actions"]}>
      <StyledButton onClick={editArticle} variant="contained" color="greenCyan">
        {EDIT_ACTION_TEXT}
      </StyledButton>
      <StyledButton onClick={openDeleteModal} variant="contained" color="error">
        {DELETE_ACTION_TEXT}
      </StyledButton>
    </div>
  );
};
