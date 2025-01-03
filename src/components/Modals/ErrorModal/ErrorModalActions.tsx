import { FC } from "react";
import { Link } from "react-router-dom";

import { HOMEPAGE_LINK_TEXT } from "../../../constants/errorModal";
import type { ErrorModalActionsProps } from "../../../types/errorModalTypes";

import styles from "./styles.module.css";

export const ErrorModalActions: FC<ErrorModalActionsProps> = ({
  handleClose,
}) => {
  return (
    <div className={styles["link-to-error-container"]}>
      <Link to={"#"} className={styles["link-to-error"]} onClick={handleClose}>
        {HOMEPAGE_LINK_TEXT}
      </Link>
    </div>
  );
};
