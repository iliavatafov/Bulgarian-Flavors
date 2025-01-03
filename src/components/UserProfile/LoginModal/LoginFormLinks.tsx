import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { modalActions } from "../../../store/modalSlice";

import { FORGOTTEN_PASSWORD_LINK_TITLE } from "../../../constants/auth";

import type { AppDispatch } from "../../../store";

import { Button } from "../../Button";
import { Link } from "react-router-dom";

import styles from "../Auth.module.css";

export const LoginFormLinks = () => {
  const dispatch: AppDispatch = useDispatch();

  const openRegisterModal = useCallback(
    () => dispatch(modalActions.openModal("register")),
    [dispatch]
  );

  const openResetPasswordModal = useCallback(
    () => dispatch(modalActions.openModal("resetPassword")),
    [dispatch]
  );

  return (
    <div className={styles["login-links"]}>
      <Button
        type="button"
        value="Регистрирай се"
        color="dark-blue"
        handler={openRegisterModal}
      />
      <Link
        to="#"
        onClick={openResetPasswordModal}
        className={styles["link-to-forgoten-password"]}
      >
        {FORGOTTEN_PASSWORD_LINK_TITLE}
      </Link>
    </div>
  );
};
