import React from "react";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import ArticlesAPI from "../../services/articles";
import { useDispatch, useSelector } from "react-redux";

import { CircularProgress, ImageList, ImageListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { articleActions } from "../../store/articlesSlice";

import EmptyState from "../EmptyState/EmptyState";
import { ActionBar } from "../ActionBar/ActionBar";
import { Button } from "../Button/Button";

import styles from "./ArticleDetails.module.css";

const parseContent = (content) => {
  const parsedContent = content.blocks.map((block, index) => {
    let text = block.text;
    const components = [];
    let currentPosition = 0;

    while (currentPosition < text.length) {
      if (block.type === "unstyled" && text[currentPosition] === "\n") {
        components.push(<br key={`br-${index}-${currentPosition}`} />);
        currentPosition++;
      } else {
        const entity = block.entityRanges.find(
          (range) => range.offset === currentPosition
        );

        if (entity && content.entityMap[entity.key].type === "LINK") {
          const url = content.entityMap[entity.key].data.url;
          const target = content.entityMap[entity.key].data.target || "_blank";
          const entityLength = entity.length;

          components.push(
            <Link
              key={`link-${index}-${currentPosition}`}
              href={url}
              target={target}
              style={{ textAlign: block.data.alignment || "left" }}
            >
              {text.substr(currentPosition, entityLength)}
            </Link>
          );

          currentPosition += entityLength;
        } else {
          const imageEntity = block.entityRanges.find(
            (range) =>
              range.offset === currentPosition &&
              content.entityMap[range.key].type === "IMAGE"
          );

          if (imageEntity) {
            const src = content.entityMap[imageEntity.key].data.src;
            const imageLength = imageEntity.length;

            components.push(
              <ImageList
                key={`image-list-${index}`}
                cols={1}
                style={{ textAlign: block.data.alignment || "left" }}
              >
                <ImageListItem
                  key={`image-${index}-${currentPosition}`}
                  style={{ textAlign: block.data.alignment || "left" }}
                >
                  <img src={src} alt="Image" />
                </ImageListItem>
              </ImageList>
            );

            currentPosition += imageLength;
          } else {
            let styleRanges = block.inlineStyleRanges.filter(
              (range) => range.offset === currentPosition
            );

            let styleComponent = null;

            if (styleRanges.length > 0) {
              const style = styleRanges[0].style.toLowerCase();
              const styleLength = styleRanges[0].length;

              if (style === "bold") {
                styleComponent = (
                  <Typography
                    key={`bold-${index}-${currentPosition}`}
                    component="span"
                    fontWeight="bold"
                    style={{ textAlign: block.data.alignment || "left" }}
                  >
                    {text.substr(currentPosition, styleLength)}
                  </Typography>
                );
              } else if (style === "italic") {
                styleComponent = (
                  <Typography
                    key={`italic-${index}-${currentPosition}`}
                    component="span"
                    fontStyle="italic"
                    style={{
                      textAlign: block.data.alignment || "left",
                    }}
                  >
                    {text.substr(currentPosition, styleLength)}
                  </Typography>
                );
              }

              currentPosition += styleLength;
            }

            if (styleComponent) {
              components.push(styleComponent);
            } else {
              components.push(
                <Typography
                  key={`text-${index}-${currentPosition}`}
                  component="span"
                  style={{ textAlign: block.data.alignment || "left" }}
                >
                  {text[currentPosition]}
                </Typography>
              );
              currentPosition++;
            }
          }
        }
      }
    }

    return components;
  });

  return parsedContent;
};

export const ArticleDetails = () => {
  const [articleData, setArticleData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        const parsedData = parseContent(response.constent);
        setRawData(response);
        setArticleData(parsedData);
      }
      setIsLoading(false);
    };

    getArticle();
  }, [dispatch]);

  const updateAllArticles = async () => {
    const articles = await ArticlesAPI.getAllArticles();

    dispatch(
      articleActions.setArticles({
        collection: "allArticles",
        data: articles,
      })
    );
  };

  const deleteArticle = async () => {
    await ArticlesAPI.deleteArticle(section, articleId);
    await updateAllArticles();
    navigate(`/${section}`);
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
            handler={deleteArticle}
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
