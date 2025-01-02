import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import { login } from "../../../store/authSlice";

import {
  INVALID_EMAIL_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "../../../constants/auth";
import type { AppDispatch } from "../../../store";
import {
  EMAIL_LABEL,
  LOADING_BUTTON_TEXT,
  LOGIN_BUTTON_TEXT,
  PASSWORD_LABEL,
  type LoginFormValues,
} from "../../../types/authTypes";

import { TextInput } from "./TextInput";
import { Button } from "../../Button";

import styles from "../Auth.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email(INVALID_EMAIL_MESSAGE)
    .required(REQUIRED_FIELD_MESSAGE),
  password: Yup.string().required(REQUIRED_FIELD_MESSAGE),
});

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>
  ) => {
    const { email, password } = values;
    setStatus({ error: null });

    try {
      await dispatch(login(email, password));
    } catch (error: any) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status, setFieldValue, setStatus }) => (
        <Form className={styles.form}>
          {status && status.error && (
            <div className={styles.errorMessage} role="alert">
              <p>{status.error}</p>
            </div>
          )}
          <TextInput
            label={EMAIL_LABEL}
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFieldValue("email", e.target.value);
              setStatus({ error: null });
            }}
          />
          <TextInput
            label={PASSWORD_LABEL}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Парола"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFieldValue("password", e.target.value);
              setStatus({ error: null });
            }}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
          />
          <Button
            type="submit"
            value={isSubmitting ? LOADING_BUTTON_TEXT : LOGIN_BUTTON_TEXT}
            color="green-cyan"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};
