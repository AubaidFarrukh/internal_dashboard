import { Box } from "@mui/material";
import type { FC } from "react";

export const QuantityAdjustedOverlay: FC = () => (
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
      viewBox="0 0 22.99998 19"
      width="22.99998"
      height="19"
    >
      <g transform="translate(0, 0)">
        <g transform="translate(-0.000009999999999621423, 0) rotate(0)">
          <path
            style={{
              strokeWidth: 0,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              fill: "rgb(185, 14, 14)",
            }}
            d="M15.33333,0v3.8h3.83333v15.2h3.83333v-19h-7.66667zM11.5,11.4h-3.83333v3.8h-3.83333v-3.8h-3.83333v-3.8h3.83333v-3.8h3.83333v3.8h3.83333z"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <defs>
          <path
            id="path-1679215929680430"
            d="M15.33333,0v3.8h3.83333v15.2h3.83333v-19h-7.66667zM11.5,11.4h-3.83333v3.8h-3.83333v-3.8h-3.83333v-3.8h3.83333v-3.8h3.83333v3.8h3.83333z"
            vectorEffect="non-scaling-stroke"
          />
        </defs>
      </g>
    </svg>
  </Box>
);

export default QuantityAdjustedOverlay;
