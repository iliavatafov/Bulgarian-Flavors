import { ReactNode } from "react";

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

export const EMAIL_LABEL = "E-mail";

export const PASSWORD_LABEL = "Парола";

export const LOADING_BUTTON_TEXT = "Влизане...";

export const LOGIN_BUTTON_TEXT = "Влез";
