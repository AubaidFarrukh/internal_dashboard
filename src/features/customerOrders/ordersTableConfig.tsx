import { Box } from "@mui/material";
import {
  NoteRenderer,
  OrderStatusRenderer,
  ReportIcon,
  PickerRenderer,
  TickRenderer,
  MessageIcon,
} from "../commons";
import { dateFormatter, gbpFormatter } from "../../utils";
import type { GridColDef } from "@mui/x-data-grid";
import type { TOrder } from "../../types/orders";

export const ordersTableColumns: GridColDef<TOrder>[] = [
  {
    field: "id",
    headerName: "Order No.",
    width: 110,
    valueGetter: params => params.row.orderName,
    sortable: false,
    filterable: false,
  },
  {
    field: "dateTime",
    headerName: "Date",
    width: 210,
    valueGetter: params => dateFormatter(params.row.createdAtString),
    sortable: false,
    filterable: false,
  },
  {
    field: "customerName",
    headerName: "Customer",
    width: 200,
    valueGetter: params => params.row.customerName,
    sortable: false,
    filterable: false,
  },
  {
    field: "deliveryMethod",
    headerName: "Delivery Method",
    width: 150,
    valueGetter: param => param.row.deliveryMethod,
    sortable: false,
    filterable: false,
  },
  {
    field: "total",
    headerName: "Total",
    width: 100,
    valueGetter: params => {
      const value = params.row.totalPrice;
      if (+value) return gbpFormatter.format(+value);
      return `£${value}`;
    },
    sortable: false,
    filterable: false,
  },
  {
    field: "shopItemsCount",
    headerName: "Shop Items",
    width: 100,
    valueGetter: params => params.row.shopItemsCount,
    sortable: false,
    filterable: false,
  },
  {
    field: "shopStatus",
    headerName: "Shop Status",
    width: 200,
    renderCell: params => {
      if (params.row.shopStatus) {
        return <OrderStatusRenderer status={params.row.shopStatus} />;
      }
      return " ";
    },
    sortable: false,
    filterable: false,
  },
  {
    field: "shopPicker",
    headerName: "Shop Picker",
    width: 200,
    renderCell: params => {
      if (!params.row.shopPicker) return " ";
      return (
        <PickerRenderer
          profilePicture={params.row.shopPicker.profilePicture}
          firstName={params.row.shopPicker.firstName}
          lastName={params.row.shopPicker.lastName}
        />
      );
    },
    sortable: false,
    filterable: false,
  },
  {
    field: "meatItemsCount",
    headerName: "Meat Items",
    width: 100,
    valueGetter: params => params.row.meatItemsCount,
    sortable: false,
    filterable: false,
  },
  {
    field: "meatStatus",
    headerName: "Meat Status",
    width: 200,
    renderCell: params => {
      if (params.row.meatStatus) {
        return <OrderStatusRenderer status={params.row.meatStatus} />;
      }
      return " ";
    },
    sortable: false,
    filterable: false,
  },
  {
    field: "meatPicker",
    headerName: "Meat Picker",
    width: 200,
    renderCell: params => {
      if (!params.row.meatPicker) return " ";
      return (
        <Box maxWidth={180}>
          <PickerRenderer
            profilePicture={params.row.meatPicker.profilePicture}
            firstName={params.row.meatPicker.firstName}
            lastName={params.row.meatPicker.lastName}
          />
        </Box>
      );
    },
    sortable: false,
    filterable: false,
  },
  {
    field: "orderNote",
    headerName: "Note",
    width: 70,
    renderHeader: _ => (
      <NoteRenderer disableTooltip>
        <MessageIcon sx={{ color: t => t.palette.orderNote.header }} />
      </NoteRenderer>
    ),
    headerAlign: "center",
    renderCell: params => {
      if (!params.row.orderNote) return " ";
      const orderStatus = params.row.shopStatus;
      return (
        <NoteRenderer note={params.row.orderNote}>
          <MessageIcon
            sx={{
              color: t =>
                orderStatus === "Cancelled" || orderStatus === "Fulfilled"
                  ? t.palette.orderNote.delivered
                  : t.palette.orderNote.main,
              ":hover": {
                color: t => t.palette.primary.main,
              },
            }}
          />
        </NoteRenderer>
      );
    },
    sortable: false,
    filterable: false,
  },
  {
    field: "zReport",
    headerName: "Z Report",
    width: 70,
    renderHeader: _ => <ReportIcon />,
    headerAlign: "center",
    renderCell: params => {
      if (!params.row.zReport) return " ";

      return <TickRenderer />;
    },
    align: "center",
    sortable: false,
    filterable: false,
  },
];

export default ordersTableColumns;
