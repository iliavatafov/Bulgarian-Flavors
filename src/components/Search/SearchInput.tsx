import { useRef, useEffect, FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useDispatch } from "react-redux";
import { searchActions } from "../../store/searchSlice";

import {
  SEARCH_PLACEHOLDER_TEXT,
  SEARCH_SX_STYLES,
} from "../../constants/search";

export const SearchInput: FC<{ autoFocus: boolean }> = ({ autoFocus }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter" && inputRef.current) {
        dispatch(searchActions.setSearchInput(inputRef.current.value));

        if (!window.location.href.includes("/search")) navigate("/search");

        dispatch(searchActions.toggleSearch());
      }
    },
    [dispatch, navigate]
  );

  const handleClick = useCallback(() => {
    if (inputRef.current) {
      dispatch(searchActions.setSearchInput(inputRef.current.value));

      if (!window.location.href.includes("/search")) navigate("/search");

      dispatch(searchActions.toggleSearch());
    }
  }, [dispatch, navigate]);

  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      placeholder={SEARCH_PLACEHOLDER_TEXT}
      variant="outlined"
      onKeyDown={handleKeyDown}
      sx={SEARCH_SX_STYLES}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
