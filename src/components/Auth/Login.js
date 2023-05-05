import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../cotext/AuthContext";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import styles from "./Auth.module.css";

export const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Грешно потребителско име или парола");
    }
    setLoading(false);
  };

  return (
    <div className={styles["auth-container"]}>
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
          <Button
            disabled={loading}
            type="submit"
            value={loading ? "Вход..." : "Вход"}
            color="blue"
          />
          <Button
            type="submit"
            value="Регистрирай се"
            color="white-blue"
            handler={() => navigate("/register")}
          />
        </form>

        <Link
          to="/forgot-password"
          className={styles["link-to-forgoten-password"]}
        >
          Забравена парола?
        </Link>
      </div>
      {/* <div className={styles["link-to-login-container"]}>
        Все още нямаш акаунт?
        <Link to={"/register"} className={styles["link-to-login"]}>
          Регистрация
        </Link>
      </div> */}
    </div>
  );
};
