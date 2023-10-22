import {
  TDeliveryMethod,
  TMeatStatus,
  TPicker,
  TShopStatus,
} from "./orderDetails";

export type TOrdersOverview = {
  ordersCount: {
    nextDayOrders: TOrdersCount;
    sameDayOrders: TOrdersCount;
    expressOrders: TOrdersCount;
    localPickupOrders: TOrdersCount;
    onHoldOrders: TOrdersCount;
    total: TOrdersCount;
  };
  allOrders: TOrderProgress[];
  pickingData: {
    totalItems: number;
    totalItemsPicked: number;
    accuracy: number;
    pickers: Array<{
      picker: TPicker;
      itemsPicked: number;
      timeTaken: number; // Number of seconds.
      efficiency: number;
    }>;
  };
  notGivenItems: {
    orderNumber: number;
    variantId: number;
    name: string;
    variantTitle: string;
    notGivenQuantity: number;
    price: string;
    refundValue: string;
    picker: string;
  }[];
  altItems: {
    orderNumber: number;
    originalVariantId: number;
    originalName: string;
    originalVariantTitle: string;
    altVariantId: number;
    altName: string;
    altVariantTitle: string;
    altValue: string;
    picker: string;
  }[];
  deliveryData: {
    totalOrders: number;
    totalOrdersDelivered: number;
    performance: number;
    drivers: {
      driver: TPicker;
      totesLoaded: number;
      timeTaken: number;
    }[];
    failedDeliveries: TFailedDelivery[];
  };
};

export type TOrderProgress = {
  orderNumber: number;
  deliveryLocation: string;
  shopStatus: TShopStatus | null;
  shopPicker: TPicker | null;
  shopPickingTime: number; // Number of seconds.
  shopItemsPicked: number;
  shopItemsAlted: number;
  totalShopItems: number;
  meatStatus: TMeatStatus | null;
  meatPicker: TPicker | null;
  meatPickingTime: number; // Number of seconds.
  meatItemsPicked: number;
  meatItemsAlted: number;
  totalMeatItems: number;
  deliveryMethod: TDeliveryMethod;
};

export type TOrdersCount = {
  pickingNotCompleted: number;
  pickingCompleted: number;
};

export type TFailedDelivery = {
  orderNumber: number;
  routeId: string;
  date: string;
  driver: TPicker;
};

export type TPickingDashboardState = {
  date: string;
  toDate: string | null;
  numPickedItems: 10 | 20 | 30 | 40 | 50;
  numLoadedTotes: 10 | 20 | 30 | 40 | 50;
  refreshTimeout: number;
  showOverdues: boolean;
};
export type TSetDateRangePayload = Pick<
  TPickingDashboardState,
  "date" | "toDate"
>;
export type TSetNumPickedItemsPayload = Pick<
  TPickingDashboardState,
  "numPickedItems"
>;
export type TSetNumLoadedTotesPayload = Pick<
  TPickingDashboardState,
  "numLoadedTotes"
>;
export type TSetRefreshTimeoutPayload = Pick<
  TPickingDashboardState,
  "refreshTimeout"
>;
export type TSetShowOverduesPayload = Pick<
  TPickingDashboardState,
  "showOverdues"
>;
