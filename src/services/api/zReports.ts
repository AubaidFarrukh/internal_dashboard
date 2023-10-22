import { savecoApi } from "./apiSlice";
import type {
  TCreateZReportArgs,
  TCreateZReportRes,
  TGetAllZReportsArgs,
  TGetAllZReportsRes,
  TGetZReportByIdArgs,
  TGetZReportByIdRes,
} from "../../types/api";
import type { TReport } from "../../types/zReports";

const zReportsApi = savecoApi.injectEndpoints({
  endpoints: builder => ({
    getAllZReports: builder.query<TGetAllZReportsRes, TGetAllZReportsArgs>({
      query: ({ pageSize, cursor, after, before }) => ({
        url: `audits/reports/getZReports`,
        method: "GET",
        params: {
          pageSize,
          cursor: cursor ?? undefined,
          after: before && after ? after : undefined,
          before: before && after ? before : undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { pageSize, after, before } = queryArgs;
        return `${endpointName}.${pageSize}.${after}.${before}`;
      },
      merge: (currentCache, newItems) => {
        let reports: TReport[] = [];
        const combinedReports = [...currentCache.reports, ...newItems.reports];

        // Remove duplicates.
        combinedReports.forEach(r => {
          const reportIds = reports.map(_ => _.id);
          if (reportIds.includes(r.id)) return;

          // If this report isn't duplicate, add it to the array.
          reports.push(r);
        });

        return { status: newItems.status, reports, cursor: newItems.cursor };
      },
      // Refetch when the page arg changes
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      providesTags: result => [
        ...(result?.reports.map(({ id }) => ({
          type: "Z Reports" as const,
          id,
        })) ?? []),
        { type: "Z Reports" as const, id: "LIST" },
      ],
    }),
    getZReportById: builder.query<
      TGetZReportByIdRes["report"],
      TGetZReportByIdArgs
    >({
      query: ({ reportId }) => ({
        url: `audits/reports/getZReportById`,
        params: { reportId },
      }),
      transformResponse: (response: TGetZReportByIdRes) => {
        return response.report;
      },
      providesTags: _ => [{ type: "Z Report" as const, id: "Z_REPORT_BY_ID" }],
    }),
    createZReport: builder.mutation<TCreateZReportRes, TCreateZReportArgs>({
      query: args => ({
        url: `audits/reports/createZReport`,
        method: "POST",
        body: { ...args },
      }),
      invalidatesTags: (res, _, args) => [
        { type: "Z Reports" as const, id: "LIST" },
        { type: "Z Report" as const, id: "Z_REPORT_BY_ID" },
        ...args.orderNumbers.map(orderNumber => ({
          type: "Orders" as const,
          id: orderNumber,
        })),
        ...args.orderNumbers.map(orderNumber => ({
          type: "Audits" as const,
          id: orderNumber,
        })),
      ],
    }),
  }),
});

export const {
  useGetAllZReportsQuery,
  useGetZReportByIdQuery,
  useLazyGetZReportByIdQuery,
  useCreateZReportMutation,
} = zReportsApi;
