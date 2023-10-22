import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, SxProps, Theme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { UsersSearchBar } from "./usersSearchBar";
import { AppliedFiltersList } from "./appliedFiltersList";
import { useAppSelector } from "../../context/redux/hooks";
import { selectSearchStr } from "./usersSlice";
import type { TSearchStr, TUsersFilterState } from "../../types/usersSlice";

export const UsersFilterBar: FC = () => {
  const navigate = useNavigate();
  const searchStr = useAppSelector(selectSearchStr);
  const [filterState, setFilterState] = useState<TUsersFilterState>({
    searchStr,
  });

  const setSearchStr = (searchStr: TSearchStr) => {
    setFilterState(prev => ({ ...prev, searchStr }));
  };

  const clearSearchStrFilter = () => {
    setFilterState(prev => ({ ...prev, searchStr: null }));
  };

  const buttonsCommonStyles: SxProps<Theme> = {
    display: "flex",
    alignItems: "stretch",
    mr: theme => theme.spacing(1),
    textTransform: "capitalize",
    width: "fit-content",
    "&": { alignItems: "center" },
  };

  return (
    <Box display="flex" flexDirection="column" m={0} p={0}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        sx={{ mb: 2, overflow: "visible" }}
      >
        <UsersSearchBar
          searchStr={filterState.searchStr}
          setSearchStr={setSearchStr}
          buttonStyles={buttonsCommonStyles}
        />
        <Button
          onClick={() => navigate(`/add-new-user`)}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none", ml: "auto" }}
        >
          Add New User
        </Button>
      </Box>
      <AppliedFiltersList clearSearchStrFilter={clearSearchStrFilter} />
    </Box>
  );
};

export default UsersFilterBar;
