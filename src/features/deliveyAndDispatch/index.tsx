import type { FC } from "react";
import { ActiveRoutes } from "./activeRoutes";
import { PastRoutes } from "./pastRoutes";

export const DeliveryAndDispatch: FC = () => {
  return (
    <>
      <ActiveRoutes sx={{ mb: 5 }} />
      <PastRoutes sx={{ mb: 5 }} />
    </>
  );
};

export default DeliveryAndDispatch;
