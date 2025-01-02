import { AuthModalWrapper } from "../common/AuthModalWrapper";
import { Modal } from "../../Modals/Modal";
import { LoginForm } from "./LoginForm";
import { LoginFormLinks } from "./LoginFormLinks";
import { ModalTitle } from "../common/ModalTitle";

import { LOGIN_TEXT } from "../../../constants/auth";

export const LoginModal = () => {
  return (
    <Modal>
      <AuthModalWrapper>
        <ModalTitle text={LOGIN_TEXT} />
        <LoginForm />
        <LoginFormLinks />
      </AuthModalWrapper>
    </Modal>
  );
};
