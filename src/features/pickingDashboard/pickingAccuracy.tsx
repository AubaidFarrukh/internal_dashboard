import type { FC } from "react";
import { Box, Paper, Typography, SxProps, Theme } from "@mui/material";
import { CircularProgressWithLabel, LightTooltip } from "../commons";
import { useGetOrdersOverviewQuery } from "../../services/api/pickingDashboard";
import { useAppSelector } from "../../context/redux/hooks";
import { selectDate, selectToDate } from "./pickingDashboardSlice";
import { getPickingProgressComments } from "./helperFunctions";

export interface PickingAccuracyProps {
  sx?: SxProps<Theme>;
}

export const PickingAccuracy: FC<PickingAccuracyProps> = ({ sx }) => {
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);
  const { data, isLoading } = useGetOrdersOverviewQuery({
    date,
    toDate: toDate ?? undefined,
  });
  const pickingAccuracy = data?.overviewData.pickingData.accuracy ?? 0;

  const { color, phrase, comment } = getPickingProgressComments(
    pickingAccuracy,
    date
  );

  return (
    <Paper
      square
      sx={{
        p: 3,
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...sx,
      }}
    >
      <LightTooltip title={DetailsTooltip}>
        <Typography
          variant="h6"
          component="h2"
          fontWeight={600}
          sx={{
            userSelect: "none",
            cursor: "pointer",
            display: "inline-block",
            width: "100%",
          }}
        >
          Picking Accuracy
        </Typography>
      </LightTooltip>
      <CircularProgressWithLabel
        value={pickingAccuracy}
        fillColor={color}
        isLoading={isLoading}
        size={150}
        labelFontSize="2rem"
        labelFontWeight={600}
        sx={{ my: "auto" }}
      />
      <Typography fontWeight={600} fontSize="2rem" mb={1.5}>
        {phrase}
      </Typography>
      <Typography textAlign="center">{comment}</Typography>
    </Paper>
  );
};

const DetailsTooltip = (
  <Box p={0.25}>
    <Box display="flex" alignItems="center" mb={1}>
      <Box display="flex" flexDirection="column" mr={0.5}>
        <Typography variant="subtitle2" lineHeight={1.2} component="span">
          Picking
        </Typography>
        <Typography variant="subtitle2" lineHeight={1.2} component="span">
          Accuracy
        </Typography>
      </Box>
      <Typography variant="subtitle2" mr={0.5} component="span">
        =
      </Typography>
      <Box display="flex" flexDirection="column" mr={0.5}>
        <Typography
          variant="subtitle2"
          textAlign="center"
          component="span"
          width="100%"
          px={0.5}
          borderBottom={1}
          borderColor="black"
        >
          Total Successful Picks
        </Typography>
        <Typography variant="subtitle2" mx="auto" component="span">
          Total Picks Made Today
        </Typography>
      </Box>
      <Typography variant="subtitle2" component="span">
        x 100
      </Typography>
    </Box>
    <Typography
      variant="body2"
      color="text.secondary"
      textAlign="justify"
      component="p"
    >
      Result shows percentage of successful picks of the day. The more
      not-givens and alts there are, the lower this number would be.
    </Typography>
  </Box>
);

export default PickingAccuracy;
