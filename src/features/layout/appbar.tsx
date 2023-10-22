import { FC } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { selectCurrentUser } from "../../services/auth";
import { selectIsDrawerOpen, setIsDrawerOpen } from "../layout/layoutSlice";
import logo from "../../images/SaveCoOnline_reverse.png";

export const Appbar: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const fullName = `${user?.firstName} ${user?.lastName}`;

  const isDrawerOpen = useAppSelector(selectIsDrawerOpen);
  const toggleDrawer = () => {
    dispatch(
      setIsDrawerOpen({
        isDrawerOpen: isDrawerOpen ? null : "BUTTON",
      })
    );
  };

  return (
    <AppBar position="relative" color="primary">
      <Toolbar disableGutters>
        <Box width="100%" display="flex" px={3}>
          <IconButton
            color="inherit"
            aria-label={`${isDrawerOpen ? "close" : "open"} drawer`}
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            {isDrawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Box>
            <img src={logo} alt="Logo" title="SaveCo Online Logo" width={70} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <Box sx={{ pr: theme => theme.spacing(3) }}>
              <Typography>Welcome</Typography>
              <Typography>{fullName}</Typography>
            </Box>
            <Avatar
              src={user?.profilePicture ?? undefined}
              alt={user ? fullName : undefined}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
