import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { usePasswordVisibility } from "../../../hooks/usePasswordVisability";

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

import { FormInput } from "../common/FormInput";
import { StatusMessage } from "../common/StatusMessage";
import { Button } from "../../Button";

import styles from "../Auth.module.css";

export const LoginForm = () => {
  const { getInputType, shouldShowPassword, getHandleShowPassword } =
    usePasswordVisibility({ password: false });
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = useCallback(
    async (
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
    },
    [dispatch]
  );

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status, setFieldValue, setStatus }) => (
        <Form className={styles.form}>
          {status && status.error && (
            <StatusMessage message={status.error} type="error" />
          )}
          {loginFormSchema.map((field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={getInputType(field)}
              placeholder={field.placeholder}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setFieldValue(field.name, e.target.value);
                setStatus({ error: null });
              }}
              showPassword={shouldShowPassword(field)}
              handleShowPassword={getHandleShowPassword(field)}
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
