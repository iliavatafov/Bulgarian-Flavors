import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modalSlice";

export const PrivateRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      dispatch(modalActions.openModal("login"));
    }
  }, [currentUser, dispatch]);

  return currentUser ? children : null;
};
