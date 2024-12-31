import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateEmail, updatePassword } from "../../store/authSlice";
import { modalActions } from "../../store/modalSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Modal } from "../Modals/Modal";

import styles from "./Auth.module.css";
import { AuthModalWrapper } from "./AuthModalWrapper";

export const UpdateProfile = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepass, setShowRepass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Паролата не съвпада");
    }

    setError("");

    try {
      setIsLoading(true);
      const promises = [];

      if (emailRef.current.value !== currentUser.currentUser) {
        promises.push(dispatch(updateEmail(emailRef.current.value)));
      } else {
        dispatch(modalActions.closeModal());
      }

      if (passwordRef.current.value) {
        promises.push(dispatch(updatePassword(passwordRef.current.value)));
      }

      await Promise.all(promises);
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
      <AuthModalWrapper>
        <h2 className={styles.title}>Актуализиране на акаунт</h2>
        {error && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles["signup-form"]}>
          <Input
            type="email"
            id="email"
            label="E-mail"
            reference={emailRef}
            defaultVal={currentUser.currentUser}
          />
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            label="Нова парола"
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
            label="Повторете новата парола"
            reference={passwordConfirmRef}
            icon={
              <FontAwesomeIcon
                onClick={handleShowRepass}
                className="eye"
                icon={faEye}
              />
            }
          />
          <p className={styles.helpMessage}>
            <span>*</span> Не е необходимо въвеждане на нова парола при
            актуализация на e-mail адрес
          </p>
          <Button
            disabled={isLoading}
            type="submit"
            value={isLoading ? "Обновяване..." : "Обнови"}
            color="green-cyan"
          />
        </form>
        <div className={styles["link-to-login-container"]}>
          <Link
            to={"#"}
            className={styles["link-to-login"]}
            onClick={() => dispatch(modalActions.openModal("profile"))}
          >
            Затвори
          </Link>
        </div>
      </AuthModalWrapper>
    </Modal>
  );
};
