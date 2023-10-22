import { FC, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  BackBtn,
  LoadingContent,
  NotFound,
  JsonViewer,
  ToggleJsonJsx,
} from "../commons";
import { LineItemsTable } from "./lineItemsTable";
import { OrderNote } from "./orderNote";
import { CustomerDetails } from "./customerDetails";
import { Addresses } from "./addresses";
import { AssignedTotes } from "./assignedTotes";
import { AuditLogs } from "./auditLogs";
import { OrderStatusBar } from "./orderStatusBar";
import { TimeLine } from "./timeline";
import { useGetOrderByIdQuery } from "../../services/api";
import { UpdateOrderStatus } from "./updateOrderStatus";

export const OrderDetails: FC = () => {
  const location = useLocation();
  const [showJson, setShowJson] = useState(false);
  const toggleShowJson = () => setShowJson(prev => !prev);
  const orderNumber = +location.pathname.split("/").slice(-1)[0];
  const { isLoading, data: order } = useGetOrderByIdQuery({ orderNumber });

  // Show loading sign if order is being fetched.
  if (isLoading) return <LoadingContent />;

  // If no data is found for given order
  if (!order) {
    return <NotFound message="Order details could not be found." />;
  }

  return (
    <>
      <BackBtn />

      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <ToggleJsonJsx
          showJson={showJson}
          toggleShowJson={toggleShowJson}
          sx={{ mr: 1 }}
        />
        {!showJson && (
          <UpdateOrderStatus
            orderNumber={order.id}
            shopStatus={order.shopStatus}
            meatStatus={order.meatStatus}
          />
        )}
      </Box>

      {showJson && <JsonViewer json={order} />}

      {!showJson && (
        <Box pb={2}>
          <Grid container columns={60} justifyContent="space-between">
            <Grid item sm={40}>
              <Stack spacing={3}>
                <OrderStatusBar order={order} />
                <LineItemsTable order={order} />
                <TimeLine orderNumber={order.id} />
              </Stack>
            </Grid>
            <Grid item sm={19}>
              <Stack spacing={3}>
                <OrderNote note={order.orderNote} />
                <CustomerDetails
                  name={order.customerData.name}
                  email={order.customerData.email}
                  phone={order.customerData.phone}
                />
                <Addresses
                  shippingAddress={order.shippingAddress}
                  billingAddress={order.billingAddress}
                />
                <AssignedTotes orderNumber={orderNumber} />
                <AuditLogs orderNumber={order.id} />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default OrderDetails;
