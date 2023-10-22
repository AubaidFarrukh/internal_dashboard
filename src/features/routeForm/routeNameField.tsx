import { FC } from "react";
import { SxProps, TextField, TextFieldProps, Theme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectRouteName,
  selectRouteStatus,
  setRouteName,
} from "./routeFormSlice";

export interface RouteNameFieldProps {
  sx?: SxProps<Theme>;
}

export const RouteNameField: FC<RouteNameFieldProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const routeName = useAppSelector(selectRouteName);
  const routeStatus = useAppSelector(selectRouteStatus);

  const updateRouteName: TextFieldProps["onChange"] = e => {
    dispatch(setRouteName({ routeName: e.target.value }));
  };

  return (
    <TextField
      label="Route Name"
      name="routeName"
      value={routeName}
      onChange={updateRouteName}
      disabled={routeStatus === "Loading"}
      required
      fullWidth
      size="small"
      sx={sx}
    />
  );
};

export default RouteNameField;
