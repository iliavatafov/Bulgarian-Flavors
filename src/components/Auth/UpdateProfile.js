import ReactDOM from "react-dom";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../cotext/AuthContext";
import { useModal } from "../../cotext/ModalContext";

import { Backdrop } from "../Modal/Backdrop";
import { ModalOverlay } from "../Modal/ModalOverlay";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import styles from "./Auth.module.css";

export const UpdateProfile = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepass, setShowRepass] = useState(false);

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, updateEmail, updatePassword } = useAuth();
  const { handleOpenModal, handleCloseModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Паролата не съвпада");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        handleCloseModal();
        navigate("/");
      })
      .catch((error) => {
        if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setError("Паролата трябва да бъде минимум 6 символса");
        } else if (
          error.message ===
          "Firebase: This operation is sensitive and requires recent authentication. Log in again before retrying this request. (auth/requires-recent-login)."
        ) {
          setError(
            "Необходимо е да излезете и влезете отново, т. к. исканата от вас операция е чувствителна"
          );
        } else if (
          error.message ===
          "Firebase: The email address is badly formatted. (auth/invalid-email)."
        ) {
          setError("Грешен формат на e-mail");
        } else {
          setError("Неуспешно актуализиране на акаунта");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleShowPassword = () => {
    setShowPassword((oldState) => !oldState);
  };

  const handleShowRepass = () => {
    setShowRepass((oldState) => !oldState);
  };

  const updateProfileHTML = (
    <div className={styles["auth-container"]}>
      <FontAwesomeIcon
        icon={faXmark}
        className={styles.xmark}
        onClick={handleCloseModal}
      />
      <div className={styles["auth-body"]}>
        <h2 className={styles.title}>Актуализиране на акаунт</h2>
        {error && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles["singup-form"]}>
          <Input
            type="email"
            id="email"
            label="E-mail"
            reference={emailRef}
            defaultVal={currentUser.email}
          />
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            label="Парола"
            reference={passwordRef}
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
            label="Повторете паролата"
            reference={passwordConfirmRef}
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
            value={loading ? "Обновяване..." : "Обнови"}
            color="green-cyan"
          />
        </form>
      </div>
      <div className={styles["link-to-login-container"]}>
        <Link
          to={"#"}
          className={styles["link-to-login"]}
          onClick={() => handleOpenModal("profile")}
        >
          Затвори
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
        <ModalOverlay>{updateProfileHTML}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
