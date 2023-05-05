import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../cotext/AuthContext";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

import styles from "./Auth.module.css";

export const UpdateProfile = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, updateEmail, updatePassword } = useAuth();

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

  return (
    <div className={styles["auth-container"]}>
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
            type="password"
            id="password"
            label="Парола"
            reference={passwordRef}
            placeHolder="Остави празнo, за да запазиш същата парола"
          />
          <Input
            type="password"
            id="password-confirm"
            label="Повторете паролата"
            reference={passwordConfirmRef}
            placeHolder="Остави празнo, за да запазиш същата парола"
          />
          <Button
            disabled={loading}
            type="submit"
            value={loading ? "Обновяване..." : "Обнови"}
            color="blue"
          />
        </form>
      </div>
      <div className={styles["link-to-login-container"]}>
        <Link to={"/profile"} className={styles["link-to-login"]}>
          Затвори
        </Link>
      </div>
    </div>
  );
};
