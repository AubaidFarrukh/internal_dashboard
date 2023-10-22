import { FC } from "react";
import { Box, Typography } from "@mui/material";

interface NotFoundMessage {
  message: string;
}

export const NotFound: FC<NotFoundMessage> = ({ message }) => (
  <Box
    sx={{
      display: "grid",
      placeItems: "center",
      width: "100%",
      height: "100%",
    }}
  >
    <Typography textAlign="center">{message}</Typography>
  </Box>
);

export default NotFound;
