import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modalSlice";
import UsersAPI from "../services/users";

export const AdminRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectIfNotAdmin = async () => {
      const userData = currentUser?.uid
        ? await UsersAPI.getUserByUid(currentUser.uid)
        : [];

      if (!Object.keys(userData).length || !userData.isAdmin) {
        navigate("/");
        dispatch(modalActions.openModal("login"));
      }
    };

    redirectIfNotAdmin();
  }, [currentUser, dispatch, navigate]);

  return currentUser ? children : null;
};
