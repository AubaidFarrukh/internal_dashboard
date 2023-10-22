import type { FC } from "react";

export interface TruckIconFilledProps {
  color?: string;
}

export const TruckIconFilled: FC<TruckIconFilledProps> = ({ color }) => (
  <svg
    overflow="visible"
    preserveAspectRatio="none"
    viewBox="0 0 24 24"
    width="20"
    height="21"
  >
    <g>
      <path
        d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
        style={{ fill: color ?? "rgb(91, 96, 107)" }}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);

export default TruckIconFilled;
