import ReactDOM from "react-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import { logout } from "../../store/authSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Backdrop } from "../Modal/Backdrop";
import { ModalOverlay } from "../Modal/ModalOverlay";
import { Button } from "../Button/Button";

import styles from "./Profile.module.css";

export const Profile = () => {
  const [error, setError] = useState("");

  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    setError("");

    try {
      await dispatch(logout());
      dispatch(modalActions.closeModal());
      dispatch(modalActions.openModal("login"));
    } catch (error) {
      setError("Грешка при изход");
    }
  };

  const profileHTML = (
    <div className={styles["profile-container"]}>
      <FontAwesomeIcon
        icon={faXmark}
        className={styles.xmark}
        onClick={() => dispatch(modalActions.closeModal())}
      />
      <div className={styles["profile-body"]}>
        <h2 className={styles["profile-title"]}>Профил</h2>
        {error && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}
        <div>
          <strong>E-mail:</strong> {currentUser.currentUser}
        </div>
        <Button
          handler={() => dispatch(modalActions.openModal("updateProfile"))}
          type="button"
          value="Обновяване на профил"
          color="green-cyan"
        />
      </div>
      <div className={styles.logout}>
        <Link onClick={handleLogout}>Изход</Link>
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
        <ModalOverlay>{profileHTML}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
