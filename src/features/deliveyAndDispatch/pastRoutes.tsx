import { useState } from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  CircularProgress,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { RoutesTable } from "./routesTable";
import { DateRangePicker, DateRangePickerProps } from "../commons";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { useGetAllPastRoutesQuery } from "../../services/api";
import {
  selectPageSize,
  selectCursor,
  selectDateRange,
  setCursor,
  setDateRange as setDateRangeAction,
} from "./routesSlice";
import type { FC, MouseEventHandler } from "react";

export interface PastRoutesProps {
  sx?: SxProps<Theme>;
}

export const PastRoutes: FC<PastRoutesProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector(selectPageSize);
  const cursor = useAppSelector(selectCursor);
  const { after, before } = useAppSelector(selectDateRange);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const popoverId = isOpen ? "calender-popover" : undefined;
  const { data, isFetching } = useGetAllPastRoutesQuery({
    pageSize,
    cursor,
    after: after ? dayjs(after).format("YYYY/MM/DD") : null,
    before: before ? dayjs(before).format("YYYY/MM/DD") : null,
  });
  const pastRoutes = data?.pastRoutes ?? [];

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const updateDateRangeState: DateRangePickerProps["updateDateRange"] = (
    start,
    end
  ) => {
    dispatch(
      setDateRangeAction({
        after: start ? start.unix() * 1000 : null,
        before: end ? end.unix() * 1000 : null,
      })
    );
  };

  const showMoreResults = () => {
    dispatch(setCursor({ cursor: data?.cursor ?? null }));
  };

  return (
    <Box sx={{ border: 1, borderColor: "divider", bgcolor: "white", ...sx }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          p: theme => theme.spacing(2, 3),
        }}
      >
        <Typography variant="h5" component="h2" fontWeight={600}>
          Past Routes
        </Typography>
        <Button
          onClick={handleClick}
          variant="contained"
          aria-describedby={popoverId}
        >
          <CalendarMonthIcon />
        </Button>
        <DateRangePicker
          start={after ? dayjs(after) : null}
          end={before ? dayjs(before) : null}
          updateDateRange={updateDateRangeState}
          isOpen={isOpen}
          anchorEl={anchorEl}
          close={handleClose}
          disableFuture
          popoverId={popoverId}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        />
      </Box>
      <RoutesTable routes={pastRoutes} isLoading={isFetching} />
      <Box display="flex" justifyContent="flex-end" px={5} py={1}>
        <Button
          onClick={showMoreResults}
          startIcon={isFetching ? <CircularProgress size="1rem" /> : undefined}
          disabled={!data?.cursor}
          sx={{ textTransform: "none", width: 150 }}
        >
          {data?.cursor ? "View More" : "No More Results"}
        </Button>
      </Box>
    </Box>
  );
};

export default PastRoutes;
