import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../context/redux/store";
import type {
  TZReportsState,
  TSetCurrentReportPayload,
  TSetCursorPayload,
  TSetDateRangePayload,
} from "../../types/zReportsSlice";

const DEFAULT_PAGE_SIZE = 50;

const initialState: TZReportsState = {
  pageSize: DEFAULT_PAGE_SIZE,
  currentReport: null,
  cursor: null,
  after: null,
  before: null,
};

export const zReportsSlice = createSlice({
  name: "zReports",
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
  zReportsSlice.actions;

// Define Selectors
export const selectPageSize = (state: RootState) => state.zReports.pageSize;
export const selectCurrentReport = (state: RootState) =>
  state.zReports.currentReport;
export const selectCursor = (state: RootState) => state.zReports.cursor;
export const selectDateRange = (state: RootState) => ({
  before: state.zReports.before,
  after: state.zReports.after,
});

export default zReportsSlice.reducer;
