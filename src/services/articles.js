import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

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
      throw error;
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

      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().getTime(),
      }));

      return articles;
    } catch (error) {
      console.error("Error getting articles:", error);
      throw error;
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
      throw error;
    }
  }
}

export default ArticlesAPI;
