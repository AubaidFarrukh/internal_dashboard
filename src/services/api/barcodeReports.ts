import { savecoApi } from "./apiSlice";
import type {
  TCreateBarcodeReportArgs,
  TCreateBarcodeAdditionRes,
  TGetBarcodeReportByIdRes,
  TGetBarcodeReportByIdArgs,
  TGetAllBarcodeReportsRes,
  TGetBarcodeReportsArg,
} from "../../types/api";
import type { TReport } from "../../types/zReports";

const barcodeReportsApi = savecoApi.injectEndpoints({
  endpoints: (builder) => ({
    createBarcodeReport: builder.mutation<
      TCreateBarcodeAdditionRes,
      TCreateBarcodeReportArgs
    >({
      query: (args) => ({
        url: `audits/reports/createBarcodeReport`,
        method: "POST",
        body: { ...args },
      }),
      invalidatesTags: (res, _, args) => {
        const barcodeReportId = res?.report?.id ?? "BARCODE_ID";
        return [
          { type: "Barcode Reports" as const, id: "LIST" },
          { type: "Barcode Report" as const, id: barcodeReportId },
        ];
      },
    }),
    getBarcodeReportById: builder.query<
      TGetBarcodeReportByIdRes["report"],
      TGetBarcodeReportByIdArgs
    >({
      query: ({ reportId }) => ({
        url: `audits/reports/getBarcodeReportById`,
        params: { reportId },
      }),
      transformResponse: (response: any) => {
        return response.report;
      },
      providesTags: (_) => [
        { type: "Barcode Report" as const, id: "BARCODE_REPORT_BY_ID" },
      ],
    }),
    getAllBarcodeReports: builder.query<
      TGetAllBarcodeReportsRes,
      TGetBarcodeReportsArg
    >({
      query: ({ pageSize, cursor, after, before }) => ({
        url: `audits/reports/getBarcodeReports`,
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
          type: "Barcode Reports" as const,
          id,
        })) ?? []),
        { type: "Barcode Reports" as const, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateBarcodeReportMutation,
  useGetAllBarcodeReportsQuery,
  useGetBarcodeReportByIdQuery,
} = barcodeReportsApi;
