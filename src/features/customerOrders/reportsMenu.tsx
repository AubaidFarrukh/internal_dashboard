import { FC, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import {
  CustomModal,
  DateRangePicker,
  DateRangePickerProps,
  OrderStatusRenderer,
  ReportIcon,
} from "../commons";
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
  selectSelectedOrders,
  setSelectedOrders,
} from "./ordersSlice";
import { setCurrentReport as setCurrentZReport } from "../zReports/zReportsSlice";
import { setCurrentReport as setCurrentNotGiven } from "../notGiven/notGivenReportsSlice";
import { setCurrentReport as setCurrentBarcodeReport } from "../barcodeReports/barcodeReportsSlice";
import { selectCurrentUser } from "../../services/auth";
import { setMessage } from "../layout/layoutSlice";
import {
  useGetAllOrdersQuery,
  useCreateZReportMutation,
  useCreateNotGivenReportMutation,
  useCreateBarcodeReportMutation,
} from "../../services/api";
import type { TShopStatus } from "../../types/orders";

export interface ReportsMenuProps {
  buttonStyles: SxProps<Theme>;
}

export const ReportsMenu: FC<ReportsMenuProps> = ({ buttonStyles }) => {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const cursor = useAppSelector(selectCursor);
  const pageSize = useAppSelector(selectPageSize);
  const orderNumber = useAppSelector(selectOrderNumber);
  const hasMeat = useAppSelector(selectHasMeat);
  const deliveryMethod = useAppSelector(selectDeliveryMethod);
  const { before, after } = useAppSelector(selectDateRange);
  const shopStatus = useAppSelector(selectShopStatus);
  const meatStatus = useAppSelector(selectMeatStatus);
  const selectedOrders = useAppSelector(selectSelectedOrders);
  const currentUser = useAppSelector(selectCurrentUser);

  // Orders data
  const { data } = useGetAllOrdersQuery({
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

  // Menu controls
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(menuAnchor);
  const openFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setMenuAnchor(event.currentTarget);
  const closeFilterMenu = () => setMenuAnchor(null);

  // Validation error
  const [reportError, setReportError] = useState<
    string | ReactNode | undefined
  >(undefined);

  // Modal controls
  const validateOrdersForReportGeneration = (
    reportType: "z-report" | "not-given"
  ) => {
    const REPORTABLE_STATUSES: (TShopStatus | null)[] = [
      null,
      "Ready for delivery",
      "Ready for collection",
      "Dispatched",
      "Fulfilled",
    ];

    if (!data) return;
    const orders = data.orders;

    let error = undefined;
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];

      if (!selectedOrders.includes(order.id)) continue;

      if (!REPORTABLE_STATUSES.includes(order.shopStatus)) {
        error = (
          <Typography sx={{ lineHeight: 2.2 }}>
            Order {order.id} has status{" "}
            {<OrderStatusRenderer status={order.shopStatus} />}. Must be one of{" "}
            {<OrderStatusRenderer status="Ready for delivery" />},{" "}
            {<OrderStatusRenderer status="Ready for collection" />},{" "}
            {<OrderStatusRenderer status="Dispatched" />} or{" "}
            {<OrderStatusRenderer status="Fulfilled" />}.
          </Typography>
        );
        break;
      }
      if (reportType === "z-report" && order.zReport) {
        error = `Z report has already been generated for order ${order.id}.`;
        break;
      }
      if (reportType === "not-given" && order.notGivenReport) {
        error = `Not-given report has already been generated for order ${order.id}.`;
        break;
      }
    }

    return error;
  };

  // Z Report
  const [showGenerateZReportModal, setShowGenerateZReportModal] =
    useState(false);
  const [generateZReport, { isLoading: generatingZReport }] =
    useCreateZReportMutation();

  const openGenerateZReportModal = () => {
    setShowGenerateZReportModal(true);
    setMenuAnchor(null);
    const error = validateOrdersForReportGeneration("z-report");
    setReportError(error);
  };

  const handleGeneratingZReport = async () => {
    // Z report is already being generated or has been generated successfully.
    if (generatingZReport) return;

    if (!currentUser) {
      dispatch(
        setMessage({ success: false, message: "You are not signed in." })
      );
      return;
    }

    try {
      await generateZReport({
        orderNumbers: selectedOrders,
        username: currentUser.username,
      });
      dispatch(setSelectedOrders({ selectedOrders: [] }));
      dispatch(setCurrentZReport({ currentReport: null }));
      navigateTo(`/daily-z-report`);
    } catch (error) {
      console.log(`Error: ${JSON.stringify(error)}`);
    } finally {
      setShowGenerateZReportModal(false);
    }
  };

  const handleCancelGeneratingZReport = () => {
    if (generatingZReport) return;
    setShowGenerateZReportModal(false);
  };

  // Not-given report
  const [showNotGivenModal, setShowNotGivenModal] = useState(false);
  const [generateNotGivenReport, { isLoading: generatingNotGivenReport }] =
    useCreateNotGivenReportMutation();

  const openGenerateNotGivenModal = () => {
    setShowNotGivenModal(true);
    setMenuAnchor(null);
    const error = validateOrdersForReportGeneration("not-given");
    setReportError(error);
  };

  const handleGeneratingNotGiven = async () => {
    // Not-given report is already being generated or has been generated successfully.
    if (generatingNotGivenReport) return;

    if (!currentUser) {
      dispatch(
        setMessage({ success: false, message: "You are not signed in." })
      );
      return;
    }

    try {
      await generateNotGivenReport({
        orderNumbers: selectedOrders,
        username: currentUser.username,
      });
      dispatch(setSelectedOrders({ selectedOrders: [] }));
      dispatch(setCurrentNotGiven({ currentReport: null }));
      navigateTo(`/not-given-reports`);
    } catch (error) {
      console.log(`Error: ${JSON.stringify(error)}`);
    } finally {
      setShowNotGivenModal(false);
    }
  };

  const handleCancelGeneratingNotGiven = () => {
    if (generatingNotGivenReport) return;
    setShowNotGivenModal(false);
  };

  // Barcode report generation.
  const [generateBarcodeReport, { isLoading: generatingBarcodeReport }] =
    useCreateBarcodeReportMutation();
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const openDateRangePicker = () => setShowDateRangePicker(true);
  const closeDateRangePicker = () => setShowDateRangePicker(false);
  const handleGenerateBarcodeReport: DateRangePickerProps["updateDateRange"] =
    async (start, end) => {
      const after = start ? start.unix() * 1000 : null;
      const before = end ? end.unix() * 1000 : null;
      const data = { startDate: after, endDate: before };
      try {
        await generateBarcodeReport(data);
        dispatch(setCurrentBarcodeReport({ currentReport: null }));
        navigateTo(`/barcode-addition-reports`);
      } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
      } finally {
        closeDateRangePicker();
        setMenuAnchor(null);
      }
    };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        id="filter-button"
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={openFilterMenu}
        title="Generate audit reports."
        sx={{ ...buttonStyles }}
      >
        <ReportIcon color="white" />
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={menuAnchor}
        open={open}
        onClose={closeFilterMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        <MenuItem
          onClick={openGenerateZReportModal}
          disabled={!selectedOrders.length}
        >
          Generate Z-Report
        </MenuItem>
        <MenuItem
          onClick={openGenerateNotGivenModal}
          disabled={!selectedOrders.length}
        >
          Generate Not-Given Report
        </MenuItem>

        <MenuItem onClick={openDateRangePicker}>
          Generate Barcode Report
        </MenuItem>
      </Menu>

      <CustomModal
        open={showGenerateZReportModal}
        title={"Generate Z Report"}
        description={`Generate Z Report for order number(s): ${selectedOrders.join(
          ", "
        )}`}
        confirmText="Generate"
        actionText="Generating"
        cancelText="Cancel"
        loading={generatingZReport}
        error={reportError}
        handleConfirmation={handleGeneratingZReport}
        handleCancel={handleCancelGeneratingZReport}
        sx={{ minWidth: 515 }}
      />

      <CustomModal
        open={showNotGivenModal}
        title={"Generate Not-Given Report"}
        description={`Generate Not-Given Report for order number(s): ${selectedOrders.join(
          ", "
        )}`}
        confirmText="Generate"
        actionText="Generating"
        cancelText="Cancel"
        loading={generatingNotGivenReport}
        error={reportError}
        handleConfirmation={handleGeneratingNotGiven}
        handleCancel={handleCancelGeneratingNotGiven}
        sx={{ minWidth: 510 }}
      />

      {showDateRangePicker && (
        <DateRangePicker
          start={null}
          end={null}
          isOpen={true}
          close={closeDateRangePicker}
          updateDateRange={handleGenerateBarcodeReport}
          isLoading={generatingBarcodeReport}
          confirmButtonText="Generate"
          anchorEl={menuAnchor}
          disableFuture
          hideClearButton
          popoverId="date-range-picker-popover"
        />
      )}
    </>
  );
};

export default ReportsMenu;
