import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles["footer-containter"]}>
      <div className={styles["footer-nav"]}>
        <Link className={styles["logo-footer"]} to="/">
          <span className="first">Bulgarian</span>
          <span className="slide">
            <span className="second">Flavors</span>
          </span>
        </Link>
        <ul role="list" className={styles["navigation-links"]}>
          <li>
            <Link to="/">Начало</Link>
          </li>
          <li>
            <Link to="/wine&food">Вино и храна</Link>
          </li>
          <li>
            <Link to="/next-destination">Следваща дестинцатия</Link>
          </li>
          <li>
            <Link to="/tourism-initiatives">Инициативи за туризма</Link>
          </li>
        </ul>
        <ul role="list" className={styles["navigation-links"]}>
          <li>
            <Link to="/for-me">За мен</Link>
          </li>
          <li>
            <Link to="/mission">Мисия и цели</Link>
          </li>
          <li>
            <Link to="/contact-us">Контакти</Link>
          </li>
          <li>
            <Link to="/auth">Вход</Link>
          </li>
        </ul>
        <ul role="list" className={styles["navigation-links"]}>
          <li>
            <Link to="/terms&conditions">Условия за ползване</Link>
          </li>
          <li>
            <Link to="/GDPR">Политика за поверителност</Link>
          </li>
          <li>
            <Link to="/advertise-here">Рекламирай тук</Link>
          </li>
        </ul>
      </div>
      <div className={styles.copy}>
        <Link to="https://www.linkedin.com/in/ilia-vatafov-517ba3163/">
          &copy; 2023 - Ilia Vatafov - All Rights Reserved
        </Link>
      </div>
    </div>
  );
};
