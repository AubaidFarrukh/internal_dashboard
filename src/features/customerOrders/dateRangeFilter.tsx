import { FC, useState, MouseEventHandler } from "react";
import dayjs from "dayjs";
import { Button, SxProps, Theme } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRangePicker, DateRangePickerProps } from "../commons";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectDateRange,
  setDateRange as setDateRangeAction,
} from "./ordersSlice";

interface DateRangeFilterProps {
  sx: SxProps<Theme>;
}

export const DateRangeFilter: FC<DateRangeFilterProps> = ({ sx }) => {
  const dispatch = useAppDispatch();

  // Calender visibility controls.
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? "calender-popover" : undefined;
  const openCalender: MouseEventHandler<HTMLButtonElement> = event => {
    setAnchorEl(event.currentTarget);
  };
  const closeCalender = () => setAnchorEl(null);

  // Date range state.
  const dateRangeState = useAppSelector(selectDateRange);
  const updateDateRange: DateRangePickerProps["updateDateRange"] = (
    start,
    end
  ) => {
    dispatch(
      setDateRangeAction({
        after: start ? start.startOf("day").unix() : null,
        before: end
          ? end.endOf("day").unix()
          : start
          ? start.endOf("day").unix()
          : null,
      })
    );
  };

  return (
    <>
      <Button
        onClick={openCalender}
        variant="contained"
        color="primary"
        aria-describedby={popoverId}
        title="Apply date range filter on orders."
        sx={sx}
      >
        <CalendarMonthIcon sx={{ fill: "#ffffff" }} />
      </Button>
      <DateRangePicker
        start={dateRangeState.after ? dayjs(dateRangeState.after * 1000) : null}
        end={dateRangeState.before ? dayjs(dateRangeState.before * 1000) : null}
        isOpen={open}
        close={closeCalender}
        anchorEl={anchorEl}
        updateDateRange={updateDateRange}
        disableFuture
        popoverId={popoverId}
      />
    </>
  );
};

export default DateRangeFilter;
