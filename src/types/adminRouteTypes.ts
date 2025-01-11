import { ReactNode } from "react";

export interface AdminRouteProps {
  children: ReactNode;
}

export interface User {
  uid: string;
  isAdmin: boolean;
}

export interface AuthState {
  currentUser: User;
}

export interface RootState {
  auth: AuthState;
}
