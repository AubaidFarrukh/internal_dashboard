import { FC } from "react";
import { Box, SxProps, Theme } from "@mui/material";

export interface DotIconProps {
  size?: number;
  color?: string;
  sx?: SxProps<Theme>;
}

export const DotIcon: FC<DotIconProps> = ({
  size = 15,
  color = "#e0a314",
  sx,
}) => {
  return (
    <Box
      width={size}
      height={size}
      bgcolor={color}
      borderRadius="50%"
      sx={{ display: "inline-block", ...sx }}
    />
  );
};

export default DotIcon;
