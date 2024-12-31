import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { resetPassword } from "../../../store/authSlice";

import {
  INVALID_EMAIL_TEXT,
  REQUIRED_FIELD_TEXT,
  SUBMIT_BUTTON_TEXT,
  SUBMITTING_BUTTON_TEXT,
  SUCCESS_MESSAGE,
} from "../../../constants/auth";
import type { FormValues } from "../../../types/authTypes";

import { Button } from "../../Button";

import styles from "../Auth.module.css";

const validationSchema = Yup.object({
  email: Yup.string().email(INVALID_EMAIL_TEXT).required(REQUIRED_FIELD_TEXT),
});

export const ForgotPasswordForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (
      values: FormValues,
      { setSubmitting, setStatus }: FormikHelpers<FormValues>
    ) => {
      setStatus({ error: null, success: null });

      try {
        // @ts-ignore
        await dispatch(resetPassword(values.email));
        setStatus({ success: SUCCESS_MESSAGE + values.email });
      } catch (error: any) {
        setStatus({ error: error.message });
      } finally {
        setSubmitting(false);
      }
    },
    [dispatch]
  );

  return (
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFieldValue("email", e.target.value);
                setStatus({ error: null, success: null });
              }}
            />
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            value={isSubmitting ? SUBMITTING_BUTTON_TEXT : SUBMIT_BUTTON_TEXT}
            color="green-cyan"
          />
        </Form>
      )}
    </Formik>
  );
};
