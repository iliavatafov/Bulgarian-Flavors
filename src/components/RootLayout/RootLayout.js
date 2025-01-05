import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { articleActions } from "../../store/articlesSlice";
import ArticlesAPI from "../../services/articles";

import CircularProgress from "@mui/material/CircularProgress";

import { DELETE_ARTICLE_KEY } from "../../constants/rootLayout";

import { Navbar } from "../Navbar/index";
import { Footer } from "../Footer/Footer";
import { ForgottenPasswordModal } from "../UserProfile/ForgottenPasswordModal/index";
import { LoginModal } from "../UserProfile/LoginModal";
import { ProfileModal } from "../UserProfile/ProfileModal";
import { RegisterModal } from "../UserProfile/RegisterModal";
import { UpdateProfileModal } from "../UserProfile/UpdateProfileModal";
import { ErrorModal } from "../Modals/ErrorModal";
import { DeleteArticleModal } from "../Modals/DeleteArticleModal";
import { SearchBar } from "../Search/SearchBar";
import { ManageArticlesModal } from "../Modals/ManageArticlesModal/index";

import styles from "./RootLayout.module.css";

export const RootLayout = () => {
  const modal = useSelector((state) => state.modal);
  const loading = useSelector((state) => state.loading.loading);
  const isSearch = useSelector((state) => state.search.isSearch);
  const allArticles = useSelector(
    (state) => state.articles.articles.allArticles
  );

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await ArticlesAPI.getAllArticles();

      dispatch(
        articleActions.setArticles({
          collection: "allArticles",
          data: articles,
        })
      );
    };

    if (isSearch && !allArticles.length) {
      fetchArticles();
    }
  }, [isSearch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {loading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles["content-container"]}>
          <header className={styles.header}>
            <Navbar />
            {isSearch && (
              <div className={styles["search-container"]}>
                <div className={styles["search-animation"]}>
                  <SearchBar />
                </div>
              </div>
            )}
          </header>
          <main className={styles.main}>
            {modal.login && <LoginModal />}
            {modal.register && <RegisterModal />}
            {modal.resetPassword && <ForgottenPasswordModal />}
            {modal.profile && <ProfileModal />}
            {modal.updateProfile && <UpdateProfileModal />}
            {modal.errorData.isError && <ErrorModal />}
            {modal.delete.key === DELETE_ARTICLE_KEY && <DeleteArticleModal />}
            {modal.manageArticle && <ManageArticlesModal />}
            <Outlet />
          </main>
          <footer className={styles.footer}>
            <Footer />
          </footer>
        </div>
      )}
    </>
  );
};
