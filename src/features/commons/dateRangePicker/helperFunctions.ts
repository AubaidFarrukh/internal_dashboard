import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro";

export enum EDateRangeCategory {
  NONE = "None",
  CUSTOM = "Custom",
  YESTERDAY = "Yesterday",
  TODAY = "Today",
  TOMORROW = "Tomorrow",
  THIS_WEEK = "This Week",
  THIS_MONTH = "This Month",
}

/**
 * Get an array of date-range categories which can be presented as options to the user.
 * @param disablePast If `true`, past related categories won't be included.
 * @param disableFuture If `true`, future related categories won't be included.
 * @param maxDate Max date which can be selected on the calender.
 * @returns An array of date range categories.
 */
export const getDateRangeCategories = (
  disablePast?: boolean,
  disableFuture?: boolean,
  maxDate?: dayjs.Dayjs
): EDateRangeCategory[] => {
  const maxDateString = maxDate?.format("YYYY/MM/DD") ?? "9999/99/99";
  const dateRangeCategories = [
    EDateRangeCategory.NONE,
    EDateRangeCategory.CUSTOM,
  ];

  const yesterday = dayjs().subtract(1, "day").format("YYYY/MM/DD");
  !(maxDateString < yesterday || disablePast) &&
    dateRangeCategories.push(EDateRangeCategory.YESTERDAY);

  const today = dayjs().format("YYYY/MM/DD");
  !(maxDateString < today) &&
    dateRangeCategories.push(EDateRangeCategory.TODAY);

  const tomorrow = dayjs().add(1, "day").format("YYYY/MM/DD");
  !(maxDateString < tomorrow || disableFuture) &&
    dateRangeCategories.push(EDateRangeCategory.TOMORROW);

  const oneWeekBefore = dayjs()
    .subtract(1, "week")
    .add(1, "day")
    .format("YYYY/MM/DD");
  !(maxDateString < oneWeekBefore || disablePast) &&
    dateRangeCategories.push(EDateRangeCategory.THIS_WEEK);

  const oneMonthBefore = dayjs()
    .subtract(1, "month")
    .add(1, "day")
    .format("YYYY/MM/DD");
  !(maxDateString < oneMonthBefore || disablePast) &&
    dateRangeCategories.push(EDateRangeCategory.THIS_MONTH);

  return dateRangeCategories;
};

/**
 * Get date range category for initial rendering based on start and end date states.
 * @param start Starting date of date range.
 * @param end Starting date of date range.
 * @returns A string containing the appropriate category.
 */
export const dateRangeToCategory = (
  start: dayjs.Dayjs | null,
  end: dayjs.Dayjs | null
): EDateRangeCategory => {
  if (!start) return EDateRangeCategory.NONE;

  const startString = start.format("YYYY/MM/DD");
  const endString = end?.format("YYYY/MM/DD");
  const yesterday = dayjs().subtract(1, "day").format("YYYY/MM/DD");
  const today = dayjs().format("YYYY/MM/DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY/MM/DD");
  const oneWeekBefore = dayjs()
    .subtract(1, "week")
    .add(1, "day")
    .format("YYYY/MM/DD");
  const oneMonthBefore = dayjs()
    .subtract(1, "month")
    .add(1, "day")
    .format("YYYY/MM/DD");

  return startString === endString || !endString
    ? startString === yesterday
      ? EDateRangeCategory.YESTERDAY
      : startString === today
      ? EDateRangeCategory.TODAY
      : startString === tomorrow
      ? EDateRangeCategory.TOMORROW
      : EDateRangeCategory.CUSTOM
    : endString === today
    ? startString === oneWeekBefore
      ? EDateRangeCategory.THIS_WEEK
      : startString === oneMonthBefore
      ? EDateRangeCategory.THIS_MONTH
      : EDateRangeCategory.CUSTOM
    : EDateRangeCategory.CUSTOM;
};

/**
 * Get a tuple of start and end dates from the given date range category.
 * @param category Category of date range selected.
 * @returns Date range tuple.
 */
export const categoryToDateRange = (
  category: EDateRangeCategory
): DateRange<Dayjs> => {
  switch (category) {
    case EDateRangeCategory.YESTERDAY:
      return [
        dayjs().startOf("day").subtract(1, "day"),
        dayjs().endOf("day").subtract(1, "day"),
      ];
    case EDateRangeCategory.TODAY:
      return [dayjs().startOf("day"), dayjs()];
    case EDateRangeCategory.TOMORROW:
      return [
        dayjs().startOf("day").add(1, "day"),
        dayjs().endOf("day").add(1, "day"),
      ];
    case EDateRangeCategory.THIS_WEEK:
      return [
        dayjs().startOf("day").subtract(1, "week").add(1, "day"),
        dayjs().endOf("day"),
      ];
    case EDateRangeCategory.THIS_MONTH:
      return [
        dayjs().startOf("day").subtract(1, "month").add(1, "day"),
        dayjs().endOf("day"),
      ];
    default:
      return [null, null];
  }
};
