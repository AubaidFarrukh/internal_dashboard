import { FC, useMemo, useRef, useState } from "react";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { saveAs } from "file-saver";
import { NotFound } from "./notFound";
import { LoadingContent } from "./loadingContent";
import { base64ToBlob, blobToDataUrl } from "../../utils";
import type { TReportWithBlob } from "../../types/zReports";

export interface PdfDisplayProps {
  content: "Z Report" | "Not Given Report" | "Barcode Additions Report";
  report: TReportWithBlob | undefined;
  isMostRecent: boolean;
  isLoading: boolean;
  isError?: boolean;
}

export const PdfDisplay: FC<PdfDisplayProps> = ({
  content,
  report,
  isMostRecent,
  isLoading,
  isError,
}) => {
  const theme = useTheme();
  const [showActions, setShowActions] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const reportBlob = report
    ? base64ToBlob(report.base64, "application/pdf")
    : undefined;
  const src = reportBlob ? blobToDataUrl(reportBlob) : undefined;
  useMemo(() => src, [src]);

  const dowloadFile = () => {
    report && reportBlob && saveAs(reportBlob, `${report!.displayName}.pdf`);
  };

  const printReport = async () => {
    iframeRef.current?.contentWindow?.print();
  };

  return (
    <>
      <Typography variant="h6" component="h3">
        {isMostRecent && !isLoading ? "Most Recent: " : ""}
        {report?.displayName}
      </Typography>
      <Box
        sx={{
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: 1,
          minHeight: "200px",
        }}
      >
        {isLoading || isError || !src ? (
          <Box sx={{ width: "100%", height: 300 }}>
            {isLoading ? <LoadingContent /> : null}
            {isError || !src ? <NotFound message="No Reports found." /> : null}
          </Box>
        ) : (
          <iframe
            src={src}
            ref={iframeRef}
            width="100%"
            height="700px"
            name={report?.displayName}
            title={report?.displayName}
            onError={() => setShowActions(false)}
            onLoad={() => setShowActions(true)}
          />
        )}
        {showActions ? (
          <>
            <Divider variant="fullWidth" orientation="horizontal" />
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              px={5}
              py={2}
            >
              <Button
                onClick={dowloadFile}
                disabled={!src}
                variant="contained"
                title="Download"
                sx={{ mr: 1 }}
              >
                <DownloadIcon />
              </Button>
              <Button
                disabled={!src}
                onClick={printReport}
                variant="contained"
                title="Print"
                sx={{ mr: 1 }}
              >
                <PrintIcon />
              </Button>
              <a
                href={`mailto:?subject=${report?.displayName}&body=Please, attach the ${content} manually.`}
              >
                <Button variant="contained" title="Email">
                  <AttachEmailIcon />
                </Button>
              </a>
            </Box>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default PdfDisplay;
