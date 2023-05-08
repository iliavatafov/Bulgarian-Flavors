import ReactDOM from "react-dom";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../cotext/AuthContext";
import { useModal } from "../../cotext/ModalContext";

import { Backdrop } from "../Modal/Backdrop";
import { ModalOverlay } from "../Modal/ModalOverlay";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import styles from "./Auth.module.css";

export const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepass, setShowRepass] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { register } = useAuth();
  const { handleOpenModal, handleCloseModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Паролата не съвпада");
    }

    try {
      setError("");
      setLoading(true);
      await register(emailRef.current.value, passwordRef.current.value);
      handleCloseModal();
    } catch (error) {
      if (
        error.message ===
        "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
      ) {
        setError("Този e-mail се използва от друг потребител");
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("Паролата трябва да бъде минимум 6 символа");
      } else {
        setError("Грешка при създаване на акаунт");
      }
    }
    setLoading(false);
  };

  const handleShowPassword = () => {
    setShowPassword((oldState) => !oldState);
  };

  const handleShowRepass = () => {
    setShowRepass((oldState) => !oldState);
  };

  const registerHTML = (
    <div className={styles["auth-container"]}>
      <FontAwesomeIcon
        icon={faXmark}
        className={styles.xmark}
        onClick={handleCloseModal}
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
            disabled={loading}
            type="submit"
            value={loading ? "Акаунтът се създава..." : "Регистрация"}
            color="green-cyan"
          />
        </form>
      </div>
      <div className={styles["link-to-login-container"]}>
        Вече имаш профил?
        <Link
          to={"#"}
          className={styles["link-to-login"]}
          onClick={() => handleOpenModal("login")}
        >
          Вход
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{registerHTML}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
