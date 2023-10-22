import { FC } from "react";
import { Box, CircularProgress, SxProps, Theme } from "@mui/material";

export interface LoadingContentProps {
  size?: string | number;
  sx?: SxProps<Theme>;
}

export const LoadingContent: FC<LoadingContentProps> = ({ size, sx }) => (
  <Box
    sx={{
      display: "grid",
      placeItems: "center",
      width: "100%",
      height: "100%",
      ...sx,
    }}
  >
    <CircularProgress color="primary" size={size} />
  </Box>
);

export default LoadingContent;
