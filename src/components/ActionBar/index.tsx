import { FC } from "react";
import { useActionBar } from "../../hooks/useActionBar.tsx";

import type { ActionBarProps } from "../../types/actionBarTypes";

import { IconButtonWithTooltip } from "../IconButtonWithTooltip/index";

export const ActionBar: FC<ActionBarProps> = ({ articleUrl, ...rest }) => {
  const { getButtonsConfig } = useActionBar(articleUrl);

  return (
    <div className="action-bar" {...rest}>
      <div className="action-bar-icons">
        {getButtonsConfig.map((button) => (
          <IconButtonWithTooltip
            key={button.key}
            title={button.title}
            onClick={button.onClick}
            onMouseEnter={button.onMouseEnter}
            onMouseLeave={button.onMouseLeave}
            isHovered={button.isHovered}
            icon={button.icon}
          />
        ))}
      </div>
    </div>
  );
};
