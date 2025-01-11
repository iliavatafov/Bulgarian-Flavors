import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modalSlice";
import { get } from "lodash";
import UsersAPI from "../services/users";

import type { AdminRouteProps, RootState } from "../types/adminRouteTypes";

export const AdminRoute: FC<AdminRouteProps> = ({ children }) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectIfNotAdmin = async () => {
      const userData = currentUser?.uid
        ? await UsersAPI.getUserByUid(currentUser.uid)
        : [];

      if (!Object.keys(userData).length || get(userData, "isAdmin", false)) {
        navigate("/");
        dispatch(modalActions.openModal("login"));
      }
    };

    redirectIfNotAdmin();
  }, [currentUser, dispatch, navigate]);

  return currentUser ? children : null;
};
