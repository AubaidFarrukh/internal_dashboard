import { useState } from "react";
import { Box, Tab, Tabs, IconButton, Paper, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { LoadingContent, LogDate } from "../commons";
import { useGetAuditByOrderIdQuery } from "../../services/api";
import { isoDateToTime } from "../../utils";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import type { TAuditItem, TAuditType } from "../../types/auditDetails";

export interface AuditLogsProps {
  orderNumber: number;
  sx?: SxProps<Theme>;
}

export const AuditLogs: FC<AuditLogsProps> = ({ orderNumber, sx }) => {
  const { isLoading, isFetching, data } = useGetAuditByOrderIdQuery({
    orderNumber,
  });
  const audits = (data?.Items ?? []) as TAuditItem[];

  const [currentAuditType, setCurrentAuditType] =
    useState<TAuditType>("dashboard");
  const filteredAudits = audits.filter((_) => _.auditType === currentAuditType);
  const handleChange = (e: React.SyntheticEvent, newValue: TAuditType) => {
    setCurrentAuditType(newValue);
  };

  const tabs = [
    { id: "shop", label: "Shop" },
    { id: "meat", label: "Meat" },
    { id: "driver", label: "Driver" },
    { id: "dashboard", label: "Dashboard" },
  ] as TAuditTab[];

  return (
    <Paper square sx={sx}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: (theme) => theme.palette.divider,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          p: (theme) => theme.spacing(2, 3, 1.5),
        }}
      >
        <Typography variant="h5" component="h2" fontWeight={600}>
          Audit Logs
        </Typography>
        <IconButton disabled={isLoading}>
          <EmailIcon sx={{ color: "#121212" }} />
        </IconButton>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentAuditType}
          onChange={handleChange}
          aria-label="audit-tabs"
        >
          {tabs.map((tab) => {
            return (
              <Tab
                key={tab.id}
                label={tab.label}
                value={tab.id}
                id={`audit-tab-${tab.id}`}
                aria-controls={`audit-tabpanel-${tab.id}`}
              />
            );
          })}
        </Tabs>
      </Box>
      <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
        {isLoading ? (
          <LoadingContent sx={{ py: 2 }} />
        ) : filteredAudits.length ? (
          <>
            {isFetching ? <LoadingContent sx={{ py: 2 }} /> : null}
            <AuditsList audits={filteredAudits} />
          </>
        ) : (
          <NoAuditsLogs auditType={currentAuditType} />
        )}
      </Box>
    </Paper>
  );
};

const NoAuditsLogs = ({ auditType }: { auditType: TAuditType }) => (
  <Box py={2} px={3}>
    <Typography>No logs available for {auditType}.</Typography>
  </Box>
);

const AuditsList = ({ audits }: { audits: TAuditItem[] }) => {
  let lastLogDate = "";
  let isLastDateChanged = false;

  return (
    <>
      {audits.map((audit, i) => {
        let logDate = new Date(audit.datetime).toDateString();
        if (logDate !== lastLogDate) {
          lastLogDate = logDate;
          isLastDateChanged = true;
        } else {
          isLastDateChanged = false;
        }

        return (
          <Box key={audit.auditId}>
            {isLastDateChanged ? <LogDate logDate={logDate} /> : null}
            <Box
              sx={{
                display: "flex",
                bgcolor: (theme) =>
                  i % 2 === 1
                    ? theme.palette.background.paper
                    : theme.palette.grey[100],
                p: (t) => t.spacing(0.75, 2),
                cursor: "pointer",
                "&:hover": { bgcolor: (t) => t.palette.primary.light },
              }}
            >
              <Typography sx={{ flexBasis: "80%", mr: 1 }}>
                {audit.comment}
              </Typography>
              <Typography>{isoDateToTime(audit.datetime)}</Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default AuditLogs;

type TAuditTab = {
  id: TAuditType;
  label: string;
};
