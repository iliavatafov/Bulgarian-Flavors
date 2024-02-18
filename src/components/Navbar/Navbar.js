import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import { searchActions } from "../../store/searchSlice";

import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

import { MyLinks, MyLinksLoggedIn, MyLinksAdmin } from "./MyLinks";

import "./Navbar.css";

export const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [menuToRender, setMenuToRender] = useState([]);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const isSearch = useSelector((state) => state.search.isSearch);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (currentUser?.currentUser) {
      if (currentUser.currentUser === "iliyavatafov@gmail.com") {
        setMenuToRender(MyLinksAdmin);
      } else {
        setMenuToRender(MyLinksLoggedIn);
      }
    } else {
      setMenuToRender(MyLinks);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isSearch) setClicked(false);
  }, [isSearch]);

  const myLinks = menuToRender.map(
    ({ title, url, isModal, modalName }, index) => {
      return (
        <li key={index}>
          <NavLink
            to={url}
            className={({ isActive }) =>
              isActive && location.pathname === url ? "active" : ""
            }
            onClick={
              isModal && (() => dispatch(modalActions.openModal(modalName)))
            }
          >
            {title}
          </NavLink>
        </li>
      );
    }
  );

  const navbarClickHandler = () => {
    setClicked(!clicked);
    if (isSearch) dispatch(searchActions.toggleSearch());
  };

  return (
    <nav className={clicked ? "nav" : "nav-close"}>
      <Link className="logo" to="/">
        <span className="first">Bulgarian</span>
        <span className="slide">
          <span className="second">Flavors</span>
        </span>
      </Link>
      <div className="links">
        <div className="search-component">
          <IconButton
            sx={{
              p: "10px",
              color: "#fff",
              "&:hover": {
                color: "#00d49a",
              },
            }}
            onClick={() => dispatch(searchActions.toggleSearch())}
          >
            <SearchIcon />
          </IconButton>
        </div>
        <div className="nav-icon" onClick={navbarClickHandler}>
          <i className={clicked ? "fa fa-times" : "fa fa-bars"}></i>
        </div>
        <ul
          onClick={navbarClickHandler}
          className={clicked ? "nav-list" : "nav-list close"}
        >
          {myLinks}
          <div className="disktop-search">
            <IconButton
              sx={{
                p: "10px",
                color: "#fff",
                "&:hover": {
                  color: "#00d49a",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(searchActions.toggleSearch());
              }}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </ul>
      </div>
    </nav>
  );
};
