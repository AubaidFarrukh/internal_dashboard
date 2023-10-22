import { Box, Divider, Typography } from "@mui/material";
import { Timeline, timelineItemClasses } from "@mui/lab";
import { SimpleTimeLineItem } from "./simpleTimelineItem";
import { BoxedTimeLineItem } from "./boxedTimelineItem";
import { LoadingContent } from "../commons";
import {
  useGetAuditByOrderIdQuery,
  useGetPhotoByOrderIdQuery,
} from "../../services/api";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";

interface TimeLineProps {
  orderNumber: number;
  sx?: SxProps<Theme>;
}

export const TimeLine: FC<TimeLineProps> = ({ orderNumber, sx }) => {
  const {
    isLoading: isLoadingAudits,
    isFetching: isFetchingAudits,
    data,
  } = useGetAuditByOrderIdQuery({ orderNumber });
  const {
    isLoading: isLoadingPhotos,
    isFetching: isFetchingPhotos,
    data: photos,
  } = useGetPhotoByOrderIdQuery({ orderNumber });

  const statusFilters = [
    "Order assigned",
    "Status update",
    "completed",
    "not given",
    "fetched",
  ];
  const audits = ((data?.Items ?? []) as any[])
    .filter(audit => {
      let isToBeShown = false;
      for (let iii = 0; iii < statusFilters.length; iii++) {
        const statusFilter = statusFilters[iii];
        if (audit.activity.includes(statusFilter)) {
          isToBeShown = true;
          break;
        }
      }
      return isToBeShown;
    })
    .concat(photos?.Items ?? [])
    .sort(
      (a: any, b: any) =>
        new Date(b.datetime).valueOf() - new Date(a.datetime).valueOf()
    );
  const auditsCount = audits.length;
  const isLoading = isLoadingAudits || isLoadingPhotos;
  const isFetching = isFetchingAudits || isFetchingPhotos;

  const NoTimelineLogs = () => (
    <Box px={3}>
      <Typography>No timeline data available.</Typography>
    </Box>
  );

  const TimeLineItems = () => {
    let lastAuditDate = "";
    let isLastAuditDateChanged = false;

    return (
      <>
        {audits.map((audit, i) => {
          let auditDate = new Date(audit.datetime).toDateString();
          const isLast = i === auditsCount - 1;

          if (auditDate !== lastAuditDate) {
            lastAuditDate = auditDate;
            isLastAuditDateChanged = true;
          } else {
            isLastAuditDateChanged = false;
          }

          return !audit?.hasOwnProperty?.("url") ? (
            <SimpleTimeLineItem
              key={audit.auditId}
              audit={audit}
              isLast={isLast}
              showDate={isLastAuditDateChanged}
            />
          ) : (
            <BoxedTimeLineItem
              key={audit.auditId}
              audit={audit}
              isLast={isLast}
              showDate={isLastAuditDateChanged}
            />
          );
        })}
      </>
    );
  };

  return (
    <Box sx={sx}>
      <Box display="flex" alignItems="center">
        <Typography variant="h5" component="h2">
          Timeline
        </Typography>
        {isFetching ? (
          <LoadingContent size={25} sx={{ width: 40, ml: 2 }} />
        ) : null}
      </Box>
      <Divider
        variant="fullWidth"
        orientation="horizontal"
        sx={{ mt: 2, mb: audits.length ? 7 : 4 }}
      />
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          "& .dot": {
            margin: 0,
            borderColor: "#4191f2",
            bgcolor: "#fafafa",
          },
        }}
      >
        {isLoading ? (
          <LoadingContent />
        ) : audits.length ? (
          <TimeLineItems />
        ) : (
          <NoTimelineLogs />
        )}
      </Timeline>
    </Box>
  );
};

export default TimeLine;
