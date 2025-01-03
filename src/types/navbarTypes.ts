export interface NavbarLinkProps {
  title: string;
  url: string;
  isModal?: boolean;
  modalName?: string;
}

export interface SearchComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface BurgerMenuProps {
  clicked: boolean;
  toggleMenu: () => void;
}

export interface NavbarLinksInterface {
  menuToRender: {
    title: string;
    url: string;
    isModal?: boolean;
    modalName?: string;
  }[];
  clicked: boolean;
  toggleMenu: () => void;
}
