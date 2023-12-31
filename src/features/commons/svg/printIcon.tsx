import type { FC } from "react";

export interface PrintIconProps {
  color?: string;
}

export const PrintIcon: FC<PrintIconProps> = ({ color }) => {
  return (
    <svg
      overflow="visible"
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <g>
        <path
          d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"
          style={{ fill: color ?? "rgb(0, 0, 0)" }}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
};

export default PrintIcon;
