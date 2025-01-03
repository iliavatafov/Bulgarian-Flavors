import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteArticle } from "../../../store/articlesSlice";
import { modalActions } from "../../../store/modalSlice";

import type { AppDispatch, RootState } from "../../../store";

import { DeleteModal } from "../DeleteModal";

export const DeleteArticleModal: FC = () => {
  const { title, message, section, articleId } = useSelector(
    (state: RootState) => state.modal.delete
  );

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteArticle = useCallback(async () => {
    try {
      await dispatch(deleteArticle(section, articleId));
      dispatch(modalActions.closeModal());
      navigate(`/${section}`);
    } catch (error) {
      console.error("Failed to delete the article: ", error);
    }
  }, [dispatch, section, articleId, navigate]);

  return (
    <DeleteModal
      title={title}
      message={message}
      deleteHandler={handleDeleteArticle}
    />
  );
};
