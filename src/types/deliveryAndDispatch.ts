import type { TProductCategory } from "./products";
import type { TAfter, TBefore, TCursor, TPageSize } from "./commons";

export type TRoute = {
  id: string;
  createdAt: number;
  updatedAt: number;
  routeName: string;
  van: string;
  sendDate: string;
  driver: TDriver;
  comment: string;
  status: TRouteStatus;
  orders: TRouteOrder[];
};

export type TRouteStatus = "Waiting" | "Loading" | "Dispatched";

export type TToteStatus = "Ready for delivery" | "Loading" | "Dispatched";

export type TToteLocation = TProductCategory | "Meat";

export type TRouteOrder = {
  orderNumber: number;
  status: TToteStatus;
  routeStatus: TRouteStatus;
  totes: TTotes;
};

export type TTote = {
  orderNumber: number;
  toteId: string;
  numBags: number;
  pickerImage: string;
  location: TToteLocation;
  isLoaded: boolean;
};

export type TTotes = {
  ambient: TTote[];
  chilled: TTote[];
  frozen: TTote[];
  bulk: TTote[];
  meat: TTote[];
};

export type TScannedTote = {
  orderNumber: number;
  toteId: string;
  bagsScanned: number;
  location: TToteLocation;
};

export type TDriver = {
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  isAvailable: boolean;
};

// Types for delivery and dispatch state.
export type TRoutesState = {
  openRoute: string | null;
  pageSize: TPageSize;
  cursor: TCursor;
  after: TAfter;
  before: TBefore;
};

export type TSetOpenRoutePayload = Pick<TRoutesState, "openRoute">;
export type TSetCursorPayload = Pick<TRoutesState, "cursor">;
export type TSetDateRangePayload = Pick<TRoutesState, "after" | "before">;
