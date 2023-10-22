import { savecoApi } from "./apiSlice";
import type {
  TCancelOrderArgs,
  TCancelOrderRes,
  TGetAllOrdersArgs,
  TGetAllOrdersRes,
  TGetOrderByIdArgs,
  TGetOrderByIdRes,
  TGetOrdersCountArgs,
  TGetOrdersCountRes,
  TUpdateOrderStatusAdminArgs,
  TUpdateOrderStatusAdminRes,
} from "../../types/api";
import type { TOrdersCount } from "../../types/orders";
import type { TOrderDetails } from "../../types/orderDetails";

const DEFAULT_PAGE_SIZE = 30;

const ordersApi = savecoApi.injectEndpoints({
  endpoints: builder => ({
    getAllOrders: builder.query<TGetAllOrdersRes, TGetAllOrdersArgs>({
      query: ({
        pageSize,
        cursor,
        orderNumber,
        hasMeat,
        deliveryMethod,
        before,
        after,
        shopStatus,
        meatStatus,
      }) => ({
        url: `orders/getAllOrders`,
        params: {
          pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
          cursor: cursor ?? undefined,
          orderNumber: orderNumber ?? undefined,
          hasMeat: hasMeat ? 1 : undefined,
          deliveryMethod: deliveryMethod ?? undefined,
          before: before && after ? before : undefined,
          after: before && after ? after : undefined,
          shopStatus: shopStatus ?? undefined,
          meatStatus: meatStatus ?? undefined,
        },
      }),
      providesTags: result => [
        ...(result?.orders.map(
          ({ id }) => ({ type: "Orders" as const, id } as const)
        ) ?? []),
        { type: "Orders" as const, id: "LIST" },
      ],
    }),
    getOrdersCount: builder.query<TOrdersCount, TGetOrdersCountArgs>({
      query: _ => `orders/getAllOrdersCount`,
      transformResponse: (response: TGetOrdersCountRes) => {
        return response.totalOrdersCount;
      },
      providesTags: [{ type: "Orders" as const, id: "ORDER_COUNT" }],
    }),
    getOrderById: builder.query<TOrderDetails, TGetOrderByIdArgs>({
      query: ({ orderNumber }) => {
        return `orders/getOrderById?orderNumber=${orderNumber}`;
      },
      transformResponse: (response: TGetOrderByIdRes) => {
        return response.order;
      },
      providesTags: result =>
        result
          ? [
              { type: "Order" as const, id: result.id },
              { type: "Order" as const, id: "ORDER_BY_ID" },
            ]
          : [{ type: "Order" as const, id: "ORDER_BY_ID" }],
    }),
    updateOrderStatusAdmin: builder.mutation<
      TUpdateOrderStatusAdminRes,
      TUpdateOrderStatusAdminArgs
    >({
      query: args => ({
        url: `orders/updateOrderStatusAdmin`,
        method: "PATCH",
        body: args,
      }),
      invalidatesTags: (result, _, args) => [
        {
          type: "Order" as const,
          id: result?.order.orderNumber ?? "ORDER_BY_ID",
        },
        {
          type: "Audits" as const,
          id: args.orderNumber,
        },
        {
          type: "Orders" as const,
          id: args.orderNumber,
        },
      ],
    }),
    cancelOrder: builder.mutation<Pick<TOrderDetails, "id">, TCancelOrderArgs>({
      query: ({ orderNumber }) => ({
        url: `orders/cancelOrder`,
        method: "POST",
        params: { orderNumber },
      }),
      transformResponse: (response: TCancelOrderRes) => {
        return response.order;
      },
      invalidatesTags: result => [
        { type: "Order" as const, id: result?.id ?? "ORDER_BY_ID" },
      ],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrdersCountQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusAdminMutation,
  useCancelOrderMutation,
} = ordersApi;
