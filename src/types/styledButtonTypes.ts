import { ButtonProps } from "@mui/material";

export interface StyledButtonProps extends ButtonProps {
  color?:
    | "greenCyan"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "darkblue"
    | "lightblue";
}
