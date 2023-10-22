import type { FC } from "react";
import { SvgIcon, SxProps, Theme } from "@mui/material";

export interface BagIconProps {
  color?: string;
  size?: number;
  sx?: SxProps<Theme>;
}

export const BagIcon: FC<BagIconProps> = ({ color, size, sx }) => (
  <SvgIcon
    viewBox="0 0 24 24"
    sx={{
      color: color ?? "#000000",
      height: size ?? 20,
      width: size ?? 20,
      ...sx,
    }}
  >
    <path
      style={{
        strokeWidth: 0,
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
      }}
      d="M20,9H17V7A5,5,0,0,0,7,7V9H4L3,22H21ZM15,9H9V7a3,3,0,0,1,6,0Z"
    />
  </SvgIcon>
);

export default BagIcon;
