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
