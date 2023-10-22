import { FC } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectProps,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import { CustomBarChart } from "../commons";
import { useGetOrdersOverviewQuery } from "../../services/api/pickingDashboard";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectDate,
  selectToDate,
  selectNumLoadedTotes,
  setNumLoadedTotes,
} from "./pickingDashboardSlice";
import { TPickingDashboardState } from "../../types/pickingDashboard";

export interface DriversChartProps {
  sx?: SxProps<Theme>;
}

export const DriversChart: FC<DriversChartProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);
  const numLoadedTotes = useAppSelector(selectNumLoadedTotes);
  const handleNumTotesChange: SelectProps["onChange"] = e => {
    const numLoadedTotes = (e.target.value ??
      10) as TPickingDashboardState["numLoadedTotes"];
    dispatch(setNumLoadedTotes({ numLoadedTotes }));
  };

  // Drivers data
  const { data, isLoading } = useGetOrdersOverviewQuery({
    date,
    toDate: toDate ?? undefined,
  });
  const drivers = data?.overviewData.deliveryData.drivers ?? [];
  let avgTimeInSeconds =
    drivers.reduce(
      (sum, d) => sum + (d.timeTaken / d.totesLoaded) * numLoadedTotes,
      0
    ) / drivers.length;
  avgTimeInSeconds = avgTimeInSeconds ? avgTimeInSeconds : 0;

  // Graph data
  const bars = drivers.map(d => ({
    name: d.driver.firstName + " " + d.driver.lastName,
    dataKey: d.driver.username,
    numItems: numLoadedTotes,
    [d.driver.username]: (d.timeTaken / 60 / d.totesLoaded) * numLoadedTotes,
  }));

  return (
    <Paper
      square
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 1,
        overflow: "hidden",
        ...sx,
      }}
    >
      <Box p={3} pb={1}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="h2" fontWeight={600} mr="auto">
            Average Load Time Per Driver
          </Typography>
          <Typography mr={1}>No. of totes loaded:</Typography>
          <FormControl>
            <Select
              id="num-items-select"
              value={numLoadedTotes}
              onChange={handleNumTotesChange}
              sx={{ width: 70 }}
              size="small"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography>
          Total Average: {(avgTimeInSeconds / 60).toFixed(1)} min
        </Typography>
      </Box>
      <CustomBarChart
        bars={bars}
        type="drivers"
        isLoading={isLoading}
        xLabel="Time Taken (minutes)"
        height={420}
        reverseBarColors
      />
    </Paper>
  );
};

export default DriversChart;
