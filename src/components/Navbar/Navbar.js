import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";

import { MyLinks, MyLinksLoggedIn, MyLinksAdmin } from "./MyLinks";

import "./Navbar.css";

export const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [menuToRender, setMenuToRender] = useState([]);

  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

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

  const myLinks = menuToRender.map(
    ({ title, url, isModal, modalName }, index) => {
      return (
        <li key={index}>
          <NavLink
            to={url}
            className={({ isActive }) =>
              isActive && url !== "#" ? "active" : ""
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
        <div className="nav-icon" onClick={navbarClickHandler}>
          <i className={clicked ? "fa fa-times" : "fa fa-bars"}></i>
        </div>
        <ul
          onClick={navbarClickHandler}
          className={clicked ? "nav-list" : "nav-list close"}
        >
          {myLinks}
        </ul>
      </div>
    </nav>
  );
};
