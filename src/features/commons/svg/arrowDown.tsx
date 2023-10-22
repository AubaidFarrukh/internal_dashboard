import type { FC } from "react";

export interface ArrowDownProps {
  color?: string;
}

export const ArrowDown: FC<ArrowDownProps> = ({ color }) => (
  <svg
    overflow="visible"
    preserveAspectRatio="none"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <g>
      <path
        d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"
        style={{ fill: color ?? "rgb(18, 18, 18)" }}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);

export default ArrowDown;
