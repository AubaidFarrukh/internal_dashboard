import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../context/redux/store";
import {
  TCreateUserState,
  TSetDashboardPermissions,
  TSetEmailPayload,
  TSetFirstNamePayload,
  TSetLastNamePayload,
  TSetMobilePayload,
  TSetPickingAppPermissions,
  TSetProfilePicturePayload,
  TSetRolePayload,
  TSetTemporaryPasswordPayload,
  TSetUsernamePayload,
  TSetErrorsPayload,
} from "../../types/createUserSlice";
import {
  defaultDashboardPermissions,
  defaultManagerDashPermissions,
  defaultStaffDashPermissions,
  defaultShopDashPermissions,
  defaultMeatDashPermissions,
  defaultDriverDashPermissions,
  defaultPickingPermissions,
  defaultManagerPickingPermissions,
  defaultStaffPickingPermissions,
  defaultShopPickingPermissions,
  defaultMeatPickingPermissions,
  defaultDriverPickingPermissions,
} from "../../constants";
import { isEmail, isValidPassword, isValidPhoneNumber } from "../../utils";

const initialState: TCreateUserState = {
  username: "",
  temporaryPassword: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  profilePicture: "",
  role: null,
  dashboardPermissions: { ...defaultDashboardPermissions },
  pickingAppPermissions: { ...defaultPickingPermissions },
  errors: {
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    profilePicture: null,
    role: null,
    temporaryPassword: null,
    mobile: null,
  },
};

export const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    setFirstName: (state, { payload }: PayloadAction<TSetFirstNamePayload>) => {
      state.firstName = payload.firstName;
      state.errors.firstName =
        payload.firstName.trim().length <= 0 ? "First name is required." : null;
    },
    setLastName: (state, { payload }: PayloadAction<TSetLastNamePayload>) => {
      state.lastName = payload.lastName;
      state.errors.lastName =
        payload.lastName.trim().length <= 0 ? "Last name is required." : null;
    },
    setEmail: (state, { payload }: PayloadAction<TSetEmailPayload>) => {
      state.email = payload.email;
      state.errors.email =
        payload.email.trim().length <= 0
          ? "Email address is required."
          : !isEmail(payload.email)
          ? "Invalid email address."
          : null;
    },
    setMobile: (state, { payload }: PayloadAction<TSetMobilePayload>) => {
      if (payload.mobile.length > 0 && !payload.mobile.match(/^[+\d]+$/))
        return;

      state.mobile = payload.mobile;
      state.errors.mobile =
        payload.mobile.trim().length <= 0
          ? "Mobile number is required."
          : payload.mobile[0] !== "+"
          ? "Mobile number must start with +"
          : payload.mobile.length < 5
          ? "Mobile number is too short."
          : payload.mobile.length > 16
          ? "Mobile number is too long."
          : !isValidPhoneNumber(payload.mobile)
          ? "Mobile number must start with a + and contain digits only."
          : null;
    },
    setUsername: (state, { payload }: PayloadAction<TSetUsernamePayload>) => {
      state.username = payload.username;
      state.errors.username =
        payload.username.trim().length <= 0
          ? "Username is required."
          : payload.username.trim().length < 3
          ? "Username must be atleast 3 characters long."
          : null;
    },
    setTemporaryPassword: (
      state,
      { payload }: PayloadAction<TSetTemporaryPasswordPayload>
    ) => {
      if (!payload.temporaryPassword.match(/^[a-zA-Z\d!@#$%&]{0,}$/)) return;

      state.temporaryPassword = payload.temporaryPassword;
      state.errors.temporaryPassword =
        payload.temporaryPassword.trim().length <= 0
          ? "Temporary password is required."
          : !isValidPassword(payload.temporaryPassword)
          ? "Invalid password."
          : null;
    },
    setProfilePicture: (
      state,
      { payload }: PayloadAction<TSetProfilePicturePayload>
    ) => {
      state.profilePicture = payload.profilePicture;
      state.errors.profilePicture = !payload.profilePicture
        ? "Profile picture is required."
        : null;
    },
    setRole: (state, { payload }: PayloadAction<TSetRolePayload>) => {
      state.role = payload.role;

      if (payload.role === "manager") {
        state.dashboardPermissions = { ...defaultManagerDashPermissions };
        state.pickingAppPermissions = { ...defaultManagerPickingPermissions };
      } else if (state.role === "staff") {
        state.dashboardPermissions = { ...defaultStaffDashPermissions };
        state.pickingAppPermissions = { ...defaultStaffPickingPermissions };
      } else if (state.role === "shop_picker") {
        state.dashboardPermissions = { ...defaultShopDashPermissions };
        state.pickingAppPermissions = { ...defaultShopPickingPermissions };
      } else if (state.role === "meat_picker") {
        state.dashboardPermissions = { ...defaultMeatDashPermissions };
        state.pickingAppPermissions = { ...defaultMeatPickingPermissions };
      } else if (state.role === "driver") {
        state.dashboardPermissions = { ...defaultDriverDashPermissions };
        state.pickingAppPermissions = { ...defaultDriverPickingPermissions };
      } else if (state.role === null) {
        state.dashboardPermissions = { ...defaultDashboardPermissions };
        state.pickingAppPermissions = { ...defaultPickingPermissions };
      }

      state.errors.role = !payload.role ? "Role is required." : null;
    },
    setDashboardPermissions: (
      state,
      { payload }: PayloadAction<TSetDashboardPermissions>
    ) => {
      state.dashboardPermissions = payload.dashboardPermissions;
    },
    setPickingAppPermissions: (
      state,
      { payload }: PayloadAction<TSetPickingAppPermissions>
    ) => {
      state.pickingAppPermissions = payload.pickingAppPermissions;
    },
    clearForm: state => {
      state.username = initialState.username;
      state.temporaryPassword = initialState.temporaryPassword;
      state.firstName = initialState.firstName;
      state.lastName = initialState.lastName;
      state.email = initialState.email;
      state.mobile = initialState.mobile;
      state.profilePicture = initialState.profilePicture;
      state.role = initialState.role;
      state.dashboardPermissions = { ...defaultDashboardPermissions };
      state.pickingAppPermissions = { ...defaultPickingPermissions };
      state.errors = { ...initialState.errors };
    },
    validateForm: state => {
      state.errors.username =
        state.username.trim().length <= 0
          ? "Username is required."
          : state.username.trim().length < 3
          ? "Username must be atleast 3 characters long."
          : null;
      state.errors.temporaryPassword =
        state.temporaryPassword.trim().length <= 0
          ? "Temporary password is required."
          : !isValidPassword(state.temporaryPassword)
          ? "Invalid password."
          : null;
      state.errors.firstName =
        state.firstName.trim().length <= 0 ? "First name is required." : null;
      state.errors.lastName =
        state.lastName.trim().length <= 0 ? "Last name is required." : null;
      state.errors.email =
        state.email.trim().length <= 0
          ? "Email address is required."
          : !isEmail(state.email)
          ? "Invalid email address."
          : null;
      state.errors.mobile =
        state.mobile.trim().length <= 0
          ? "Mobile number is required."
          : state.mobile[0] !== "+"
          ? "Mobile number must start with +"
          : state.mobile.length < 5
          ? "Mobile number is too short."
          : state.mobile.length > 16
          ? "Mobile number is too long."
          : !isValidPhoneNumber(state.mobile)
          ? "Mobile number must start with a + and contain digits only."
          : null;
      state.errors.profilePicture = !state.profilePicture
        ? "Profile picture is required."
        : null;
      state.errors.role = !state.role ? "Role is required." : null;
    },
    setErrors: (state, { payload }: PayloadAction<TSetErrorsPayload>) => {
      if (payload.username !== undefined)
        state.errors.username = payload.username;
      if (payload.email !== undefined) state.errors.email = payload.email;
      if (payload.firstName !== undefined)
        state.errors.firstName = payload.firstName;
      if (payload.lastName !== undefined)
        state.errors.lastName = payload.lastName;
      if (payload.profilePicture !== undefined)
        state.errors.profilePicture = payload.profilePicture;
      if (payload.role !== undefined) state.errors.role = payload.role;
      if (payload.temporaryPassword !== undefined)
        state.errors.temporaryPassword = payload.temporaryPassword;
      if (payload.mobile !== undefined) state.errors.mobile = payload.mobile;
    },
  },
});

export const {
  clearForm,
  setProfilePicture,
  setRole,
  setDashboardPermissions,
  setPickingAppPermissions,
  setFirstName,
  setLastName,
  setEmail,
  setMobile,
  setUsername,
  setTemporaryPassword,
  validateForm,
  setErrors,
} = createUserSlice.actions;

// Define Selectors
export const selectAttributes = (state: RootState) => ({
  username: state.createUser.username,
  temporaryPassword: state.createUser.temporaryPassword,
  firstName: state.createUser.firstName,
  lastName: state.createUser.lastName,
  email: state.createUser.email,
  mobile: state.createUser.mobile,
});

export const selectProfilePicture = (state: RootState) =>
  state.createUser.profilePicture;

export const selectRole = (state: RootState) => state.createUser.role;

export const selectDashboardPermissions = (state: RootState) =>
  state.createUser.dashboardPermissions;

export const selectPickingAppPermissions = (state: RootState) =>
  state.createUser.pickingAppPermissions;

export const selectErrors = (state: RootState) => state.createUser.errors;

export default createUserSlice.reducer;
