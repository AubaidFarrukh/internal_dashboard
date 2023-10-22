import { FC } from "react";
import { SvgIcon } from "@mui/material";

export const BreadcrumSeparator: FC = () => {
  return (
    <SvgIcon>
      <path
        fill="rgb(0,0,0)"
        d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
        vectorEffect="non-scaling-stroke"
      />
    </SvgIcon>
  );
};

export default BreadcrumSeparator;
