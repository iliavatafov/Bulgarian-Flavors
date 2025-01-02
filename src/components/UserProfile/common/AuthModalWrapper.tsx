import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { modalActions } from "../../../store/modalSlice";

import type { AuthModalWrapperProps } from "../../../types/authTypes";

import styles from "../Auth.module.css";

export const AuthModalWrapper: FC<AuthModalWrapperProps> = ({ children }) => {
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(modalActions.closeModal());
  }, [dispatch]);

  return (
    <div className={styles["auth-container"]}>
      <FontAwesomeIcon
        icon={faXmark}
        className={styles.xmark}
        onClick={handleClose}
      />
      <div className={styles["auth-body"]}>{children}</div>
    </div>
  );
};
