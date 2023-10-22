import { savecoApi } from "./apiSlice";
import type { TGetAuditByOrderIdRes, TGetOrderByIdArgs } from "../../types/api";
import type { TAudit } from "../../types/auditDetails";

const auditsApi = savecoApi.injectEndpoints({
  endpoints: builder => ({
    getAuditByOrderId: builder.query<TAudit, TGetOrderByIdArgs>({
      query: ({ orderNumber }) => {
        return `/audits/getAuditByOrderId?orderNumber=${orderNumber}`;
      },
      transformResponse: (response: TGetAuditByOrderIdRes) => {
        return response.records;
      },
      providesTags: (res, _, args) => {
        return [{ type: "Audits" as const, id: args.orderNumber }];
      },
    }),
  }),
});

export const { useGetAuditByOrderIdQuery } = auditsApi;
