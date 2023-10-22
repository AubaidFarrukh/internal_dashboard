import { FC } from "react";
import { Avatar, Grid, Typography, SxProps, Theme } from "@mui/material";
import { TableContainer } from "./tableContainer";
import { NoteRenderer, TextRenderer } from "../commons";
import { useGetOrdersOverviewQuery } from "../../services/api/pickingDashboard";
import { useAppSelector } from "../../context/redux/hooks";
import { selectDate, selectToDate } from "./pickingDashboardSlice";
import { formatDate } from "../../utils";
import type { TPicker } from "../../types/orderDetails";

export interface ReturnedOrdersProps {
  sx?: SxProps<Theme>;
}

export const ReturnedOrders: FC<ReturnedOrdersProps> = ({ sx }) => {
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);
  const { data, isLoading } = useGetOrdersOverviewQuery({
    date,
    toDate: toDate ?? undefined,
  });
  const failedDeliveries =
    data?.overviewData.deliveryData.failedDeliveries ?? [];
  const driversByUsername: { [username: string]: TPicker } = {};
  (data?.overviewData.deliveryData.failedDeliveries ?? []).forEach(fd => {
    driversByUsername[fd.driver.username] = fd.driver;
  });

  const tableHeading = (
    <Typography variant="h6" component="h2" fontWeight={600}>
      Returned Orders
    </Typography>
  );

  const listHeader = (
    <Grid
      container
      key="header"
      minHeight="2.4rem"
      borderBottom={1}
      borderColor="divider"
      px={3}
      py={1}
      sx={{ bgcolor: t => t.palette.grey[300] }}
    >
      <Grid item xs={3.5} alignSelf="center">
        <TextRenderer fontWeight={600}>Order</TextRenderer>
      </Grid>
      <Grid item xs={3.5} alignSelf="center">
        <TextRenderer textAlign="center" fontWeight={600}>
          Driver
        </TextRenderer>
      </Grid>
      <Grid item xs={5} alignSelf="center">
        <TextRenderer fontWeight={600}>Date Returned</TextRenderer>
      </Grid>
    </Grid>
  );
  const returnedOrdersList = failedDeliveries.map(fd => {
    const fullName = fd.driver.firstName + " " + fd.driver.lastName;
    return (
      <Grid
        container
        key={fd.orderNumber + fd.routeId}
        minHeight="4rem"
        borderBottom={1}
        borderColor="divider"
        px={3}
        py={1}
        sx={{
          "&:nth-of-type(even)": { bgcolor: t => t.palette.grey[100] },
        }}
      >
        <Grid item xs={3.5} alignSelf="center">
          <TextRenderer>#SC{fd.orderNumber.toString()}</TextRenderer>
        </Grid>
        <Grid item xs={3.5} alignSelf="center">
          <NoteRenderer note={fullName}>
            <Avatar src={fd.driver.profilePicture} />
          </NoteRenderer>
        </Grid>
        <Grid item xs={5} alignSelf="center">
          <TextRenderer>{formatDate(fd.date, "DD/MM/YYYY")}</TextRenderer>
        </Grid>
      </Grid>
    );
  });

  return (
    <TableContainer
      heading={tableHeading}
      list={returnedOrdersList}
      listHeader={listHeader}
      loading={isLoading}
      sx={sx}
    />
  );
};

export default ReturnedOrders;
