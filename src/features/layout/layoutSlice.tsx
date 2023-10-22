import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../context/redux/store";
import {
  TLayoutState,
  TSetMessagePayload,
  TSetIsDrawerOpenPayload,
  TSetShowChildrenPayload,
} from "../../types/layoutSlice";

const initialState: TLayoutState = {
  message: { success: null, message: null },
  isDrawerOpen: null,
  showChildren: {},
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setMessage: (state, { payload }: PayloadAction<TSetMessagePayload>) => {
      state.message = { success: payload.success, message: payload.message };
    },
    setIsDrawerOpen: (
      state,
      { payload }: PayloadAction<TSetIsDrawerOpenPayload>
    ) => {
      state.isDrawerOpen = payload.isDrawerOpen;
      if (!payload.isDrawerOpen) {
        state.showChildren = {};
      }
    },
    setShowChildren: (
      state,
      { payload }: PayloadAction<TSetShowChildrenPayload>
    ) => {
      state.showChildren[payload.key] = !state.showChildren[payload.key];
    },
  },
});

// Export actions
export const { setMessage, setIsDrawerOpen, setShowChildren } =
  layoutSlice.actions;

// Define Selectors
export const selectMessage = (state: RootState) => state.layout.message;
export const selectIsDrawerOpen = (state: RootState) =>
  state.layout.isDrawerOpen;
export const selectShowChildren = (state: RootState) =>
  state.layout.showChildren;

export default layoutSlice.reducer;
