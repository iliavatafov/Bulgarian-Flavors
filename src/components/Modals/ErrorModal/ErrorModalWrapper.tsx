import { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import type { ErrorWrapperModalProps } from "../../../types/errorModalTypes";

import styles from "./styles.module.css";

export const ErrorWrapperModal: FC<ErrorWrapperModalProps> = ({
  handleClose,
  children,
}) => {
  return (
    <div className={styles["error-container"]}>
      <FontAwesomeIcon
        icon={faXmark}
        className={styles.xmark}
        onClick={handleClose}
      />
      {children}
    </div>
  );
};
