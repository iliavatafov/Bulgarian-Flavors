import { Modal } from "../../Modals/Modal";
import { AuthModalWrapper } from "../common/AuthModalWrapper";
import { ForgotPasswordForm } from "./ForgottenPasswordForm";
import { ForgottenPasswordLinks } from "./ForgottenPasswordLinks";

import { FORGOTTEN_PASSWORD_TITLE } from "../../../constants/auth";

import styles from "../Auth.module.css";
import { ModalTitle } from "../common/ModalTitle";

export const ForgottenPasswordModal = () => {
  return (
    <Modal>
      <AuthModalWrapper>
        <ModalTitle text={FORGOTTEN_PASSWORD_TITLE} />
        <ForgotPasswordForm />
        <ForgottenPasswordLinks />
      </AuthModalWrapper>
    </Modal>
  );
};
