import { FC } from "react";
import { Stack } from "@mui/material";
import { PreviousZReports } from "./previousZReports";
import { PdfDisplay } from "../commons";
import {
  useGetAllZReportsQuery,
  useGetZReportByIdQuery,
} from "../../services/api";
import { useAppSelector } from "../../context/redux/hooks";
import {
  selectPageSize,
  selectCursor,
  selectDateRange,
  selectCurrentReport,
} from "./zReportsSlice";

export const ZReports: FC = () => {
  const pageSize = useAppSelector(selectPageSize);
  const cursor = useAppSelector(selectCursor);
  const { after, before } = useAppSelector(selectDateRange);
  const { data: reportsData } = useGetAllZReportsQuery({
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
  } = useGetZReportByIdQuery({ reportId: currentReportId ?? undefined });

  return (
    <Stack gap={3} mb={3}>
      <PdfDisplay
        content="Z Report"
        report={reportData}
        isMostRecent={isMostRecent}
        isLoading={isLoading}
        isError={isError}
      />
      <PreviousZReports />
    </Stack>
  );
};

export default ZReports;
