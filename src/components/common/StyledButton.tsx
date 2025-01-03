import { FC } from "react";
import { Button, ThemeProvider } from "@mui/material";

import type { StyledButtonProps } from "../../types/styledButtonTypes";
import { styledButtonTheme } from "../../constants/styledButtonTheme";

export const StyledButton: FC<StyledButtonProps> = (props) => {
  return (
    <ThemeProvider theme={styledButtonTheme}>
      <Button {...props} />
    </ThemeProvider>
  );
};
