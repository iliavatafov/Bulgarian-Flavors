import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../cotext/AuthContext";

import { Button } from "../Button/Button";

import styles from "./Profile.module.css";

export const Profile = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  const redirectToUpdatePage = () => {
    navigate("/update-profile");
  };

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Грешка при изход");
    }
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-body"]}>
        <h2 className={styles["profile-title"]}>Профил</h2>
        {error && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}
        <div>
          <strong>E-mail:</strong> {currentUser.email}
        </div>
        <Button
          handler={redirectToUpdatePage}
          type="button"
          value="Обновяване на профил"
          color="blue"
        />
      </div>
      <div className={styles.logout}>
        <Link onClick={handleLogout}>Изход</Link>
      </div>
    </div>
  );
};
