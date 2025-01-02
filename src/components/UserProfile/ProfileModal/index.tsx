import { useState } from "react";

import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { logout } from "../../../store/authSlice";

import { EXIT_ERROR_MESSAGE } from "../../../constants/auth";
import type { AppDispatch } from "../../../store";

import { ProfileModalWrapper } from "./ProfileModalWrapper";
import { ProfileModalContent } from "./ProfileModalContent";
import { Modal } from "../../Modals/Modal";
import { LogoutLink } from "./LogoutLink";

export const ProfileModal = () => {
  const [error, setError] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const handleLogout = async () => {
    setError("");

    try {
      await dispatch(logout());
      dispatch(modalActions.closeModal());
      dispatch(modalActions.openModal("login"));
    } catch (error) {
      setError(EXIT_ERROR_MESSAGE);
    }
  };

  return (
    <Modal>
      <ProfileModalWrapper>
        <ProfileModalContent error={error} />
        <LogoutLink handleLogout={handleLogout} />
      </ProfileModalWrapper>
    </Modal>
  );
};
