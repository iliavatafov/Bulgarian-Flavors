import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

class ArticlesAPI {
  static firestore = firebase.firestore();

  static async addArticle(section, payload) {
    try {
      const articlesCollection = this.firestore.doc(`articles/${section}`);

      const response = await articlesCollection
        .collection("articles")
        .add(payload);

      return response;
    } catch (error) {
      console.error("Error adding article:", error);
      throw error;
    }
  }
}

export default ArticlesAPI;
