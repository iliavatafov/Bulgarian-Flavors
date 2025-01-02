import { AuthModalWrapper } from "../AuthModalWrapper";
import { Modal } from "../../Modals/Modal";
import { LoginForm } from "./LoginForm";
import { LoginFormLinks } from "./LoginFormLinks";

import styles from "../Auth.module.css";

const LoginModalHeader = () => <h2 className={styles.title}>Вход</h2>;

export const LoginModal = () => {
  return (
    <Modal>
      <AuthModalWrapper>
        <LoginModalHeader />
        <LoginForm />
        <LoginFormLinks />
      </AuthModalWrapper>
    </Modal>
  );
};
