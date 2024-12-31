import { FC } from "react";
import { Link } from "react-router-dom";

import { LOGOUT_BUTTON_TEXT } from "../../../constants/auth";
import type { ExitLinkProps } from "../../../types/authTypes";

import styles from "./styles.module.css";

export const LogoutLink: FC<ExitLinkProps> = ({ handleLogout }) => {
  return (
    <div className={styles.logout}>
      <Link to="#" onClick={handleLogout}>
        {LOGOUT_BUTTON_TEXT}
      </Link>
    </div>
  );
};
