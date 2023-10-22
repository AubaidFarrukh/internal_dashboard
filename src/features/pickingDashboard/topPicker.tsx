import type { FC } from "react";
import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Paper,
  Stack,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import { LightTooltip } from "../commons";
import { useGetOrdersOverviewQuery } from "../../services/api/pickingDashboard";
import { useAppSelector } from "../../context/redux/hooks";
import { selectDate, selectToDate } from "./pickingDashboardSlice";

export interface TopPickerProps {
  sx?: SxProps<Theme>;
}

export const TopPicker: FC<TopPickerProps> = ({ sx }) => {
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);
  const { data, isLoading } = useGetOrdersOverviewQuery({
    date,
    toDate: toDate ?? undefined,
  });
  const pickers = data?.overviewData.pickingData.pickers ?? [];
  const sortedPickers = [...pickers].sort(
    (a, b) => a.efficiency - b.efficiency
  );
  const topPicker = sortedPickers.length ? sortedPickers[0] : null;

  return (
    <Paper square sx={{ p: 3, borderRadius: 1, ...sx }}>
      <Stack direction="column">
        <LightTooltip title={DetailsTooltip}>
          <Typography
            variant="h6"
            component="h2"
            fontWeight={600}
            sx={{
              userSelect: "none",
              cursor: "pointer",
              display: "inline-block",
              width: "fit-content",
            }}
          >
            Today's Top Picker
          </Typography>
        </LightTooltip>
        <Typography variant="caption" mb={1.5}>
          Picker efficiency
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">
            {topPicker
              ? `${topPicker.picker.firstName} ${topPicker.picker.lastName}`
              : "---"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {topPicker?.efficiency ? `${topPicker.efficiency}%` : "---"}
          </Typography>
        </Box>
        <LinearProgress
          value={topPicker?.efficiency ?? 0}
          variant={isLoading ? "indeterminate" : "determinate"}
          color="primary"
          sx={{
            height: 6,
            borderRadius: 5,
            [`& .${linearProgressClasses.bar}`]: { borderRadius: 5 },
          }}
        />
      </Stack>
    </Paper>
  );
};

const DetailsTooltip = (
  <Box p={0.25}>
    <Box display="flex" alignItems="center" mb={1}>
      <Box display="flex" flexDirection="column" mr={0.5}>
        <Typography variant="subtitle2" lineHeight={1.2} component="span">
          Picker
        </Typography>
        <Typography variant="subtitle2" lineHeight={1.2} component="span">
          Efficiency
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
          Total Items Picked
        </Typography>
        <Typography variant="subtitle2" mx="auto" component="span">
          Total Time Worked (Min)
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
      Result shows the picker's efficiency rate for a certain period of time.
    </Typography>
  </Box>
);

export default TopPicker;
