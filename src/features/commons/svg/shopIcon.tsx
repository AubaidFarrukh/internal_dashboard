import type { FC } from "react";

export interface ShopIconProps {
  color?: string;
}

export const ShopIcon: FC<ShopIconProps> = ({ color }) => (
  <svg
    height="27"
    overflow="visible"
    viewBox="0 0 30.00001 27"
    width="30.00001"
  >
    <g>
      <defs>
        <path
          id="path-1679407284865570"
          d="M15,23.625h-10v-6.75h10zM30,16.875v-3.375l-1.66667,-8.4375h-26.66667l-1.66667,8.4375v3.375h1.66667v10.125h16.66667v-10.125h6.66667v10.125h3.33333v-10.125zM28.33333,0h-26.66667v3.375h26.66667z"
          vectorEffect="non-scaling-stroke"
        />
      </defs>
      <path
        style={{
          fill: color ?? "rgb(219, 219, 219)",
          strokeWidth: 0,
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
        }}
        d="M15,23.625h-10v-6.75h10zM30,16.875v-3.375l-1.66667,-8.4375h-26.66667l-1.66667,8.4375v3.375h1.66667v10.125h16.66667v-10.125h6.66667v10.125h3.33333v-10.125zM28.33333,0h-26.66667v3.375h26.66667z"
        transform="translate(0.000009999999974752427, 0) rotate(0)"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);

export default ShopIcon;
