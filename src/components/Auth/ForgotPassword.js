import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import { resetPassword } from "../../store/authSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Modal } from "../Modals/Modal";

import styles from "./Auth.module.css";
import {
  FORGOTTEN_PASSWORD_TITLE,
  NO_ACCOUNT_LINK_TEXT,
  REGISTRATION_LINK_TEXT,
  SUCCESS_MESSAGE,
} from "../../constants/auth";

export const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage(null);
    setErrorMessage(null);

    setIsLoading(true);

    try {
      await dispatch(resetPassword(emailRef.current.value));
      setSuccessMessage(SUCCESS_MESSAGE + emailRef.current.value);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => dispatch(modalActions.openModal("register"));
  const closeModal = () => dispatch(modalActions.closeModal());

  return (
    <Modal>
      <div className={styles["auth-container"]}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.xmark}
          onClick={closeModal}
        />
        <div className={styles["auth-body"]}>
          <h2 className={styles.title}>{FORGOTTEN_PASSWORD_TITLE}</h2>
          {errorMessage && (
            <div className={styles.errorMessage}>
              <p>{errorMessage}</p>
            </div>
          )}
          {successMessage && (
            <div className={styles.message}>
              <p>{successMessage}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className={styles["singup-form"]}>
            <Input
              type="email"
              id="email"
              name="email"
              label="E-mail"
              reference={emailRef}
              require={true}
            />
            <Button
              disabled={isLoading}
              type="submit"
              value={isLoading ? "Изпращане..." : "Изпрати"}
              color="green-cyan"
            />
          </form>

          <Link
            to="#"
            onClick={() => dispatch(modalActions.openModal("login"))}
            className={styles["link-to-login-forgoten-pass"]}
          >
            Вход
          </Link>
        </div>
        <div className={styles["link-to-login-container"]}>
          {NO_ACCOUNT_LINK_TEXT}
          <Link to="#" className={styles["link-to-login"]} onClick={openModal}>
            {REGISTRATION_LINK_TEXT}
          </Link>
        </div>
      </div>
    </Modal>
  );
};
