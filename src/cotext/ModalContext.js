import React, { useContext, useState } from "react";

const ModalContext = React.createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

const inipitalState = {
  login: false,
  register: false,
  resetPassword: false,
  profile: false,
  updateProfile: false,
};

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(inipitalState);

  const handleOpenModal = (type) => {
    switch (type) {
      case "login":
        setShowModal(() => ({
          login: true,
          register: false,
          resetPassword: false,
          profile: false,
          updateProfile: false,
        }));
        break;
      case "register":
        setShowModal(() => ({
          login: false,
          register: true,
          resetPassword: false,
          profile: false,
          updateProfile: false,
        }));
        break;
      case "resetPassword":
        setShowModal(() => ({
          login: false,
          register: false,
          resetPassword: true,
          profile: false,
          updateProfile: false,
        }));
        break;
      case "profile":
        setShowModal(() => ({
          login: false,
          register: false,
          resetPassword: false,
          profile: true,
          updateProfile: false,
        }));
        break;
      case "updateProfile":
        setShowModal(() => ({
          login: false,
          register: false,
          resetPassword: false,
          profile: false,
          updateProfile: true,
        }));
        break;
    }
  };

  const handleCloseModal = () => {
    setShowModal(inipitalState);
  };

  const value = {
    showModal,
    handleCloseModal,
    handleOpenModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
