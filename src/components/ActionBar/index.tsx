import { FC, HTMLAttributes, useState } from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import { handleShare } from "../../utils/actionBarUtils.ts";

import { IconButtonWithTooltip } from "../IconButtonWithTooltip/index.tsx";

interface ActionBarProps extends HTMLAttributes<HTMLDivElement> {
  articleUrl?: string;
}

export const ActionBar: FC<ActionBarProps> = ({ articleUrl, ...rest }) => {
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);
  const [isTwitterHovered, setIsTwitterHovered] = useState(false);
  const [isCopyHovered, setIsCopyHovered] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const urlToShare = articleUrl ? articleUrl : window.location.href;

  const handleCopyLink = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard
      .writeText(urlToShare)
      .then(() => {
        console.log("URL copied to clipboard");
        setIsLinkCopied(true);
      })
      .catch((error) => console.error("Error copying to clipboard:", error));
  };

  const buttons = [
    {
      key: "Facebook",
      title: "Сподели във Facebook",
      onClick: (event: React.MouseEvent) =>
        handleShare(event, "Facebook", urlToShare),
      onMouseEnter: () => setIsFacebookHovered(true),
      onMouseLeave: () => setIsFacebookHovered(false),
      isHovered: isFacebookHovered,
      icon: <FacebookIcon />,
    },
    {
      key: "Twitter",
      title: "Сподели в Twitter",
      onClick: (event: React.MouseEvent) =>
        handleShare(event, "Twitter", urlToShare, "Check out this link!"),
      onMouseEnter: () => setIsTwitterHovered(true),
      onMouseLeave: () => setIsTwitterHovered(false),
      isHovered: isTwitterHovered,
      icon: <TwitterIcon />,
    },
    {
      key: "CopyLink",
      title: "Копирай линк",
      onClick: handleCopyLink,
      onMouseEnter: () => setIsCopyHovered(true),
      onMouseLeave: () => setIsCopyHovered(false),
      isHovered: isCopyHovered || isLinkCopied,
      icon: isLinkCopied ? <CheckCircleOutline /> : <FileCopyIcon />,
    },
  ];

  return (
    <div className="action-bar" {...rest}>
      <div className="action-bar-icons">
        {buttons.map((button) => (
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
