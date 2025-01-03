import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";

import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { resetPassword } from "../../../store/authSlice";

import { forgottenPasswordValidationSchema } from "../../../constants/schemas/authSchemas";
import {
  SUBMIT_BUTTON_TEXT,
  SUBMITTING_BUTTON_TEXT,
  SUCCESS_MESSAGE,
} from "../../../constants/auth";
import type { FormValues } from "../../../types/authTypes";
import type { AppDispatch } from "../../../store";

import { FormInput } from "../common/FormInput";
import { StatusMessage } from "../common/StatusMessage";
import { Button } from "../../Button";

import styles from "../UserProfile.module.css";

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
      validationSchema={forgottenPasswordValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status, setFieldValue, setStatus }) => (
        <Form className={styles["form"]}>
          <FormInput
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
            <StatusMessage message={status.error} type="error" />
          )}
          {status && status.success && (
            <StatusMessage message={status.success} type="success" />
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
