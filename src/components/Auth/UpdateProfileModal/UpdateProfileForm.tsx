import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";

import type { AppDispatch, RootState } from "../../../store";
import { updateEmail, updatePassword } from "../../../store/authSlice";
import { modalActions } from "../../../store/modalSlice";

import { Form, Formik, FormikHelpers } from "formik";

import {
  updateProfileFormSchema,
  updateProfileValidationSchema,
} from "../../../constants/schemas/authSchemas";
import {
  HELP_MESSAGE,
  UPDATE_PROFILE_BUTTON_TEXT,
  UPDATING_PROFILE_BUTTON_TEXT,
} from "../../../constants/auth";
import type {
  Field,
  PasswordVisibility,
  PasswordVisibilityKeys,
  RegisterFormValues,
} from "../../../types/authTypes";

import { TextInput } from "../common/TextInput";
import { Button } from "../../Button";

import styles from "../Auth.module.css";

export const UpdateProfileForm = () => {
  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibility>({
      password: false,
      confirmPassword: false,
    });
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = useCallback(
    async (
      values: RegisterFormValues,
      { setSubmitting, setStatus }: FormikHelpers<RegisterFormValues>
    ) => {
      const { email, password } = values;
      setStatus({ error: null });

      try {
        const promises = [];

        if (email !== get(currentUser, "currentUser", null)) {
          promises.push(dispatch(updateEmail(email)));
        }

        if (password) {
          promises.push(dispatch(updatePassword(password)));
        }

        await Promise.all(promises);
        dispatch(modalActions.closeModal());
      } catch (error: any) {
        setStatus({ error: error.message });
      } finally {
        setSubmitting(false);
      }
    },
    [currentUser, dispatch]
  );

  const getInputType = useCallback(
    (field: { showPassword?: boolean; name: string; type: string }) => {
      return field.showPassword &&
        passwordVisibility[field.name as PasswordVisibilityKeys]
        ? "text"
        : field.type;
    },
    [passwordVisibility]
  );

  const togglePasswordVisibility = useCallback(
    (fieldName: PasswordVisibilityKeys) => {
      setPasswordVisibility((prevState: any) => ({
        ...prevState,
        [fieldName]: !prevState[fieldName],
      }));
    },
    []
  );

  const shouldShowPassword = useCallback(
    (field: Field) => {
      return (
        field.showPassword &&
        passwordVisibility[field.name as PasswordVisibilityKeys]
      );
    },
    [passwordVisibility]
  );

  const getHandleShowPassword = useCallback(
    (field: Field) => {
      return field.showPassword
        ? () => togglePasswordVisibility(field.name as PasswordVisibilityKeys)
        : undefined;
    },
    [togglePasswordVisibility]
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
            <div className={styles.errorMessage}>
              <p>{status.error}</p>
            </div>
          )}
          {updateProfileFormSchema.map((field: Field) => (
            <TextInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={getInputType(field)}
              placeholder={field.placeholder}
              onChange={(e) => {
                setFieldValue(field.name, e.target.value);
                setStatus({ error: null });
              }}
              showPassword={shouldShowPassword(field)}
              handleShowPassword={getHandleShowPassword(field)}
            />
          ))}
          <p className={styles.helpMessage}>
            <span>*</span> {HELP_MESSAGE}
          </p>
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
