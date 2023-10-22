import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../context/redux/store";
import type {
  TRoutesState,
  TSetOpenRoutePayload,
  TSetCursorPayload,
  TSetDateRangePayload,
} from "../../types/deliveryAndDispatch";

const DEFAULT_PAGE_SIZE = 30;

const initialState: TRoutesState = {
  openRoute: null,
  pageSize: DEFAULT_PAGE_SIZE,
  cursor: null,
  after: null,
  before: null,
};

export const routesSlice = createSlice({
  name: "routesSlice",
  initialState,
  reducers: {
    setOpenRoute: (state, { payload }: PayloadAction<TSetOpenRoutePayload>) => {
      state.openRoute = payload.openRoute;
    },
    setCursor: (state, { payload }: PayloadAction<TSetCursorPayload>) => {
      state.cursor = payload.cursor;
    },
    setDateRange: (state, { payload }: PayloadAction<TSetDateRangePayload>) => {
      state.after = payload.after;
      state.before = payload.before;
      state.cursor = initialState.cursor;
    },
  },
});

export const { setOpenRoute, setCursor, setDateRange } = routesSlice.actions;

export const selectOpenRoute = (state: RootState) => state.routes.openRoute;
export const selectPageSize = (state: RootState) => state.routes.pageSize;
export const selectCursor = (state: RootState) => state.routes.cursor;
export const selectDateRange = (state: RootState) => ({
  before: state.routes.before,
  after: state.routes.after,
});

export default routesSlice.reducer;
