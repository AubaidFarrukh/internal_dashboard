import { FC } from "react";
import { Stack } from "@mui/material";
import { AppliedFilter } from "../commons";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { selectSearchStr, setSearchStr } from "./usersSlice";

interface AppliedFiltersListProps {
  clearSearchStrFilter: () => void;
}

export const AppliedFiltersList: FC<AppliedFiltersListProps> = ({
  clearSearchStrFilter,
}) => {
  const dispatch = useAppDispatch();
  const searchStr = useAppSelector(selectSearchStr);

  const hasSearchStrFilter = !!searchStr;
  const hasAnyFilter = hasSearchStrFilter;

  const removeSearchStrFilter = () => {
    dispatch(setSearchStr({ searchStr: null }));
    clearSearchStrFilter();
  };

  return (
    <Stack direction="row" mb={hasAnyFilter ? 3 : 1}>
      {searchStr && (
        <AppliedFilter
          title={`User: ${searchStr}`}
          onClick={removeSearchStrFilter}
          tooltip="Remove user filter."
        />
      )}
    </Stack>
  );
};

export default AppliedFiltersList;
