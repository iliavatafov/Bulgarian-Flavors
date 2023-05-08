import ReactDOM from "react-dom";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  faFacebook,
  faGoogle,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../cotext/AuthContext";
import { useModal } from "../../cotext/ModalContext";

import { Backdrop } from "../Modal/Backdrop";
import { ModalOverlay } from "../Modal/ModalOverlay";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import styles from "./Auth.module.css";
import { signInWithGoogle } from "../../firebase";

export const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login, googleLogin, facebookLogin } = useAuth();
  const { handleOpenModal, handleCloseModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      handleCloseModal();
    } catch (error) {
      setError("Грешно потребителско име или парола");
    }
    setLoading(false);
  };

  const handleShowPassword = () => {
    setShowPassword((oldState) => !oldState);
  };

  const loginHTML = (
    <div className={styles["auth-container"]}>
      <FontAwesomeIcon
        icon={faXmark}
        className={styles.xmark}
        onClick={handleCloseModal}
      />
      <div className={styles["auth-body"]}>
        <h2 className={styles.title}>Вход</h2>
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
          <Button
            disabled={loading}
            type="submit"
            value={loading ? "Вход..." : "Вход"}
            color="green-cyan"
          />
          <Button
            icon={<FontAwesomeIcon icon={faGoogle} />}
            disabled={loading}
            type="button"
            value={loading ? "Влизане..." : "Влез с Google акаунт"}
            color="brands"
            handler={googleLogin}
          />
          <Button
            icon={<FontAwesomeIcon icon={faSquareFacebook} />}
            disabled={loading}
            type="button"
            value={loading ? "Влизане..." : "Влез с Facebook акаунт"}
            color="brands"
            handler={facebookLogin}
          />
          <Button
            type="button"
            value="Регистрирай се"
            color="dark-blue"
            handler={() => handleOpenModal("register")}
          />
        </form>

        <Link
          to="#"
          onClick={() => handleOpenModal("resetPassword")}
          className={styles["link-to-forgoten-password"]}
        >
          Забравена парола?
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
        <ModalOverlay>{loginHTML}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
