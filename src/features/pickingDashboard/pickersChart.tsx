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
  selectNumPickedItems,
  setNumPickedItems,
} from "./pickingDashboardSlice";
import { TPickingDashboardState } from "../../types/pickingDashboard";

export interface PickersChartProps {
  sx?: SxProps<Theme>;
}

export const PickersChart: FC<PickersChartProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(selectDate);
  const toDate = useAppSelector(selectToDate);
  const numPickedItems = useAppSelector(selectNumPickedItems);
  const handleNumItemsChange: SelectProps["onChange"] = e => {
    const numPickedItems = (e.target.value ??
      10) as TPickingDashboardState["numPickedItems"];
    dispatch(setNumPickedItems({ numPickedItems }));
  };

  // Pickers data
  const { data, isLoading } = useGetOrdersOverviewQuery({
    date,
    toDate: toDate ?? undefined,
  });
  const pickers = data?.overviewData.pickingData.pickers ?? [];
  let avgTimeInSeconds =
    pickers.reduce(
      (sum, p) => sum + (p.timeTaken / p.itemsPicked) * numPickedItems,
      0
    ) / pickers.length;
  avgTimeInSeconds = avgTimeInSeconds ? avgTimeInSeconds : 0;

  // Graph data
  const bars = pickers.map(p => ({
    name: p.picker.firstName + " " + p.picker.lastName,
    dataKey: p.picker.username,
    numItems: numPickedItems,
    [p.picker.username]: (p.timeTaken / 60 / p.itemsPicked) * numPickedItems,
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
            Average Pick Time Per Picker
          </Typography>
          <Typography mr={1}>No. of items picked:</Typography>
          <FormControl>
            <Select
              id="num-items-select"
              value={numPickedItems}
              onChange={handleNumItemsChange}
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
        type="pickers"
        isLoading={isLoading}
        xLabel="Time Taken (minutes)"
        height={420}
      />
    </Paper>
  );
};

export default PickersChart;
