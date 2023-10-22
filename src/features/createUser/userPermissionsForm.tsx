import { FC } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { PermissionsForm } from "../commons";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  selectDashboardPermissions,
  selectPickingAppPermissions,
  setDashboardPermissions as setDashboardPermissionsAction,
  setPickingAppPermissions as setPickingAppPermissionsAction,
} from "./createUserSlice";
import {
  TDashboardPermissions,
  TPickingAppPermissions,
} from "../../types/users";

export interface UserPermissionsFormProps {
  sx?: SxProps<Theme>;
}

export const UserPermissionsForm: FC<UserPermissionsFormProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const dashboardPermissions = useAppSelector(selectDashboardPermissions);
  const pickingAppPermissions = useAppSelector(selectPickingAppPermissions);

  const setDashboardPermissions = (p: TDashboardPermissions) => {
    dispatch(setDashboardPermissionsAction({ dashboardPermissions: p }));
  };

  const setPickingAppPermissions = (p: TPickingAppPermissions) => {
    dispatch(setPickingAppPermissionsAction({ pickingAppPermissions: p }));
  };

  return (
    <Paper square sx={sx}>
      <Box
        px={3}
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight={600}>Permissions</Typography>
      </Box>
      <Divider variant="fullWidth" sx={{ mb: 3 }} />
      <Box display="flex" alignItems="flex-start" px={3} mb={3}>
        <PermissionsForm
          dashboardPermissions={dashboardPermissions}
          pickingAppPermissions={pickingAppPermissions}
          setDashboardPermissions={setDashboardPermissions}
          setPickingPermissions={setPickingAppPermissions}
        />
      </Box>
    </Paper>
  );
};

export default UserPermissionsForm;
