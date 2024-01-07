import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

const initialState = {
  login: false,
  register: false,
  resetPassword: false,
  profile: false,
  updateProfile: false,
};

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(initialState);

  const handleOpenModal = (type) => {
    setShowModal((prevState) => ({
      ...initialState,
      [type]: true,
    }));
  };

  const handleCloseModal = () => {
    setShowModal(initialState);
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

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalContext;
