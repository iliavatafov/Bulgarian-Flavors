import { ChangeEvent, ReactNode } from "react";

export interface AuthModalWrapperProps {
  children: ReactNode;
}

export interface FormValues {
  email: string;
}

export interface ProfileModalContentProps {
  error?: string;
}

export interface CurrentUser {
  currentUser: string;
  uid: string;
}

export interface ExitLinkProps {
  handleLogout: () => void;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ModalTitleProps {
  text: string;
}

export type PasswordVisibilityKeys = "password" | "confirmPassword";

export interface PasswordVisibility {
  password: boolean;
  confirmPassword?: boolean;
}

export interface Field {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  showPassword?: boolean;
  disabled?: boolean;
}

export interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  handleShowPassword?: () => void;
  className?: string;
  disabled?: boolean;
}

export interface StatusMessageProps {
  message: string;
  type: "error" | "success";
}
