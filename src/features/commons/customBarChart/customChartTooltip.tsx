import { FC } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { DefaultTooltipContentProps } from "recharts";
import { DotIcon } from "../svg/dotIcon";

export interface CustomChartTooltipProps
  extends DefaultTooltipContentProps<string | number, number> {
  type: "pickers" | "drivers";
}

export const CustomChartTooltip: FC<CustomChartTooltipProps> = ({
  label,
  payload,
  type,
}) => {
  const value = (payload?.[0]?.value ? payload?.[0]?.value : 0) as number;

  return (
    <Paper sx={{ px: 1.5, py: 0.75 }}>
      <Box>
        <DotIcon color={payload?.[0]?.color} size={10} sx={{ mr: 1 }} />
        <Typography component="span" variant="body2">
          {label}
        </Typography>
      </Box>
      <Typography component="span" variant="body2">
        {value.toFixed(1)} minutes for {payload?.[0]?.payload?.numItems ?? 10}{" "}
        {type === "pickers" ? "items" : "totes"}.
      </Typography>
    </Paper>
  );
};
export default CustomChartTooltip;
