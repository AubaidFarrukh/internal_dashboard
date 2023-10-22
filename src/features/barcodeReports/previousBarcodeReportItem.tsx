import { FC, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import { saveAs } from "file-saver";
import { useAppDispatch } from "../../context/redux/hooks";
import { useLazyGetZReportByIdQuery } from "../../services/api";
import { setCurrentReport } from "./barcodeReportsSlice";
import { base64ToBlob, base64ToDataUrl, sleep } from "../../utils";
import type { TReport } from "../../types/zReports";

export interface PreviousZReportItemProps {
  zReport: TReport;
  sx?: SxProps<Theme>;
}

export const PreviousZReportItem: FC<PreviousZReportItemProps> = ({
  zReport,
  sx,
}) => {
  const dispatch = useAppDispatch();
  const [getReportById] = useLazyGetZReportByIdQuery();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [downloadingReport, setDownloadingReport] = useState(false);
  const [printingReport, setPrintingReport] = useState(false);

  const onClickReport = () => {
    dispatch(setCurrentReport({ currentReport: zReport.id }));
  };

  const downloadReport = async () => {
    setDownloadingReport(true);
    try {
      const report = await getReportById({ reportId: zReport.id }).unwrap();
      const reportBlob = base64ToBlob(report.base64, "application/pdf");
      saveAs(reportBlob, `${zReport.displayName}.pdf`);
    } catch (error) {
      console.log(error);
    } finally {
      setDownloadingReport(false);
    }
  };

  const printReport = async () => {
    setPrintingReport(true);
    try {
      const report = await getReportById({ reportId: zReport.id }).unwrap();
      const src = base64ToDataUrl(report.base64, "application/pdf");
      if (!iframeRef.current) return;
      iframeRef.current.src = src;
      await sleep(500);
      iframeRef.current.contentWindow?.print();
    } catch (error) {
      console.log(error);
    } finally {
      setPrintingReport(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" sx={{ pr: 5, ...sx }}>
      <div onClick={() => onClickReport()} style={{ flexGrow: 1 }}>
        <Typography
          sx={{
            py: 1.5,
            pl: 5,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {zReport.displayName}
        </Typography>
      </div>
      <IconButton onClick={downloadReport} disabled={downloadingReport}>
        {downloadingReport ? (
          <CircularProgress size="1.5rem" />
        ) : (
          <DownloadIcon />
        )}
      </IconButton>
      <IconButton onClick={printReport} disabled={printingReport}>
        {printingReport ? <CircularProgress size="1.5rem" /> : <PrintIcon />}
      </IconButton>
      <iframe
        style={{ display: "none" }}
        title={zReport.displayName}
        ref={iframeRef}
      />
    </Box>
  );
};

export default PreviousZReportItem;
