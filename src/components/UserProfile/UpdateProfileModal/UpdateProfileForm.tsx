import { ChangeEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePasswordVisibility } from "../../../hooks/usePasswordVisability";
import { get } from "lodash";

import type { AppDispatch, RootState } from "../../../store";
import { updatePassword } from "../../../store/authSlice";
import { modalActions } from "../../../store/modalSlice";

import { Form, Formik, FormikHelpers } from "formik";

import {
  updateProfileFormSchema,
  updateProfileValidationSchema,
} from "../../../constants/schemas/authSchemas";
import {
  UPDATE_PROFILE_BUTTON_TEXT,
  UPDATING_PROFILE_BUTTON_TEXT,
} from "../../../constants/auth";
import type { Field, RegisterFormValues } from "../../../types/authTypes";

import { FormInput } from "../common/FormInput";
import { StatusMessage } from "../common/StatusMessage";
import { Button } from "../../Button";

import styles from "../Auth.module.css";

export const UpdateProfileForm = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const { getInputType, shouldShowPassword, getHandleShowPassword } =
    usePasswordVisibility({
      password: false,
      confirmPassword: false,
    });

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = useCallback(
    async (
      values: RegisterFormValues,
      { setSubmitting, setStatus }: FormikHelpers<RegisterFormValues>
    ) => {
      const { password } = values;
      setStatus({ error: null });

      try {
        if (password) await dispatch(updatePassword(password));
        dispatch(modalActions.closeModal());
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
      initialValues={{
        email: get(currentUser, "currentUser", ""),
        password: "",
        confirmPassword: "",
      }}
      validationSchema={updateProfileValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status, setFieldValue, setStatus }) => (
        <Form className={styles["form"]}>
          {status && status.error && (
            <StatusMessage message={status.error} type="error" />
          )}
          {updateProfileFormSchema.map((field: Field) => (
            <FormInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={getInputType(field)}
              placeholder={field.placeholder}
              disabled={field.disabled}
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
            value={
              isSubmitting
                ? UPDATING_PROFILE_BUTTON_TEXT
                : UPDATE_PROFILE_BUTTON_TEXT
            }
            color="green-cyan"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};
