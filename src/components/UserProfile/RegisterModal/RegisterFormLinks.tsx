import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { modalActions } from "../../../store/modalSlice";

import { ALREADY_HAVE_ACCOUNT, LOGIN_TEXT } from "../../../constants/auth";

import styles from "../Auth.module.css";

export const RegisterFormLinks = () => {
  const dispatch = useDispatch();

  const handleLoginAction = useCallback(
    () => dispatch(modalActions.openModal("login")),
    [dispatch]
  );

  return (
    <div className={styles["link-to-login-container"]}>
      {ALREADY_HAVE_ACCOUNT}
      <Link
        to={"#"}
        className={styles["link-to-login"]}
        onClick={handleLoginAction}
      >
        {LOGIN_TEXT}
      </Link>
    </div>
  );
};
