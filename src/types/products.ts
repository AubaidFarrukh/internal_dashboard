import type { TCursor, TPage, TPageSize } from "./commons";

export type TBarcodes = string[];
export type TAisleLocation = number | null;

export type TProduct = {
  id: number;
  title: string;
  variantName: string | null;
  inventory: number | null;
  type: string;
  vendor: string;
  barcode: TBarcodes;
  img: {
    src: string | null;
    alt: string | null;
    width: number | null;
    height: number | null;
  };
};

export type TProductCategory = "Ambient" | "Chilled" | "Frozen" | "Bulk";

export enum EVendor {
  SAVECO_ONLINE = "SaveCo Online",
  THE_MEAT_COMPANY = "The Meat Company Bradford",
}

export type TProductsCount = number;
export type TVendor = EVendor | null;
export type TProductTitle = string | null;
export type TCursorCacheKey =
  `${TPageSize}.${TPage}.${TProductTitle}.${TVendor}`;

export interface TProductsState {
  pageSize: TPageSize;
  page: TPage;
  cursors: { [key: TCursorCacheKey]: TCursor };
  productTitle: TProductTitle;
  vendor: TVendor;
}

export type TSetCursorPayload = {
  pageSize: TPageSize;
  page: TPage;
  productTitle: TProductTitle;
  vendor: TVendor;
  cursor: TCursor;
};

export type TSetPagePayload = {
  page: TPage;
};

export type TSetPageSizePayload = {
  pageSize: TPageSize;
};

export type TSetProductTitlePayload = {
  productTitle: TProductTitle;
};

export type TSetVendorPayload = {
  vendor: TVendor;
};
