import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import { resetPassword } from "../../store/authSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Modal } from "../Modals/Modal";

import styles from "./Auth.module.css";

export const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState(false);

  const loading = useSelector((state) => state.loading.loading);

  const emailRef = useRef();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      await dispatch(resetPassword(emailRef.current.value));
      setMessage(
        `Изпратени са инструкции за промяна на парола на ${emailRef.current.value}`
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal>
      <div className={styles["auth-container"]}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.xmark}
          onClick={() => dispatch(modalActions.closeModal())}
        />
        <div className={styles["auth-body"]}>
          <h2 className={styles.title}>Забравена парола</h2>
          {error && (
            <div className={styles.errorMessage}>
              <p>{error}</p>
            </div>
          )}
          {message && (
            <div className={styles.message}>
              <p>{message}</p>
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
              disabled={loading}
              type="submit"
              value={loading ? "Изпращане..." : "Изпрати"}
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
          Все още нямаш акаунт?
          <Link
            to="#"
            className={styles["link-to-login"]}
            onClick={() => dispatch(modalActions.openModal("register"))}
          >
            Регистрация
          </Link>
        </div>
      </div>
    </Modal>
  );
};
