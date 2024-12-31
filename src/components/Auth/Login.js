import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import { login } from "../../store/authSlice";

// import { faGoogle, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../Button";
import { Input } from "../Input/Input";
import { Modal } from "../Modals/Modal";

import styles from "./Auth.module.css";
import { AuthModalWrapper } from "./AuthModalWrapper";

export const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setError("");
      await dispatch(login(emailRef.current.value, passwordRef.current.value));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((oldState) => !oldState);
  };

  const openRegisterModal = () => dispatch(modalActions.openModal("register"));
  const openResetPasswordModal = () =>
    dispatch(modalActions.openModal("resetPassword"));

  return (
    <Modal>
      <AuthModalWrapper>
        <h2 className={styles.title}>Вход</h2>
        {error && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles["signup-form"]}>
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
          <Button
            disabled={isLoading}
            type="submit"
            value={isLoading ? "Вход..." : "Вход"}
            color="green-cyan"
          />
          {/* <Button
          icon={<FontAwesomeIcon icon={faGoogle} />}
          disabled={isLoading}
          type="button"
          value="Влез с Google"
          color="brands"
        />
        <Button
          icon={<FontAwesomeIcon icon={faSquareFacebook} />}
          disabled={isLoading}
          type="button"
          value="Влез с Facebook"
          color="brands"
        /> */}
          <Button
            type="button"
            value="Регистрирай се"
            color="dark-blue"
            handler={openRegisterModal}
          />
        </form>

        <Link
          to="#"
          onClick={openResetPasswordModal}
          className={styles["link-to-forgoten-password"]}
        >
          Забравена парола?
        </Link>
      </AuthModalWrapper>
    </Modal>
  );
};
