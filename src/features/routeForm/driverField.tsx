import { FC } from "react";
import dayjs from "dayjs";
import { Box, List, Skeleton, SxProps, Theme, Typography } from "@mui/material";
import { DriverTile } from "./driverTile";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectDriver,
  selectSendDate,
  selectRouteStatus,
  selectPreviousDriver,
  setDriver,
} from "./routeFormSlice";
import { useGetAllDriversQuery } from "../../services/api";
import type { TDriver } from "../../types/deliveryAndDispatch";

export interface DriverFieldProps {
  sx?: SxProps<Theme>;
}

export const DriverField: FC<DriverFieldProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const selectedDriver = useAppSelector(selectDriver);
  const sendDate = useAppSelector(selectSendDate);
  const routeStatus = useAppSelector(selectRouteStatus);
  const previousDriver = useAppSelector(selectPreviousDriver);

  const updateDriver = (driver: TDriver) => {
    if (driver.username !== previousDriver?.username && !driver.isAvailable)
      return;
    dispatch(setDriver({ driver }));
  };

  const { data, isLoading, isFetching } = useGetAllDriversQuery({
    sendDate: dayjs(sendDate).format("YYYY/MM/DD"),
  });
  const drivers = data?.drivers ?? [];

  const skeleton = (
    <>
      {[0, 1, 2, 3, 4].map(iii => (
        <Skeleton
          key={iii}
          variant="rounded"
          width="48%"
          height={50}
          sx={{ mb: 1.5 }}
        />
      ))}
    </>
  );

  const driversList = (
    <>
      {drivers.map(driver => (
        <DriverTile
          key={driver.username}
          driver={driver}
          onClick={updateDriver}
          selectedDriver={selectedDriver}
          disabled={
            routeStatus === "Loading" ||
            (driver.username !== previousDriver?.username &&
              !driver.isAvailable)
          }
          sx={{ width: "48%", mb: 1.5 }}
        />
      ))}
    </>
  );

  return (
    <Box sx={sx}>
      <Typography mb={1}>
        Select a driver:{" "}
        {selectedDriver
          ? `${selectedDriver.firstName} ${selectedDriver.lastName}`
          : ""}
      </Typography>
      <List
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          userSelect: "none",
        }}
      >
        {isLoading || isFetching ? skeleton : driversList}
      </List>
    </Box>
  );
};

export default DriverField;
