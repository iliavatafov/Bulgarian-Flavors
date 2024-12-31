import { Modal } from "../../Modals/Modal";
import { AuthModalWrapper } from "../AuthModalWrapper";
import { ForgotPasswordForm } from "./ForgottenPasswordForm";
import { ForgottenPasswordLinks } from "./ForgottenPasswordLinks";

import { FORGOTTEN_PASSWORD_TITLE } from "../../../constants/auth";

import styles from "../Auth.module.css";

const ForgottenPasswordTitle = () => (
  <h2 className={styles.title}>{FORGOTTEN_PASSWORD_TITLE}</h2>
);

export const ForgotPasswordModal = () => {
  return (
    <Modal>
      <AuthModalWrapper>
        <ForgottenPasswordTitle />
        <ForgotPasswordForm />
        <ForgottenPasswordLinks />
      </AuthModalWrapper>
    </Modal>
  );
};
