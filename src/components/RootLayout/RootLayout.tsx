import { Outlet, useLocation } from "react-router-dom";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { articleActions } from "../../store/articlesSlice";

import { get } from "lodash";

import ArticlesAPI from "../../services/articles";
import UsersAPI from "../../services/users.js";

import CircularProgress from "@mui/material/CircularProgress";

import { DELETE_ARTICLE_KEY } from "../../constants/rootLayout";
import type { RootState } from "../../store";

import { Navbar } from "../Navbar/index";
import { Footer } from "../Footer/Footer";
import { ForgottenPasswordModal } from "../UserProfile/ForgottenPasswordModal/index";
import { LoginModal } from "../UserProfile/LoginModal";
import { ProfileModal } from "../UserProfile/ProfileModal";
import { RegisterModal } from "../UserProfile/RegisterModal";
import { UpdateProfileModal } from "../UserProfile/UpdateProfileModal";
import { ErrorModal } from "../Modals/ErrorModal";
import { DeleteArticleModal } from "../Modals/DeleteArticleModal";
import { SearchBar } from "../Search/SearchBar.tsx";
import { ManageArticlesModal } from "../Modals/ManageArticlesModal/index";

import styles from "./RootLayout.module.css";

export const RootLayout: FC = () => {
  const modal = useSelector((state: RootState) => state.modal);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const isSearch = useSelector((state: RootState) => state.search.isSearch);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const allArticles = useSelector(
    (state: RootState) => state.articles.articles.allArticles
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

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = get(currentUser, "uid", null);

      if (userId) {
        try {
          const user = await UsersAPI.getUserByUid(userId);

          if (get(user, "isAdmin", false)) {
            dispatch(articleActions.setIsAdmin(true));
          } else {
            dispatch(articleActions.setIsAdmin(false));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

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
            {modal.manageArticle.show && <ManageArticlesModal />}
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
