import { FC } from "react";
import { Button, SxProps, Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBar } from "../commons";
import { useAppDispatch } from "../../context/redux/hooks";
import { setSearchStr as setSearchStrAction } from "./usersSlice";
import type { TSearchStr } from "../../types/usersSlice";

interface UsersSearchBarProps {
  searchStr: TSearchStr;
  setSearchStr: (searchStr: TSearchStr) => void;
  buttonStyles: SxProps<Theme>;
}

export const UsersSearchBar: FC<UsersSearchBarProps> = ({
  searchStr,
  setSearchStr,
  buttonStyles,
}) => {
  const dispatch = useAppDispatch();

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.value === "") return setSearchStr(null);
    setSearchStr(e.target.value);
  };

  const clearInput = () => {
    setSearchStr(null);
    dispatch(setSearchStrAction({ searchStr: null }));
  };

  const updateState = () => {
    dispatch(setSearchStrAction({ searchStr }));
  };

  const onPressEnter: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === "Enter") updateState();
  };

  return (
    <>
      <SearchBar
        placeholder="Search Users..."
        variant="outlined"
        value={searchStr ?? ""}
        onChange={onValueChange}
        onKeyDown={onPressEnter}
        clearInput={clearInput}
        sx={{ minWidth: "50%", maxWidth: "500px" }}
      />
      <Button
        onClick={updateState}
        variant="contained"
        color="primary"
        sx={buttonStyles}
      >
        <SearchIcon sx={{ fill: "#ffffff" }} />
      </Button>
    </>
  );
};

export default UsersSearchBar;
