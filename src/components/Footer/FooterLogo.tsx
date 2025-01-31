import { FC } from "react";
import { Link } from "react-router-dom";

import { LOGO_FIRST_TEXT, LOGO_SECOND_TEXT } from "../../constants/logo";

import styles from "./Footer.module.css";

export const FooterLogo: FC = () => {
  return (
    <Link className={styles["logo-footer"]} to="/">
      <span className="first">{LOGO_FIRST_TEXT}</span>
      <span className="slide">
        <span className="second">{LOGO_SECOND_TEXT}</span>
      </span>
    </Link>
  );
};
