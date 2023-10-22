import { FC } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { XOR } from "../../utils";
import {
  TDashboardPermission,
  TDashboardPermissions,
  TPickingAppPermission,
  TPickingAppPermissions,
} from "../../types/users";

interface PermissionsFormProps {
  dashboardPermissions: TDashboardPermissions;
  pickingAppPermissions: TPickingAppPermissions;
  setDashboardPermissions: (value: TDashboardPermissions) => void;
  setPickingPermissions: (value: TPickingAppPermissions) => void;
  sx?: SxProps<Theme>;
}

export const PermissionsForm: FC<PermissionsFormProps> = ({
  dashboardPermissions,
  pickingAppPermissions,
  setDashboardPermissions,
  setPickingPermissions,
  sx,
}) => {
  const ordersChecked =
    dashboardPermissions.allOrders && dashboardPermissions.pickingSchedule;
  const usersChecked =
    dashboardPermissions.allUsers &&
    dashboardPermissions.addNewUser &&
    dashboardPermissions.setPermissions;
  const ordersIndeterminate = XOR(
    dashboardPermissions.allOrders,
    dashboardPermissions.pickingSchedule
  );
  const usersIndeterminate = XOR(
    dashboardPermissions.allUsers,
    dashboardPermissions.addNewUser,
    dashboardPermissions.setPermissions
  );

  const indentedCheckboxes: TDashboardPermission[] = [
    "allOrders",
    "pickingSchedule",
    "allUsers",
    "addNewUser",
    "setPermissions",
  ];

  const toggleDashoboardPermission = (permission: TDashboardPermission) => {
    setDashboardPermissions({
      ...dashboardPermissions,
      [permission]: !dashboardPermissions[permission],
    });
  };

  const togglePickingPermission = (permission: TPickingAppPermission) => {
    setPickingPermissions({
      ...pickingAppPermissions,
      [permission]: !pickingAppPermissions[permission],
    });
  };

  const toggleOrderPermissions = () => {
    setDashboardPermissions({
      ...dashboardPermissions,
      allOrders: ordersChecked ? false : true,
      pickingSchedule: ordersChecked ? false : true,
    });
  };

  const toggleUserPermissions = () => {
    setDashboardPermissions({
      ...dashboardPermissions,
      allUsers: usersChecked ? false : true,
      addNewUser: usersChecked ? false : true,
      setPermissions: usersChecked ? false : true,
    });
  };

  const dashPermCheckboxes = [
    { id: "pickingDashboard", displayName: "Picking Dashboard" },
    { id: "reports", displayName: "Reports" },
    { id: "allOrders", displayName: "All Orders" },
    { id: "pickingSchedule", displayName: "Picking Schedule" },
    { id: "allUsers", displayName: "All Users" },
    { id: "addNewUser", displayName: "Add New User" },
    { id: "setPermissions", displayName: "Set Permissions" },
    { id: "customerAccounts", displayName: "Customer Accounts" },
    { id: "productsAndInventory", displayName: "Products and Inventory" },
  ] as { id: TDashboardPermission; displayName: string }[];

  const pickPermCheckboxes = [
    { id: "shopPicking", displayName: "Shop Picking" },
    { id: "meatPicking", displayName: "Meat Picking" },
    { id: "driver", displayName: "Driver" },
    { id: "managerOverride", displayName: "Manager Override" },
  ] as { id: TPickingAppPermission; displayName: string }[];

  return (
    <Box display="flex" sx={sx}>
      <Box display="flex" flexDirection="column" mr={5}>
        <Typography variant="body2" fontWeight={600}>
          SaveCo Hub
        </Typography>
        {dashPermCheckboxes.map(({ id, displayName }) => (
          <Box
            key={id}
            sx={{ display: "inline-flex", flexDirection: "column" }}
          >
            {(id === "allOrders" || id === "allUsers") && (
              <FormControlLabel
                label={id === "allOrders" ? "Orders" : "Users & Permissions"}
                control={
                  <Checkbox
                    checked={id === "allOrders" ? ordersChecked : usersChecked}
                    indeterminate={
                      id === "allOrders"
                        ? ordersIndeterminate
                        : usersIndeterminate
                    }
                    onClick={
                      id === "allOrders"
                        ? toggleOrderPermissions
                        : toggleUserPermissions
                    }
                    key={id}
                  />
                }
              />
            )}
            <FormControlLabel
              label={displayName}
              control={
                <Checkbox
                  name={id}
                  onClick={_ => toggleDashoboardPermission(id)}
                  checked={dashboardPermissions[id]}
                />
              }
              sx={{ ml: indentedCheckboxes.includes(id) ? 3 : -1.5 }}
            />
          </Box>
        ))}
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography variant="body2" fontWeight={600}>
          Picking App
        </Typography>
        {pickPermCheckboxes.map(({ id, displayName }) => (
          <Box
            key={id}
            sx={{ display: "inline-flex", flexDirection: "column" }}
          >
            <FormControlLabel
              label={displayName}
              control={
                <Checkbox
                  name={id}
                  onClick={_ => togglePickingPermission(id)}
                  checked={pickingAppPermissions[id]}
                />
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PermissionsForm;
