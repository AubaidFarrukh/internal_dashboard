import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../context/redux/store";
import type { TUsersState, TSetSearchStrPayload } from "../../types/usersSlice";

const initialState: TUsersState = {
  searchStr: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchStr: (state, { payload }: PayloadAction<TSetSearchStrPayload>) => {
      state.searchStr = payload.searchStr;
    },
  },
});

export const { setSearchStr } = usersSlice.actions;

// Define Selectors
export const selectSearchStr = (state: RootState) => state.users.searchStr;

export default usersSlice.reducer;
