import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../context/redux/store";
import type {
  TNotGivenReportsState,
  TSetCurrentReportPayload,
  TSetCursorPayload,
  TSetDateRangePayload,
} from "../../types/notGivenReportsSlice";

const DEFAULT_PAGE_SIZE = 50;

const initialState: TNotGivenReportsState = {
  pageSize: DEFAULT_PAGE_SIZE,
  currentReport: null,
  cursor: null,
  after: null,
  before: null,
};

export const notGivenReportsSlice = createSlice({
  name: "notGivenReports",
  initialState,
  reducers: {
    setCurrentReport: (
      state,
      { payload }: PayloadAction<TSetCurrentReportPayload>
    ) => {
      state.currentReport = payload.currentReport;
    },
    setCursor: (state, { payload }: PayloadAction<TSetCursorPayload>) => {
      state.cursor = payload.newCursor;
    },
    setDateRange: (state, { payload }: PayloadAction<TSetDateRangePayload>) => {
      state.after = payload.after;
      state.before = payload.before;
      state.cursor = initialState.cursor;
    },
    refresh: state => {
      state.currentReport = initialState.currentReport;
      state.after = initialState.after;
      state.before = initialState.before;
      state.cursor = initialState.cursor;
    },
  },
});

export const { setCurrentReport, setCursor, setDateRange, refresh } =
  notGivenReportsSlice.actions;

// Define Selectors
export const selectPageSize = (state: RootState) =>
  state.notGivenReports.pageSize;
export const selectCurrentReport = (state: RootState) =>
  state.notGivenReports.currentReport;
export const selectCursor = (state: RootState) => state.notGivenReports.cursor;
export const selectDateRange = (state: RootState) => ({
  before: state.notGivenReports.before,
  after: state.notGivenReports.after,
});

export default notGivenReportsSlice.reducer;
