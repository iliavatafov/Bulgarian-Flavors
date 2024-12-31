import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { modalActions } from "../../../store/modalSlice";

import {
  LOGIN_TEXT,
  NO_ACCOUNT_LINK_TEXT,
  REGISTRATION_LINK_TEXT,
} from "../../../constants/auth";

import styles from "../Auth.module.css";

export const ForgottenPasswordLinks = () => {
  const dispatch = useDispatch();

  const openModal = () => dispatch(modalActions.openModal("register"));
  return (
    <>
      <Link
        to="#"
        onClick={() => dispatch(modalActions.openModal("login"))}
        className={styles["link-to-login-forgoten-pass"]}
      >
        {LOGIN_TEXT}
      </Link>
      <div className={styles["link-to-login-container"]}>
        {NO_ACCOUNT_LINK_TEXT}
        <Link to="#" className={styles["link-to-login"]} onClick={openModal}>
          {REGISTRATION_LINK_TEXT}
        </Link>
      </div>
    </>
  );
};
