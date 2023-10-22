import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../context/redux/store";
import type {
  TCursorCacheKey,
  TOrdersState,
  TSetCursorPayload,
  TSetPagePayload,
  TSetPageSizePayload,
  TSetOrderNumberPayload,
  TSetHasMeatPayload,
  TSetDeliveryMethodPayload,
  TSetDateRangePayload,
  TSetSelectedOrdersPayload,
  TSetShopStatusPayload,
  TSetMeatStatusPayload,
} from "../../types/orders";

const DEFAULT_PAGE_SIZE = 30;

const initialState: TOrdersState = {
  pageSize: DEFAULT_PAGE_SIZE,
  page: 0,
  cursors: {
    [`${DEFAULT_PAGE_SIZE}.${0}.${null}.${null}.${null}.${null}.${null}`]: null,
  },
  orderNumber: null,
  hasMeat: null,
  deliveryMethod: null,
  shopStatus: null,
  meatStatus: null,
  before: null,
  after: null,
  selectedOrders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCursor: (state, { payload }: PayloadAction<TSetCursorPayload>) => {
      const {
        pageSize,
        page,
        orderNumber,
        hasMeat,
        deliveryMethod,
        before,
        after,
        shopStatus,
        meatStatus,
      } = payload;
      const cursorCacheKey: TCursorCacheKey = `${pageSize}.${page}.${orderNumber}.${hasMeat}.${deliveryMethod}.${before}.${after}.${shopStatus}.${meatStatus}`;
      state.cursors[cursorCacheKey] = payload.cursor;
    },
    setPage: (state, { payload }: PayloadAction<TSetPagePayload>) => {
      state.page = payload.page;
    },
    setPageSize: (state, { payload }: PayloadAction<TSetPageSizePayload>) => {
      state.pageSize = payload.pageSize;
      state.page = 0;
    },
    setOrderNumber: (
      state,
      { payload }: PayloadAction<TSetOrderNumberPayload>
    ) => {
      state.orderNumber = payload.orderNumber;
      state.page = 0;
    },
    setHasMeat: (state, { payload }: PayloadAction<TSetHasMeatPayload>) => {
      state.hasMeat = payload.hasMeat;
      state.page = 0;
    },
    setDeliveryMethod: (
      state,
      { payload }: PayloadAction<TSetDeliveryMethodPayload>
    ) => {
      state.deliveryMethod = payload.deliveryMethod;
      state.page = 0;
    },
    setDateRange: (state, { payload }: PayloadAction<TSetDateRangePayload>) => {
      state.after = payload.after;
      state.before = payload.before;
      state.page = 0;
    },
    setShopStatus: (
      state,
      { payload }: PayloadAction<TSetShopStatusPayload>
    ) => {
      state.shopStatus = payload.shopStatus;
    },
    setMeatStatus: (
      state,
      { payload }: PayloadAction<TSetMeatStatusPayload>
    ) => {
      state.meatStatus = payload.meatStatus;
    },
    setSelectedOrders: (
      state,
      { payload }: PayloadAction<TSetSelectedOrdersPayload>
    ) => {
      state.selectedOrders = payload.selectedOrders;
    },
    refresh: (state, { payload }: PayloadAction<undefined>) => {
      state.pageSize = initialState.pageSize;
      state.page = initialState.page;
      state.cursors = initialState.cursors;
      state.orderNumber = initialState.orderNumber;
      state.hasMeat = initialState.hasMeat;
      state.deliveryMethod = initialState.deliveryMethod;
      state.shopStatus = initialState.shopStatus;
      state.meatStatus = initialState.meatStatus;
      state.before = initialState.before;
      state.after = initialState.after;
      state.selectedOrders = [];
    },
  },
});

export const {
  setCursor,
  setPage,
  setPageSize,
  setOrderNumber,
  setHasMeat,
  setDeliveryMethod,
  setDateRange,
  setShopStatus,
  setMeatStatus,
  setSelectedOrders,
  refresh,
} = ordersSlice.actions;

export const selectCursor = (state: RootState) => {
  const {
    pageSize,
    page,
    orderNumber,
    hasMeat,
    deliveryMethod,
    before,
    after,
    shopStatus,
    meatStatus,
  } = state.orders;

  const cursorCacheKey: TCursorCacheKey = `${pageSize}.${page}.${orderNumber}.${hasMeat}.${deliveryMethod}.${before}.${after}.${shopStatus}.${meatStatus}`;
  return state.orders.cursors[cursorCacheKey];
};
export const selectPage = (state: RootState) => state.orders.page;
export const selectPageSize = (state: RootState) => state.orders.pageSize;
export const selectOrderNumber = (state: RootState) => state.orders.orderNumber;
export const selectHasMeat = (state: RootState) => state.orders.hasMeat;
export const selectDeliveryMethod = (state: RootState) =>
  state.orders.deliveryMethod;
export const selectDateRange = (state: RootState) => ({
  before: state.orders.before,
  after: state.orders.after,
});
export const selectShopStatus = (state: RootState) => state.orders.shopStatus;
export const selectMeatStatus = (state: RootState) => state.orders.meatStatus;
export const selectSelectedOrders = (state: RootState) =>
  state.orders.selectedOrders;

export default ordersSlice.reducer;
