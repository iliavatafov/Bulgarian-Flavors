import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import ArticlesAPI from "../../services/articles";

import { Button } from "../Button/Button";
import { Modal } from "../Modals/Modal";

import { modalActions } from "../../store/modalSlice";
import { articleActions } from "../../store/articlesSlice";

import styles from "./DeleteModal.module.css";

export const DeleteModal = () => {
  const deleteContent = useSelector((state) => state.modal.delete);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    await ArticlesAPI.deleteArticle(
      deleteContent?.section,
      deleteContent?.articleId
    );
    await updateAllArticles();
    dispatch(modalActions.closeModal());
    navigate(`/${deleteContent?.section}`);
  };

  return (
    <Modal>
      <div className={styles["delete-container"]}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.xmark}
          onClick={() => dispatch(modalActions.closeModal())}
        />
        <div className={styles["delete-body"]}>
          <div className={styles.content}>
            <h2>{deleteContent?.title}</h2>
            <p>{deleteContent?.message}</p>
          </div>
        </div>
        <div className={styles["buttons-container"]}>
          <Button
            handler={deleteArticle}
            type="submit"
            value="Изтрий"
            color="red"
          />
          <Button
            handler={() => dispatch(modalActions.closeModal())}
            type="submit"
            value="Затвори"
            color="dark-blue"
          />
        </div>
      </div>
    </Modal>
  );
};
