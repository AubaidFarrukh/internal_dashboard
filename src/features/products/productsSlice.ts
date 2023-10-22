import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../context/redux/store";
import {
  TCursorCacheKey,
  TProductsState,
  TSetCursorPayload,
  TSetPagePayload,
  TSetPageSizePayload,
  TSetProductTitlePayload,
  TSetVendorPayload,
} from "../../types/products";

const DEFAULT_PAGE_SIZE = 30;

const initialState: TProductsState = {
  pageSize: DEFAULT_PAGE_SIZE,
  page: 0,
  cursors: {
    [`${DEFAULT_PAGE_SIZE}.${0}.${null}.${null}`]: null,
  },
  productTitle: null,
  vendor: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCursor: (state, { payload }: PayloadAction<TSetCursorPayload>) => {
      const { pageSize, page, productTitle, vendor } = payload;
      const cursorCacheKey: TCursorCacheKey = `${pageSize}.${page}.${productTitle}.${vendor}`;
      state.cursors[cursorCacheKey] = payload.cursor;
    },
    setPage: (state, { payload }: PayloadAction<TSetPagePayload>) => {
      state.page = payload.page;
    },
    setPageSize: (state, { payload }: PayloadAction<TSetPageSizePayload>) => {
      state.pageSize = payload.pageSize;
      state.page = 0;
    },
    setProductTitle: (
      state,
      { payload }: PayloadAction<TSetProductTitlePayload>
    ) => {
      state.productTitle = payload.productTitle;
      state.page = 0;
    },
    setVendor: (state, { payload }: PayloadAction<TSetVendorPayload>) => {
      state.vendor = payload.vendor;
      state.page = 0;
    },
  },
});

export const { setCursor, setPage, setPageSize, setProductTitle, setVendor } =
  productsSlice.actions;

export const selectCursor = (state: RootState) => {
  const { pageSize, page, productTitle, vendor } = state.products;
  const cursorCacheKey: TCursorCacheKey = `${pageSize}.${page}.${productTitle}.${vendor}`;
  return state.products.cursors[cursorCacheKey];
};
export const selectPage = (state: RootState) => state.products.page;
export const selectPageSize = (state: RootState) => state.products.pageSize;
export const selectProductTitle = (state: RootState) =>
  state.products.productTitle;
export const selectVendor = (state: RootState) => state.products.vendor;

export default productsSlice.reducer;
