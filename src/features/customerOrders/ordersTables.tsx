import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, styled, SxProps, Theme } from "@mui/material";
import { DataGrid, GridSelectionModel } from "@mui/x-data-grid";
import { ordersTableColumns } from "./ordersTableConfig";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  selectCursor,
  selectPage,
  selectPageSize,
  selectOrderNumber,
  selectHasMeat,
  selectDeliveryMethod,
  selectShopStatus,
  selectMeatStatus,
  selectDateRange,
  setCursor,
  setPage,
  setPageSize,
  selectSelectedOrders,
  setSelectedOrders,
} from "./ordersSlice";
import { setCurrentReport as setCurrentZReport } from "../zReports/zReportsSlice";
import {
  useGetAllOrdersQuery,
  useGetOrdersCountQuery,
} from "../../services/api";

export const OrdersTable: FC = () => {
  const cursor = useAppSelector(selectCursor);
  const page = useAppSelector(selectPage);
  const pageSize = useAppSelector(selectPageSize);
  const orderNumber = useAppSelector(selectOrderNumber);
  const hasMeat = useAppSelector(selectHasMeat);
  const deliveryMethod = useAppSelector(selectDeliveryMethod);
  const shopStatus = useAppSelector(selectShopStatus);
  const meatStatus = useAppSelector(selectMeatStatus);
  const { before, after } = useAppSelector(selectDateRange);
  const selectedOrders = useAppSelector(selectSelectedOrders);
  const {
    isLoading: loadingOrders,
    isFetching: fetchingOrders,
    data: ordersData,
  } = useGetAllOrdersQuery({
    cursor,
    pageSize,
    orderNumber,
    hasMeat,
    deliveryMethod,
    before,
    after,
    shopStatus,
    meatStatus,
  });
  const {
    isLoading: loadingCount,
    isFetching: fetchingCount,
    data: ordersCount,
  } = useGetOrdersCountQuery(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading =
    loadingOrders || fetchingOrders || loadingCount || fetchingCount;

  const onPageChange = (newPage: number) => {
    // We want to got to next page, but no more orders exist; so, do nothing.
    if (newPage > page && !ordersData?.cursor) return;

    // Change the page number.
    dispatch(setPage({ page: newPage }));

    // No need to save the cursor for next page if it doesn't exist.
    if (!ordersData?.cursor) return;
    dispatch(
      setCursor({
        cursor: ordersData.cursor,
        page: page + 1,
        pageSize,
        orderNumber,
        hasMeat,
        deliveryMethod,
        before,
        after,
        shopStatus,
        meatStatus,
      })
    );
  };

  const onPageSizeChange = (newPageSize: number) => {
    if (newPageSize !== pageSize) {
      dispatch(setPageSize({ pageSize: newPageSize }));
    }
  };

  const getRowsCount = () => {
    // Return the count unchanged if
    // 1. orderData is being fetched
    // 2. Or cursor for next page exists (as we don't know how may orders are there).
    if (!ordersData || ordersData.cursor) return ordersCount;

    // Now, we can calculate the orders count.
    return pageSize * page + ordersData.orders.length;
  };

  const onSelectionModelChange = (selectedOrders: GridSelectionModel) => {
    // @ts-ignore
    dispatch(setSelectedOrders({ selectedOrders }));
  };

  const ordersTableStyles: SxProps<Theme> = {
    height: "100%",
    "& .custom-table-styles": {
      backgroundColor: "#ffffff",
    },
    "& .custom-row-styles": {
      border: "black none 0px",
      cursor: "pointer",
      "& .order-cell": {
        // border: "none",
      },
    },
    [`& .order-status--Cancelled`]: {
      position: "relative",
      backgroundColor: theme => theme.palette.orderRow.cancelled.bgColor,
      color: theme => theme.palette.orderRow.cancelled.color,
    },
    [`& .order-status--Cancelled::after`]: {
      width: "98%",
      height: "1px",
      content: '" "',
      position: "absolute",
      backgroundColor: "rgba(0,0,0, 0.31)",
      transform: "translateX(1%)",
      top: "50%",
    },
    [`& .order-status--Fulfilled`]: {
      backgroundColor: theme => theme.palette.orderRow.delivered.bgColor,
      color: theme => theme.palette.orderRow.delivered.color,
    },
  };

  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

  return (
    <Box sx={ordersTableStyles}>
      <DataGrid
        loading={loading}
        columns={ordersTableColumns}
        rows={ordersData ? ordersData.orders : []}
        rowCount={getRowsCount() ?? 0}
        pagination
        paginationMode="server"
        page={page}
        onPageChange={onPageChange}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        disableSelectionOnClick
        checkboxSelection
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={selectedOrders}
        onCellClick={({ id, field, formattedValue }) => {
          if (field === "__check__") {
            // Do nothing
          } else if (field === "orderNote" && Boolean(formattedValue)) {
            // Do nothing
          } else if (field === "zReport" && Boolean(formattedValue)) {
            const reportId = formattedValue;
            dispatch(setCurrentZReport({ currentReport: reportId }));
            navigate(`/daily-z-report`);
          } else {
            navigate(`/orders/${id}`);
          }
        }}
        className="custom-table-styles"
        rowHeight={60}
        autoHeight
        getRowClassName={p => {
          let classNames = ["custom-row-styles"];
          if (
            ["Cancelled", null].includes(p.row.shopStatus) &&
            ["Cancelled", null].includes(p.row.meatStatus)
          ) {
            classNames.push(`order-status--Cancelled`);
          }
          if (
            ["Fulfilled", null].includes(p.row.shopStatus) &&
            ["Fulfilled", null].includes(p.row.meatStatus)
          ) {
            classNames.push(`order-status--Fulfilled`);
          }
          return classNames.join(" ");
        }}
        getCellClassName={_ => "order-cell"}
        disableColumnMenu
      />
      <Offset />
      <Offset />
    </Box>
  );
};

export default OrdersTable;
