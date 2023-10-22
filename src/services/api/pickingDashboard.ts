import { savecoApi } from "./apiSlice";
import type {
  TGetOrdersOverviewArgs,
  TGetOrdersOverviewRes,
  TGetOverdueOrdersArgs,
  TGetOverdueOrdersRes,
} from "../../types/api";

const pickingDashboardApi = savecoApi.injectEndpoints({
  endpoints: builder => ({
    getOrdersOverview: builder.query<
      TGetOrdersOverviewRes,
      TGetOrdersOverviewArgs
    >({
      query: args => ({
        url: `dashboard/getOrdersOverview`,
        params: args,
      }),
      providesTags: (res, _, args) => [
        { type: "PickingOverview" as const, id: args.date + args.toDate ?? "" },
      ],
    }),
    getOverdueOrders: builder.query<
      TGetOverdueOrdersRes,
      TGetOverdueOrdersArgs
    >({
      query: args => ({
        url: `dashboard/getOverdueOrders`,
        params: args,
      }),
      providesTags: () => [
        { type: "OverdueOrders" as const, id: "OVERDUE_ORDERS" },
      ],
    }),
  }),
});

export const { useGetOrdersOverviewQuery, useGetOverdueOrdersQuery } =
  pickingDashboardApi;
