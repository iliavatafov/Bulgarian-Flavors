import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { resetPassword } from "../../../store/authSlice";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../Button/Button";
import { Modal } from "../../Modals/Modal";

import {
  FORGOTTEN_PASSWORD_TITLE,
  NO_ACCOUNT_LINK_TEXT,
  REGISTRATION_LINK_TEXT,
  SUCCESS_MESSAGE,
} from "../../../constants/auth";

import styles from "../Auth.module.css";

export const ForgotPassword = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus({ error: null, success: null });

    try {
      await dispatch(resetPassword(values.email));
      setStatus({ success: SUCCESS_MESSAGE + values.email });
    } catch (error) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Невалиден формат на e-mail адрес")
      .required("Полето е задължително"),
  });

  const openModal = () => dispatch(modalActions.openModal("register"));
  const closeModal = () => dispatch(modalActions.closeModal());

  return (
    <Modal>
      <div className={styles["auth-container"]}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.xmark}
          onClick={closeModal}
          aria-label="Close"
        />
        <div className={styles["auth-body"]}>
          <h2 className={styles.title}>{FORGOTTEN_PASSWORD_TITLE}</h2>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status, setFieldValue, setStatus }) => (
              <Form className={styles["signup-form"]}>
                {status && status.error && (
                  <div className={styles.errorMessage} role="alert">
                    <p>{status.error}</p>
                  </div>
                )}
                {status && status.success && (
                  <div className={styles.message} role="status">
                    <p>{status.success}</p>
                  </div>
                )}
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.errorMessage}
                />
                <div>
                  <label htmlFor="email">E-mail</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className={styles.input}
                    onChange={(e) => {
                      setFieldValue("email", e.target.value);
                      setStatus({ error: null, success: null });
                    }}
                  />
                </div>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  value={isSubmitting ? "Изпращане..." : "Изпрати"}
                  color="green-cyan"
                />
              </Form>
            )}
          </Formik>
        </div>
        <Link
          to="#"
          onClick={() => dispatch(modalActions.openModal("login"))}
          className={styles["link-to-login-forgoten-pass"]}
        >
          Вход
        </Link>
        <div className={styles["link-to-login-container"]}>
          {NO_ACCOUNT_LINK_TEXT}
          <Link to="#" className={styles["link-to-login"]} onClick={openModal}>
            {REGISTRATION_LINK_TEXT}
          </Link>
        </div>
      </div>
    </Modal>
  );
};
