import { savecoApi } from "./apiSlice";
import type {
  TGetAllActiveRoutesArgs,
  TGetAllActiveRoutesRes,
  TGetAllPastRoutesArgs,
  TGetAllPastRoutesRes,
  TGetAllDriversArgs,
  TGetAllDriversRes,
  TGetAllDeliverableOrdersArgs,
  TGetAllDeliverableOrdersRes,
  TAddRouteArgs,
  TAddRouteRes,
  TEditRouteArgs,
  TEditRouteRes,
} from "../../types/api";
import type { TRoute } from "../../types/deliveryAndDispatch";

const routesApi = savecoApi.injectEndpoints({
  endpoints: builder => ({
    getAllActiveRoutes: builder.query<
      TGetAllActiveRoutesRes,
      TGetAllActiveRoutesArgs
    >({
      query: () => `driver/getAllActiveRoutes`,
      providesTags: result => [
        ...(result?.activeRoutes.today.map(({ id }) => ({
          type: "Routes" as const,
          id,
        })) ?? []),
        ...(result?.activeRoutes.today.map(({ id }) => ({
          type: "ActiveRoutes" as const,
          id,
        })) ?? []),
        ...(result?.activeRoutes.tomorrow.map(({ id }) => ({
          type: "Routes" as const,
          id,
        })) ?? []),
        ...(result?.activeRoutes.tomorrow.map(({ id }) => ({
          type: "ActiveRoutes" as const,
          id,
        })) ?? []),
        { type: "ActiveRoutes" as const, id: "LIST" },
      ],
    }),
    getAllPastRoutes: builder.query<
      TGetAllPastRoutesRes,
      TGetAllPastRoutesArgs
    >({
      query: ({ pageSize, cursor, after, before }) => ({
        url: `driver/getAllPastRoutes`,
        params: {
          pageSize: pageSize,
          cursor: cursor ?? undefined,
          before: before && after ? before : undefined,
          after: before && after ? after : undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { pageSize, after, before } = queryArgs;
        return `${endpointName}.${pageSize}.${after}.${before}`;
      },
      merge: (currentCache, newItems) => {
        let routes: TRoute[] = [];
        const combinedRoutes = [
          ...currentCache.pastRoutes,
          ...newItems.pastRoutes,
        ];

        // Remove duplicates.
        combinedRoutes.forEach(r => {
          const routeIds = routes.map(_ => _.id);
          if (routeIds.includes(r.id)) return;

          // If this report isn't duplicate, add it to the array.
          routes.push(r);
        });

        return {
          status: newItems.status,
          pastRoutes: routes,
          cursor: newItems.cursor,
        };
      },
      // Refetch when the page arg changes
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      providesTags: result => [
        ...(result?.pastRoutes.map(({ id }) => ({
          type: "Routes" as const,
          id,
        })) ?? []),
        ...(result?.pastRoutes.map(({ id }) => ({
          type: "PastRoutes" as const,
          id,
        })) ?? []),
        { type: "PastRoutes" as const, id: "LIST" },
      ],
    }),
    getAllDrivers: builder.query<TGetAllDriversRes, TGetAllDriversArgs>({
      query: ({ sendDate }) => ({
        url: `driver/getAllDrivers`,
        params: {
          sendDate: sendDate ?? undefined,
        },
      }),
      // transformResponse: (res: TGetAllDriversRes) => res.drivers,
      providesTags: result => [
        ...(result?.drivers.map(({ username }) => ({
          type: "Drivers" as const,
          id: username,
        })) ?? []),
        { type: "Drivers" as const, id: "LIST" },
      ],
    }),
    getAllDeliverableOrders: builder.query<
      TGetAllDeliverableOrdersRes,
      TGetAllDeliverableOrdersArgs
    >({
      query: () => `driver/getAllDeliverableOrders`,
      providesTags: result => [
        ...(result?.orders?.map(orderNumber => ({
          type: "DeliverableOrders" as const,
          id: orderNumber,
        })) ?? []),
        { type: "DeliverableOrders" as const, id: "LIST" },
      ],
    }),
    addRoute: builder.mutation<TAddRouteRes, TAddRouteArgs>({
      query: args => ({
        url: `driver/addRoute`,
        method: "POST",
        body: args,
      }),
      invalidatesTags: result => [
        { type: "ActiveRoutes" as const, id: "LIST" },
        { type: "Drivers" as const, id: "LIST" },
        { type: "DeliverableOrders" as const, id: "LIST" },
      ],
    }),
    editRoute: builder.mutation<TEditRouteRes, TEditRouteArgs>({
      query: args => ({
        url: `driver/editRoute`,
        method: "PATCH",
        body: {
          username: args.username,
          id: args.id,
          routeName: args.routeName,
          van: args.van,
          sendDate: args.sendDate,
          driver: args.driver,
          comment: args.comment,
          orders: args.orders,
        },
      }),
      invalidatesTags: (result, _, args) => [
        { type: "Routes" as const, id: args.id },
        { type: "Drivers" as const, id: "LIST" },
        { type: "DeliverableOrders" as const, id: "LIST" },
        ...(args.ordersAdded?.map(order => ({
          type: "Orders" as const,
          id: order,
        })) ?? []),
        ...(args.ordersAdded?.map(order => ({
          type: "Order" as const,
          id: order,
        })) ?? []),
        ...(args.ordersRemoved?.map(order => ({
          type: "Orders" as const,
          id: order,
        })) ?? []),
        ...(args.ordersRemoved?.map(order => ({
          type: "Order" as const,
          id: order,
        })) ?? []),
      ],
    }),
  }),
});

export const {
  useGetAllActiveRoutesQuery,
  useGetAllPastRoutesQuery,
  useGetAllDriversQuery,
  useGetAllDeliverableOrdersQuery,
  useAddRouteMutation,
  useEditRouteMutation,
} = routesApi;
