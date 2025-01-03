import { FC } from "react";
import type { NavbarLinksInterface } from "../../types/navbarTypes";
import { NavbarLink } from "./NavbarLink";

export const NavbarLinks: FC<NavbarLinksInterface> = ({
  menuToRender,
  clicked,
  toggleMenu,
}) => {
  return (
    <ul
      onClick={toggleMenu}
      className={clicked ? "nav-list" : "nav-list close"}
    >
      {menuToRender.map(({ title, url, isModal, modalName }, index) => (
        <NavbarLink
          key={index}
          title={title}
          url={url}
          isModal={isModal}
          modalName={modalName}
        />
      ))}
    </ul>
  );
};
