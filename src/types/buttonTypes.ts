import { ReactNode } from "react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  value?: string;
  color?: string;
  handler?: () => void;
  icon?: ReactNode;
  disabled?: boolean;
}
