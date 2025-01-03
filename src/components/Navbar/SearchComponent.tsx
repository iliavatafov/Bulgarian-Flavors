import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { searchActions } from "../../store/searchSlice";

import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { SEARCH_SX_STYLES } from "../../constants/rootLayout";
import type { SearchComponentProps } from "../../types/navbarTypes";

export const SearchComponent: FC<SearchComponentProps> = ({ ...props }) => {
  const dispatch = useDispatch();

  const handleToggleSearch = useCallback(
    () => dispatch(searchActions.toggleSearch()),
    [dispatch]
  );

  return (
    <div {...props}>
      <IconButton
        sx={SEARCH_SX_STYLES}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleSearch();
        }}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};
