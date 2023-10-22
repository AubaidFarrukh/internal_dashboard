import type { TProductCategory } from "./products";
import type { TAisleLocation, TBarcodes } from "./products";

export type TProductDetails = {
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
  price: number;
  cost: number | null;
  compareAt: number | null;
  weight: {
    value: number;
    unit: string;
  };
  sku: string | null;
  taxable: boolean;
  aisleLocation: TAisleLocation;
  category: TProductCategory | null;
  description: string | null;
};

export type TProductChangelog = {
  id: string;
  variantId: number;
  datetime: string;
  activity: string;
  comment: string;
  username: string;
  from: any;
  to: any;
};

export type TProductDetailsState = {
  isEditingMode: boolean;
  aisleLocation: TAisleLocation;
  category: TProductCategory | null;
  barcodes: TBarcodes;
};

export type TEnableEditModePayload = {
  aisleLocation: TAisleLocation;
  category: TProductCategory | null;
  barcodes: TBarcodes;
};

export type TSetAisleLocationPayload = {
  aisleLocation: TAisleLocation;
};

export type TSetCategoryPayload = {
  category: TProductCategory | null;
};

export type TSetBarcodesPayload = {
  barcodes: TBarcodes;
};
