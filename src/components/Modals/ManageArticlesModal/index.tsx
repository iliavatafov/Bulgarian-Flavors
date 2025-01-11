import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  CREATE_ARTICLE_TEXT,
  UPDATE_ARTICLE_TEXT,
} from "../../../constants/createArticle";
import type { RootState } from "../../../types/articlesTypes";

import { Modal } from "../Modal";
import { ArticleManagementForm } from "./ArticleManagementForm";
import { ArticleManagementModal } from "./ArticleManagementModal";
import { ArticleManagementTitle } from "./ArticleManagementTitle";

export const ManageArticlesModal = () => {
  const { articleId, section } = useParams();
  const { isEdit } = useSelector(
    (state: RootState) => state.modal.manageArticle
  );

  return (
    <Modal>
      <ArticleManagementModal>
        <ArticleManagementTitle
          title={isEdit ? UPDATE_ARTICLE_TEXT : CREATE_ARTICLE_TEXT}
        />
        <ArticleManagementForm
          isEdit={isEdit}
          articleId={articleId}
          section={section}
        />
      </ArticleManagementModal>
    </Modal>
  );
};
