import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, SxProps, Theme } from "@mui/material";
import { Table } from "../commons";
import { ordersProgressTableConfig } from "./orderProgressTableConfig";
import { TOrderProgress } from "../../types/pickingDashboard";

export interface OrdersProgressTableProps {
  orders: TOrderProgress[];
  isLoading?: boolean;
  tableHeader?: FC<object>;
  tableStyles?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}

const MIN_WIDTH = 1510;

export const OrdersProgressTable: FC<OrdersProgressTableProps> = ({
  orders,
  isLoading,
  tableHeader: TableHeader,
  tableStyles,
  sx,
}) => {
  const navigateTo = useNavigate();

  return (
    <Box sx={{ overflow: "hidden", ...sx }}>
      <Table
        rows={orders}
        rowIdExtractor={order => order.orderNumber}
        colDef={ordersProgressTableConfig}
        isLoading={isLoading}
        tableToolbar={TableHeader ? () => <TableHeader /> : undefined}
        rowHeight={30}
        rowPaddingY={1.5}
        headerStyles={{ borderBottom: 1, borderColor: "divider" }}
        tableStyles={{
          bgcolor: "white",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          height: "100%",
          ...tableStyles,
        }}
        rowStyles={_ => ({
          borderBottom: 1,
          borderColor: "divider",
          cursor: "pointer",
          "&:hover": { bgcolor: t => t.palette.primary.light },
        })}
        rowContainerStyles={_ => ({
          "&:nth-of-type(odd) > *": { bgcolor: t => t.palette.grey[100] },
        })}
        onRowClick={p => navigateTo(`/orders/${p.row.orderNumber}`)}
        minWidth={MIN_WIDTH}
      />
    </Box>
  );
};

export default OrdersProgressTable;
