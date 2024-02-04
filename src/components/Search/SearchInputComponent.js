import React, { useRef, useEffect } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { searchActions } from "../../store/searchSlice";
import { useNavigate } from "react-router-dom";

const SearchInputComponent = ({ autoFocus }) => {
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSearch = (e) => {
    if (e.code === "Enter" || e.type === "click") {
      dispatch(searchActions.setSearchInput(inputRef.current.value));

      if (!window.location.href.includes("/search")) {
        navigate("/search");
      }

      dispatch(searchActions.toggleSearch());
    }
  };

  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      placeholder="Намери статия..."
      variant="outlined"
      onKeyDown={handleSearch}
      sx={{
        padding: "1rem",
        "& .MuiInputBase-input": {
          border: "none",
        },
        "& .MuiInputAdornment-root:hover .MuiSvgIcon-root": {
          color: "#00d49a",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInputComponent;
