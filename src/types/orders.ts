import type { TAfter, TBefore, TCursor, TPage, TPageSize } from "./commons";
import type { TMeatStatus, TShopStatus } from "./orderDetails";
import type { TRole } from "./users";

export type TOrder = {
  id: number;
  orderName: string;
  createdAt: number;
  createdAtString: string;
  customerName: string;
  totalPrice: string;
  deliveryMethod: string;
  orderNote: string;
  shopItemsCount: number;
  shopStatus: TShopStatus | null;
  meatItemsCount: number;
  meatStatus: TMeatStatus | null;
  shopPicker: TPicker | null;
  meatPicker: TPicker | null;
  zReport: string | null;
  notGivenReport: string | null;
};

export type TPicker = {
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role: TRole;
};

export enum EStatus {
  PICKING_IN_PROGRESS = "picking in progress",
  READY_FOR_COLLECTION = "ready for collection",
  TO_BE_PICKED = "to be picked",
  CANCELLED = "cancelled",
  DELIVERED = "ready for delivery",
  PAID = "ready for picking",
}

export type TOrdersCount = number;
export type TOrderNumber = number;
export type THasMeat = boolean;
export type TDeliveryMethod =
  | "2-hour Express Delivery"
  | "Same Day Delivery"
  | "Next Day Delivery"
  | "SaveCo Bradford";
export type TCursorCacheKey =
  `${TPageSize}.${TPage}.${TOrderNumber | null}.${THasMeat | null}.${TDeliveryMethod | null}.${TBefore}.${TAfter}.${TShopStatus | null}.${TMeatStatus | null}`;

export interface TOrdersState {
  pageSize: TPageSize;
  page: TPage;
  cursors: { [key: TCursorCacheKey]: TCursor };
  orderNumber: TOrderNumber | null;
  hasMeat: THasMeat | null;
  deliveryMethod: TDeliveryMethod | null;
  shopStatus: TShopStatus | null;
  meatStatus: TMeatStatus | null;
  before: TBefore;
  after: TAfter;
  selectedOrders: number[];
}

export type TSetCursorPayload = {
  pageSize: TPageSize;
  page: TPage;
  orderNumber: TOrderNumber | null;
  hasMeat: THasMeat | null;
  deliveryMethod: TDeliveryMethod | null;
  before: TBefore;
  after: TAfter;
  cursor: TCursor;
  shopStatus: TShopStatus | null;
  meatStatus: TMeatStatus | null;
};

export type TSetPagePayload = {
  page: TPage;
};

export type TSetPageSizePayload = {
  pageSize: TPageSize;
};

export type TSetOrderNumberPayload = {
  orderNumber: TOrderNumber | null;
};

export type TSetHasMeatPayload = {
  hasMeat: THasMeat | null;
};

export type TSetDeliveryMethodPayload = {
  deliveryMethod: TDeliveryMethod | null;
};

export type TSetDateRangePayload = {
  after: TAfter;
  before: TBefore;
};

export type TSetShopStatusPayload = {
  shopStatus: TShopStatus | null;
};

export type TSetMeatStatusPayload = {
  meatStatus: TMeatStatus | null;
};

export type TSetSelectedOrdersPayload = {
  selectedOrders: number[];
};
