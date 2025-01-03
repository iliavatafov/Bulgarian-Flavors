import { FC } from "react";

import { FooterNav } from "./FooterNav";
import { FooterLogo } from "./FooterLogo";
import { FooterCopy } from "./FooterCopy";

import styles from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <div className={styles["footer-containter"]}>
      <div className={styles["footer-nav"]}>
        <FooterLogo />
        <FooterNav />
      </div>
      <FooterCopy />
    </div>
  );
};
