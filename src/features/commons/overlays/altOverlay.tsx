import { Box } from "@mui/material";
import type { FC } from "react";

export const AltOverlay: FC = () => (
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
      viewBox="0 0 22 16.99999"
      width="22"
      height="16.99999"
    >
      <g transform="translate(0, 0)">
        <g transform="translate(0, 0) rotate(0)">
          <path
            style={{
              strokeWidth: 0,
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              fill: "rgb(185, 14, 14)",
            }}
            d="M22,4.85714l-4.88889,-4.85714v3.64286h-8.55556v2.42857h8.55556v3.64286zM4.88889,7.28571l-4.88889,4.85714l4.88889,4.85714v-3.64286h8.55556v-2.42857h-8.55556z"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <defs>
          <path
            id="path-1679215927642216"
            d="M22,4.85714l-4.88889,-4.85714v3.64286h-8.55556v2.42857h8.55556v3.64286zM4.88889,7.28571l-4.88889,4.85714l4.88889,4.85714v-3.64286h8.55556v-2.42857h-8.55556z"
            vectorEffect="non-scaling-stroke"
          />
        </defs>
      </g>
    </svg>
  </Box>
);

export default AltOverlay;
