import { FC } from "react";
import ReactDOM from "react-dom";

import type { ModalProps } from "../../../types/modalTypes";

import { Backdrop } from "../Backdrop";
import { ModalOverlay } from "./ModalOverlay/index";

export const Modal: FC<ModalProps> = ({ children }) => {
  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");

  if (!backdropRoot || !overlayRoot) return null;

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, backdropRoot)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        overlayRoot
      )}
    </>
  );
};
