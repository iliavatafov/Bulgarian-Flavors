import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FormikHelpers } from "formik";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

import { loadingActions } from "../store/loadingSlice.js";
import { modalActions } from "../store/modalSlice.js";
import { articleActions } from "../store/articlesSlice.js";

import ArticlesAPI from "../services/articles.js";

import {
  ERROR_MESSAGE_TITLE,
  GET_ALL_ARTICLES_ERROR_MESSAGE,
  inputInitialState,
  UPDATE_ARTICLE_ERROR_MESSAGE,
} from "../constants/myEditor";
import { trackArticleView } from "../analitics/firebase-analitics.js";
import type {
  Article,
  HandleSubmitValues,
  UseArticleManagementFormProps,
} from "../types/articlesTypes.js";

export const useArticleManagementForm = ({
  articleId,
  section,
  isEdit,
  editor,
  editorState,
  setEditorState,
  decorator,
}: UseArticleManagementFormProps) => {
  const [inputValues, setInputValues] = useState(inputInitialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createEmptyEditorState = () => {
    const newEditorState = EditorState.createEmpty(decorator);
    setEditorState(newEditorState);
  };

  const getArticles = useCallback(async () => {
    try {
      const article: Article | undefined = await ArticlesAPI.getArticleById(
        section,
        articleId
      );

      if (!article) throw new Error("Article not found");

      setInputValues({
        title: article.title || "",
        author: article.author || "",
        date: article.date || "",
        section: article.section || "",
        imageURL: article.URL || "",
      });

      const contentState = convertFromRaw(article.constent);
      const newEditorState = EditorState.createWithContent(
        contentState,
        decorator
      );

      setEditorState(newEditorState);
    } catch (error) {
      dispatch(
        modalActions.setErrorData({
          isError: true,
          title: "Грешка",
          message: "Възникна проблем при зареждане на статията.",
        })
      );
    }
  }, [articleId, section, decorator, dispatch, setEditorState, setInputValues]);

  const setInitialEditorState = () => {
    isEdit ? getArticles() : createEmptyEditorState();
  };

  useEffect(() => {
    if (editor) editor.current.focus();
    setInitialEditorState();
  }, [articleId, section]);

  const updateAllArticles = useCallback(async () => {
    try {
      const articles = await ArticlesAPI.getAllArticles();

      dispatch(
        articleActions.setArticles({
          collection: "allArticles",
          data: articles,
        })
      );
    } catch (error) {
      dispatch(
        modalActions.setErrorData({
          isError: true,
          title: ERROR_MESSAGE_TITLE,
          message: GET_ALL_ARTICLES_ERROR_MESSAGE,
        })
      );
    }
  }, [dispatch]);

  const handleSubmit = useCallback(
    async (
      values: HandleSubmitValues,
      { setSubmitting }: FormikHelpers<HandleSubmitValues>
    ) => {
      const { title, author, date, imageURL, section } = values;

      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);

      const newData = {
        title,
        author,
        date,
        URL: imageURL,
        section,
        constent: rawContentState,
      };

      dispatch(loadingActions.setLoadingTrue());

      try {
        const response = isEdit
          ? await ArticlesAPI.updateArticleData(articleId, section, newData)
          : await ArticlesAPI.addArticle(section, newData);

        const newArticleId = response?.id;

        if (newArticleId) {
          await updateAllArticles();
          trackArticleView(newArticleId);
          dispatch(modalActions.closeModal());
          navigate(`/${section}/${newArticleId}`);
        } else {
          throw new Error(UPDATE_ARTICLE_ERROR_MESSAGE);
        }
      } catch (error) {
        dispatch(
          modalActions.setErrorData({
            isError: true,
            title: ERROR_MESSAGE_TITLE,
            message: UPDATE_ARTICLE_ERROR_MESSAGE,
          })
        );
      } finally {
        dispatch(loadingActions.setLoadingFalse());
        setSubmitting(false);
      }
    },
    [
      dispatch,
      editorState,
      isEdit,
      navigate,
      articleId,
      section,
      updateAllArticles,
    ]
  );

  return { inputValues, handleSubmit };
};
