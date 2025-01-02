import { useCallback, useState } from "react";
import type {
  Field,
  PasswordVisibility,
  PasswordVisibilityKeys,
} from "../types/authTypes";

export const usePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibility>({
      password: false,
      confirmPassword: false,
    });

  const togglePasswordVisibility = useCallback(
    (field: PasswordVisibilityKeys) => {
      setPasswordVisibility((prevState) => ({
        ...prevState,
        [field]: !prevState[field],
      }));
    },
    []
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

  return {
    getInputType,
    shouldShowPassword,
    getHandleShowPassword,
  };
};
