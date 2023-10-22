import { FC } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

type SearchBarProps = TextFieldProps & {
  clearInput: () => void;
  variant: Partial<TextFieldProps["variant"]>;
};

export const SearchBar: FC<SearchBarProps> = ({ clearInput, ...props }) => {
  return (
    <TextField
      {...props}
      variant={props.variant ?? "outlined"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ fill: "#b5b5b5" }} />
          </InputAdornment>
        ),
        endAdornment: !!props.value ? (
          <InputAdornment position="start">
            <IconButton onClick={clearInput}>
              <CloseIcon sx={{ fill: "#b5b5b5" }} />
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
      sx={{
        backgroundColor: "white",
        flex: 1,
        minWidth: "180px",
        maxWidth: "350px",
        alignSelf: "center",
        mr: 1,
        ...props.sx,
      }}
    />
  );
};

export default SearchBar;
