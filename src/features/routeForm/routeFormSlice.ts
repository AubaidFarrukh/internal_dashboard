import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import type { RootState } from "../../context/redux/store";
import type {
  TRouteFormState,
  TSetRouteNamePayload,
  TSetVanPayload,
  TSetSendDatePayload,
  TSetDriverPayload,
  TSetCommentPayload,
  TAssignOrderPayload,
  TUnassignOrderPayload,
  TMoveOrderPayload,
  TPreloadPayload,
} from "../../types/routeFormSlice";

const initialState: TRouteFormState = {
  formType: "create",
  routeName: "",
  van: "",
  sendDate: dayjs().format("YYYY/MM/DD"),
  driver: null,
  comment: "",
  orders: [],
  status: null,
  removedOrders: [],
  previousDriver: null,
  previousOrders: [],
};

export const routeFormSlice = createSlice({
  name: "newRoute",
  initialState,
  reducers: {
    preloadForm: (state, { payload }: PayloadAction<TPreloadPayload>) => {
      state.formType = "edit";
      state.routeName = payload.routeName;
      state.van = payload.van;
      state.sendDate = payload.sendDate;
      state.driver = payload.driver;
      state.comment = payload.comment;
      state.orders = payload.orders;
      state.status = payload.status;
      state.previousDriver = payload.driver;
      state.previousOrders = payload.orders;
    },
    setRouteName: (state, { payload }: PayloadAction<TSetRouteNamePayload>) => {
      state.routeName = payload.routeName;
    },
    setVan: (state, { payload }: PayloadAction<TSetVanPayload>) => {
      state.van = payload.van;
    },
    setSendDate: (state, { payload }: PayloadAction<TSetSendDatePayload>) => {
      state.sendDate = payload.sendDate;
    },
    setDriver: (state, { payload }: PayloadAction<TSetDriverPayload>) => {
      state.driver = payload.driver;
    },
    setComment: (state, { payload }: PayloadAction<TSetCommentPayload>) => {
      state.comment = payload.comment;
    },
    assignOrder: (state, { payload }: PayloadAction<TAssignOrderPayload>) => {
      if (state.orders.includes(payload.order)) return state;
      state.orders.push(payload.order);
    },
    unassignOrder: (
      state,
      { payload }: PayloadAction<TUnassignOrderPayload>
    ) => {
      state.orders = state.orders.filter(order => order !== payload.order);
      if (state.status) {
        state.removedOrders.push(payload.order);
      }
    },
    moveOrder: (state, { payload }: PayloadAction<TMoveOrderPayload>) => {
      const orders = [...state.orders];
      const [removedOrder] = orders.splice(payload.from, 1);
      orders.splice(payload.to, 0, removedOrder);
      state.orders = orders;
    },
    resetForm: _ => {
      return initialState;
    },
  },
});

export const {
  preloadForm,
  setRouteName,
  setVan,
  setSendDate,
  setDriver,
  setComment,
  assignOrder,
  unassignOrder,
  moveOrder,
  resetForm,
} = routeFormSlice.actions;

export const selectFormType = (state: RootState) => state.routeForm.formType;
export const selectRouteName = (state: RootState) => state.routeForm.routeName;
export const selectVan = (state: RootState) => state.routeForm.van;
export const selectSendDate = (state: RootState) => state.routeForm.sendDate;
export const selectDriver = (state: RootState) => state.routeForm.driver;
export const selectComment = (state: RootState) => state.routeForm.comment;
export const selectAssignedOrders = (state: RootState) =>
  state.routeForm.orders;
export const selectRouteStatus = (state: RootState) => state.routeForm.status;
export const selectRemovedOrders = (state: RootState) =>
  state.routeForm.removedOrders;
export const selectPreviousDriver = (state: RootState) =>
  state.routeForm.previousDriver;
export const selectPreviousOrders = (state: RootState) =>
  state.routeForm.previousOrders;

export default routeFormSlice.reducer;
