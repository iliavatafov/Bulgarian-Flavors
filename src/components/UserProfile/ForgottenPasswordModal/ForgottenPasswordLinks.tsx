import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { modalActions } from "../../../store/modalSlice";

import {
  LOGIN_TEXT,
  NO_ACCOUNT_LINK_TEXT,
  REGISTRATION_LINK_TEXT,
} from "../../../constants/auth";

import styles from "../UserProfile.module.css";

export const ForgottenPasswordLinks = () => {
  const dispatch = useDispatch();

  const openLoginModal = useCallback(() => {
    dispatch(modalActions.openModal("login"));
  }, [dispatch]);

  const openRegisterModal = useCallback(() => {
    dispatch(modalActions.openModal("register"));
  }, [dispatch]);

  return (
    <>
      <Link
        to="#"
        onClick={openLoginModal}
        className={styles["link-to-login-forgoten-pass"]}
      >
        {LOGIN_TEXT}
      </Link>
      <div className={styles["link-to-login-container"]}>
        {NO_ACCOUNT_LINK_TEXT}
        <Link
          to="#"
          className={styles["link-to-login"]}
          onClick={openRegisterModal}
        >
          {REGISTRATION_LINK_TEXT}
        </Link>
      </div>
    </>
  );
};
