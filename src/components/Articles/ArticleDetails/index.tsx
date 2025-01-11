import { FC, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetchArticle } from "../../../hooks/useFetchArticle";
import { get } from "lodash";

import { CircularProgress, ImageList, ImageListItem } from "@mui/material";

import {
  ADMIN_EMAIL,
  DELETE_MODAL_MESSAGE,
  DELETE_MODAL_TITLE,
  ERROR_MESSAGE,
} from "../../../constants/articleDetails";
import type { CurrentUser } from "../../../types/articlesTypes";

import { modalActions } from "../../../store/modalSlice";

import { AdminActions } from "../AdminActions/index";
import { ArticleHeader } from "./ArticleHeader/index";
import { ArticleContent } from "./ArticleContent";
import EmptyState from "../../EmptyState/EmptyState";

import styles from "./styles.module.css";
import { ArticleFooter } from "./ArticleFooter";

export const ArticleDetails: FC = () => {
  const { section, articleId } = useParams<{
    section: string;
    articleId: string;
  }>();

  const currentUser = useSelector(
    (state: { auth: { currentUser: CurrentUser } }) => state.auth.currentUser
  );
  const { articleData, rawData, isLoading, error } = useFetchArticle(
    section || "",
    articleId || ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openDeleteModal = useCallback(() => {
    dispatch(
      modalActions.setDeleteModal({
        key: "article",
        title: DELETE_MODAL_TITLE,
        message: DELETE_MODAL_MESSAGE,
        section: section,
        articleId: articleId,
      })
    );
  }, [dispatch, section, articleId]);

  const editArticle = useCallback(() => {
    dispatch(
      modalActions.setManageArticleModal({
        isEdit: true,
        isCreate: false,
        show: true,
      })
    );
  }, [navigate, section, articleId]);

  const getItemContent = useCallback(
    (key: string) => {
      return get(rawData, key, "");
    },
    [rawData]
  );

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <CircularProgress />
      </div>
    );
  }

  if (!articleData.length || error) {
    return <EmptyState text={ERROR_MESSAGE} />;
  }

  return (
    <div className={styles["article-wrapper"]}>
      {currentUser?.currentUser === ADMIN_EMAIL && (
        <AdminActions
          editArticle={editArticle}
          openDeleteModal={openDeleteModal}
        />
      )}
      <ArticleHeader
        title={getItemContent("title")}
        author={getItemContent("author")}
        date={getItemContent("date")}
      />
      <ImageList cols={1}>
        <ImageListItem>
          <img
            src={getItemContent("URL") ?? "#"}
            alt={getItemContent("title")}
          />
        </ImageListItem>
      </ImageList>
      <ArticleContent articleData={articleData} />
      <ArticleFooter />
    </div>
  );
};
