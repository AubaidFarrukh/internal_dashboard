import { TAuditType } from "../types/auditDetails";
import {
  TDashboardPermission,
  TDashboardPermissions,
  TPickingAppPermission,
  TPickingAppPermissions,
} from "../types/users";

export enum EShopStatuses {
  READY_FOR_PICKING = "Ready for picking",
  PICKING_IN_PROGRESS = "Picking in progress",
  PICKED = "Picked",
  READY_FOR_DELIVERY = "Ready for delivery",
  READY_FOR_COLLECTION = "Ready for collection",
  DISPATCHED = "Dispatched",
  FULFILLED = "Fulfilled",
  CANCELLED = "Cancelled",
  ON_HOLD = "On-hold",
}

export enum EMeatStatuses {
  READY_FOR_PICKING = "Ready for picking",
  PICKING_IN_PROGRESS = "Picking in progress",
  PICKED = "Picked",
  READY_FOR_DELIVERY = "Ready for delivery",
  READY_FOR_COLLECTION = "Ready for collection",
  DISPATCHED = "Dispatched",
  FULFILLED = "Fulfilled",
  CANCELLED = "Cancelled",
  ON_HOLD = "On-hold",
}

export const shopStatusProgress = {
  [EShopStatuses.CANCELLED.toLowerCase()]: 1,
  [EShopStatuses.ON_HOLD.toLowerCase()]: 2,
  [EShopStatuses.READY_FOR_PICKING.toLowerCase()]: 3,
  [EShopStatuses.PICKING_IN_PROGRESS.toLowerCase()]: 4,
  [EShopStatuses.READY_FOR_DELIVERY.toLowerCase()]: 6,
  [EShopStatuses.READY_FOR_COLLECTION.toLowerCase()]: 6,
  [EShopStatuses.DISPATCHED.toLowerCase()]: 7,
  [EShopStatuses.FULFILLED.toLowerCase()]: 8,
};

export const meatStatusProgress = {
  [EMeatStatuses.CANCELLED.toLowerCase()]: 1,
  [EMeatStatuses.ON_HOLD.toLowerCase()]: 2,
  [EMeatStatuses.READY_FOR_PICKING.toLowerCase()]: 3,
  [EMeatStatuses.PICKING_IN_PROGRESS.toLowerCase()]: 4,
  [EMeatStatuses.READY_FOR_DELIVERY.toLowerCase()]: 6,
  [EMeatStatuses.READY_FOR_COLLECTION.toLowerCase()]: 6,
  [EMeatStatuses.DISPATCHED.toLowerCase()]: 7,
  [EMeatStatuses.FULFILLED.toLowerCase()]: 8,
};

export const defaultDashboardPermissions: TDashboardPermissions = {
  pickingDashboard: false,
  reports: false,
  allOrders: false,
  pickingSchedule: false,
  allUsers: false,
  addNewUser: false,
  setPermissions: false,
  customerAccounts: false,
  productsAndInventory: false,
};

export const defaultAdminDashPermissions: TDashboardPermissions = {
  pickingDashboard: true,
  reports: true,
  allOrders: true,
  pickingSchedule: true,
  allUsers: true,
  addNewUser: true,
  setPermissions: true,
  customerAccounts: true,
  productsAndInventory: true,
};

export const defaultManagerDashPermissions: TDashboardPermissions = {
  pickingDashboard: true,
  reports: true,
  allOrders: true,
  pickingSchedule: true,
  allUsers: false,
  addNewUser: false,
  setPermissions: false,
  customerAccounts: true,
  productsAndInventory: true,
};

export const defaultStaffDashPermissions: TDashboardPermissions = {
  pickingDashboard: false,
  reports: false,
  allOrders: true,
  pickingSchedule: false,
  allUsers: false,
  addNewUser: false,
  setPermissions: false,
  customerAccounts: false,
  productsAndInventory: true,
};

export const defaultShopDashPermissions: TDashboardPermissions = {
  pickingDashboard: false,
  reports: false,
  allOrders: false,
  pickingSchedule: false,
  allUsers: false,
  addNewUser: false,
  setPermissions: false,
  customerAccounts: false,
  productsAndInventory: false,
};

export const defaultMeatDashPermissions: TDashboardPermissions = {
  pickingDashboard: false,
  reports: false,
  allOrders: false,
  pickingSchedule: false,
  allUsers: false,
  addNewUser: false,
  setPermissions: false,
  customerAccounts: false,
  productsAndInventory: false,
};

export const defaultDriverDashPermissions: TDashboardPermissions = {
  pickingDashboard: false,
  reports: false,
  allOrders: false,
  pickingSchedule: false,
  allUsers: false,
  addNewUser: false,
  setPermissions: false,
  customerAccounts: false,
  productsAndInventory: false,
};

export const defaultPickingPermissions: TPickingAppPermissions = {
  shopPicking: false,
  meatPicking: false,
  driver: false,
  managerOverride: false,
};

export const defaultAdminPickingPermissions: TPickingAppPermissions = {
  shopPicking: true,
  meatPicking: true,
  driver: true,
  managerOverride: true,
};

export const defaultManagerPickingPermissions: TPickingAppPermissions = {
  shopPicking: false,
  meatPicking: false,
  driver: false,
  managerOverride: true,
};

export const defaultStaffPickingPermissions: TPickingAppPermissions = {
  shopPicking: false,
  meatPicking: false,
  driver: false,
  managerOverride: false,
};

export const defaultShopPickingPermissions: TPickingAppPermissions = {
  shopPicking: true,
  meatPicking: false,
  driver: false,
  managerOverride: false,
};

export const defaultMeatPickingPermissions: TPickingAppPermissions = {
  shopPicking: false,
  meatPicking: true,
  driver: false,
  managerOverride: false,
};

export const defaultDriverPickingPermissions: TPickingAppPermissions = {
  shopPicking: false,
  meatPicking: false,
  driver: true,
  managerOverride: false,
};

export const dashboardPermissionNames = Object.keys(
  defaultDashboardPermissions
) as TDashboardPermission[];

export const pickingPermissionNames = Object.keys(
  defaultPickingPermissions
) as TPickingAppPermission[];

export const auditTypes: TAuditType[] = ["dashboard", "shop", "meat", "driver"];
