import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "../../services/auth";
import { savecoApi } from "../../services/api";
import layoutReducer from "../../features/layout/layoutSlice";
import ordersReducer from "../../features/customerOrders/ordersSlice";
import productsReducer from "../../features/products/productsSlice";
import productDetailsReducer from "../../features/productDetails/productDetailsSlice";
import createUserReducer from "../../features/createUser/createUserSlice";
import usersReducer from "../../features/users/usersSlice";
import zReportsReducer from "../../features/zReports/zReportsSlice";
import barcodeReportsSlice from "../../features/barcodeReports/barcodeReportsSlice";
import notGivenReportsReducer from "../../features/notGiven/notGivenReportsSlice";
import routesReducer from "../../features/deliveyAndDispatch/routesSlice";
import routeFormReducer from "../../features/routeForm/routeFormSlice";
import pickingDashboardReducer from "../../features/pickingDashboard/pickingDashboardSlice";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
    [savecoApi.reducerPath]: savecoApi.reducer,
    orders: ordersReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
    createUser: createUserReducer,
    users: usersReducer,
    zReports: zReportsReducer,
    barcodeReports: barcodeReportsSlice,
    notGivenReports: notGivenReportsReducer,
    routes: routesReducer,
    routeForm: routeFormReducer,
    pickingDashboard: pickingDashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "api/executeQuery/fulfilled",
          "api/executeQuery/pending",
          "api/executeQuery/rejected",
          "api/executeMutation/fulfilled",
          "api/executeMutation/pending",
          "api/executeMutation/rejected",
          "auth/signin/fulfilled",
          "auth/signin/pending",
          "auth/signin/rejected",
          "auth/confirmSignIn/fulfilled",
          "auth/confirmSignIn/pending",
          "auth/confirmSignIn/rejected",
          "auth/newPassword/fulfilled",
          "auth/newPassword/pending",
          "auth/newPassword/rejected",
          "auth/signout/fulfilled",
          "auth/signout/pending",
          "auth/signout/rejected",
          "auth/load/fulfilled",
          "auth/load/pending",
          "auth/load/rejected",
          "auth/sendVerificationCode/fulfilled",
          "auth/sendVerificationCode/pending",
          "auth/sendVerificationCode/rejected",
          "auth/verifyCode/fulfilled",
          "auth/verifyCode/pending",
          "auth/verifyCode/rejected",
          "auth/forgotPassword/fulfilled",
          "auth/forgotPassword/pending",
          "auth/forgotPassword/rejected",
          "auth/forgotPasswordSubmit/fulfilled",
          "auth/forgotPasswordSubmit/pending",
          "auth/forgotPasswordSubmit/rejected",
        ],
        ignoredActionPaths: ["payload", "payload.rawUser"],
        ignoredPaths: ["auth.rawUser", "auth.userObj", "meta.arg.userObj"],
      },
    }).concat(savecoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
