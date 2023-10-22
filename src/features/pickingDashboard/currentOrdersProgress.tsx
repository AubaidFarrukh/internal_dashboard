import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import { OrdersProgressTable } from "./ordersProgressTable";
import { CurrentOrdersProgressHeader } from "./currentOrdersProgressHeader";
import { useGetOrdersOverviewQuery } from "../../services/api/pickingDashboard";
import { useAppSelector } from "../../context/redux/hooks";
import { selectDate, selectToDate } from "./pickingDashboardSlice";

export interface CurrentOrdersProgressProps {
  sx?: SxProps<Theme>;
}

export const CurrentOrdersProgress: FC<CurrentOrdersProgressProps> = ({
  sx,
}) => {
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);
  const { data, isLoading } = useGetOrdersOverviewQuery({
    date,
    toDate: toDate ?? undefined,
  });
  const orders = data?.overviewData.allOrders ?? [];

  return (
    <OrdersProgressTable
      orders={orders}
      isLoading={isLoading}
      tableHeader={CurrentOrdersProgressHeader}
      sx={sx}
    />
  );
};

export default CurrentOrdersProgress;
