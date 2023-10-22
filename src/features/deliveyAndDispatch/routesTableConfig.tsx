import { useNavigate } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import { DotIcon, RouteStatus } from "../commons";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { selectOpenRoute, setOpenRoute } from "./routesSlice";
import type { TColDef } from "../../types/table";
import type { TRoute } from "../../types/deliveryAndDispatch";
import { formatDate } from "../../utils";

export const routesTableConfig: TColDef<TRoute>[] = [
  {
    id: "openDetails",
    headerName: "",
    width: 20,
    alignX: "center",
    RenderCell: p => {
      const dispatch = useAppDispatch();
      const openRoute = useAppSelector(selectOpenRoute);
      const toggleOpenRoute = () => {
        dispatch(
          setOpenRoute({ openRoute: openRoute !== p.row.id ? p.row.id : null })
        );
      };
      return (
        <IconButton
          onClick={toggleOpenRoute}
          color="primary"
          size="small"
          sx={{ cursor: "pointer" }}
        >
          {openRoute === p.row.id ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )}
        </IconButton>
      );
    },
  },
  {
    id: "routeName",
    headerName: "Route Name",
    width: 250,
    RenderCell: p => <Typography>{p.row.routeName}</Typography>,
  },
  {
    id: "driver",
    headerName: "Driver",
    width: 200,
    RenderCell: p => (
      <Typography>
        {p.row.driver.firstName} {p.row.driver.lastName}
      </Typography>
    ),
  },
  {
    id: "orders",
    headerName: "Orders",
    width: 70,
    headerAlignX: "center",
    alignX: "center",
    RenderCell: p => <Typography>{p.row.orders.length}</Typography>,
  },
  {
    id: "van",
    headerName: "Van",
    width: 200,
    RenderCell: p => <Typography textAlign="center">{p.row.van}</Typography>,
  },
  {
    id: "status",
    headerName: "Status",
    width: 100,
    RenderCell: p => <RouteStatus status={p.row.status} />,
  },
  {
    id: "totes",
    headerName: "Totes",
    width: 100,
    alignX: "center",
    headerAlignX: "center",
    RenderCell: p => {
      const scannedTotesCount = p.row.orders.reduce(
        (s, order) =>
          s +
          order.totes.ambient.reduce((s, t) => s + Number(t.isLoaded), 0) +
          order.totes.chilled.reduce((s, t) => s + Number(t.isLoaded), 0) +
          order.totes.frozen.reduce((s, t) => s + Number(t.isLoaded), 0) +
          order.totes.bulk.reduce((s, t) => s + Number(t.isLoaded), 0) +
          order.totes.meat.reduce((s, t) => s + Number(t.isLoaded), 0),
        0
      );
      const totalTotes = p.row.orders.reduce(
        (s, order) =>
          s +
          order.totes.ambient.length +
          order.totes.chilled.length +
          order.totes.frozen.length +
          order.totes.bulk.length +
          order.totes.meat.length,
        0
      );
      return (
        <Typography>
          {scannedTotesCount}/{totalTotes}
        </Typography>
      );
    },
  },
  {
    id: "sendDate",
    headerName: "Send Date",
    width: 130,
    RenderCell: p => (
      <Typography>{formatDate(p.row.sendDate, "DD/MM/YYYY")}</Typography>
    ),
  },
  {
    id: "edit",
    headerName: "",
    width: 50,
    alignX: "center",
    RenderCell: p => {
      const navigateTo = useNavigate();
      const isDispatched = p.row.status === "Dispatched";
      const dateToday = formatDate("today", "YYYY/MM/DD");
      const dateYesterday = formatDate("yesterday", "YYYY/MM/DD");
      const isRecent = [dateToday, dateYesterday].includes(p.row.sendDate);
      const moveToEditPage = () => {
        navigateTo("edit-route", {
          state: {
            route: {
              ...p.row,
              orders: p.row.orders.map(_ => _.orderNumber),
            },
          },
        });
      };

      return isDispatched ? (
        isRecent ? (
          <DotIcon />
        ) : (
          <></>
        )
      ) : (
        <IconButton color="primary" size="small" onClick={moveToEditPage}>
          <EditIcon />
        </IconButton>
      );
    },
  },
];
