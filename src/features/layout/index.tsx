import { FC, useEffect, useState } from "react";
import { Container, Box, styled, SxProps, Theme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Appbar } from "./appbar";
import { Protected } from "../protectedRoute";
import { RouterBreadCrumbs } from "./routerBreadCrumbs";
import { Sidebar } from "../sidebar";
import { CustomSnackbar, CustomSnackbarProps } from "../commons";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import { selectMessage, setMessage } from "./layoutSlice";

export const Layout: FC = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectMessage);
  const [showMessage, setShowMessage] = useState(false);

  const handleClose: CustomSnackbarProps["onClose"] = (event, reason) => {
    if (reason === "clickaway") return;
    setShowMessage(false);
    setTimeout(() => {
      dispatch(setMessage({ success: null, message: null }));
    }, 100);
  };

  useEffect(() => {
    if (message.success === null || !message.message) return;
    setShowMessage(true);
  }, [message.success, message.message]);

  const mainContainerStyles: SxProps<Theme> = {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    display: "flex",
    backgroundColor: "#fafafa",
    "& ::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "& ::-webkit-scrollbar-track": {
      backgroundColor: "inherit",
    },
    "& ::-webkit-scrollbar-thumb": {
      backgroundColor: "#7d7d7d",
      borderRadius: "999px",
    },
  };

  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

  return (
    <Protected>
      <Container disableGutters maxWidth={false} sx={mainContainerStyles}>
        <Sidebar />
        <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
          <Appbar />
          <Container
            disableGutters
            maxWidth="xl"
            sx={{
              p: theme => theme.spacing(3),
              overflow: "auto",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fafafa",
            }}
          >
            <RouterBreadCrumbs />
            <Outlet />
            <Offset />
          </Container>
        </Box>
        <CustomSnackbar
          open={showMessage}
          severity={message.success ? "success" : "error"}
          onClose={handleClose}
        >
          {message.message ?? ""}
        </CustomSnackbar>
      </Container>
    </Protected>
  );
};

export default Layout;
