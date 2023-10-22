import { FC, useState, MouseEventHandler } from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { PreviousNotGivenReportItem } from "./previousNotGivenReportItem";
import {
  DateRangePicker,
  DateRangePickerProps,
  LoadingContent,
  NotFound,
} from "../commons";
import { useGetAllNotGivenReportsQuery } from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectPageSize,
  selectCursor,
  selectDateRange,
  setCursor,
  setDateRange as setDateRangeAction,
} from "./notGivenReportsSlice";

export const PreviousNotGivenReports: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector(selectPageSize);
  const cursor = useAppSelector(selectCursor);
  const { after, before } = useAppSelector(selectDateRange);
  const { data, isLoading, isFetching, isError } =
    useGetAllNotGivenReportsQuery({
      pageSize,
      cursor,
      after,
      before,
    });
  const notGivenReports = data?.reports?.length ? data.reports : null;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const popoverId = isOpen ? "calender-popover" : undefined;

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
        before: end ? end?.unix() * 1000 : null,
      })
    );
  };

  const showMoreResults = () => {
    dispatch(setCursor({ newCursor: data?.cursor ?? null }));
  };

  return (
    <Box
      sx={{
        background: "#fff",
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: theme => theme.spacing(2, 5) }}
      >
        <Typography variant="h6" component="h3">
          Previous Not-Given Reports
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
      <Divider variant="fullWidth" orientation="horizontal" />
      {isLoading || isError || !notGivenReports ? (
        <Box sx={{ width: "100%", height: 300 }}>
          {isLoading ? <LoadingContent /> : null}
          {isError || (!isLoading && !notGivenReports) ? (
            <NotFound message="No Not-Given Report found." />
          ) : null}
        </Box>
      ) : (
        <Stack sx={{ position: "relative" }}>
          {isFetching && (
            <LoadingContent
              sx={{ position: "absolute", background: "#ffffff60" }}
            />
          )}
          {notGivenReports.map((r, i) => (
            <PreviousNotGivenReportItem
              key={r.id}
              notGivenReport={r}
              sx={{
                background: i % 2 ? "transparent" : theme.palette.grey[100],
              }}
            />
          ))}
        </Stack>
      )}
      <Divider variant="fullWidth" orientation="horizontal" />
      <Box display="flex" justifyContent="flex-end" px={5} py={1}>
        <Button
          onClick={showMoreResults}
          disabled={!data?.cursor}
          sx={{ textTransform: "none" }}
        >
          {data?.cursor ? "View More" : "No More Results"}
        </Button>
      </Box>
    </Box>
  );
};

export default PreviousNotGivenReports;
