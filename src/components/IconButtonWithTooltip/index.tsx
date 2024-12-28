import { IconButton, Tooltip } from "@mui/material";
import { FC, MouseEventHandler, ReactNode } from "react";

interface IconButtonWithTooltipProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  isHovered?: boolean;
  icon: ReactNode;
}

export const IconButtonWithTooltip: FC<IconButtonWithTooltipProps> = ({
  title,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  icon,
}) => (
  <Tooltip title={title}>
    <IconButton
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{ color: isHovered ? "#00d49a" : undefined }}
    >
      {icon}
    </IconButton>
  </Tooltip>
);
