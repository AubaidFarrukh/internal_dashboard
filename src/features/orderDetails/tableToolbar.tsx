import { Typography } from "@mui/material";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";

export interface TableToolbarProps {
  sx?: SxProps<Theme>;
}

export const TableToolbar: FC<TableToolbarProps> = ({ sx }) => (
  <Typography
    variant="h5"
    component="h2"
    fontWeight={600}
    px={3}
    py={5}
    sx={sx}
  >
    Order Summary
  </Typography>
);

export default TableToolbar;
