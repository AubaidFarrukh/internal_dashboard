import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../context/redux/store";
import type {
  TBarcodeReportsState,
  TSetCurrentReportPayload,
  TSetCursorPayload,
  TSetDateRangePayload,
} from "../../types/barcodeReportsSlice";

const DEFAULT_PAGE_SIZE = 50;

const initialState: TBarcodeReportsState = {
  pageSize: DEFAULT_PAGE_SIZE,
  currentReport: null,
  cursor: null,
  after: null,
  before: null,
};

export const barcodeReportsSlice = createSlice({
  name: "barcodeReports",
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
  barcodeReportsSlice.actions;

// Define Selectors
export const selectPageSize = (state: RootState) =>
  state.barcodeReports.pageSize;
export const selectCurrentReport = (state: RootState) =>
  state.barcodeReports.currentReport;
export const selectCursor = (state: RootState) => state.barcodeReports.cursor;
export const selectDateRange = (state: RootState) => ({
  before: state.barcodeReports.before,
  after: state.barcodeReports.after,
});

export default barcodeReportsSlice.reducer;
