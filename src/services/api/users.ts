import { savecoApi } from "./apiSlice";
import type {
  TCreateUserArgs,
  TCreateUserRes,
  TDeleteUserArgs,
  TDeleteUserRes,
  TDisableUserArgs,
  TDisableUserRes,
  TEnableUserArgs,
  TEnableUserRes,
  TGetAllUsersArgs,
  TGetAllUsersRes,
  TIsUserNameAvailableArgs,
  TIsUserNameAvailableRes,
  TResetPasswordArgs,
  TResetPasswordRes,
  TUpdateAttributesArgs,
  TUpdateAttributesRes,
  TUpdatePermissionsArgs,
  TUpdatePermissionsRes,
  TUploadAvatarArgs,
  TUploadAvatarRes,
} from "../../types/api";
import type {
  TDashboardPermission,
  TPickingAppPermission,
  TUser,
} from "../../types/users";
import {
  defaultDashboardPermissions,
  defaultPickingPermissions,
} from "../../constants";

const usersApi = savecoApi.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query<TUser[], TGetAllUsersArgs>({
      query: () => `users/getAllUsers`,
      transformResponse: (response: TGetAllUsersRes) => {
        return response.users.map(u => {
          let dashboardPermissions = { ...defaultDashboardPermissions };
          (u.permissions as TDashboardPermission[]).forEach(p => {
            if (dashboardPermissions[p] === undefined) return;
            dashboardPermissions[p] = true;
          });

          let pickingAppPermissions = { ...defaultPickingPermissions };
          (u.permissions as TPickingAppPermission[]).forEach(p => {
            if (pickingAppPermissions[p] === undefined) return;
            pickingAppPermissions[p] = true;
          });

          return {
            ...u,
            dashboardPermissions,
            pickingAppPermissions,
          };
        });
      },
      providesTags: result => [
        ...(result?.map(({ username }) => ({
          type: "Users" as const,
          id: username,
        })) ?? []),
        { type: "Users" as const, id: "LIST" },
      ],
    }),
    updateAttributes: builder.mutation<
      TUpdateAttributesRes,
      TUpdateAttributesArgs
    >({
      query: ({ username, firstName, lastName, email, phoneNumber }) => ({
        url: `users/updateAttributes`,
        method: "PATCH",
        body: { username, firstName, lastName, email, phoneNumber },
      }),
      invalidatesTags: result => [{ type: "Users" as const, id: "LIST" }],
    }),
    updatePermissions: builder.mutation<
      TUpdatePermissionsRes,
      TUpdatePermissionsArgs
    >({
      query: ({ username, permissionsToAdd, permissionsToRemove }) => ({
        url: `users/updatePermissions`,
        method: "PATCH",
        body: { username, permissionsToAdd, permissionsToRemove },
      }),
      invalidatesTags: result => [{ type: "Users" as const, id: "LIST" }],
    }),
    disableUser: builder.mutation<TDisableUserRes, TDisableUserArgs>({
      query: ({ username }) => ({
        url: `users/disableUser`,
        method: "POST",
        params: { username },
      }),
      invalidatesTags: result => [{ type: "Users" as const, id: "LIST" }],
    }),
    enableUser: builder.mutation<TEnableUserRes, TEnableUserArgs>({
      query: ({ username }) => ({
        url: `users/enableUser`,
        method: "POST",
        params: { username },
      }),
      invalidatesTags: result => [{ type: "Users" as const, id: "LIST" }],
    }),
    deleteUser: builder.mutation<TDeleteUserRes, TDeleteUserArgs>({
      query: ({ username }) => ({
        url: `users/deleteUser`,
        method: "DELETE",
        params: { username },
      }),
      invalidatesTags: result => [{ type: "Users" as const, id: "LIST" }],
    }),
    uploadAvatar: builder.mutation<TUploadAvatarRes, TUploadAvatarArgs>({
      query: ({ username, base64Image, mime, fileName }) => ({
        url: `users/uploadAvatar`,
        method: "POST",
        body: { username, base64Image, mime, fileName },
      }),
    }),
    createUser: builder.mutation<TCreateUserRes, TCreateUserArgs>({
      query: args => ({
        url: `users/createUser`,
        method: "POST",
        body: { ...args },
      }),
      invalidatesTags: result => [{ type: "Users" as const, id: "LIST" }],
    }),
    isUsernameAvailable: builder.query<boolean, TIsUserNameAvailableArgs>({
      query: ({ username }) => ({
        url: `users/isUsernameAvailable`,
        method: "GET",
        params: { username },
      }),
      transformResponse: (r: TIsUserNameAvailableRes) => r.isAvailable,
    }),
    resetPassword: builder.mutation<TResetPasswordRes, TResetPasswordArgs>({
      query: args => ({
        url: `users/resetPassword`,
        method: "PUT",
        body: { ...args },
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateAttributesMutation,
  useUpdatePermissionsMutation,
  useDisableUserMutation,
  useEnableUserMutation,
  useDeleteUserMutation,
  useUploadAvatarMutation,
  useCreateUserMutation,
  useIsUsernameAvailableQuery,
  useLazyIsUsernameAvailableQuery,
  useResetPasswordMutation,
} = usersApi;
