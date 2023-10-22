import { FC } from "react";
import { Stack } from "@mui/material";
import { PreviousNotGivenReports } from "./previousNotGivenReports";
import { PdfDisplay } from "../commons";
import {
  useGetAllNotGivenReportsQuery,
  useGetNotGivenReportByIdQuery,
} from "../../services/api";
import { useAppSelector } from "../../context/redux/hooks";
import {
  selectPageSize,
  selectCursor,
  selectDateRange,
  selectCurrentReport,
} from "./notGivenReportsSlice";

export const NotGivenReports: FC = () => {
  const pageSize = useAppSelector(selectPageSize);
  const cursor = useAppSelector(selectCursor);
  const { after, before } = useAppSelector(selectDateRange);
  const { data: reportsData } = useGetAllNotGivenReportsQuery({
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
  } = useGetNotGivenReportByIdQuery({ reportId: currentReportId ?? undefined });

  return (
    <Stack gap={3} mb={3}>
      <PdfDisplay
        content="Z Report"
        report={reportData}
        isMostRecent={isMostRecent}
        isLoading={isLoading}
        isError={isError}
      />
      <PreviousNotGivenReports />
    </Stack>
  );
};

export default NotGivenReports;
