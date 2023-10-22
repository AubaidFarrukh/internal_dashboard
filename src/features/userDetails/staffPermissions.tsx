import { FC, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { PermissionsForm } from "../commons";
import { useUpdatePermissionsMutation } from "../../services/api";
import { useAppDispatch } from "../../context/redux/hooks";
import { setMessage } from "../layout/layoutSlice";
import { getChangeInPermissions, isAllKey } from "../../utils";
import type { TUser } from "../../types/users";

interface StaffPermissionsProps {
  user: TUser;
}

export const StaffPermissions: FC<StaffPermissionsProps> = ({ user }) => {
  const dispatch = useAppDispatch();

  const [dashboardPermissions, setDashboardPermissions] = useState(
    user.dashboardPermissions
  );
  const [pickingAppPermissions, setPickingPermissions] = useState(
    user.pickingAppPermissions
  );
  const [updatePermissions, { isLoading, isSuccess, reset }] =
    useUpdatePermissionsMutation();

  const fullName = `${user.firstName} ${user.lastName}`;
  const fullAccess = isAllKey({
    ...user.dashboardPermissions,
    ...user.pickingAppPermissions,
  });

  const isPermissionUpdated =
    JSON.stringify({
      dashboardPermissions: user.dashboardPermissions,
      pickingAppPermissions: user.pickingAppPermissions,
    }) !== JSON.stringify({ dashboardPermissions, pickingAppPermissions });

  const updatePermissionsHandler = async () => {
    if (!isPermissionUpdated) return;
    if (isLoading || isSuccess) return;

    try {
      const { permissionsToAdd, permissionsToRemove } = getChangeInPermissions(
        user.dashboardPermissions,
        dashboardPermissions,
        user.pickingAppPermissions,
        pickingAppPermissions
      );

      const res = await updatePermissions({
        username: user.username,
        permissionsToAdd,
        permissionsToRemove,
      }).unwrap();
      reset();

      if (res.status === "SUCCESS") {
        const message = `Permissions updated for ${user.firstName} ${user.lastName}.`;
        dispatch(setMessage({ success: true, message }));
      } else {
        dispatch(setMessage({ success: false, message: res.message }));
      }
    } catch (error) {
      dispatch(
        setMessage({ success: false, message: "Something went wrong." })
      );
    }
  };

  return (
    <Paper square sx={{ mb: 3.5 }}>
      <Box
        px={3}
        py={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight={600} my={1}>
          Permissions
        </Typography>
        {isPermissionUpdated && (
          <Button
            variant="contained"
            onClick={updatePermissionsHandler}
            startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
            disabled={isLoading}
            sx={{ textTransform: "none" }}
          >
            Save Changes
          </Button>
        )}
      </Box>
      <Divider variant="fullWidth" />
      <Box px={3} py={2} display="flex" flexDirection="column">
        {user.role !== "admin" && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
            {fullName} has {fullAccess ? "full" : "limited"} permissions.
          </Typography>
        )}
        <PermissionsForm
          dashboardPermissions={dashboardPermissions}
          pickingAppPermissions={pickingAppPermissions}
          setDashboardPermissions={setDashboardPermissions}
          setPickingPermissions={setPickingPermissions}
        />
      </Box>
    </Paper>
  );
};

export default StaffPermissions;
