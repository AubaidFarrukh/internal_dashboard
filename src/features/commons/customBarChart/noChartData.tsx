import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export const NoChartData: FC = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    }}
  >
    <IconButton sx={{ color: t => t.palette.primary.light }}>
      <SignalCellularAltIcon sx={{ fontSize: "4rem" }} />
    </IconButton>
    <Typography textAlign="center" variant="subtitle2" color="text.secondary">
      No data available.
    </Typography>
  </Box>
);

export default NoChartData;
