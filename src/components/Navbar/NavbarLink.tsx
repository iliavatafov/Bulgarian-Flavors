import { FC, useCallback, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { modalActions } from "../../store/modalSlice";

import type { NavbarLinkProps } from "../../types/navbarTypes";

import { useDispatch } from "react-redux";

export const NavbarLink: FC<NavbarLinkProps> = ({
  title,
  url,
  isModal,
  modalName,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = useMemo(() => location.pathname, [location.pathname]);

  const handleClick = useCallback(() => {
    if (isModal && modalName) {
      modalName === "manageArticle"
        ? dispatch(
            modalActions.setManageArticleModal({
              isEdit: false,
              isCreate: true,
              show: true,
            })
          )
        : dispatch(modalActions.openModal(modalName));
    }
  }, [dispatch, isModal, modalName]);

  const getNavLinkClass = useCallback(
    (isActive: boolean) => (isActive && pathname === url ? "active" : ""),
    [pathname, url]
  );

  return (
    <li>
      <NavLink
        to={url}
        className={({ isActive }) => getNavLinkClass(isActive)}
        onClick={handleClick}
      >
        {title}
      </NavLink>
    </li>
  );
};
