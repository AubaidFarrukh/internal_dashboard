import { Typography } from "@mui/material";
import type { TColDef } from "../../types/table";
import type { TRouteOrder } from "../../types/deliveryAndDispatch";

export const routeDetailsTableConfig: TColDef<TRouteOrder>[] = [
  {
    id: "order",
    headerName: "Order",
    width: 100,
    RenderCell: p => <Typography>#SC{p.row.orderNumber}</Typography>,
  },
  {
    id: "ambient",
    headerName: "Ambient",
    width: 100,
    headerAlignX: "center",
    alignX: "center",
    RenderCell: p => <Typography>{p.row.totes.ambient.length}</Typography>,
  },
  {
    id: "chilled",
    headerName: "Chilled",
    width: 100,
    headerAlignX: "center",
    alignX: "center",
    RenderCell: p => <Typography>{p.row.totes.chilled.length}</Typography>,
  },
  {
    id: "meat",
    headerName: "Meat",
    width: 100,
    headerAlignX: "center",
    alignX: "center",
    RenderCell: p => <Typography>{p.row.totes.meat.length}</Typography>,
  },
  {
    id: "frozen",
    headerName: "Frozen",
    width: 100,
    headerAlignX: "center",
    alignX: "center",
    RenderCell: p => <Typography>{p.row.totes.frozen.length}</Typography>,
  },
  {
    id: "bulk",
    headerName: "Bulk",
    width: 100,
    headerAlignX: "center",
    alignX: "center",
    RenderCell: p => <Typography>{p.row.totes.bulk.length}</Typography>,
  },
  {
    id: "status",
    headerName: "Status",
    width: 180,
    RenderCell: p => {
      const color =
        p.row.status === "Ready for delivery"
          ? "#860d9e"
          : p.row.status === "Loading"
          ? "#0d4e9e"
          : "#919191";
      return <Typography sx={{ color }}>{p.row.status}</Typography>;
    },
  },
];
