import dayjs from "dayjs";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../context/redux/store";
import {
  TPickingDashboardState,
  TSetDateRangePayload,
  TSetNumPickedItemsPayload,
  TSetNumLoadedTotesPayload,
  TSetRefreshTimeoutPayload,
  TSetShowOverduesPayload,
} from "../../types/pickingDashboard";

const initialState: TPickingDashboardState = {
  date: dayjs().format("YYYY/MM/DD"),
  toDate: dayjs().format("YYYY/MM/DD"),
  numPickedItems: 10, // Default: 10 items
  numLoadedTotes: 10, // Default: 10 totes
  refreshTimeout: 600, // Default: 10 minutes
  showOverdues: true,
};

export const pickingDashboardSlice = createSlice({
  name: "pickingDashboard",
  initialState,
  reducers: {
    setDateRange: (state, { payload }: PayloadAction<TSetDateRangePayload>) => {
      state.date = payload.date;
      state.toDate = payload.toDate;
    },
    setNumPickedItems: (
      state,
      { payload }: PayloadAction<TSetNumPickedItemsPayload>
    ) => {
      state.numPickedItems = payload.numPickedItems;
    },
    setNumLoadedTotes: (
      state,
      { payload }: PayloadAction<TSetNumLoadedTotesPayload>
    ) => {
      state.numLoadedTotes = payload.numLoadedTotes;
    },
    setRefreshTimeout: (
      state,
      { payload }: PayloadAction<TSetRefreshTimeoutPayload>
    ) => {
      state.refreshTimeout = payload.refreshTimeout;
    },
    setShowOverdues: (
      state,
      { payload }: PayloadAction<TSetShowOverduesPayload>
    ) => {
      state.showOverdues = payload.showOverdues;
    },
  },
});

// Export actions
export const {
  setDateRange,
  setNumPickedItems,
  setNumLoadedTotes,
  setRefreshTimeout,
  setShowOverdues,
} = pickingDashboardSlice.actions;

// Define Selectors
export const selectDate = (state: RootState) => state.pickingDashboard.date;
export const selectToDate = (state: RootState) => state.pickingDashboard.toDate;
export const selectNumPickedItems = (state: RootState) =>
  state.pickingDashboard.numPickedItems;
export const selectNumLoadedTotes = (state: RootState) =>
  state.pickingDashboard.numLoadedTotes;
export const selectRefreshTimeout = (state: RootState) =>
  state.pickingDashboard.refreshTimeout;
export const selectShowOverdues = (state: RootState) =>
  state.pickingDashboard.showOverdues;

export default pickingDashboardSlice.reducer;
