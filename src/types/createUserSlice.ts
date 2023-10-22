import type {
  TDashboardPermissions,
  TPickingAppPermissions,
  TRole,
  TUser,
} from "./users";

export type TDetailsForm = Pick<
  TUser,
  "username" | "email" | "firstName" | "lastName" | "profilePicture"
> & { role: TRole | null; temporaryPassword: string; mobile: string };

export type TCreateUserState = TDetailsForm & {
  dashboardPermissions: TDashboardPermissions;
  pickingAppPermissions: TPickingAppPermissions;
  errors: TErrors;
};

export type TErrors = {
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
  role: string | null;
  temporaryPassword: string | null;
  mobile: string | null;
};

export type TSetFirstNamePayload = Pick<TDetailsForm, "firstName">;
export type TSetLastNamePayload = Pick<TDetailsForm, "lastName">;
export type TSetEmailPayload = Pick<TDetailsForm, "email">;
export type TSetMobilePayload = Pick<TDetailsForm, "mobile">;
export type TSetUsernamePayload = Pick<TDetailsForm, "username">;
export type TSetTemporaryPasswordPayload = Pick<
  TDetailsForm,
  "temporaryPassword"
>;
export type TSetProfilePicturePayload = Pick<TDetailsForm, "profilePicture">;
export type TSetRolePayload = Pick<TDetailsForm, "role">;

export type TSetDashboardPermissions = {
  dashboardPermissions: TDashboardPermissions;
};

export type TSetPickingAppPermissions = {
  pickingAppPermissions: TPickingAppPermissions;
};

export type TSetErrorsPayload = Partial<TErrors>;
