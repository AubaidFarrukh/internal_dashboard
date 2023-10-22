import { FC } from "react";
import { SvgIcon } from "@mui/material";

interface BackIconProps {
  color?: string;
}

export const BackIcon: FC<BackIconProps> = ({ color = "#000000" }) => {
  return (
    <SvgIcon sx={{ color: color }}>
      <path
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        vectorEffect="non-scaling-stroke"
      />
    </SvgIcon>
  );
};

export default BackIcon;
