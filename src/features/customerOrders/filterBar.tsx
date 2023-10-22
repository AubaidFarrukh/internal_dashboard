import { FC, useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { OrderSearchBar } from "./orderSearchBar";
import { DateRangeFilter } from "./dateRangeFilter";
import { FilterMenu } from "./filterMenu";
import { AppliedFiltersList } from "./appliedFiltersList";
import { ReportsMenu } from "./reportsMenu";
import { IsFetching, RefreshButton } from "../commons";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectCursor,
  selectPageSize,
  selectOrderNumber,
  selectHasMeat,
  selectDeliveryMethod,
  selectDateRange,
  selectShopStatus,
  selectMeatStatus,
  refresh as refreshAction,
} from "./ordersSlice";
import { useGetAllOrdersQuery, invalidateTags } from "../../services/api";
import type { TOrderNumber } from "../../types/orders";

export const FilterBar: FC = () => {
  const dispatch = useAppDispatch();

  // State
  const cursor = useAppSelector(selectCursor);
  const pageSize = useAppSelector(selectPageSize);
  const orderNumber = useAppSelector(selectOrderNumber);
  const hasMeat = useAppSelector(selectHasMeat);
  const deliveryMethod = useAppSelector(selectDeliveryMethod);
  const { before, after } = useAppSelector(selectDateRange);
  const shopStatus = useAppSelector(selectShopStatus);
  const meatStatus = useAppSelector(selectMeatStatus);

  // Query status
  const { isLoading, isFetching } = useGetAllOrdersQuery({
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
  const loading = isLoading || isFetching;

  const refresh = () => {
    dispatch(refreshAction());
    dispatch(invalidateTags([{ type: "Orders" as const, id: "LIST" }]));
  };

  // Local state for order number filter.
  const [orderNumberLocal, setOrderNumberLocal] = useState<TOrderNumber | null>(
    orderNumber
  );
  const resetOrderNumberFilterLocal = () => setOrderNumberLocal(null);

  const buttonsCommonStyles: SxProps<Theme> = {
    display: "flex",
    alignItems: "stretch",
    mr: theme => theme.spacing(1),
    textTransform: "capitalize",
    width: "fit-content",
    "&": { alignItems: "center" },
  };

  return (
    <Box display="flex" flexDirection="column" m={0} p={0}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 2, overflow: "visible" }}
      >
        <OrderSearchBar
          orderNumberLocal={orderNumberLocal}
          setOrderNumberLocal={setOrderNumberLocal}
          sx={buttonsCommonStyles}
        />
        <DateRangeFilter sx={buttonsCommonStyles} />
        <FilterMenu sx={buttonsCommonStyles} />
        <ReportsMenu />
        <IsFetching loading={loading} sx={{ ...buttonsCommonStyles, ml: 2 }} />
        <RefreshButton
          onClick={refresh}
          loading={isFetching}
          sx={{ ...buttonsCommonStyles, mr: 0, ml: "auto" }}
        />
      </Box>
      <AppliedFiltersList
        resetOrderNumberFilterLocal={resetOrderNumberFilterLocal}
      />
    </Box>
  );
};

export default FilterBar;
