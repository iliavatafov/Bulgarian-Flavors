import React from "react";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import ArticlesAPI from "../../services/articles";
import { useDispatch, useSelector } from "react-redux";

import { CircularProgress, ImageList, ImageListItem } from "@mui/material";
import Typography from "@mui/material/Typography";

import { modalActions } from "../../store/modalSlice";

import EmptyState from "../EmptyState/EmptyState";
import { ActionBar } from "../ActionBar/index.tsx";
import { Button } from "../Button/Button";

import styles from "./ArticleDetails.module.css";
import { useParseContent } from "../../hooks/useParseContent.tsx";

export const ArticleDetails = () => {
  const [articleData, setArticleData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const test = "";

  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { section, articleId } = params;

  useEffect(() => {
    const getArticle = async () => {
      setIsLoading(true);
      const response = await ArticlesAPI.getArticleById(section, articleId);
      if (response) {
        const parsedData = useParseContent(response.constent);
        setRawData(response);
        setArticleData(parsedData);
      }
      setIsLoading(false);
    };

    getArticle();
  }, [dispatch]);

  const openDeleteModal = () => {
    dispatch(
      modalActions.setDeleteModal({
        isDelete: true,
        title: "Изтрий статия",
        message: "Сигурни ли сте, че желаете да изтриете статията?",
        section,
        articleId,
      })
    );
  };

  const editArticle = () => {
    navigate(`/edit-article/${section}/${articleId}`);
  };

  return isLoading ? (
    <div className={styles.loader}>
      <CircularProgress />
    </div>
  ) : articleData.length ? (
    <div className={styles["article-wrapper"]}>
      {currentUser?.currentUser === "iliyavatafov@gmail.com" && (
        <div className={styles["admin-actions"]}>
          <Button
            handler={editArticle}
            type="submit"
            value="Редактирай"
            color="green-cyan"
          />
          <Button
            handler={openDeleteModal}
            type="submit"
            value="Изтрий"
            color="dark-blue"
          />
        </div>
      )}
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{
          textAlign: "left",
          minHeight: 80,
          display: "flex",
          alignItems: "center",
        }}
      >
        {rawData.title}
      </Typography>
      <div className={styles["subtitle"]}>
        <div>
          <Typography
            variant="author"
            component="div"
            sx={{
              textAlign: "left",
              fontStyle: "italic",
              fontSize: "small",
              marginBottom: 1,
            }}
          >
            Автор: {rawData.author}
          </Typography>
          <Typography
            variant="author"
            component="div"
            sx={{
              textAlign: "left",
              fontStyle: "italic",
              fontSize: "small",
              marginBottom: 1,
            }}
          >
            Дата: {rawData.date}
          </Typography>
        </div>
        <ActionBar />
      </div>

      <ImageList cols={1}>
        <ImageListItem>
          <img src={rawData.URL} alt={rawData.title} />
        </ImageListItem>
      </ImageList>
      {articleData.map((components, index) => (
        <div key={`block-${index}`}>
          {components.map((component, i) =>
            React.cloneElement(component, { key: `component-${i}` })
          )}
        </div>
      ))}
      <div className={styles["footer"]}>
        <ActionBar />
      </div>
    </div>
  ) : (
    <EmptyState text="Възникна грешка. Моля опитайте по-късно." />
  );
};
