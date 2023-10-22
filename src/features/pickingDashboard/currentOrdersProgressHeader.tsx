import { FC } from "react";
import { Box, Typography, Skeleton } from "@mui/material";

export const CurrentOrdersProgressHeader: FC = () => {
  return (
    <Box display="flex" alignItems="center" px={4} py={3}>
      <Skeleton
        variant="circular"
        width={15}
        height={15}
        sx={{
          bgcolor: t => t.palette.primary.main,
          mr: 2,
        }}
      />
      <Typography component="h2" variant="h6">
        Live Order Progress
      </Typography>
    </Box>
  );
};

export default CurrentOrdersProgressHeader;
