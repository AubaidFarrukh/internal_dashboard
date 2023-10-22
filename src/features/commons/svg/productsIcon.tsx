import type { FC } from "react";

export interface ProductsIconProps {
  color?: string;
}

export const ProductsIcon: FC<ProductsIconProps> = ({ color }) => (
  <svg
    overflow="visible"
    preserveAspectRatio="none"
    viewBox="0 0 24 24"
    width="17"
    height="17"
  >
    <g>
      <path
        d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"
        style={{ fill: color ?? "rgb(91, 96, 107)" }}
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);

export default ProductsIcon;
