import type { TDeliveryMethod, THasMeat, TOrder, TOrderNumber } from "./orders";
import type {
  TMeatStatus,
  TOrderDetails,
  TShopStatus,
  TUpdateDirective,
} from "./orderDetails";
import type {
  TAisleLocation,
  TBarcodes,
  TProduct,
  TProductCategory,
  TProductTitle,
  TVendor,
} from "./products";
import type { TProductChangelog, TProductDetails } from "./productDetails";
import type { TAudit, TPhoto } from "./auditDetails";
import type {
  TUser,
  TRole,
  TPermissionName,
  TDashboardPermissions,
  TPickingAppPermissions,
} from "./users";
import type { TReport, TReportWithBlob } from "./zReports";
import type { TAfter, TBefore, TCursor } from "./commons";
import type { TDriver, TRoute } from "./deliveryAndDispatch";
import type { TOrderProgress, TOrdersOverview } from "./pickingDashboard";

type TStatus = "SUCCESS" | "FAILED";

/********************************/
/********** Orders API **********/
/********************************/
export type TGetAllOrdersRes = {
  status: TStatus;
  cursor: TCursor;
  orders: TOrder[];
};

export type TGetAllOrdersArgs = {
  pageSize?: number;
  cursor: TCursor;
  orderNumber: TOrderNumber | null;
  hasMeat: THasMeat | null;
  deliveryMethod: TDeliveryMethod | null;
  before: TBefore;
  after: TAfter;
  shopStatus: TShopStatus | null;
  meatStatus: TMeatStatus | null;
};

export type TGetOrdersCountRes = {
  status: TStatus;
  totalOrdersCount: number;
};

export type TGetOrdersCountArgs = undefined;

export type TGetOrderByIdRes = {
  status: TStatus;
  order: TOrderDetails;
};

export type TGetOrderByIdArgs = {
  orderNumber: number;
};

export type TUpdateOrderStatusAdminArgs = {
  orderNumber: number;
  username: string;
  oldShopStatus?: TShopStatus | null;
  oldMeatStatus?: TMeatStatus | null;
  updateDirective: TUpdateDirective;
  comment: string;
};

export type TUpdateOrderStatusAdminRes = {
  status: TStatus;
  order: {
    orderNumber: number;
    shopStatus: TShopStatus | null;
    meatStatus: TMeatStatus | null;
  };
  auditRecord: TAudit;
  error?: string;
};

export type TCancelOrderRes = {
  status: TStatus;
  order: Pick<TOrderDetails, "id">;
};

export type TCancelOrderArgs = {
  orderNumber: number;
};

/********************************/
/********** Audits API **********/
/********************************/
export type TGetAuditByOrderIdRes = {
  records: TAudit;
};

export type TGetPhotoByOrderIdRes = {
  records: TPhoto;
};

/**********************************/
/********** Products API **********/
/**********************************/
export type TGetAllProductsRes = {
  status: TStatus;
  cursor: TCursor;
  products: TProduct[];
};

export type TGetAllProductsArgs = {
  pageSize?: number;
  cursor: TCursor;
  productTitle: TProductTitle;
  vendor: TVendor;
};

export type TGetProductsCountRes = {
  status: TStatus;
  totalProductsCount: number;
};

export type TGetProductsCountArgs = undefined;

export type TGetProductByIdRes = {
  status: TStatus;
  product: TProductDetails;
};

export type TGetProductByIdArgs = {
  productId: number;
};

export type TUpdateProductDetailsArgs = {
  variantId: number;
  aisleLocation?: TAisleLocation;
  category?: TProductCategory;
  barcodes?: TBarcodes;
};

export type TUpdateProductDetailsRes = {
  status: TStatus;
  message: string;
  error?: string;
};

export type TGetAllChangeLogsRes = {
  status: TStatus;
  logs: TProductChangelog[];
};

export type TGetAllChangeLogsArgs = {
  variantId: number;
};

/*******************************/
/********** Users API **********/
/*******************************/
export type TUserReturned = Omit<
  TUser,
  "dashboardPermissions" | "pickingAppPermissions"
> & {
  permissions: TPermissionName[];
};

export type TGetAllUsersRes = {
  status: TStatus;
  users: TUserReturned[];
};

export type TGetAllUsersArgs = {};

export type TUpdateAttributesArgs = {
  username: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  role?: TRole;
  profilePicture?: string;
};

export type TUpdateAttributesRes = {
  status: TStatus;
  message: string;
  error?: string;
};

export type TUpdatePermissionsArgs = {
  username: string;
  permissionsToAdd: TPermissionName[];
  permissionsToRemove: TPermissionName[];
};

export type TUpdatePermissionsRes = {
  status: TStatus;
  message: string;
  error?: string;
};

export type TDisableUserArgs = { username: string };
export type TDisableUserRes = {
  status: TStatus;
  message: string;
  error?: string;
};

export type TEnableUserArgs = { username: string };
export type TEnableUserRes = {
  status: TStatus;
  message: string;
  error?: string;
};

export type TDeleteUserArgs = { username: string };
export type TDeleteUserRes = {
  status: TStatus;
  message: string;
  error?: string;
};

export type TUploadAvatarArgs = {
  username: string;
  base64Image: string;
  mime: string;
  fileName?: string;
};
export type TUploadAvatarRes = {
  status: TStatus;
  url: string;
};

export type TCreateUserArgs = {
  profilePicture: string;
  role: TRole;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  temporaryPassword: string;
  permissions: TDashboardPermissions & TPickingAppPermissions;
};

export type TCreateUserRes = {
  status: TStatus;
  user: TUserReturned;
};

export type TIsUserNameAvailableArgs = {
  username: string;
};

export type TIsUserNameAvailableRes = {
  status: TStatus;
  isAvailable: boolean;
};

export type TResetPasswordArgs = {
  username: string;
  newPassword: string;
};

export type TResetPasswordRes = {
  status: TStatus;
  message: string;
  error?: string;
};

/***************************************/
/********** Audit Reports API **********/
/***************************************/
export type TCreateZReportArgs = {
  orderNumbers: number[];
  username: string;
};

export type TCreateZReportRes = {
  status: TStatus;
  report: TReport;
};

export type TGetAllZReportsArgs = {
  pageSize: number;
  cursor: TCursor;
  before: TBefore;
  after: TAfter;
};

export type TGetAllZReportsRes = {
  status: TStatus;
  reports: TReport[];
  cursor: TCursor;
};

export type TGetZReportByIdArgs = {
  reportId?: string;
};

export type TGetZReportByIdRes = {
  status: TStatus;
  report: TReportWithBlob;
};

export type TCreateBarcodeReportArgs = {
  after: string;
  before: string;
  username: string;
};

export type TCreateNotGivenReportArgs = TCreateZReportArgs;

export type TCreateNotGivenReportRes = TCreateZReportRes;

export type TCreateBarcodeAdditionRes = TCreateZReportRes;

export type TGetAllNotGivenReportsArgs = TGetAllZReportsArgs;

export type TGetAllNotGivenReportsRes = TGetAllZReportsRes;

export type TGetAllBarcodeReportsRes = TGetAllZReportsRes;

export type TGetBarcodeReportByIdArgs = TGetZReportByIdArgs;

export type TGetBarcodeReportsArg = TGetAllZReportsArgs;

export type TGetBarcodeReportByIdRes = TGetZReportByIdRes;

export type TGetNotGivenReportByIdArgs = TGetZReportByIdArgs;

export type TGetNotGivenReportByIdRes = TGetZReportByIdRes;

/****************************************/
/************** Routes API **************/
/****************************************/
export type TGetAllActiveRoutesArgs = {};
export type TGetAllActiveRoutesRes = {
  status: TStatus;
  activeRoutes: {
    today: TRoute[];
    tomorrow: TRoute[];
    future: TRoute[];
  };
};

export type TGetAllPastRoutesArgs = {
  pageSize: number;
  cursor?: TCursor;
  before?: string | null;
  after?: string | null;
};
export type TGetAllPastRoutesRes = {
  status: TStatus;
  pastRoutes: TRoute[];
  cursor: TCursor;
};

export type TGetAllDriversArgs = {
  sendDate?: string | null;
};
export type TGetAllDriversRes = {
  status: TStatus;
  drivers: TDriver[];
};

export type TGetAllDeliverableOrdersArgs = {};
export type TGetAllDeliverableOrdersRes = {
  status: "SUCCESS";
  orders: number[];
};

export type TAddRouteArgs = {
  username: string;
  routeName: string;
  van: string;
  sendDate: string;
  driver: string;
  comment: string;
  orders: number[];
};
export type TAddRouteRes = {
  status: "SUCCESS";
  message: string;
};

export type TEditRouteArgs = {
  username: string;
  id: string;
  routeName?: string;
  van?: string;
  sendDate?: string;
  driver?: string;
  comment?: string;
  orders?: number[];
  ordersAdded?: number[];
  ordersRemoved?: number[];
};
export type TEditRouteRes = {
  status: "SUCCESS";
  message: string;
};

/***************************************************/
/************** Picking Dashboard API **************/
/***************************************************/
export type TGetOrdersOverviewArgs = {
  date: string;
  toDate?: string;
};
export type TGetOrdersOverviewRes = {
  status: TStatus;
  overviewData: TOrdersOverview;
};

export type TGetOverdueOrdersArgs = {};
export type TGetOverdueOrdersRes = {
  status: TStatus;
  overdueOrders: TOrderProgress[];
};
