import { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import { RouteDetails } from "./routeDetails";
import { AssignedOrders } from "./assignedOrders";
import { DeliverableOrders } from "./deliverableOrders";
import { useAppDispatch } from "../../context/redux/hooks";
import { preloadForm, resetForm } from "./routeFormSlice";
import type { TPreloadPayload } from "../../types/routeFormSlice";

export interface RouteFormProps {
  values?: TPreloadPayload;
}

export const RouteForm: FC<RouteFormProps> = ({ values }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (values) {
      dispatch(preloadForm(values));
    } else {
      dispatch(resetForm());
    }
  }, [dispatch, values]);

  return (
    <Grid container columns={60}>
      <Grid item xs={22}>
        <RouteDetails />
      </Grid>
      <Grid item xs={22} sx={{ mr: "auto" }}>
        <AssignedOrders />
      </Grid>
      <Grid item xs={15}>
        <DeliverableOrders />
      </Grid>
    </Grid>
  );
};

export default RouteForm;
