import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../cotext/AuthContext";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import styles from "./Auth.module.css";

export const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Паролата не съвпада");
    }

    try {
      setError("");
      setLoading(true);
      await register(emailRef.current.value, passwordRef.current.value);
      navigate("/");
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

  return (
    <div className={styles["auth-container"]}>
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
            label="E-mail"
            reference={emailRef}
            require={true}
          />
          <Input
            type="password"
            id="password"
            label="Парола"
            reference={passwordRef}
            require={true}
          />
          <Input
            type="password"
            id="password-confirm"
            label="Повторете паролата"
            reference={passwordConfirmRef}
            require={true}
          />
          <Button
            disabled={loading}
            type="submit"
            value={loading ? "Акаунтът се създава..." : "Регистрация"}
            color="blue"
          />
        </form>
      </div>
      <div className={styles["link-to-login-container"]}>
        Вече имаш профил?
        <Link to={"/login"} className={styles["link-to-login"]}>
          Вход
        </Link>
      </div>
    </div>
  );
};
