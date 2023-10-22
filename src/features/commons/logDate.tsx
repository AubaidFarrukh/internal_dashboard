import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";

export interface LogDateProps {
  logDate: string;
  sx?: SxProps<Theme>;
}

export const LogDate: FC<LogDateProps> = ({ logDate, sx }) => (
  <Box
    display="flex"
    color="#737373"
    sx={{
      borderTop: t => `1px solid ${t.palette.grey[200]}`,
      borderBottom: t => `1px solid ${t.palette.grey[200]}`,
      ...sx,
    }}
  >
    <Typography
      mx="auto"
      bgcolor="#e8f0ff"
      px={1.5}
      py={0.1}
      sx={{ display: "inline-block" }}
    >
      {logDate}
    </Typography>
  </Box>
);

export default LogDate;
