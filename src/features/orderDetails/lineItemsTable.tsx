import { Paper, useMediaQuery } from "@mui/material";
import {
  commonRowStyles,
  getColDef,
  RowDetail,
  ROW_HEIGHT,
  ROW_PADDING_X,
  ROW_PADDING_Y,
  ROW_MIN_WIDTH,
} from "./lineItemsTableConfig";
import { TableToolbar } from "./tableToolbar";
import { Table } from "../commons";
import { TableFooter } from "./tableFooter";
import type { FC } from "react";
import type { TOrderDetails } from "../../types/orderDetails";

interface LineItemsTableProps {
  order: TOrderDetails;
}

export const LineItemsTable: FC<LineItemsTableProps> = ({ order }) => {
  const isSmallScreen = useMediaQuery("(max-width:1400px)");
  const colDef = getColDef(isSmallScreen);

  return (
    <Paper square>
      <Table
        rows={order.lineItems}
        colDef={colDef}
        rowHeight={ROW_HEIGHT}
        rowPaddingX={ROW_PADDING_X}
        rowPaddingY={ROW_PADDING_Y}
        tableToolbar={() => <TableToolbar />}
        tableFooter={() => <TableFooter order={order} sx={{ pb: 3 }} />}
        headerStyles={{ border: t => `solid 1px ${t.palette.grey[200]}` }}
        rowStyles={_ => commonRowStyles}
        minWidth={ROW_MIN_WIDTH}
        rowDetail={RowDetail}
      />
    </Paper>
  );
};

export default LineItemsTable;
