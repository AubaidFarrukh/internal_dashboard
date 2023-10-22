import { Box, Paper, Typography } from "@mui/material";
import { LoadingContent, LogDate } from "../commons";
import { useGetAllChangeLogsQuery } from "../../services/api";
import { isoDateToTime } from "../../utils";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import { TProductChangelog } from "../../types/productDetails";

export interface ChangeLogsProps {
  variantId: number;
  sx?: SxProps<Theme>;
}

export const ChangeLogs: FC<ChangeLogsProps> = ({ variantId, sx }) => {
  const { isLoading, isFetching, data } = useGetAllChangeLogsQuery({
    variantId,
  });
  const logs = data?.logs ?? [];

  return (
    <Paper square sx={sx}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: theme => theme.palette.divider,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          p: theme => theme.spacing(2, 3, 1.5),
        }}
      >
        <Typography variant="h5" component="h2" fontWeight={600}>
          Change Logs
        </Typography>
      </Box>
      <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
        {isLoading ? (
          <LoadingContent sx={{ py: 2 }} />
        ) : logs.length ? (
          <>
            {isFetching ? <LoadingContent sx={{ py: 2 }} /> : null}
            <LogsList logs={logs} />
          </>
        ) : (
          <NoLogs />
        )}
      </Box>
    </Paper>
  );
};

const NoLogs = () => (
  <Box py={2} px={3}>
    <Typography>No change logs available.</Typography>
  </Box>
);

const LogsList = ({ logs }: { logs: TProductChangelog[] }) => {
  let lastLogDate = "";
  let isLastDateChanged = false;

  return (
    <>
      {logs.map((log, i) => {
        let logDate = new Date(log.datetime).toDateString();
        if (logDate !== lastLogDate) {
          lastLogDate = logDate;
          isLastDateChanged = true;
        } else {
          isLastDateChanged = false;
        }

        return (
          <Box key={log.id}>
            {isLastDateChanged ? <LogDate logDate={logDate} /> : null}
            <Box
              sx={{
                display: "flex",
                bgcolor: theme =>
                  i % 2 === 1
                    ? theme.palette.background.paper
                    : theme.palette.grey[100],
                p: t => t.spacing(0.75, 2),
                cursor: "pointer",
                "&:hover": { bgcolor: t => t.palette.primary.light },
              }}
            >
              <Typography sx={{ flexBasis: "80%", mr: 1 }}>
                {log.comment}
              </Typography>
              <Typography>{isoDateToTime(log.datetime)}</Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default ChangeLogs;
