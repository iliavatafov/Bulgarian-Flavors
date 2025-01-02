import { FC } from "react";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { modalActions } from "../../../store/modalSlice";

import type { AuthModalWrapperProps } from "../../../types/authTypes";

import styles from "./styles.module.css";

export const ProfileModalWrapper: FC<AuthModalWrapperProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const closeModalAction = () => dispatch(modalActions.closeModal());

  return (
    <div className={styles["profile-container"]}>
      <FontAwesomeIcon
        icon={faXmark}
        className={styles.xmark}
        onClick={closeModalAction}
      />
      {children}
    </div>
  );
};
