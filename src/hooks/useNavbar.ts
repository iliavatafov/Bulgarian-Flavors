import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { get } from "lodash";

import { searchActions } from "../store/searchSlice";

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
  const isAdmin = useSelector((state: RootState) => state.articles.isAdmin);
  const isSearch = useSelector((state: RootState) => state.search.isSearch);

  const dispatch = useDispatch();

  useEffect(() => {
    const userEmail = get(currentUser, "currentUser", null);
    userEmail
      ? isAdmin
        ? setMenuToRender(ADMIN_LINKS)
        : setMenuToRender(STANDARD_USER_LINKS)
      : setMenuToRender(DEFAULT_LINKS);
  }, [currentUser, isAdmin]);

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
