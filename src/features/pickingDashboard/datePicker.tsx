import dayjs from "dayjs";
import { FC, MouseEventHandler, useState } from "react";
import { Box, Button, SxProps, Theme } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  DateRangePicker,
  DateRangePickerProps,
  dateRangeToCategory,
  EDateRangeCategory,
} from "../commons";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  selectDate,
  selectToDate,
  setDateRange,
} from "./pickingDashboardSlice";

export interface DatePickerProps {
  sx?: SxProps<Theme>;
}

export const DatePicker: FC<DatePickerProps> = ({ sx }) => {
  const dispatch = useAppDispatch();

  // Date state
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);

  const dateRangeCategory = dateRangeToCategory(
    date ? dayjs(date) : null,
    toDate ? dayjs(toDate) : null
  );
  const buttonLabel =
    dateRangeCategory === EDateRangeCategory.NONE
      ? "Select Date"
      : dateRangeCategory === EDateRangeCategory.CUSTOM
      ? date + (toDate && toDate !== date ? ` - ${toDate}` : "")
      : dateRangeCategory;

  // Calender state
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isOpen = Boolean(anchorEl);
  const popoverId = isOpen ? "calender-popover" : undefined;
  const openCalender: MouseEventHandler<HTMLButtonElement> = event => {
    setAnchorEl(event.currentTarget);
  };
  const closeCalender = () => setAnchorEl(null);
  const onSelectDate: DateRangePickerProps["updateDateRange"] = (
    start,
    end
  ) => {
    if (!start) return;
    dispatch(
      setDateRange({
        date: start.format("YYYY/MM/DD"),
        toDate: end?.format("YYYY/MM/DD") ?? start.format("YYYY/MM/DD"),
      })
    );
  };

  return (
    <Box sx={sx}>
      <Button
        onClick={openCalender}
        variant="contained"
        startIcon={<CalendarMonthIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        aria-describedby={popoverId}
        sx={{ textTransform: "none" }}
      >
        {buttonLabel}
      </Button>
      <DateRangePicker
        isOpen={isOpen}
        close={closeCalender}
        start={dayjs(date)}
        end={toDate ? dayjs(toDate) : null}
        updateDateRange={onSelectDate}
        hideClearButton
        maxDate={dayjs().add(1, "day")}
        anchorEl={anchorEl}
        popoverId={popoverId}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      />
    </Box>
  );
};

export default DatePicker;
