import { MouseEventHandler, ReactNode } from "react";

export interface IconButtonWithTooltipProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  isHovered?: boolean;
  icon: ReactNode;
}
