import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { store } from "../store/index";
import { modalActions } from "../store/modalSlice";

class ArticlesAPI {
  static firestore = firebase.firestore();

  static async addArticle(section, payload) {
    try {
      const articlesCollection = this.firestore.doc(`articles/${section}`);
      payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      const response = await articlesCollection
        .collection("articles")
        .add(payload);

      return response;
    } catch (error) {
      console.error("Error adding article:", error);
      store.dispatch(
        modalActions.setErrorData({
          isError: true,
          title: "Грешка",
          message: "Грешка при създаване на статия. Моля опитайте по-късно.",
        })
      );
    }
  }

  static async getArticlesBySection(section) {
    try {
      const articlesCollection = this.firestore.collection(
        `articles/${section}/articles`
      );

      const snapshot = await articlesCollection
        .orderBy("createdAt", "desc")
        .get();

      if (snapshot.empty) {
        throw new Error("No articles found");
      }

      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().getTime(),
      }));

      return articles;
    } catch (error) {
      console.error("Error getting articles:", error);
      store.dispatch(
        modalActions.setErrorData({
          isError: true,
          title: "Грешка",
          message:
            "Грешка при зареждане на страницата. Моля опитайте по-късно.",
        })
      );
    }
  }

  static async getAllArticles() {
    const articleSections = [
      "wine-and-food",
      "next-destination",
      "tourism-initiatives",
    ];

    try {
      const promises = articleSections.map(async (section) => {
        const articlesCollection = this.firestore.collection(
          `articles/${section}/articles`
        );

        const snapshot = await articlesCollection
          .orderBy("createdAt", "desc")
          .get();

        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate().getTime(),
        }));
      });

      const result = await Promise.all(promises);
      const flattenedResult = result.flat();

      return flattenedResult;
    } catch (error) {
      console.error("Error getting articles:", error);
      store.dispatch(
        modalActions.setErrorData({
          isError: true,
          title: "Грешка",
          message:
            "Грешка при зареждане на страницата. Моля опитайте по-късно.",
        })
      );
    }
  }

  static async getArticleById(section, id) {
    try {
      const articleRef = this.firestore
        .collection(`articles/${section}/articles`)
        .doc(id);
      const doc = await articleRef.get();

      if (!doc.exists) {
        throw new Error("Article not found");
      }

      const articleData = doc.data();
      const article = {
        id: doc.id,
        ...articleData,
        createdAt: articleData.createdAt.toDate().getTime(),
      };

      return article;
    } catch (error) {
      console.error("Error getting article by ID:", error);
      store.dispatch(
        modalActions.setErrorData({
          isError: true,
          title: "Грешка",
          message: "Грешка при зареждане на статията. Моля опитайте по-късно.",
        })
      );
    }
  }

  static async deleteArticle(section, id) {
    try {
      const articleRef = this.firestore
        .collection(`articles/${section}/articles`)
        .doc(id);

      await articleRef.delete();
    } catch (error) {
      console.error("Error deleting article:", error);
      store.dispatch(
        modalActions.setErrorData({
          isError: true,
          title: "Error",
          message:
            "Възникна грешка при изтриване на статията. Моля опитайте по-късно.",
        })
      );
    }
  }

  static async updateArticleData(articleId, section, newData) {
    try {
      const articleRef = this.firestore
        .collection("articles")
        .doc(section)
        .collection("articles")
        .doc(articleId);

      await articleRef.update(newData);

      const updatedData = await articleRef.get();

      return {
        id: articleId,
        data: updatedData.data(),
      };
    } catch (error) {
      console.error("Error updating article data:", error);
      store.dispatch(
        modalActions.setErrorData({
          isError: true,
          title: "Грешка",
          message: "Грешка при обновяване на статия. Моля опитайте по-късно.",
        })
      );
    }
  }
}

export default ArticlesAPI;
