import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

class UsersAPI {
  static firestore = firebase.firestore();

  static async addUser(payload) {
    try {
      const usersCollection = this.firestore.collection("users");

      const response = await usersCollection.add(payload);

      return response.id;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }

  static async getUsers() {
    try {
      const usersCollection = this.firestore.collection("users");

      const response = await usersCollection.get();

      const users = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}

export default UsersAPI;
