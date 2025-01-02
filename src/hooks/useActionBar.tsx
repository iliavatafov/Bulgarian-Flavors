import { useState, useCallback, useMemo, MouseEvent } from "react";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import { handleShare as handleShareUtil } from "../utils/actionBarUtils";

import {
  COPY_LINK_KEY,
  COPY_LINK_TITLE,
  FACEBOOK_KEY,
  FACEBOOK_TITLE,
  TWITTER_KEY,
  TWITTER_TEXT,
  TWITTER_TITLE,
} from "../constants/actionBar";

export const useActionBar = (articleUrl?: string) => {
  const [hoverState, setHoverState] = useState({
    isFacebookHovered: false,
    isTwitterHovered: false,
    isCopyHovered: false,
    isLinkCopied: false,
  });

  const urlToShare = articleUrl ?? window.location.href;

  const handleCopyLink = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();

      navigator.clipboard
        .writeText(urlToShare)
        .then(() => {
          console.log("URL copied to clipboard");
          setHoverState((prevState) => ({ ...prevState, isLinkCopied: true }));
        })
        .catch((error) => console.error("Error copying to clipboard:", error));
    },
    [urlToShare]
  );

  const handleShare = useCallback(
    (
      event: MouseEvent,
      platform: string,
      urlToShare: string,
      text?: string
    ) => {
      handleShareUtil(event, platform, urlToShare, text);
    },
    [urlToShare]
  );

  const getButtonsConfig = useMemo(
    () => [
      {
        key: FACEBOOK_KEY,
        title: FACEBOOK_TITLE,
        onClick: (event: MouseEvent) =>
          handleShare(event, FACEBOOK_KEY, urlToShare),
        onMouseEnter: () =>
          setHoverState((prevState) => ({
            ...prevState,
            isFacebookHovered: true,
          })),
        onMouseLeave: () =>
          setHoverState((prevState) => ({
            ...prevState,
            isFacebookHovered: false,
          })),
        isHovered: hoverState.isFacebookHovered,
        icon: <FacebookIcon />,
      },
      {
        key: TWITTER_KEY,
        title: TWITTER_TITLE,
        onClick: (event: MouseEvent) =>
          handleShare(event, TWITTER_KEY, urlToShare, TWITTER_TEXT),
        onMouseEnter: () =>
          setHoverState((prevState) => ({
            ...prevState,
            isTwitterHovered: true,
          })),
        onMouseLeave: () =>
          setHoverState((prevState) => ({
            ...prevState,
            isTwitterHovered: false,
          })),
        isHovered: hoverState.isTwitterHovered,
        icon: <TwitterIcon />,
      },
      {
        key: COPY_LINK_KEY,
        title: COPY_LINK_TITLE,
        onClick: handleCopyLink,
        onMouseEnter: () =>
          setHoverState((prevState) => ({ ...prevState, isCopyHovered: true })),
        onMouseLeave: () =>
          setHoverState((prevState) => ({
            ...prevState,
            isCopyHovered: false,
          })),
        isHovered: hoverState.isCopyHovered || hoverState.isLinkCopied,
        icon: hoverState.isLinkCopied ? (
          <CheckCircleOutline />
        ) : (
          <FileCopyIcon />
        ),
      },
    ],
    [handleShare, handleCopyLink, hoverState, urlToShare]
  );

  return { getButtonsConfig };
};
