import type { TUpdateLogs } from "./barcode";

export type TReportItem = {
  variantId: number;
  productTitle: string;
  barcode: string;
  variantTitle: string | null;
  price: number;
  quantity: number;
  totalPrice: number;
};

export type TReport = {
  id: string;
  createdAt: number;
  url: string;
  orderNumbers: number[];
  displayName: string;
  items: TReportItem[] | TUpdateLogs[];
};

export type TReportWithBlob = TReport & {
  base64: string;
};
