import { FC } from "react";
import { SxProps, Theme, Typography } from "@mui/material";
import type { TRouteStatus } from "../../types/deliveryAndDispatch";

export interface RouteStatusProps {
  status: TRouteStatus;
  sx?: SxProps<Theme>;
}

export const RouteStatus: FC<RouteStatusProps> = ({ status, sx }) => {
  const color =
    status === "Waiting"
      ? "#0d4e9e"
      : status === "Loading"
      ? "#860d9e"
      : "#919191";

  return (
    <Typography sx={{ color, display: "inline-block", ...sx }}>
      {status}
    </Typography>
  );
};

export default RouteStatus;
