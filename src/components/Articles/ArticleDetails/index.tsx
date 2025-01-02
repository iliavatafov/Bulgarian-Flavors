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

import { modalActions } from "../../../store/modalSlice";

import type { CurrentUser } from "../../../types/articlesTypes";

import { ActionBar } from "../../ActionBar";
import { AdminActions } from "../AdminActions/index";
import { ArticleHeader } from "../ArticleHeader/index";
import { ArticleContent } from "../ArticleContent/index";
import EmptyState from "../../EmptyState/EmptyState";

import styles from "./styles.module.css";

export const ArticleDetails: FC = () => {
  const currentUser = useSelector(
    (state: { auth: { currentUser: CurrentUser | null } }) =>
      state.auth.currentUser
  );

  const { section, articleId } = useParams<{
    section: string;
    articleId: string;
  }>();

  const { articleData, rawData, isLoading, error } = useFetchArticle(
    section || "",
    articleId || ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openDeleteModal = () => {
    dispatch(
      modalActions.setDeleteModal({
        isDelete: true,
        title: DELETE_MODAL_TITLE,
        message: DELETE_MODAL_MESSAGE,
        section: section || "",
        articleId: articleId || "",
      })
    );
  };

  const editArticle = () => {
    navigate(`/edit-article/${section}/${articleId}`);
  };

  const getTitle = useCallback(
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
        title={getTitle("title")}
        author={getTitle("author")}
        date={getTitle("date")}
      />
      <ImageList cols={1}>
        <ImageListItem>
          <img src={getTitle("URL") ?? "#"} alt={getTitle("title")} />
        </ImageListItem>
      </ImageList>
      <ArticleContent articleData={articleData} />
      <div className={styles["footer"]}>
        <ActionBar />
      </div>
    </div>
  );
};
