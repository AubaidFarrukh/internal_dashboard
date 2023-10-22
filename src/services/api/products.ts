import { savecoApi } from "./apiSlice";
import type {
  TGetAllChangeLogsArgs,
  TGetAllChangeLogsRes,
  TGetAllProductsArgs,
  TGetAllProductsRes,
  TGetProductByIdArgs,
  TGetProductByIdRes,
  TGetProductsCountArgs,
  TGetProductsCountRes,
  TUpdateProductDetailsArgs,
  TUpdateProductDetailsRes,
} from "../../types/api";
import type { TProductsCount } from "../../types/products";
import type { TProductDetails } from "../../types/productDetails";

const DEFAULT_PAGE_SIZE = 30;

const productsApi = savecoApi.injectEndpoints({
  endpoints: builder => ({
    getAllProducts: builder.query<TGetAllProductsRes, TGetAllProductsArgs>({
      query: ({ pageSize, cursor, productTitle, vendor }) => ({
        url: `products/getAllProducts`,
        params: {
          pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
          cursor: cursor ?? undefined,
          productTitle: productTitle ?? undefined,
          vendor: vendor ?? undefined,
        },
      }),
      providesTags: result => [
        ...(result?.products.map(({ id }) => ({
          type: "Products" as const,
          id,
        })) ?? []),
        { type: "Products" as const, id: "LIST" },
      ],
    }),
    getProductsCount: builder.query<TProductsCount, TGetProductsCountArgs>({
      query: _ => `products/getAllProductsCount`,
      transformResponse: (response: TGetProductsCountRes) => {
        return response.totalProductsCount;
      },
      providesTags: [{ type: "Products" as const, id: "PRODUCT_COUNT" }],
    }),
    getProductById: builder.query<TProductDetails, TGetProductByIdArgs>({
      query: ({ productId }) => {
        return `products/getProductById?productId=${productId}`;
      },
      transformResponse: (response: TGetProductByIdRes) => {
        return response.product;
      },
      providesTags: result =>
        result
          ? [
              { type: "Product" as const, id: result.id },
              { type: "Product" as const, id: "PRODUCT_BY_ID" },
            ]
          : [{ type: "Product" as const, id: "PRODUCT_BY_ID" }],
    }),
    updateProductDetails: builder.mutation<
      TUpdateProductDetailsRes,
      TUpdateProductDetailsArgs
    >({
      query: args => ({
        url: `products/updateProductDetails`,
        method: "PATCH",
        body: { ...args },
      }),
      invalidatesTags: (res, _, args) => [
        { type: "Product" as const, id: args.variantId },
        { type: "ProductLogs" as const, id: args.variantId },
      ],
    }),
    getAllChangeLogs: builder.query<
      TGetAllChangeLogsRes,
      TGetAllChangeLogsArgs
    >({
      query: ({ variantId }) => ({
        url: `products/getAllChangelogs`,
        params: { variantId },
      }),
      providesTags: (res, _, { variantId }) => [
        {
          type: "ProductLogs" as const,
          id: variantId,
        },
        { type: "ProductLogs" as const, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetProductsCountQuery,
  useGetProductByIdQuery,
  useUpdateProductDetailsMutation,
  useGetAllChangeLogsQuery,
} = productsApi;
