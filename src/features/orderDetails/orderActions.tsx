import { FC } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import ClearIcon from "@mui/icons-material/Clear";
import { useCancelOrderMutation } from "../../services/api";
import type { TOrderDetails } from "../../types/orderDetails";

interface OrderActionsProps {
  order: TOrderDetails;
}

export const OrderActions: FC<OrderActionsProps> = ({ order }) => {
  const { id: orderNumber, shopStatus, meatStatus } = order;
  const [cancelOrder, { isLoading, isSuccess, reset }] =
    useCancelOrderMutation();

  const isCancellable =
    ![null, "Delivered", "Cancelled"].includes(shopStatus as string) ||
    ![null, "Delivered", "Cancelled"].includes(meatStatus as string);

  const cancelOrderHandler = async () => {
    if (isLoading || isSuccess) return;
    await cancelOrder({ orderNumber });
    reset();
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button variant="outlined" startIcon={<PauseIcon />} sx={{ mr: 2 }}>
        Place on Hold
      </Button>
      <Button
        variant="contained"
        onClick={cancelOrderHandler}
        startIcon={isLoading ? <CircularProgress size="1rem" /> : <ClearIcon />}
        disabled={isLoading || !isCancellable}
      >
        {isLoading ? "Cancelling" : "Cancel Order"}
      </Button>
    </Box>
  );
};

export default OrderActions;
