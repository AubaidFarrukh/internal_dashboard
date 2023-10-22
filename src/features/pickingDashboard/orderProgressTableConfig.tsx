import { Avatar, Typography } from "@mui/material";
import type { TColDef } from "../../types/table";
import type { TOrderProgress } from "../../types/pickingDashboard";
import { NoteRenderer, OrderStatusRenderer } from "../commons";

export const ordersProgressTableConfig: TColDef<TOrderProgress>[] = [
  {
    id: "order",
    headerName: "Order No.",
    width: 110,
    RenderCell: p => <Typography>#SC{p.row.orderNumber}</Typography>,
  },
  {
    id: "location",
    headerName: "Delivery Location",
    width: 170,
    RenderCell: p => <Typography>{p.row.deliveryLocation}</Typography>,
  },
  {
    id: "shopStatus",
    headerName: "Shop Status",
    width: 170,
    RenderCell: p =>
      p.row.shopStatus ? (
        <OrderStatusRenderer status={p.row.shopStatus} />
      ) : (
        <></>
      ),
  },
  {
    id: "shopPicker",
    headerName: "Shop Picker",
    width: 130,
    headerAlignX: "center",
    alignX: "center",
    RenderCell: p =>
      p.row.shopPicker ? (
        <NoteRenderer
          note={p.row.shopPicker.firstName + " " + p.row.shopPicker.lastName}
        >
          <Avatar src={p.row.shopPicker.profilePicture} />
        </NoteRenderer>
      ) : (
        <></>
      ),
  },
  {
    id: "shopTime",
    headerName: "Time Elapsed",
    width: 140,
    headerAlignX: "center",
    alignX: "center",
    RenderCell: p => {
      if (!p.row.shopStatus) return <></>;

      const hours = Math.floor(p.row.shopPickingTime / 3600);
      const minutes = Math.floor((p.row.shopPickingTime % 3600) / 60);
      const seconds = p.row.shopPickingTime % 60;

      return (
        <Typography>
          {hours < 10 ? `0${hours}` : hours}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </Typography>
      );
    },
  },
  {
    id: "itemsPicked",
    headerName: "Items Picked",
    width: 140,
    headerAlignX: "center",
    alignX: "center",
    RenderCell: p => (
      <Typography>
        {p.row.shopItemsPicked +
          p.row.shopItemsAlted +
          p.row.meatItemsPicked +
          p.row.meatItemsAlted}
        /{p.row.totalShopItems + p.row.totalMeatItems}
      </Typography>
    ),
  },
  {
    id: "meatStatus",
    headerName: "Meat Status",
    width: 170,
    RenderCell: p =>
      p.row.meatStatus ? (
        <OrderStatusRenderer status={p.row.meatStatus} />
      ) : (
        <></>
      ),
  },
  {
    id: "meatPicker",
    headerName: "Meat Picker",
    width: 130,
    headerAlignX: "center",
    alignX: "center",
    RenderCell: p =>
      p.row.meatPicker ? (
        <NoteRenderer
          note={p.row.meatPicker.firstName + " " + p.row.meatPicker.lastName}
        >
          <Avatar src={p.row.meatPicker.profilePicture} />
        </NoteRenderer>
      ) : (
        <></>
      ),
  },
  {
    id: "meatTime",
    headerName: "Time Elapsed",
    width: 140,
    headerAlignX: "center",
    alignX: "center",
    RenderCell: p => {
      if (!p.row.meatStatus) return <></>;

      const hours = Math.floor(p.row.meatPickingTime / 3600);
      const minutes = Math.floor((p.row.meatPickingTime % 3600) / 60);
      const seconds = p.row.meatPickingTime % 60;

      return (
        <Typography>
          {hours < 10 ? `0${hours}` : hours}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </Typography>
      );
    },
  },
  {
    id: "method",
    headerName: "Delivery Method",
    width: 210,
    RenderCell: p => {
      return <Typography>{p.row.deliveryMethod}</Typography>;
    },
  },
];
