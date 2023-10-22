import { FC } from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
// import { SimpleTimeLineItem } from "./simpleTimelineItem";
import { isoDateToTime } from "../../utils";
import type { TPhotoItem } from "../../types/auditDetails";

export interface BoxedTimeLineItemProps {
  audit: TPhotoItem;
  isLast: boolean;
  showDate?: boolean;
}

export const BoxedTimeLineItem: FC<BoxedTimeLineItemProps> = ({
  audit,
  isLast,
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
  const boxedAuditActivities = ["Order(s) Placed on Hold", "Order(s) Released"];

  const handleAvatar = () => {
    window.open(audit.url, "_blank");
  };

  return (
    <>
      <TimelineItem
        sx={{ mb: -3, mt: -2, width: "100%", position: "relative" }}
      >
        <TimelineSeparator>
          {!isLast && <TimelineConnector sx={{ ml: 0.7 }} />}
        </TimelineSeparator>
        <TimelineContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transform: "translateY(-40%)",
            position: "relative",
            p: 0,
          }}
        >
          {showDate ? (
            <Typography
              sx={{
                position: "absolute",
                mt: -7,
                ml: 2.7,
                p: t => t.spacing(0.1, 1.5),
                bgcolor: "#e8f0ff",
                color: "#737373",
              }}
            >
              {auditDate}
            </Typography>
          ) : null}
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              p: t => t.spacing(2, 3),
              ml: -4,
              mt: 12,
            }}
          >
            <Avatar
              onClick={handleAvatar}
              src={audit.url}
              alt={audit.username}
              sx={{ width: 70, height: 70, bgcolor: "maroon", mr: 2 }}
            />
            <Box sx={{ mr: 2 }}>
              <Typography sx={{ mb: 2 }}>
                <strong>{audit.username}</strong>
                {audit?.activity === boxedAuditActivities[0]
                  ? " has placed the order"
                  : " uploaded photo for Tote"}

                {audit?.activity === boxedAuditActivities[0]
                  ? " on hold."
                  : "."}
              </Typography>
            </Box>
            <Typography
              color="text.secondary"
              textAlign="right"
              sx={{ ml: "auto", width: "100px" }}
            >
              {isoDateToTime(audit.datetime)}
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </>
  );
};

export default BoxedTimeLineItem;
