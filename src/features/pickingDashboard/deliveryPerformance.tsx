import type { FC } from "react";
import { Paper, Typography, SxProps, Theme } from "@mui/material";
import { CircularProgressWithLabel } from "../commons";
import { useGetOrdersOverviewQuery } from "../../services/api/pickingDashboard";
import { useAppSelector } from "../../context/redux/hooks";
import { selectDate, selectToDate } from "./pickingDashboardSlice";
import { getDeliveryProgressComments } from "./helperFunctions";

export interface DeliveryPerformanceProps {
  sx?: SxProps<Theme>;
}

export const DeliveryPerformance: FC<DeliveryPerformanceProps> = ({ sx }) => {
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);
  const { data, isLoading } = useGetOrdersOverviewQuery({
    date,
    toDate: toDate ?? undefined,
  });
  const deliveryPerformance = data?.overviewData.deliveryData.performance ?? 0;

  const { color, phrase, comment } = getDeliveryProgressComments(
    deliveryPerformance,
    date
  );

  return (
    <Paper
      square
      sx={{
        p: 3,
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...sx,
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        fontWeight={600}
        sx={{
          userSelect: "none",
          cursor: "pointer",
          display: "inline-block",
          width: "100%",
        }}
      >
        Delivery Performance
      </Typography>
      <CircularProgressWithLabel
        value={deliveryPerformance}
        fillColor={color}
        isLoading={isLoading}
        size={150}
        labelFontSize="2rem"
        labelFontWeight={600}
        sx={{ my: "auto" }}
      />
      <Typography fontWeight={600} fontSize="2rem" mb={1.5}>
        {phrase}
      </Typography>
      <Typography textAlign="center">{comment}</Typography>
    </Paper>
  );
};

export default DeliveryPerformance;
