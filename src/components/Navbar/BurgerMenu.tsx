import { FC } from "react";

import type { BurgerMenuProps } from "../../types/navbarTypes";

export const BurgerMenu: FC<BurgerMenuProps> = ({ clicked, toggleMenu }) => {
  return (
    <div className="nav-icon" onClick={toggleMenu}>
      <i className={clicked ? "fa fa-times" : "fa fa-bars"}></i>
    </div>
  );
};
