import { FC, useState } from "react";
import {
  Box,
  Button,
  ListSubheader,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import DoneIcon from "@mui/icons-material/Done";
import {
  useGetOrdersOverviewQuery,
  useGetOverdueOrdersQuery,
  invalidateTags,
} from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectDate,
  selectToDate,
  selectRefreshTimeout,
  setRefreshTimeout,
} from "./pickingDashboardSlice";

export interface RefreshButtonProps {
  sx?: SxProps<Theme>;
}

export const RefreshButton: FC<RefreshButtonProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);
  const refreshTimeout = useAppSelector(selectRefreshTimeout);

  // Polling for refetching data.
  const { isFetching } = useGetOrdersOverviewQuery(
    { date, toDate: toDate ?? undefined },
    { pollingInterval: refreshTimeout * 1000 }
  );
  const { isFetching: isFetchingOverdue } = useGetOverdueOrdersQuery(
    {},
    { pollingInterval: refreshTimeout * 1000 }
  );

  // Invalidate cache and start refetching of data immediately.
  const invalidatePickingDataCache = () =>
    dispatch(
      invalidateTags([{ type: "PickingOverview" }, { type: "OverdueOrders" }])
    );

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => setAnchorEl(null);

  const updateRefreshTimeout = (refreshTimeout: number) => {
    dispatch(setRefreshTimeout({ refreshTimeout }));
    closeMenu();
  };

  // Options
  const refreshTimeoutOptions = [
    { id: 1, title: "1 minute", value: 60 },
    { id: 2, title: "5 minutes", value: 300 },
    { id: 3, title: "10 minutes", value: 600 },
  ];

  return (
    <Box display="flex" sx={sx}>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<RefreshIcon />}
        onClick={invalidatePickingDataCache}
        disabled={isFetching || isFetchingOverdue}
        sx={{
          textTransform: "none",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        Refresh
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={openMenu}
        disabled={isFetching || isFetchingOverdue}
        sx={{
          px: 0,
          ml: "-1px",
          minWidth: 32,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        onClose={closeMenu}
      >
        <ListSubheader sx={{ lineHeight: 2, fontSize: "0.75rem" }}>
          Refresh every
        </ListSubheader>
        {refreshTimeoutOptions.map(option => (
          <MenuItem
            key={option.id}
            onClick={() => updateRefreshTimeout(option.value)}
          >
            <ListItemIcon>
              {option.value === refreshTimeout && <DoneIcon color="success" />}
            </ListItemIcon>
            <ListItemText>{option.title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default RefreshButton;
