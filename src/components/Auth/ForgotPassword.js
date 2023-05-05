import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../cotext/AuthContext";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import styles from "./Auth.module.css";

export const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const emailRef = useRef();

  const { resetPassword } = useAuth();

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

  return (
    <div className={styles["auth-container"]}>
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
            label="E-mail"
            reference={emailRef}
            require={true}
          />
          <Button
            disabled={loading}
            type="submit"
            value={loading ? "Изпращане..." : "Изпрати"}
            color="blue"
          />
        </form>

        <Link to="/login" className={styles["link-to-login-forgoten-pass"]}>
          Вход
        </Link>
      </div>
      <div className={styles["link-to-login-container"]}>
        Все още нямаш акаунт?
        <Link to={"/register"} className={styles["link-to-login"]}>
          Регистрация
        </Link>
      </div>
    </div>
  );
};
