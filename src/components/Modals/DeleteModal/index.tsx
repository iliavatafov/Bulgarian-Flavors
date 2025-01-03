import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";

import { modalActions } from "../../../store/modalSlice";

import type { DeleteModalType } from "../../../types/deleteModalTypes";
import type { AppDispatch } from "../../../store";

import { DeleteModalWrapper } from "./DeleteModalWrapper";
import { Modal } from "../Modal";
import { DeleteModalContent } from "./DeleteModalContent";
import { DeleteModalActions } from "./DeleteModalActions";

export const DeleteModal: FC<DeleteModalType> = ({
  title,
  message,
  deleteHandler,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const closeModal = useCallback(() => {
    dispatch(modalActions.closeModal());
  }, [dispatch]);

  return (
    <Modal>
      <DeleteModalWrapper>
        <DeleteModalContent title={title} message={message} />
        <DeleteModalActions
          deleteHandler={deleteHandler}
          closeModal={closeModal}
        />
      </DeleteModalWrapper>
    </Modal>
  );
};
