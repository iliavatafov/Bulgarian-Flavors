import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";
import { loadingActions } from "./loadingSlice.js";
import { modalActions } from "./modalSlice";

const initialState = {
  currentUser: null,
  uid: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export const register = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loadingActions.toggle());
      await auth.createUserWithEmailAndPassword(email, password);
      dispatch(modalActions.closeModal());
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        throw new Error("Този e-mail се използва от друг потребител");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Невалиден формат на e-mail адрес");
      } else if (error.code === "auth/weak-password") {
        throw new Error("Паролата трябва да бъде минимум 6 символа");
      } else {
        throw new Error("Грешка при създаване на акаунт");
      }
    } finally {
      dispatch(loadingActions.toggle());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loadingActions.toggle());
      await auth.signInWithEmailAndPassword(email, password);
      dispatch(modalActions.closeModal());
    } catch (error) {
      throw new Error("Грешен e-mail или парола");
    } finally {
      dispatch(loadingActions.toggle());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await auth.signOut();
      dispatch(authActions.setCurrentUser({ currentUser: null, uid: null }));
    } catch (error) {
      throw new Error("Грешка при изход");
    }
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    try {
      dispatch(loadingActions.toggle());
      await auth.sendPasswordResetEmail(email);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        throw new Error("Невалиден формат на e-mail адрес");
      } else if (error.code === "auth/user-not-found") {
        throw new Error("Не е намерен потребител с въведения e-mail адрес");
      } else {
        throw new Error("Грешка при опит за рестартиране на парола");
      }
    } finally {
      dispatch(loadingActions.toggle());
    }
  };
};

export const updateEmail = (email) => {
  return async (dispatch) => {
    try {
      dispatch(loadingActions.toggle());
      await auth.currentUser.updateEmail(email);
      dispatch(checkAuthState());
      dispatch(modalActions.closeModal());
      return;
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        throw new Error(
          "Необходимо е да излезете и влезете отново, т. к. исканата от вас операция е чувствителна"
        );
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Грешен формат на e-mail адрес");
      } else {
        throw new Error("Неуспешно актуализиране на акаунта");
      }
    } finally {
      dispatch(loadingActions.toggle());
    }
  };
};

export const updatePassword = (password) => {
  return async (dispatch) => {
    try {
      dispatch(loadingActions.toggle());

      await auth.currentUser.updatePassword(password);
      await dispatch(logout());

      dispatch(modalActions.closeModal());
      dispatch(modalActions.openModal("login"));
    } catch (error) {
      if (error.code === "auth/weak-password") {
        throw new Error("Паролата трябва да бъде минимум 6 символа");
      } else {
        throw new Error("Неуспешно актуализиране на акаунта");
      }
    } finally {
      dispatch(loadingActions.toggle());
    }
  };
};

export const checkAuthState = () => {
  return async (dispatch) => {
    try {
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(
            authActions.setCurrentUser({
              currentUser: user.email,
              uid: user.uid,
            })
          );
        } else {
          dispatch(
            authActions.setCurrentUser({
              currentUser: null,
              uid: null,
            })
          );
        }
      });
    } catch (error) {
      console.log("Error checking authentication state:", error);
    }
  };
};

export default authSlice.reducer;
