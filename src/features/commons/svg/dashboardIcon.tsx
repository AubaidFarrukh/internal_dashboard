import type { FC } from "react";

export interface DashboardIconProps {
  color?: string;
}

export const DashboardIcon: FC<DashboardIconProps> = ({ color }) => (
  <svg
    version="1.2"
    overflow="visible"
    preserveAspectRatio="none"
    viewBox="0 0 24 24"
    width="21"
    height="22"
  >
    <g>
      <path
        d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
        style={{ fill: color ?? "rgb(91, 96, 107)" }}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);

export default DashboardIcon;
