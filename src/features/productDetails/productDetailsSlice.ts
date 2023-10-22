import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../context/redux/store";
import type {
  TProductDetailsState,
  TEnableEditModePayload,
  TSetAisleLocationPayload,
  TSetCategoryPayload,
  TSetBarcodesPayload,
} from "../../types/productDetails";

const initialState: TProductDetailsState = {
  isEditingMode: false,
  aisleLocation: null,
  category: null,
  barcodes: [],
};

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    enableEditingMode: (
      state,
      { payload }: PayloadAction<TEnableEditModePayload>
    ) => {
      state.isEditingMode = true;
      state.aisleLocation = payload.aisleLocation;
      state.category = payload.category;
      state.barcodes = payload.barcodes;
    },
    disableEditingMode: (state) => {
      state.isEditingMode = false;
      state.aisleLocation = null;
      state.category = null;
      state.barcodes = [];
    },
    setAisleLocation: (
      state,
      { payload }: PayloadAction<TSetAisleLocationPayload>
    ) => {
      state.aisleLocation = payload.aisleLocation;
    },
    setCategory: (state, { payload }: PayloadAction<TSetCategoryPayload>) => {
      state.category = payload.category;
    },
    setBarcodes: (state, { payload }: PayloadAction<TSetBarcodesPayload>) => {
      state.barcodes = payload.barcodes;
    },
  },
});

export const {
  enableEditingMode,
  disableEditingMode,
  setAisleLocation,
  setCategory,
  setBarcodes,
} = productDetailsSlice.actions;

export const selectEditingMode = (state: RootState) =>
  state.productDetails.isEditingMode;
export const selectAisleLocation = (state: RootState) =>
  state.productDetails.aisleLocation;
export const selectCategory = (state: RootState) =>
  state.productDetails.category;
export const selectBarcodes = (state: RootState) =>
  state.productDetails.barcodes;

export default productDetailsSlice.reducer;
