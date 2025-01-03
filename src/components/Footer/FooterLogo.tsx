import { FC } from "react";
import { Link } from "react-router-dom";

import {
  FOOTER_LOGO_FIRST_TEXT,
  FOOTER_LOGO_SECOND_TEXT,
} from "../../constants/footer";

import styles from "./Footer.module.css";

export const FooterLogo: FC = () => {
  return (
    <Link className={styles["logo-footer"]} to="/">
      <span className="first">{FOOTER_LOGO_FIRST_TEXT}</span>
      <span className="slide">
        <span className="second">{FOOTER_LOGO_SECOND_TEXT}</span>
      </span>
    </Link>
  );
};
