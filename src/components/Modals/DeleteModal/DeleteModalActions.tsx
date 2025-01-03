import { FC } from "react";

import {
  DELETE_BUTTON_TEXT,
  CLOSE_BUTTON_TEXT,
} from "../../../constants/deleteModal";
import type { DeleteModalActionsProps } from "../../../types/deleteModalTypes";

import { StyledButton } from "../../common/StyledButton";

import styles from "./styles.module.css";

export const DeleteModalActions: FC<DeleteModalActionsProps> = ({
  deleteHandler,
  closeModal,
}) => (
  <div className={styles["buttons-container"]}>
    <StyledButton onClick={deleteHandler} variant="contained" color="error">
      {DELETE_BUTTON_TEXT}
    </StyledButton>
    <StyledButton onClick={closeModal} variant="contained" color="greenCyan">
      {CLOSE_BUTTON_TEXT}
    </StyledButton>
  </div>
);
