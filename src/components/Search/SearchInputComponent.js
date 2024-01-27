import React, { useRef, useEffect } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInputComponent = ({ autoFocus }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      placeholder="Намери статия..."
      variant="outlined"
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
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInputComponent;
