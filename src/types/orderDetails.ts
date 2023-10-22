import type { TPicker } from "./orders";
import type { TProductCategory } from "./products";

export type TOrderDetails = {
  order_number: number | null;
  id: number;
  orderName: string;
  createdAt: number;
  createdAtString: string;
  customerData: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  financialValues: {
    orderValue: string;
    tax: string;
    discount: string;
    shippingCost: string;
    total: string;
    total_tip_received: string;
  };
  shippingAddress: TAddress;
  billingAddress: TAddress;
  shopItemsCount: number;
  meatItemsCount: number;
  lineItems: Array<TLineItem>;
  totalWeight: number;
  deliveryMethod: string;
  orderNote: string;
  shopStatus: TShopStatus | null;
  meatStatus: TMeatStatus | null;
  hasMeat: boolean;
  shopPicker: TPicker | null;
  meatPicker: TPicker | null;
  isZReportPrinted: boolean;
  totes?: Array<TTote>;
};

export type TLineItemBase = {
  id: string;
  sku: string;
  name: string;
  completeName: string;
  variant: {
    id: number;
    title: string;
  };
  grams: number;
  quantity: number;
  price: string;
  discount: string;
  total: string;
  imageSrc: string;
  isShopItem: boolean;
  isMeatItem: boolean;
  barcode: string | null;
  totes: TTote[];
};

export type TLineItem = TLineItemBase & {
  givenQuantity: number | null;
  notGivenQuantity: number | null;
  altsQuantity: number | null;
  altItems: TLineItemBase[];
};

export type TAddress = {
  name: string;
  address1: string;
  address2: string;
  city: string;
  zip: string;
  province: string;
  country: string;
  phone: string;
};

export type TTote = {
  // Tote ID for totes and product name for bulk products.
  id: string;
  category: TProductCategory | "Meat";
  bags: { code: string }[];
  pickerImage: string;
};

export type TShopStatus =
  | "Ready for picking"
  | "Picking in progress"
  | "Ready for delivery"
  | "Ready for collection"
  | "Dispatched"
  | "Fulfilled"
  | "Cancelled"
  | "On-hold";
export type TMeatStatus = TShopStatus;

export type TUpdateDirective = "On-hold" | "Reset" | "Fulfilled" | "Cancel";
