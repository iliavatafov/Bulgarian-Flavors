import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Form, Formik, FormikHelpers } from "formik";
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
import type { AppDispatch } from "../../../store";

import { TextInput } from "../common/TextInput";
import { Button } from "../../Button";

import styles from "../Auth.module.css";

const validationSchema = Yup.object({
  email: Yup.string().email(INVALID_EMAIL_TEXT).required(REQUIRED_FIELD_TEXT),
});

export const ForgotPasswordForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = useCallback(
    async (
      values: FormValues,
      { setSubmitting, setStatus }: FormikHelpers<FormValues>
    ) => {
      setStatus({ error: null, success: null });

      try {
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
        <Form className={styles["form"]}>
          <TextInput
            label="E-mail"
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFieldValue("email", e.target.value);
              setStatus({ error: null, success: null });
            }}
          />
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
