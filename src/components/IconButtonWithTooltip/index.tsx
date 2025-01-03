import { IconButton, Tooltip } from "@mui/material";
import { FC } from "react";

import { getSxProps } from "../../utils/iconButtonUtils";
import type { IconButtonWithTooltipProps } from "../../types/iconButtonTypes";

export const IconButtonWithTooltip: FC<IconButtonWithTooltipProps> = ({
  title,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isHovered = false,
  icon,
}) => (
  <Tooltip title={title}>
    <IconButton
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={getSxProps(isHovered)}
    >
      {icon}
    </IconButton>
  </Tooltip>
);
