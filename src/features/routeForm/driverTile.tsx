import { FC } from "react";
import {
  Avatar,
  Box,
  Fade,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SxProps,
  Theme,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import type { TDriver } from "../../types/deliveryAndDispatch";

export interface DriverTileProps {
  driver: TDriver;
  onClick: (driver: TDriver) => void;
  selectedDriver: TDriver | null;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export const DriverTile: FC<DriverTileProps> = ({
  driver,
  onClick,
  selectedDriver,
  disabled,
  sx,
}) => {
  const checkmarkBadge = (
    <Box
      sx={{
        bgcolor: t => t.palette.success.main,
        width: 20,
        height: 20,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        position: "absolute",
        bottom: 0,
        right: 0,
        transform: "translate(50%, 50%)",
      }}
    >
      <DoneIcon sx={{ color: "white", fontSize: "1rem" }} />
    </Box>
  );

  return (
    <ListItem
      onClick={() => onClick(driver)}
      disabled={disabled}
      sx={{
        bgcolor: t => t.palette.grey[200],
        boxShadow: t => t.shadows[2],
        borderRadius: "4px",
        px: 1,
        cursor: disabled ? "not-allowed" : "pointer",
        position: "relative",
        ...sx,
      }}
    >
      <ListItemAvatar>
        <Avatar src={driver.profilePicture} />
      </ListItemAvatar>
      <ListItemText sx={{ ml: -1 }}>
        {driver.firstName} {driver.lastName}
      </ListItemText>
      <Fade in={driver.username === selectedDriver?.username}>
        {checkmarkBadge}
      </Fade>
    </ListItem>
  );
};

export default DriverTile;
