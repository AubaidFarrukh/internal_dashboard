import KitchenIcon from "@mui/icons-material/Kitchen";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";

export interface ChilledIconProps {
  color?: string;
  size?: number;
  sx?: SxProps<Theme>;
}

export const ChilledIcon: FC<ChilledIconProps> = ({ color, size, sx }) => (
  <KitchenIcon sx={{ color: color ?? "black", height: size, ...sx }} />
);

export default ChilledIcon;
