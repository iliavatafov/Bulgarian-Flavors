import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import { register } from "../../store/authSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";

import { Modal } from "../Modals/Modal";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import styles from "./Auth.module.css";

export const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepass, setShowRepass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Паролата не съвпада");
    }

    setIsLoading(true);
    try {
      setError("");
      await dispatch(
        register(emailRef.current.value, passwordRef.current.value)
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((oldState) => !oldState);
  };

  const handleShowRepass = () => {
    setShowRepass((oldState) => !oldState);
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
          <h2 className={styles.title}>Регистрация</h2>
          {error && (
            <div className={styles.errorMessage}>
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className={styles["singup-form"]}>
            <Input
              type="email"
              id="email"
              name={"email"}
              label="E-mail"
              reference={emailRef}
              require={true}
            />
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name={"password"}
              label="Парола"
              reference={passwordRef}
              require={true}
              icon={
                <FontAwesomeIcon
                  onClick={handleShowPassword}
                  className="eye"
                  icon={faEye}
                />
              }
            />
            <Input
              type={showRepass ? "text" : "password"}
              id="password-confirm"
              name={"confirmPassword"}
              label="Повторете паролата"
              reference={passwordConfirmRef}
              require={true}
              icon={
                <FontAwesomeIcon
                  onClick={handleShowRepass}
                  className="eye"
                  icon={faEye}
                />
              }
            />

            <Button
              disabled={isLoading}
              type="submit"
              value={isLoading ? "Акаунтът се създава..." : "Регистрация"}
              color="green-cyan"
            />
          </form>
        </div>
        <div className={styles["link-to-login-container"]}>
          Вече имаш профил?
          <Link
            to={"#"}
            className={styles["link-to-login"]}
            onClick={() => dispatch(modalActions.openModal("login"))}
          >
            Вход
          </Link>
        </div>
      </div>
    </Modal>
  );
};
