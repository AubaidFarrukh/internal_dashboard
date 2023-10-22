import { FC } from "react";
import { OrdersTable } from "./ordersTables";
import { FilterBar } from "./filterBar";

export const CustomerOrders: FC = () => {
  return (
    <>
      <FilterBar />
      <OrdersTable />
    </>
  );
};

export default CustomerOrders;
