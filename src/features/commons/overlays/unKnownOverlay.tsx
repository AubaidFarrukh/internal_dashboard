import { Box } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import type { FC } from "react";

export const UnKnownOverlay: FC = () => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
    bgcolor="rgba(250, 250, 250, 0.65)"
  >
    <QuestionMarkIcon color="primary" />
  </Box>
);

export default UnKnownOverlay;
