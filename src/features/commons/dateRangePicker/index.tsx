import { FC, useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Fade,
  InputLabel,
  MenuItem,
  Popover,
  PopoverOrigin,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import type { DateRange } from "@mui/x-date-pickers-pro";
import type { Dayjs } from "dayjs";
import {
  EDateRangeCategory,
  getDateRangeCategories,
  dateRangeToCategory,
  categoryToDateRange,
} from "./helperFunctions";

export interface DateRangePickerProps {
  isOpen: boolean;
  close: () => void;
  start: dayjs.Dayjs | null;
  end: dayjs.Dayjs | null;
  updateDateRange: (
    start: dayjs.Dayjs | null,
    end: dayjs.Dayjs | null
  ) => void | Promise<void>;
  isLoading?: boolean;
  confirmButtonText?: string;
  anchorEl: HTMLButtonElement | null;
  hideClearButton?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  maxDate?: dayjs.Dayjs;
  popoverId?: string;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  isOpen,
  close,
  start: startState,
  end: endState,
  updateDateRange: updateDateRangeState,
  isLoading,
  confirmButtonText,
  anchorEl,
  disablePast,
  disableFuture,
  maxDate,
  hideClearButton,
  popoverId,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  transformOrigin = { vertical: "top", horizontal: "center" },
}) => {
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([
    startState,
    endState,
  ]);
  const dateRangeCategories = getDateRangeCategories(
    disablePast,
    disableFuture,
    maxDate
  );
  const [dateRangeCategory, setDateRangeCategory] = useState(
    dateRangeToCategory(startState, endState)
  );
  const startDateString = dateRange[0] && dateRange[0].format("MMM DD, YYYY");
  const endDateString = dateRange[1] && dateRange[1].format("MMM DD, YYYY");

  const onDateRangeSelectChange = (
    e: SelectChangeEvent<EDateRangeCategory>
  ) => {
    const newValue = e.target.value as EDateRangeCategory;
    setDateRangeCategory(newValue);

    if (newValue === EDateRangeCategory.CUSTOM) return;

    // If category is other than "CUSTOM", calculate date range.
    const dateRange = categoryToDateRange(newValue);
    setDateRange(dateRange);
  };

  const onDateRangePicked = (dr: DateRange<Dayjs>) => {
    setDateRange([dr[0]?.startOf("day") ?? null, dr[1]?.endOf("day") ?? null]);
    setDateRangeCategory(dateRangeToCategory(...dr));
  };

  const applyChanges = async () => {
    const start = dateRange[0]?.format("YYYY/MM/DD") ?? null;
    const end = dateRange[1]?.format("YYYY/MM/DD") ?? null;

    if (
      start !== startState?.format("YYYY/MM/DD") ||
      end !== endState?.format("YYYY/MM/DD")
    ) {
      await updateDateRangeState(...dateRange);
    }

    close();
  };

  const clearFilter = () => {
    setDateRange([null, null]);
    setDateRangeCategory(EDateRangeCategory.NONE);
    updateDateRangeState(null, null);
    close();
  };

  useEffect(() => {
    if (isOpen) {
      setDateRange([startState, endState]);
      setDateRangeCategory(dateRangeToCategory(startState, endState));
    }
  }, [isOpen, startState, endState]);

  return (
    <Popover
      id={popoverId}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={close}
      TransitionComponent={Fade}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      <Box display="flex" flexDirection="row" px={2}>
        <StaticDateRangePicker
          displayStaticWrapperAs="desktop"
          calendars={2}
          disablePast={disablePast}
          disableFuture={disableFuture}
          maxDate={maxDate}
          disableOpenPicker
          value={dateRange}
          onChange={onDateRangePicked}
          renderInput={() => <></>}
        />
        <Divider orientation="vertical" flexItem sx={{ pl: 1 }} />
        <Box
          display="flex"
          flexDirection="column"
          py={4}
          pl={4}
          pr={2}
          maxWidth={350}
        >
          <Box mb={3}>
            <InputLabel id="date-range" sx={{ mb: 1, fontWeight: 600 }}>
              Date Range
            </InputLabel>
            <Select
              defaultValue={EDateRangeCategory.NONE}
              value={dateRangeCategory}
              onChange={onDateRangeSelectChange}
              fullWidth
              labelId="date-range"
            >
              {dateRangeCategories.map(category => (
                <MenuItem value={category} key={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <InputLabel
                htmlFor="start-date"
                sx={{ width: "43%", fontWeight: 600 }}
              >
                Start Date:
              </InputLabel>
              <InputLabel
                htmlFor="end-date"
                sx={{ width: "43%", fontWeight: 600 }}
              >
                End Date:
              </InputLabel>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <TextField
                disabled
                id="start-date"
                sx={{ width: "43%" }}
                value={startDateString ?? ""}
              />
              <Typography>-</Typography>
              <TextField
                disabled
                id="end-date"
                sx={{ width: "43%" }}
                value={endDateString ?? ""}
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mt="auto">
            {!hideClearButton ? (
              <Button
                variant="outlined"
                onClick={clearFilter}
                sx={{ width: "48%", textTransform: "none" }}
              >
                Clear Filter
              </Button>
            ) : null}
            <Button
              variant="contained"
              onClick={applyChanges}
              startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
              disabled={isLoading}
              sx={{ width: "48%", textTransform: "none", ml: "auto" }}
            >
              {confirmButtonText ?? "Apply"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Popover>
  );
};

export default DateRangePicker;
