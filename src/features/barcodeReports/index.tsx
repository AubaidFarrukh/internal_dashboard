import { FC } from "react";
import { Stack } from "@mui/material";
import { PreviousBarcodeReports } from "./previousBarcodeReports";
import { PdfDisplay } from "../commons";
import {
  useGetAllBarcodeReportsQuery,
  useGetBarcodeReportByIdQuery,
} from "../../services/api";
import { useAppSelector } from "../../context/redux/hooks";
import {
  selectPageSize,
  selectCursor,
  selectDateRange,
  selectCurrentReport,
} from "./barcodeReportsSlice";

export const BarcodeReport: FC = () => {
  const pageSize = useAppSelector(selectPageSize);
  const cursor = useAppSelector(selectCursor);
  const { after, before } = useAppSelector(selectDateRange);
  const { data: reportsData } = useGetAllBarcodeReportsQuery({
    pageSize,
    cursor,
    after,
    before,
  });
  const currentReportId = useAppSelector(selectCurrentReport);
  const isMostRecent =
    !currentReportId ||
    (!before && currentReportId === reportsData?.reports?.[0]?.id);
  const {
    data: reportData,
    isLoading,
    isError,
  } = useGetBarcodeReportByIdQuery({ reportId: currentReportId ?? undefined });

  return (
    <Stack gap={3} mb={3}>
      <PdfDisplay
        content="Barcode Additions Report"
        report={reportData}
        isMostRecent={isMostRecent}
        isLoading={isLoading}
        isError={isError}
      />
      <PreviousBarcodeReports />
    </Stack>
  );
};

export default BarcodeReport;
