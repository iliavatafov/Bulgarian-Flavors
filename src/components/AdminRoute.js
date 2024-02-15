import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modalSlice";

export const AdminRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.currentUser !== "iliyavatafov@gmail.com") {
      navigate("/");
      dispatch(modalActions.openModal("login"));
    }
  }, [currentUser, dispatch, navigate]);

  return currentUser ? children : null;
};
