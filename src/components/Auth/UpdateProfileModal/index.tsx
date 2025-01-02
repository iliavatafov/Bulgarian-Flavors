import { UPDATE_ACCOUNT_TEXT } from "../../../constants/auth";

import { AuthModalWrapper } from "../common/AuthModalWrapper";
import { ModalTitle } from "../common/ModalTitle";
import { Modal } from "../../Modals/Modal";
import { UpdateProfileForm } from "./UpdateProfileForm";
import { UpdateProfileFormLinks } from "./UpdateProfileFormLinks";

export const UpdateProfileModal = () => {
  return (
    <Modal>
      <AuthModalWrapper>
        <ModalTitle text={UPDATE_ACCOUNT_TEXT} />
        <UpdateProfileForm />
        <UpdateProfileFormLinks />
      </AuthModalWrapper>
    </Modal>
  );
};
