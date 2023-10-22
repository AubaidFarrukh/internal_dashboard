import { FC } from "react";
import { RoutesDetails } from "./routeDetails";
import { Table } from "../commons";
import { routesTableConfig } from "./routesTableConfig";
import type { TRoute } from "../../types/deliveryAndDispatch";

export interface RoutesTableProps {
  routes: TRoute[];
  isLoading?: boolean;
}

const MIN_WIDTH = 1120;

export const RoutesTable: FC<RoutesTableProps> = ({ routes, isLoading }) => {
  return (
    <Table
      rows={routes}
      colDef={routesTableConfig}
      isLoading={isLoading}
      rowHeight={30}
      rowPaddingY={1}
      headerStyles={{ borderBottom: 1, borderColor: "divider" }}
      tableStyles={{ overflow: "auto" }}
      bodyStyles={{ minWidth: MIN_WIDTH }}
      rowStyles={_ => ({
        borderBottom: 1,
        borderColor: "divider",
        "&:hover": { bgcolor: t => t.palette.primary.light },
      })}
      rowContainerStyles={_ => ({
        "&:nth-of-type(odd) > *": { bgcolor: t => t.palette.grey[100] },
      })}
      minWidth={MIN_WIDTH}
      rowDetail={RoutesDetails}
    />
  );
};

export default RoutesTable;
