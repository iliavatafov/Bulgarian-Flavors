import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { Formik, Form, FormikHelpers } from "formik";

import type { AppDispatch } from "../../../store";
import { login } from "../../../store/authSlice";

import {
  loginFormSchema,
  loginValidationSchema,
} from "../../../constants/schemas/authSchemas";

import {
  LOGIN_LOADING_BUTTON_TEXT,
  LOGIN_BUTTON_TEXT,
} from "../../../constants/auth";
import { type LoginFormValues } from "../../../types/authTypes";

import { TextInput } from "../common/TextInput";
import { Button } from "../../Button";

import styles from "../Auth.module.css";

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
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status, setFieldValue, setStatus }) => (
        <Form className={styles.form}>
          {status && status.error && (
            <div className={styles.errorMessage} role="alert">
              <p>{status.error}</p>
            </div>
          )}
          {loginFormSchema.map((field) => (
            <TextInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={
                field.name === "password" && showPassword ? "text" : field.type
              }
              placeholder={field.placeholder}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFieldValue(field.name, e.target.value);
                setStatus({ error: null });
              }}
              showPassword={field.showPassword && showPassword}
              handleShowPassword={
                field.showPassword ? handleShowPassword : undefined
              }
            />
          ))}
          <Button
            type="submit"
            value={isSubmitting ? LOGIN_LOADING_BUTTON_TEXT : LOGIN_BUTTON_TEXT}
            color="green-cyan"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};
