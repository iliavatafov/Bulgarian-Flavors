import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { modalActions } from "../../../store/modalSlice";

import { CLOSE_BUTTON_TEXT } from "../../../constants/auth";

import styles from "../Auth.module.css";

export const UpdateProfileFormLinks = () => {
  const dispatch = useDispatch();
  const handleReturnLink = useCallback(() => {
    dispatch(modalActions.openModal("profile"));
  }, [dispatch]);

  return (
    <div className={styles["link-to-login-container"]}>
      <Link
        to={"#"}
        className={styles["link-to-login"]}
        onClick={handleReturnLink}
      >
        {CLOSE_BUTTON_TEXT}
      </Link>
    </div>
  );
};
