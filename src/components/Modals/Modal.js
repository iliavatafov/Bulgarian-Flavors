import ReactDOM from "react-dom";

import { Backdrop } from "./Backdrop";
import { ModalOverlay } from "./ModalOverlay";

export const Modal = ({ children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
