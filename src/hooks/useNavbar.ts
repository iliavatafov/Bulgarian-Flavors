import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../store/searchSlice";

import { get } from "lodash";

import UsersAPI from "../services/users";

import {
  DEFAULT_LINKS,
  STANDARD_USER_LINKS,
  ADMIN_LINKS,
} from "../constants/navbarLinks";
import type { NavbarLinkProps } from "../types/navbarTypes";
import type { RootState } from "../store";

export const useNavbar = () => {
  const [clicked, setClicked] = useState(false);
  const [menuToRender, setMenuToRender] = useState<NavbarLinkProps[]>([]);

  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const isSearch = useSelector((state: RootState) => state.search.isSearch);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = get(currentUser, "uid", null);

      if (userId) {
        try {
          const user = await UsersAPI.getUserByUid(userId);

          if (get(user, "isAdmin", false)) {
            setMenuToRender(ADMIN_LINKS);
          } else {
            setMenuToRender(STANDARD_USER_LINKS);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setMenuToRender(DEFAULT_LINKS);
        }
      } else {
        setMenuToRender(DEFAULT_LINKS);
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    if (isSearch) setClicked(false);
  }, [isSearch]);

  const toggleMenu = useCallback(() => {
    setClicked((prevClicked) => !prevClicked);
    if (isSearch) dispatch(searchActions.toggleSearch());
  }, [isSearch, dispatch]);

  return {
    clicked,
    menuToRender,
    toggleMenu,
  };
};
