import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FileCopyIcon from "@mui/icons-material/FileCopy";

export const ActionBar = () => {
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);
  const [isTwitterHovered, setIsTwitterHovered] = useState(false);
  const [isPinterestHovered, setIsPinterestHovered] = useState(false);
  const [isCopyHovered, setIsCopyHovered] = useState(false);

  const handleShareFacebook = () => {
    console.log("facebook share");
  };

  const handleShareTwitter = () => {
    console.log("twiter share");
  };

  const handleSharePinterest = () => {
    console.log("pinterest share");
  };

  const handleCopyLink = () => {
    console.log("copy url");
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
        <Tooltip title="Сподели в Pinterest">
          <IconButton
            onClick={handleSharePinterest}
            onMouseEnter={() => setIsPinterestHovered(true)}
            onMouseLeave={() => setIsPinterestHovered(false)}
            sx={{ color: isPinterestHovered ? "#00d49a" : undefined }}
          >
            <PinterestIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Копирай линк">
          <IconButton
            onClick={handleCopyLink}
            onMouseEnter={() => setIsCopyHovered(true)}
            onMouseLeave={() => setIsCopyHovered(false)}
            sx={{ color: isCopyHovered ? "#00d49a" : undefined }}
          >
            <FileCopyIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
