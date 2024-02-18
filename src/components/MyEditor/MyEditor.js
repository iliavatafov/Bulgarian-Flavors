import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { modalActions } from "../../store/modalSlice";
import { loadingActions } from "../../store/loadingSlice.js";

import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

import { CircularProgress } from "@mui/material";

import ArticlesAPI from "../../services/articles";

import useInputValidation from "../../hooks/useInputValidation.js";
import useEditorActions from "../../hooks/myEditor.js";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { trackArticleView } from "../../analitics/firebase-analitics.js";

import { inputInitialState } from "../../constants/myEditor.js";

import styles from "./MyEditor.module.css";

export const MyEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState(inputInitialState);
  const { errorData, validateInput } = useInputValidation();
  const {
    editorState,
    handleKeyCommand,
    textAlignment,
    actions,
    setEditorState,
    blockRendererFn,
    decorator,
  } = useEditorActions();

  const dispatch = useDispatch();
  const params = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();

  const isEdit = params.articleId && params.section;

  useEffect(() => {
    if (editor) {
      editor.current.focus();
    }

    const getArticles = async () => {
      if (isEdit) {
        setIsLoading(true);
        const article = await ArticlesAPI.getArticleById(
          params.section,
          params.articleId
        );
        setIsLoading(false);

        setInputValues({
          title: article.title,
          author: article.author,
          date: article.date,
          imageURL: article.URL,
          section: article.section,
        });

        const contentState = convertFromRaw(article.constent);
        const newEditorState = EditorState.createWithContent(
          contentState,
          decorator
        );
        setEditorState(newEditorState);
      } else {
        const newEditorState = EditorState.createEmpty(decorator);
        setEditorState(newEditorState);
      }
    };

    getArticles();
  }, [params.articleId, params.section]);

  const handleChange = useCallback((event) => {
    if (event?.target) {
      const { name, value } = event.target;
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [name]: value,
      }));
    }
  }, []);

  const createArticle = useCallback(async () => {
    const { title, author, date, imageURL, section } = inputValues;

    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    const isValidationErrors = validateInput(
      title,
      author,
      imageURL,
      rawContentState,
      date
    );

    const newData = {
      title,
      author,
      date,
      URL: imageURL,
      section,
      constent: rawContentState,
    };

    if (!isValidationErrors) {
      dispatch(loadingActions.setLoadingTrue());
      try {
        let response = [];
        if (isEdit) {
          response = await ArticlesAPI.updateArticleData(
            params.articleId,
            params.section,
            newData
          );
        } else {
          response = await ArticlesAPI.addArticle(section, newData);
        }

        const articleId = response.id;

        if (articleId) {
          trackArticleView(articleId);
          navigate(`/${params.section}/${params.articleId}`);
        } else {
          throw new Error("Грешка при публикуване на статия");
        }
      } catch (error) {
        dispatch(
          modalActions.setErrorData({
            isError: true,
            title: "Грешка",
            message:
              "Възникна проблем при съсздаване на статията. Моля опитайте отново.",
          })
        );
      } finally {
        dispatch(loadingActions.setLoadingFalse());
      }
    }
  }, [validateInput, inputValues, editorState]);

  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles["editor-wrapper"]}>
          <div className={styles["inputs-container"]}>
            <div className={styles["title"]}>
              <Input
                type="text"
                classes={
                  errorData.title.isValid
                    ? "articleTitle"
                    : "articleTitle error"
                }
                name="title"
                label="Заглавие"
                placeHolder="Въведи заглавие..."
                value={inputValues.title}
                changeHandler={handleChange}
                require={true}
              />
              {!errorData.title.isValid && (
                <p className={styles["error-message"]}>
                  {errorData.title.errorMessage}
                </p>
              )}
            </div>
            <div className={styles["inner-inputs-container"]}>
              <div className={styles["inner-inputs-container-wrapper"]}>
                <Input
                  type="text"
                  classes={
                    errorData.author.isValid
                      ? "inner-input"
                      : "inner-input error"
                  }
                  name="author"
                  label="Автор"
                  placeHolder="Въведи автор..."
                  value={inputValues.author}
                  changeHandler={handleChange}
                  require={true}
                />
                {!errorData.author.isValid && (
                  <p className={styles["error-message"]}>
                    {errorData.author.errorMessage}
                  </p>
                )}
              </div>
              <div className={styles["inner-inputs-container-wrapper"]}>
                <Input
                  type="date"
                  classes={
                    errorData.date.isValid ? "inner-input" : "inner-input error"
                  }
                  name="date"
                  label="Дата"
                  value={inputValues.date}
                  changeHandler={handleChange}
                  require={true}
                />
                {!errorData.date.isValid && (
                  <p className={styles["error-message"]}>
                    {errorData.date.errorMessage}
                  </p>
                )}
              </div>
            </div>
            <div className={styles["inner-inputs-container"]}>
              <div className={styles["inner-inputs-container-wrapper"]}>
                <Input
                  type="text"
                  classes={
                    errorData.url.isValid ? "inner-input" : "inner-input error"
                  }
                  name="imageURL"
                  label="Основна снимка"
                  placeHolder="Въведи URL..."
                  value={inputValues.imageURL}
                  changeHandler={handleChange}
                  require={true}
                />
                {!errorData.url.isValid && (
                  <p className={styles["error-message"]}>
                    {errorData.url.errorMessage}
                  </p>
                )}
              </div>
              <div className={styles["inner-inputs-container-wrapper"]}>
                <select
                  name="section"
                  value={inputValues.section}
                  disabled={isEdit}
                  onChange={handleChange}
                >
                  <option value="wine-and-food">Вино и храна</option>
                  <option value="next-destination">Следваща дестинация</option>
                  <option value="tourism-initiatives">
                    Инициативи за туризма
                  </option>
                </select>
              </div>
            </div>
          </div>

          <ul className={styles["actions-wrapper"]}>
            {actions.map((action) => (
              <li key={action.id}>{action.icon}</li>
            ))}
          </ul>
          <div
            className={
              errorData.content.isValid
                ? styles["editor-containter"]
                : styles["editor-containter-error"]
            }
          >
            <Editor
              className={styles["editor"]}
              textAlignment={textAlignment}
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={setEditorState}
              blockRendererFn={blockRendererFn}
              ref={editor}
              placeholder="Започни статия..."
            />
          </div>
          {!errorData.content.isValid && (
            <p className={styles["error-message-content"]}>
              {errorData.content.errorMessage}
            </p>
          )}
          <Button
            type="button"
            value={isEdit ? "Обнови статия" : "Създай статия"}
            color="green-cyan"
            handler={createArticle}
          />
        </div>
      )}
    </>
  );
};
