import { useState } from "react";

import { IconButton, Tooltip } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { CheckCircleOutline } from "@mui/icons-material";

export const ActionBar = ({ articleUrl }) => {
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);
  const [isTwitterHovered, setIsTwitterHovered] = useState(false);
  const [isCopyHovered, setIsCopyHovered] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleShareFacebook = (event) => {
    event.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: articleUrl ? articleUrl : window.location.href,
        })
        .then(() => console.log("Shared to Facebook"))
        .catch((error) => console.error("Error sharing to Facebook:", error));
    }
  };

  const handleShareTwitter = (event) => {
    event.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: "Check out this link!",
          url: articleUrl ? articleUrl : window.location.href,
        })
        .then(() => console.log("Shared to Twitter"))
        .catch((error) => console.error("Error sharing to Twitter:", error));
    }
  };

  const handleCopyLink = (event) => {
    event.stopPropagation();
    navigator.clipboard
      .writeText(articleUrl ? articleUrl : window.location.href)
      .then(() => {
        console.log("URL copied to clipboard");
        setIsLinkCopied(true);
      })
      .catch((error) => console.error("Error copying to clipboard:", error));
  };

  return (
    <div className="action-bar">
      <div className="action-bar-icons">
        <Tooltip title="Сподели в Facebook">
          <IconButton
            onClick={handleShareFacebook}
            onMouseEnter={() => setIsFacebookHovered(true)}
            onMouseLeave={() => setIsFacebookHovered(false)}
            sx={{ color: isFacebookHovered ? "#00d49a" : undefined }}
          >
            <FacebookIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Сподели в Twitter">
          <IconButton
            onClick={handleShareTwitter}
            onMouseEnter={() => setIsTwitterHovered(true)}
            onMouseLeave={() => setIsTwitterHovered(false)}
            sx={{ color: isTwitterHovered ? "#00d49a" : undefined }}
          >
            <TwitterIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Копирай линк">
          <IconButton
            onClick={handleCopyLink}
            onMouseEnter={() => setIsCopyHovered(true)}
            onMouseLeave={() => setIsCopyHovered(false)}
            sx={{
              color: isCopyHovered || isLinkCopied ? "#00d49a" : undefined,
            }}
          >
            {isLinkCopied ? <CheckCircleOutline /> : <FileCopyIcon />}
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
