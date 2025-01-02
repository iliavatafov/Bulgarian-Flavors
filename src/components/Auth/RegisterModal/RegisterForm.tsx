import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../../store/authSlice";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import {
  INVALID_EMAIL_TEXT,
  LOADING_BUTTON_TEXT,
  PASSWORDS_DONT_MATCH_MESSAGE,
  REGISTER_TEXT,
  REQUIRED_FIELD_TEXT,
} from "../../../constants/auth";
import type { AppDispatch } from "../../../store";
import type { RegisterFormValues } from "../../../types/authTypes";

import { Button } from "../../Button";
import { TextInput } from "../common/TextInput";

import styles from "../Auth.module.css";

const validationSchema = Yup.object({
  email: Yup.string().email(INVALID_EMAIL_TEXT).required(REQUIRED_FIELD_TEXT),
  password: Yup.string().required(REQUIRED_FIELD_TEXT),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], PASSWORDS_DONT_MATCH_MESSAGE)
    .required(REQUIRED_FIELD_TEXT),
});

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepass, setShowRepass] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting, setStatus }: FormikHelpers<RegisterFormValues>
  ) => {
    setStatus({ error: null });

    try {
      await dispatch(register(values.email, values.password));
    } catch (error: any) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

  const handleShowRepass = useCallback(() => {
    setShowRepass((prevState) => !prevState);
  }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status, setFieldValue, setStatus }) => (
        <Form className={styles["form"]}>
          {status && status.error && (
            <div className={styles.errorMessage}>
              <p>{status.error}</p>
            </div>
          )}
          <TextInput
            label="E-mail"
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFieldValue("email", e.target.value);
              setStatus({ error: null });
            }}
          />
          <TextInput
            label="Парола"
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
          <TextInput
            label="Повторете паролата"
            name="confirmPassword"
            type={showRepass ? "text" : "password"}
            placeholder="Повторете паролата"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFieldValue("confirmPassword", e.target.value);
              setStatus({ error: null });
            }}
            showPassword={showRepass}
            handleShowPassword={handleShowRepass}
          />
          <Button
            type="submit"
            value={isSubmitting ? LOADING_BUTTON_TEXT : REGISTER_TEXT}
            color="green-cyan"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};
