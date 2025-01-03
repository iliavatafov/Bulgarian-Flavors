import { ReactNode } from "react";

export type ErrorWrapperModalProps = {
  handleClose: () => void;
  children: ReactNode;
};

export type ErrorModalActionsProps = {
  handleClose: () => void;
};
