import type { TDriver, TRoute, TRouteStatus } from "./deliveryAndDispatch";

export type TRouteFormState = {
  formType: "create" | "edit";
  routeName: string;
  van: string;
  sendDate: string;
  driver: TDriver | null;
  comment: string;
  orders: number[];
  status: TRouteStatus | null;
  removedOrders: number[];
  previousDriver: TDriver | null;
  previousOrders: number[];
};

export type TSetRouteNamePayload = Pick<TRouteFormState, "routeName">;
export type TSetVanPayload = Pick<TRouteFormState, "van">;
export type TSetSendDatePayload = Pick<TRouteFormState, "sendDate">;
export type TSetDriverPayload = Pick<TRouteFormState, "driver">;
export type TSetCommentPayload = Pick<TRouteFormState, "comment">;
export type TAssignOrderPayload = { order: number };
export type TUnassignOrderPayload = { order: number };
export type TMoveOrderPayload = { from: number; to: number };
export type TPreloadPayload = Omit<TRoute, "orders"> &
  Pick<TRouteFormState, "orders">;
