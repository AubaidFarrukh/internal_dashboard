import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../context/redux/store";

const BASE_URL = process.env["REACT_APP_API_BASE_URL"]!;

export const savecoApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Orders",
    "Order",
    "Products",
    "Product",
    "ProductLogs",
    "Users",
    "Audits",
    "Z Reports",
    "Z Report",
    "Barcode Report",
    "Barcode Reports",
    "Not Givens",
    "Not Given",
    "ActiveRoutes",
    "PastRoutes",
    "Routes",
    "Drivers",
    "DeliverableOrders",
    "PickingOverview",
    "OverdueOrders",
  ] as const,
  endpoints: builder => ({}),
});

export const { invalidateTags } = savecoApi.util;
