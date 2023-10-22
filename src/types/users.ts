export type TUsername = string | null;

export type TDashboardPermission =
  | "pickingDashboard"
  | "reports"
  | "allOrders"
  | "pickingSchedule"
  | "allUsers"
  | "addNewUser"
  | "setPermissions"
  | "customerAccounts"
  | "productsAndInventory";

export type TDashboardPermissions = Record<TDashboardPermission, boolean>;

export type TPickingAppPermission =
  | "shopPicking"
  | "meatPicking"
  | "driver"
  | "managerOverride";

export type TPickingAppPermissions = Record<TPickingAppPermission, boolean>;

export type TRole =
  | "admin"
  | "manager"
  | "staff"
  | "shop_picker"
  | "meat_picker"
  | "driver";

export type TUser = {
  username: string;
  updatedAt: number | null;
  enabled: boolean;
  status: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: TRole;
  profilePicture: string | null;
  lastLogin: number | null;
  dashboardPermissions: TDashboardPermissions;
  pickingAppPermissions: TPickingAppPermissions;
};

export type TDetailsForm = Pick<
  TUser,
  "username" | "email" | "firstName" | "lastName" | "profilePicture"
> & { role: TRole | null; temporaryPassword: string; mobile: string };

export type TPermissionName = TDashboardPermission | TPickingAppPermission;
