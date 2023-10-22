import { Collapse } from "@mui/material";
import { Table, TableRowProps } from "../commons";
import { routeDetailsTableConfig } from "./routeDetailsTableConfig";
import { useAppSelector } from "../../context/redux/hooks";
import { selectOpenRoute } from "./routesSlice";
import type { TRoute } from "../../types/deliveryAndDispatch";

export interface RoutesDetailsProps {
  routes: TRoute[];
}

export const RoutesDetails: TableRowProps<TRoute>["rowDetail"] = ({ row }) => {
  const openRoute = useAppSelector(selectOpenRoute);

  return (
    <Collapse in={openRoute === row.id} timeout="auto" unmountOnExit>
      <Table
        rows={row.orders}
        rowIdExtractor={row => row.orderNumber}
        colDef={routeDetailsTableConfig}
        rowHeight={30}
        rowPaddingY={1}
        headerContainerStyles={{
          display: "flex",
          justifyContent: "center",
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: t => t.palette.grey[200],
        }}
        rowContainerStyles={row => ({
          display: "flex",
          justifyContent: "center",
          bgcolor: t => t.palette.grey[200],
          borderBottom: 1,
          borderColor: "divider",
          "&:hover": { bgcolor: t => t.palette.primary.light },
          position: "relative",
          "::after":
            row.routeStatus === "Dispatched" &&
            row.status === "Ready for delivery"
              ? {
                  position: "absolute",
                  content: "' '",
                  width: "100%",
                  height: "50%",
                  borderBottom: 1,
                  borderColor: t => t.palette.grey[400],
                }
              : undefined,
        })}
      />
    </Collapse>
  );
};

export default RoutesDetails;
