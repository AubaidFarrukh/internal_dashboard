import AcUnitIcon from "@mui/icons-material/AcUnit";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";

export interface FrozenIconProps {
  color?: string;
  size?: number;
  sx?: SxProps<Theme>;
}

export const FrozenIcon: FC<FrozenIconProps> = ({ color, size, sx }) => (
  <AcUnitIcon sx={{ color: color ?? "black", height: size, ...sx }} />
);

export default FrozenIcon;
