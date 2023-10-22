import type { FC } from "react";

export interface ArrowDownRightProps {
  color?: string;
}

export const ArrowDownRight: FC<ArrowDownRightProps> = ({ color }) => (
  <svg
    overflow="visible"
    preserveAspectRatio="none"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <g>
      <path
        d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"
        style={{ fill: color ?? "rgb(166, 166, 166)" }}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);

export default ArrowDownRight;
