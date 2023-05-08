import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../../cotext/AuthContext";
import { useModal } from "../../cotext/ModalContext";

import { MyLinks, MyLinksLoggedIn, MyLinksAdmin } from "./MyLinks";

import "./Navbar.css";

export const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [menuToRender, setMenuToRender] = useState([]);

  const { currentUser } = useAuth();
  const { handleOpenModal } = useModal();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.email === "iliyavatafov@gmail.com") {
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
            onClick={isModal && (() => handleOpenModal(modalName))}
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
