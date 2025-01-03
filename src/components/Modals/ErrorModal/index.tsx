import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { modalActions } from "../../../store/modalSlice";

import { Modal } from "../Modal";
import { ErrorWrapperModal } from "./ErrorModalWrapper";
import { ErrorModalContents } from "./ErrorModalContents";
import { ErrorModalActions } from "./ErrorModalActions";

export const ErrorModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate("/");
    dispatch(modalActions.closeModal(), [dispatch]);
  }, [dispatch, navigate]);

  return (
    <Modal>
      <ErrorWrapperModal handleClose={handleClose}>
        <ErrorModalContents />
        <ErrorModalActions handleClose={handleClose} />
      </ErrorWrapperModal>
    </Modal>
  );
};
