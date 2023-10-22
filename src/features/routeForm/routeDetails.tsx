import { FC } from "react";
import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import { RouteNameField } from "./routeNameField";
import { VanField } from "./vanField";
import { SendDateField } from "./sendDateField";
import { DriverField } from "./driverField";
import { CommentField } from "./commentField";
import { useAppSelector } from "../../context/redux/hooks";
import { selectFormType, selectRouteStatus } from "./routeFormSlice";
import { RouteStatus } from "../commons";

export interface RouteDetailsProps {
  sx?: SxProps<Theme>;
}

export const RouteDetails: FC<RouteDetailsProps> = ({ sx }) => {
  const type = useAppSelector(selectFormType);
  const routeStatus = useAppSelector(selectRouteStatus);

  return (
    <Paper
      square
      sx={{
        height: "100%",
        border: 1,
        borderRight: 0,
        borderColor: "divider",
        p: 3,
        ...sx,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pb={3}
      >
        <Typography variant="h5" component="h2" fontWeight={600}>
          {type === "create" ? "Create a Route" : "Edit Route"}
        </Typography>
        {routeStatus ? (
          <Box display="flex">
            <Typography fontWeight={600} mr={0.5}>
              Status:
            </Typography>
            <RouteStatus status={routeStatus} />
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <RouteNameField sx={{ mb: 1.5 }} />
      <Box display="flex" mb={2}>
        <VanField sx={{ mr: 1 }} />
        <SendDateField />
      </Box>
      <DriverField sx={{ mb: 1 }} />
      <CommentField />
    </Paper>
  );
};

export default RouteDetails;
