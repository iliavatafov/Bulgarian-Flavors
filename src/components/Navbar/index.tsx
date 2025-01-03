import { useNavbar } from "../../hooks/useNavbar";

import { AppLogo } from "./AppLogo";
import { SearchComponent } from "./SearchComponent";
import { BurgerMenu } from "./BurgerMenu";
import { NavbarLinks } from "./NavbarLinks";

import "./styles.css";

export const Navbar = () => {
  const { clicked, menuToRender, toggleMenu } = useNavbar();

  return (
    <nav className={clicked ? "nav" : "nav-close"}>
      <AppLogo />
      <div className="links">
        <SearchComponent className={"search-component"} />
        <BurgerMenu clicked={clicked} toggleMenu={toggleMenu} />
        <NavbarLinks
          menuToRender={menuToRender}
          clicked={clicked}
          toggleMenu={toggleMenu}
        />
        <SearchComponent className={"desktop-search"} />
      </div>
    </nav>
  );
};
