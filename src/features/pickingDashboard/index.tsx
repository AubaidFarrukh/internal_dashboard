import { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import { DatePicker } from "./datePicker";
import { OrdersCount } from "./ordersCount";
import { OverdueOrdersProgress } from "./overdueOrdersProgress";
import { CurrentOrdersProgress } from "./currentOrdersProgress";
import { PickingAccuracy } from "./pickingAccuracy";
import { TopPicker } from "./topPicker";
import { NotGivenItems } from "./notGivenItems";
import { AltItems } from "./altItems";
import { PickersChart } from "./pickersChart";
import { DriversChart } from "./driversChart";
import { ReturnedOrders } from "./returnedOrders";
import { DeliveryPerformance } from "./deliveryPerformance";
import { RefreshButton } from "./refreshButton";
import {
  useGetOrdersOverviewQuery,
  useGetOverdueOrdersQuery,
} from "../../services/api/pickingDashboard";
import { useAppSelector } from "../../context/redux/hooks";
import { selectDate, selectToDate } from "./pickingDashboardSlice";

const MIN_CONTAINER_WIDTH = 1368;
const ACCURACY_WIDTH = 290;

export const Dashboard: FC = () => {
  // Logic for loading icon.
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);
  const { isFetching } = useGetOrdersOverviewQuery({
    date,
    toDate: toDate ?? undefined,
  });
  const { isFetching: isFetchingOverdue } = useGetOverdueOrdersQuery({});

  return (
    <Box width="100%" minWidth={MIN_CONTAINER_WIDTH}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mb={2}
      >
        <RefreshButton sx={{ mr: 1 }} />
        <DatePicker sx={{ mr: 1 }} />
        {isFetching || isFetchingOverdue ? (
          <CircularProgress size="2rem" />
        ) : null}
      </Box>
      <OrdersCount sx={{ mb: 2 }} />
      <Box display="flex" height={700} mb={2}>
        <Box
          width={`calc(100% - ${ACCURACY_WIDTH}px)`}
          display="flex"
          flexDirection="column"
        >
          <OverdueOrdersProgress sx={{ maxHeight: 232, mb: 2 }} />
          <CurrentOrdersProgress
            sx={{ height: "calc(100% - 308px)", flex: 1 }}
          />
        </Box>
        <Box>
          <PickingAccuracy
            sx={{ width: ACCURACY_WIDTH - 16, height: 534, ml: 2, mb: 2 }}
          />
          <TopPicker sx={{ maxWidth: 274, ml: 2 }} />
        </Box>
      </Box>
      <Box display="flex" height={510} mb={2}>
        <NotGivenItems sx={{ width: "22.2%", height: "100%", mr: 2 }} />
        <AltItems sx={{ width: "22.2%", height: "100%", mr: 2 }} />
        <PickersChart sx={{ flex: 1 }} />
      </Box>
      <Box display="flex" height={510}>
        <DriversChart sx={{ flex: 1, mr: 2 }} />
        <ReturnedOrders sx={{ width: "25.7%", height: "100%", mr: 2 }} />
        <DeliveryPerformance sx={{ width: "19.6%" }} />
      </Box>
    </Box>
  );
};

export default Dashboard;
