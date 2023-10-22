import { Box, Paper, Typography } from "@mui/material";
import { OrderStatusProgressBar } from "./orderStatusProgressBar";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import type { TOrderDetails } from "../../types/orderDetails";
import { OrderStatusRenderer } from "../commons";

export interface OrderStatusBarProps {
  order: TOrderDetails;
  sx?: SxProps<Theme>;
}

export const OrderStatusBar: FC<OrderStatusBarProps> = ({ order, sx }) => {
  return (
    <Paper square sx={{ p: 3, ...sx }}>
      <Typography variant="h5" component="h2" fontWeight={600} mb={2}>
        Order Status
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        mb={2}
      >
        {order.shopStatus ? (
          <>
            <Typography fontWeight={500} mr={1}>
              Shop:
            </Typography>
            <OrderStatusRenderer
              status={order.shopStatus}
              sx={{ mr: "auto" }}
            />
          </>
        ) : null}
        {order.meatStatus ? (
          <>
            <Typography fontWeight={500} ml="auto">
              Meat:
            </Typography>
            <OrderStatusRenderer status={order.meatStatus} sx={{ ml: 1 }} />
          </>
        ) : null}
      </Box>
      <OrderStatusProgressBar
        shopStatus={order.shopStatus}
        meatStatus={order.meatStatus}
        shopPicker={order.shopPicker}
        meatPicker={order.meatPicker}
        shopItemsCount={order.shopItemsCount}
        meatItemsCount={order.meatItemsCount}
      />
    </Paper>
  );
};

export default OrderStatusBar;
