import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";

export interface AmbientIconProps {
  color?: string;
  size?: number;
  sx?: SxProps<Theme>;
}

export const AmbientIcon: FC<AmbientIconProps> = ({ color, size, sx }) => (
  <ShoppingBasketIcon sx={{ color: color ?? "black", width: size, ...sx }} />
);

export default AmbientIcon;
