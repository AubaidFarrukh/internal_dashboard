import { savecoApi } from "./apiSlice";
import type { TGetPhotoByOrderIdRes, TGetOrderByIdArgs } from "../../types/api";
import type { TPhoto } from "../../types/auditDetails";

const photoApi = savecoApi.injectEndpoints({
  endpoints: builder => ({
    getPhotoByOrderId: builder.query<TPhoto, TGetOrderByIdArgs>({
      query: ({ orderNumber }) => {
        return `/audits/getImageByOrderId?orderNumber=${orderNumber}`;
      },
      transformResponse: (response: TGetPhotoByOrderIdRes) => {
        return response.records;
      },
      providesTags: result => [
        ...(result?.Items?.map(audit => ({
          type: "Audits" as const,
          id: audit.auditId,
        })) ?? []),
        { type: "Audits" as const, id: "LIST" },
      ],
    }),
  }),
});

export const { useGetPhotoByOrderIdQuery } = photoApi;
