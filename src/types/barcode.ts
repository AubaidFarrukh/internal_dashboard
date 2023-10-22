type Activity = "Barcode added";

export type TItem = {
  activity: Activity;
  datetime: string; // ISO 8601 date format
  from: string[];
  comment: string;
  username: string;
  variantId: number;
  id: string;
  to: string[];
};

export type TUpdateLogs = {
  id: string;
  title: string;
  variantTitle: string;
  item: TItem;
}[];

export type TBarcodeItem = TItem;
