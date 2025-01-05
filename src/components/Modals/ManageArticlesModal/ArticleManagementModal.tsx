import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import type { ArticleManagementModalProps } from "../../../types/articlesTypes";

import styles from "./styles.module.css";

export const ArticleManagementModal: FC<ArticleManagementModalProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const handleClose = useCallback(
    () => dispatch(modalActions.closeModal()),
    [dispatch]
  );
  return (
    <div className={styles["manage-articles-container"]}>
      <FontAwesomeIcon
        icon={faXmark}
        className={styles.xmark}
        onClick={handleClose}
      />
      {children}
    </div>
  );
};
