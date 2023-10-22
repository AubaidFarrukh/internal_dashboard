import type { FC } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import {
  CombinedPackageIcon,
  DeliveryVanIcon,
  HandIcon,
  NoteRenderer,
  OrdersIcon,
  QuickIcon,
  RoundHoursIcon,
} from "../commons";
import { useGetOrdersOverviewQuery } from "../../services/api/pickingDashboard";
import { useAppSelector } from "../../context/redux/hooks";
import { selectDate, selectToDate } from "./pickingDashboardSlice";

export interface OrdersCountProps {
  sx?: SxProps<Theme>;
}

export const OrdersCount: FC<OrdersCountProps> = ({ sx }) => {
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);
  const { data, isLoading } = useGetOrdersOverviewQuery({
    date,
    toDate: toDate ?? undefined,
  });
  const ordersCount = data?.overviewData.ordersCount ?? null;

  const countBoxes: TCountBox[] = [
    {
      id: "nextDay",
      label: "Next Day Delivery",
      Icon: RoundHoursIcon,
      pickingCompleted: ordersCount?.nextDayOrders.pickingCompleted ?? 0,
      pickingNotCompleted: ordersCount?.nextDayOrders.pickingNotCompleted ?? 0,
      note: "Orders placed before 11:59 PM yesterday.",
    },
    {
      id: "sameDay",
      label: "Same Day Delivery",
      Icon: DeliveryVanIcon,
      pickingCompleted: ordersCount?.sameDayOrders.pickingCompleted ?? 0,
      pickingNotCompleted: ordersCount?.sameDayOrders.pickingNotCompleted ?? 0,
      note: "Orders placed between 12:00 AM and 03:00 PM today.",
    },
    {
      id: "express",
      label: "Express Delivery",
      Icon: QuickIcon,
      pickingCompleted: ordersCount?.expressOrders.pickingCompleted ?? 0,
      pickingNotCompleted: ordersCount?.expressOrders.pickingNotCompleted ?? 0,
      note: "Orders placed between 02:00 PM and 06:00 PM today.",
    },
    {
      id: "local",
      label: "Local Pickup",
      Icon: CombinedPackageIcon,
      pickingCompleted: ordersCount?.localPickupOrders.pickingCompleted ?? 0,
      pickingNotCompleted:
        ordersCount?.localPickupOrders.pickingNotCompleted ?? 0,
      note: "Orders placed today for local pickup.",
    },
    {
      id: "onhold",
      label: "On Hold",
      Icon: HandIcon,
      pickingCompleted: ordersCount?.onHoldOrders.pickingCompleted ?? 0,
      pickingNotCompleted: ordersCount?.onHoldOrders.pickingNotCompleted ?? 0,
      note: "Orders placed on hold.",
    },
    {
      id: "total",
      label: "Total Orders",
      Icon: OrdersIcon,
      pickingCompleted: ordersCount?.total.pickingCompleted ?? 0,
      pickingNotCompleted: ordersCount?.total.pickingNotCompleted ?? 0,
      note: "The total number of orders to fulfil today.",
    },
  ];

  return (
    <Box display="flex" sx={sx}>
      {countBoxes.map((box, i) => (
        <Paper
          square
          sx={{
            width: 300,
            p: 2,
            mx: 1,
            ml: i === 0 ? 0 : 1,
            mr: i === countBoxes.length - 1 ? 0 : 1,
            borderRadius: 0.75,
          }}
          key={box.id}
        >
          <Box display="flex" alignItems="center">
            <NoteRenderer
              note={box.note}
              sx={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                bgcolor: "#3779eb20",
                cursor: "pointer",
              }}
            >
              <box.Icon size={33} />
            </NoteRenderer>
            <Box ml={2}>
              {isLoading ? (
                <CircularProgress size="3.6rem" />
              ) : (
                <Box display="flex" alignItems="flex-end" mb={-1}>
                  <Typography component="p" fontWeight={600} fontSize="3rem">
                    {box.pickingNotCompleted}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="p"
                    fontWeight={600}
                    color={t => t.palette.grey[400]}
                    pb={1.25}
                  >
                    /{box.pickingCompleted}
                  </Typography>
                </Box>
              )}
              <Typography
                color={t => t.palette.grey[600]}
                fontWeight={600}
                fontSize={14}
              >
                {box.label}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default OrdersCount;

type TCountBox = {
  id: string;
  label: string;
  Icon: FC<{ color?: string; size?: number }>;
  pickingCompleted: number;
  pickingNotCompleted: number;
  note: string;
};
