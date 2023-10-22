import { FC } from "react";
import { SxProps, TextField, TextFieldProps, Theme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { selectVan, selectRouteStatus, setVan } from "./routeFormSlice";

export interface VanFieldProps {
  sx?: SxProps<Theme>;
}

export const VanField: FC<VanFieldProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const van = useAppSelector(selectVan);
  const routeStatus = useAppSelector(selectRouteStatus);

  const updateVan: TextFieldProps["onChange"] = e => {
    dispatch(setVan({ van: e.target.value }));
  };

  return (
    <TextField
      label="Van"
      name="van"
      value={van}
      onChange={updateVan}
      disabled={routeStatus === "Loading"}
      required
      fullWidth
      size="small"
      sx={sx}
    />
  );
};

export default VanField;
