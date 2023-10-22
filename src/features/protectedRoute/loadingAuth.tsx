import { FC } from "react";
import { Box, CircularProgress } from "@mui/material";

export const LoadingAuth: FC = () => (
  <Box
    sx={{
      width: "100vw",
      height: "100vh",
      display: "grid",
      placeItems: "center",
    }}
  >
    <CircularProgress color="primary" size="5rem" />
  </Box>
);

export default LoadingAuth;
