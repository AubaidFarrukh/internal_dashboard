import { FC } from "react";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import { AppliedFilter } from "../commons";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectSelectedOrders,
  setSelectedOrders,
  selectOrderNumber,
  selectDateRange,
  selectDeliveryMethod,
  selectHasMeat,
  selectShopStatus,
  selectMeatStatus,
  setOrderNumber,
  setDateRange,
  setDeliveryMethod,
  setHasMeat,
  setShopStatus,
  setMeatStatus,
} from "./ordersSlice";

interface AppliedFiltersListProps {
  resetOrderNumberFilterLocal: () => void;
}

export const AppliedFiltersList: FC<AppliedFiltersListProps> = ({
  resetOrderNumberFilterLocal,
}) => {
  const dispatch = useAppDispatch();
  const orderNumber = useAppSelector(selectOrderNumber);
  const { after, before } = useAppSelector(selectDateRange);
  const deliveryMethod = useAppSelector(selectDeliveryMethod);
  const hasMeat = useAppSelector(selectHasMeat);
  const shopStatus = useAppSelector(selectShopStatus);
  const meatStatus = useAppSelector(selectMeatStatus);
  const selectedOrders = useAppSelector(selectSelectedOrders);

  const afterDate = after ? dayjs(after * 1000).format("MMM DD, YYYY") : null;
  const beforeDate = before
    ? dayjs(before * 1000).format("MMM DD, YYYY")
    : null;
  const hasOrderNumberFilter = Boolean(orderNumber);
  const hasDateRangeFilter = Boolean(after) && Boolean(before);
  const hasDeliveryMethodFilter = Boolean(deliveryMethod);
  const hasMeatFilter = hasMeat !== null;
  const hasShopStatusFilter = Boolean(shopStatus);
  const hasMeatStatusFilter = Boolean(meatStatus);
  const hasAnyFilter =
    hasOrderNumberFilter ||
    hasDateRangeFilter ||
    hasDeliveryMethodFilter ||
    hasMeatFilter ||
    hasShopStatusFilter ||
    hasMeatStatusFilter;
  const hasSelectedOrders = Boolean(selectedOrders.length);

  const unselectAllOrders = () => {
    dispatch(setSelectedOrders({ selectedOrders: [] }));
  };

  const removeOrderNumberFilter = () => {
    resetOrderNumberFilterLocal();
    dispatch(setOrderNumber({ orderNumber: null }));
  };

  const removeDateRangeFilter = () => {
    dispatch(setDateRange({ before: null, after: null }));
  };

  const removeDeliveryMethodFilter = () => {
    dispatch(setDeliveryMethod({ deliveryMethod: null }));
  };

  const removeHasMeatFilter = () => {
    dispatch(setHasMeat({ hasMeat: null }));
  };

  const removeShopStatusFilter = () => {
    dispatch(setShopStatus({ shopStatus: null }));
  };

  const removeMeatStatusFilter = () => {
    dispatch(setMeatStatus({ meatStatus: null }));
  };

  return (
    <Stack direction="row" mb={hasAnyFilter ? 3 : 1}>
      {hasSelectedOrders && (
        <AppliedFilter
          title={`${selectedOrders.length} Selected`}
          onClick={unselectAllOrders}
          tooltip="Unselect all orders."
        />
      )}
      {hasOrderNumberFilter ? (
        <AppliedFilter
          title={`#SC${orderNumber}`}
          onClick={removeOrderNumberFilter}
          tooltip="Remove order number filter."
        />
      ) : null}
      {hasDateRangeFilter ? (
        <AppliedFilter
          title={
            afterDate === beforeDate
              ? `Date: ${afterDate}`
              : `Between: ${afterDate} and ${beforeDate}`
          }
          onClick={removeDateRangeFilter}
          tooltip="Remove date range filter."
        />
      ) : null}
      {hasDeliveryMethodFilter ? (
        <AppliedFilter
          title={
            deliveryMethod === "SaveCo Bradford"
              ? "Local Pickup"
              : deliveryMethod!
          }
          onClick={removeDeliveryMethodFilter}
          tooltip="Remove delivery method filter."
        />
      ) : null}
      {hasMeatFilter ? (
        <AppliedFilter
          title="Contains Meat"
          onClick={removeHasMeatFilter}
          tooltip="Remove meat filter."
        />
      ) : null}
      {hasShopStatusFilter ? (
        <AppliedFilter
          title={`Shop Status: ${shopStatus}`}
          onClick={removeShopStatusFilter}
          tooltip="Remove shop status filter."
        />
      ) : null}
      {hasMeatStatusFilter ? (
        <AppliedFilter
          title={`Meat Status: ${meatStatus}`}
          onClick={removeMeatStatusFilter}
          tooltip="Remove meat status filter."
        />
      ) : null}
    </Stack>
  );
};

export default AppliedFiltersList;
