import { FC } from "react";
import { Link } from "react-router-dom";

import { FOOTER_COPY_TEXT } from "../../constants/footer";

import styles from "./Footer.module.css";

export const FooterCopy: FC = () => {
  return (
    <div className={styles.copy}>
      <Link to="https://www.linkedin.com/in/ilia-vatafov-517ba3163/">
        &copy; {FOOTER_COPY_TEXT}
      </Link>
    </div>
  );
};
