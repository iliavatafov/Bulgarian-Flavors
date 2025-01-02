import { Modal } from "../../Modals/Modal";
import { AuthModalWrapper } from "../AuthModalWrapper";
import { RegisterForm } from "./RegisterForm";
import { RegisterFormLinks } from "./RegisterFormLinks";

import styles from "../Auth.module.css";

const RegisterModalHeader = () => <h2 className={styles.title}>Регистрация</h2>;

export const RegisterModal = () => {
  return (
    <Modal>
      <AuthModalWrapper>
        <RegisterModalHeader />
        <RegisterForm />
        <RegisterFormLinks />
      </AuthModalWrapper>
    </Modal>
  );
};
