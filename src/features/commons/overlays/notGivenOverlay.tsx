import { Box } from "@mui/material";
import type { FC } from "react";

export const NotGivenOverlay: FC = () => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    bgcolor="rgba(250, 250, 250, 0.65)"
  >
    <svg
      overflow="visible"
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
      width="34"
      height="34"
    >
      <g>
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          style={{ fill: "rgb(185, 14, 14)" }}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  </Box>
);

export default NotGivenOverlay;
