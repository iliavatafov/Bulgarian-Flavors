import { REGISTER_TEXT } from "../../../constants/auth";

import { Modal } from "../../Modals/Modal";
import { AuthModalWrapper } from "../common/AuthModalWrapper";
import { RegisterForm } from "./RegisterForm";
import { RegisterFormLinks } from "./RegisterFormLinks";
import { ModalTitle } from "../common/ModalTitle";

export const RegisterModal = () => {
  return (
    <Modal>
      <AuthModalWrapper>
        <ModalTitle text={REGISTER_TEXT} />
        <RegisterForm />
        <RegisterFormLinks />
      </AuthModalWrapper>
    </Modal>
  );
};
