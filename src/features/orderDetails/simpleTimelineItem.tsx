import { FC } from "react";
import { Box, Typography } from "@mui/material";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { isoDateToTime } from "../../utils";
import type { TAuditItem } from "../../types/auditDetails";

export interface SimpleTimeLineItemProps {
  audit: TAuditItem;
  isLast: boolean;
  showActivity?: boolean;
  showDate?: boolean;
}

export const SimpleTimeLineItem: FC<SimpleTimeLineItemProps> = ({
  audit,
  isLast,
  showActivity = false,
  showDate = true,
}) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  let auditDate = new Date(audit.datetime).toDateString();
  if (today.toDateString() === auditDate) {
    auditDate = "Today";
  } else if (yesterday.toDateString() === auditDate) {
    auditDate = "Yesterday";
  }

  return (
    <TimelineItem sx={{ position: "relative" }}>
      <TimelineSeparator>
        <TimelineDot variant="outlined" classes={{ root: "dot" }} />
        {!isLast && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transform: "translateY(-40%)",
        }}
      >
        {showDate ? (
          <Typography
            sx={{
              position: "absolute",
              mt: -9,
              p: t => t.spacing(0.1, 1.5),
              bgcolor: "#e8f0ff",
              color: "#737373",
            }}
          >
            {auditDate}
          </Typography>
        ) : null}
        <Box display="flex" justifyContent="space-between" width="100%" pr={4}>
          <Typography>
            {showActivity ? audit.activity : audit.comment}
          </Typography>
          <Typography color="gray" width="100px" textAlign="right">
            {isoDateToTime(audit.datetime)}
          </Typography>
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};

export default SimpleTimeLineItem;
