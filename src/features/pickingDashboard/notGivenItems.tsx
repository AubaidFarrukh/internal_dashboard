import { FC } from "react";
import { Typography, SxProps, Theme, Grid } from "@mui/material";
import { TableContainer } from "./tableContainer";
import { LastUpdated } from "./lastUpdated";
import { DotIcon, TextRenderer } from "../commons";
import { useGetOrdersOverviewQuery } from "../../services/api/pickingDashboard";
import { useAppSelector } from "../../context/redux/hooks";
import { selectDate, selectToDate } from "./pickingDashboardSlice";
import type { TPicker } from "../../types/orderDetails";

export interface NotGivenItemsProps {
  sx?: SxProps<Theme>;
}

export const NotGivenItems: FC<NotGivenItemsProps> = ({ sx }) => {
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);
  const { data, isLoading, fulfilledTimeStamp } = useGetOrdersOverviewQuery({
    date,
    toDate: toDate ?? undefined,
  });
  const notGivenItems = data?.overviewData.notGivenItems ?? [];
  const pickersByUsername: { [username: string]: TPicker } = {};
  (data?.overviewData.pickingData.pickers ?? []).forEach(p => {
    pickersByUsername[p.picker.username] = p.picker;
  });

  const tableHeading = (
    <>
      <DotIcon color="#9b26af" size={12} sx={{ mr: 1 }} />
      <Typography variant="h6" component="h2" fontWeight={600}>
        Items Not Given
      </Typography>
    </>
  );
  const tooltip = "Items marked as not-given, and remained as not-given.";

  const subHeading = <LastUpdated timestamp={fulfilledTimeStamp} />;

  const notGivenItemsList = notGivenItems.map(item => (
    <Grid
      container
      key={item.orderNumber + item.variantId}
      minHeight="4rem"
      borderBottom={1}
      borderColor="divider"
      px={3}
      py={1}
      sx={{
        "&:nth-of-type(even)": { bgcolor: t => t.palette.grey[100] },
      }}
    >
      <Grid item xs={4}>
        <TextRenderer
          fontWeight={600}
          variant="body2"
          maxLines={2}
          sx={{ width: 100, pr: 1 }}
        >
          {pickersByUsername[item.picker].firstName +
            " " +
            pickersByUsername[item.picker].lastName}
        </TextRenderer>
        <TextRenderer
          variant="subtitle2"
          maxLines={1}
          fontSize={12}
          sx={{ width: 100, pr: 1 }}
        >
          #SC{item.orderNumber}
        </TextRenderer>
      </Grid>
      <Grid item xs={8}>
        <TextRenderer variant="body2" maxLines={2}>
          {item.name}
        </TextRenderer>
        <TextRenderer variant="body2" color="text.secondary">
          Refund Value: £{item.refundValue}
        </TextRenderer>
      </Grid>
    </Grid>
  ));

  return (
    <TableContainer
      heading={tableHeading}
      subHeading={subHeading}
      tooltip={tooltip}
      list={notGivenItemsList}
      loading={isLoading}
      sx={sx}
    />
  );
};

export default NotGivenItems;
