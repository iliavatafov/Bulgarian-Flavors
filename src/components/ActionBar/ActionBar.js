import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Tooltip, createTheme } from "@mui/material";
import { useState } from "react";

export const ActionBar = () => {
  const [isHovered, setIsHovered] = useState({
    facebook: false,
    twitter: false,
    pinterest: false,
    copy: false,
  });

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#00d49a",
      },
    },
  });

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
    <div>
      <div style={{ textAlign: "right" }}>
        <Tooltip title="Сподели в Facebook">
          <IconButton onClick={handleShareFacebook}>
            <FacebookIcon
              onMouseEnter={() =>
                setIsHovered((prevState) => ({
                  ...prevState,
                  facebook: true,
                }))
              }
              onMouseLeave={() =>
                setIsHovered((prevState) => ({
                  ...prevState,
                  facebook: false,
                }))
              }
              sx={{
                color: isHovered.facebook
                  ? customTheme.palette.primary.main
                  : undefined,
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Сподели в Twitter">
          <IconButton onClick={handleShareTwitter}>
            <TwitterIcon
              onMouseEnter={() =>
                setIsHovered((prevState) => ({
                  ...prevState,
                  twitter: true,
                }))
              }
              onMouseLeave={() =>
                setIsHovered((prevState) => ({
                  ...prevState,
                  twitter: false,
                }))
              }
              sx={{
                color: isHovered.twitter
                  ? customTheme.palette.primary.main
                  : undefined,
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Сподели в Pinterest">
          <IconButton onClick={handleSharePinterest}>
            <PinterestIcon
              onMouseEnter={() =>
                setIsHovered((prevState) => ({
                  ...prevState,
                  pinterest: true,
                }))
              }
              onMouseLeave={() =>
                setIsHovered((prevState) => ({
                  ...prevState,
                  pinterest: false,
                }))
              }
              sx={{
                color: isHovered.pinterest
                  ? customTheme.palette.primary.main
                  : undefined,
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Копирай линк">
          <IconButton onClick={handleCopyLink}>
            <FileCopyIcon
              onMouseEnter={() =>
                setIsHovered((prevState) => ({ ...prevState, copy: true }))
              }
              onMouseLeave={() =>
                setIsHovered((prevState) => ({ ...prevState, copy: false }))
              }
              sx={{
                color: isHovered.copy
                  ? customTheme.palette.primary.main
                  : undefined,
              }}
            />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
