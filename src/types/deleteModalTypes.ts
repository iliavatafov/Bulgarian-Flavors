export interface DeleteModalActionsProps {
  deleteHandler: () => void;
  closeModal: () => void;
}

export type DeleteModalType = {
  title: string;
  message: string;
  deleteHandler: () => void;
};
