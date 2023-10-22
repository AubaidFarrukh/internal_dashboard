import { FC } from "react";
import { Box, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  selectRole,
  setRole as setRoleAction,
  selectErrors,
} from "./createUserSlice";
import type { TRole } from "../../types/users";

export interface SelectRoleProps {
  sx?: SxProps<Theme>;
}

export const SelectRole: FC<SelectRoleProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectRole);
  const errors = useAppSelector(selectErrors);

  const setRole = (r: TRole | "none") => {
    const role = r === "none" ? null : r;
    dispatch(setRoleAction({ role }));
  };

  const roleOptions = [
    { id: "none", name: "Select Role", value: "none" },
    { id: "manager", name: "Manager", value: "manager" },
    { id: "staff", name: "Staff", value: "staff" },
    { id: "shop_picker", name: "Shop Picker", value: "shop_picker" },
    { id: "meat_picker", name: "Meat Picker", value: "meat_picker" },
    { id: "driver", name: "Driver", value: "driver" },
  ] as { id: TRole | "none"; name: string; value: TRole | "none" }[];

  return (
    <Box display="flex" alignItems="center" sx={sx}>
      <InputLabel id="user-role" sx={{ mr: 2.5, fontWeight: 600 }}>
        Role *
      </InputLabel>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ position: "relative", flexGrow: 1 }}
      >
        <Select
          value={role ?? "none"}
          fullWidth
          onChange={e => setRole(e.target.value as TRole | "none")}
          error={!!errors.role}
          labelId="user-role"
        >
          {roleOptions.map(r => (
            <MenuItem value={r.value} key={r.id}>
              {r.name}
            </MenuItem>
          ))}
        </Select>
        {errors.role && (
          <Typography
            variant="subtitle2"
            sx={{
              color: theme => theme.palette.error.main,
              fontWeight: 400,
              position: "absolute",
              bottom: theme => theme.spacing(-3),
              left: theme => theme.spacing(1.75),
            }}
          >
            {errors.role}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SelectRole;
