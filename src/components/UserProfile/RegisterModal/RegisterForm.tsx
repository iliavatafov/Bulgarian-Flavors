import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { usePasswordVisibility } from "../../../hooks/usePasswordVisability";

import { Formik, Form, FormikHelpers } from "formik";

import { register } from "../../../store/authSlice";

import {
  registerFormSchema,
  registerValidationSchema,
} from "../../../constants/schemas/authSchemas";

import { LOADING_BUTTON_TEXT, REGISTER_TEXT } from "../../../constants/auth";
import type { AppDispatch } from "../../../store";
import type { Field, RegisterFormValues } from "../../../types/authTypes";

import { Button } from "../../Button";
import { TextInput } from "../common/TextInput";

import styles from "../Auth.module.css";

export const RegisterForm = () => {
  const { getInputType, shouldShowPassword, getHandleShowPassword } =
    usePasswordVisibility();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = useCallback(
    async (
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
    },
    [dispatch]
  );

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status, setFieldValue, setStatus }) => (
        <Form className={styles["form"]}>
          {status && status.error && (
            <div className={styles.errorMessage}>
              <p>{status.error}</p>
            </div>
          )}
          {registerFormSchema.map((field: Field) => (
            <TextInput
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
            value={isSubmitting ? LOADING_BUTTON_TEXT : REGISTER_TEXT}
            color="green-cyan"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};
