import { PROFILE_TITLE } from "../../../constants/auth";

import styles from "./styles.module.css";

export const ProfileModalTitle = () => (
  <h2 className={styles["profile-title"]}>{PROFILE_TITLE}</h2>
);
