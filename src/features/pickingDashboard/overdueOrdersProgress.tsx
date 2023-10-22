import { FC } from "react";
import {
  Box,
  Accordion,
  SxProps,
  Theme,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrdersProgressTable } from "./ordersProgressTable";
import { useGetOverdueOrdersQuery } from "../../services/api/pickingDashboard";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { selectShowOverdues, setShowOverdues } from "./pickingDashboardSlice";

export interface OverdueOrdersProgressProps {
  sx?: SxProps<Theme>;
}

export const OverdueOrdersProgress: FC<OverdueOrdersProgressProps> = ({
  sx,
}) => {
  const showOverdues = useAppSelector(selectShowOverdues);
  const { data, isLoading } = useGetOverdueOrdersQuery({});
  const orders = data?.overdueOrders ?? [];
  const dispatch = useAppDispatch();
  const toggle = () =>
    dispatch(setShowOverdues({ showOverdues: !showOverdues }));

  return (
    <Accordion
      expanded={showOverdues}
      onChange={toggle}
      sx={{ borderRadius: 1, ...sx }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon color="primary" />}
        aria-controls="overdue-orders"
        id="overdue-orders"
        sx={{ flexDirection: "row-reverse", px: 3.5 }}
      >
        <Typography component="h2" variant="h6" color="primary" ml={1}>
          Overdue Orders
        </Typography>
        <Typography variant="subtitle1" color="primary" ml="auto">
          {isLoading ? "Loading..." : `${orders.length} Overdue Orders`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Box width="100%" height={160}>
          <OrdersProgressTable
            orders={orders}
            isLoading={isLoading}
            tableStyles={{ border: 0 }}
            sx={{ height: "100%" }}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default OverdueOrdersProgress;
