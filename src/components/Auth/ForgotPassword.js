import ReactDOM from "react-dom";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../cotext/AuthContext";
import { useModal } from "../../cotext/ModalContext";

import { Backdrop } from "../Modal/Backdrop";
import { ModalOverlay } from "../Modal/ModalOverlay";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import styles from "./Auth.module.css";

export const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const { handleOpenModal, handleCloseModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage(
        `Изпратени са инструкции за промяна на парола на ${emailRef.current.value}`
      );
    } catch (error) {
      setError("Грешка при опит за рестартиране на парола");
    }
    setLoading(false);
  };

  const updatePasswordHTML = (
    <div className={styles["auth-container"]}>
      <FontAwesomeIcon
        icon={faXmark}
        className={styles.xmark}
        onClick={handleCloseModal}
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
          onClick={() => handleOpenModal("login")}
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
          onClick={() => handleOpenModal("register")}
        >
          Регистрация
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
        <ModalOverlay>{updatePasswordHTML}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
