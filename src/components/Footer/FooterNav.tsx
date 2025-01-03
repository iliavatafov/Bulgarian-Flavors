import { FC } from "react";
import { Link } from "react-router-dom";

import { footerLinks } from "../../constants/footerLinks";

import styles from "./Footer.module.css";

export const FooterNav: FC = () => {
  return (
    <>
      {footerLinks.map((section, index) => (
        <ul key={index} className={styles["navigation-links"]}>
          {section.links.map((link, linkIndex) => (
            <li key={linkIndex}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </ul>
      ))}
    </>
  );
};
