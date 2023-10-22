import { savecoApi } from "./apiSlice";
import type {
  TCreateNotGivenReportArgs,
  TCreateNotGivenReportRes,
  TGetAllNotGivenReportsArgs,
  TGetAllNotGivenReportsRes,
  TGetNotGivenReportByIdArgs,
  TGetNotGivenReportByIdRes,
} from "../../types/api";
import type { TReport } from "../../types/zReports";

const notGivenReportsApi = savecoApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotGivenReports: builder.query<
      TGetAllNotGivenReportsRes,
      TGetAllNotGivenReportsArgs
    >({
      query: ({ pageSize, cursor, after, before }) => ({
        url: `audits/reports/getNotgivenReports`,
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
        combinedReports.forEach((r) => {
          const reportIds = reports.map((_) => _.id);
          if (reportIds.includes(r.id)) return;

          // If this report isn't duplicate, add it to the array.
          reports.push(r);
        });

        return { status: newItems.status, reports, cursor: newItems.cursor };
      },
      // Refetch when the page arg changes
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      providesTags: (result) => [
        ...(result?.reports.map(({ id }) => ({
          type: "Not Givens" as const,
          id,
        })) ?? []),
        { type: "Not Givens" as const, id: "LIST" },
      ],
    }),
    getNotGivenReportById: builder.query<
      TGetNotGivenReportByIdRes["report"],
      TGetNotGivenReportByIdArgs
    >({
      query: ({ reportId }) => ({
        url: `audits/reports/getNotgivenReportById`,
        params: { reportId },
      }),
      transformResponse: (response: TGetNotGivenReportByIdRes) => {
        return response.report;
      },
      providesTags: (_) => [
        { type: "Not Given" as const, id: "NOT_GIVEN_BY_ID" },
      ],
    }),
    createNotGivenReport: builder.mutation<
      TCreateNotGivenReportRes,
      TCreateNotGivenReportArgs
    >({
      query: (args) => ({
        url: `audits/reports/createNotgivenReport`,
        method: "POST",
        body: { ...args },
      }),
      invalidatesTags: (res, _, args) => [
        { type: "Not Givens" as const, id: "LIST" },
        { type: "Not Given" as const, id: "NOT_GIVEN_BY_ID" },
        ...args.orderNumbers.map((orderNumber) => ({
          type: "Orders" as const,
          id: orderNumber,
        })),
        ...args.orderNumbers.map((orderNumber) => ({
          type: "Audits" as const,
          id: orderNumber,
        })),
      ],
    }),
  }),
});

export const {
  useGetAllNotGivenReportsQuery,
  useGetNotGivenReportByIdQuery,
  useLazyGetNotGivenReportByIdQuery,
  useCreateNotGivenReportMutation,
} = notGivenReportsApi;
