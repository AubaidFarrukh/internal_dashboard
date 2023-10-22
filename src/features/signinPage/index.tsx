import { FC, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  Alert,
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import { BackIcon } from "../commons";
import { SigninForm } from "./signinForm";
import { MfaForm } from "./mfaForm";
import { NewPasswordForm } from "./newPasswordForm";
import { VerifyContactForm } from "./verifyContactForm";
import { VerifyContactSubmitForm } from "./verifyContactSubmitForm";
import { ForgotPasswordForm } from "./forgotPasswordForm";
import { ForgotPasswordSubmitForm } from "./forgotPasswordFormSubmit";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectIsSignedIn,
  loadUser,
  selectFormType,
  selectError,
  setFormType,
} from "../../services/auth";
import logo from "../../images/SaveCoOnlineRed.webp";

export const SigninPage: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const error = useAppSelector(selectError);
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const formType = useAppSelector(selectFormType);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const getCallbackPath = () => {
    const DEFAULT_PATH = "/";
    const locationState = location.state as { from: string } | undefined;
    let from = locationState?.from || location.pathname || DEFAULT_PATH;
    if (from === "/signin" || from === "/") {
      from = DEFAULT_PATH;
    }
    return from;
  };

  if (isSignedIn) {
    const from = getCallbackPath();
    return <Navigate to={from} replace state={{ from }} />;
  }

  const onBackBtn = () => {
    const prevForm =
      formType === "verify_email_submit"
        ? "verify_email"
        : formType === "verify_phone_submit"
        ? "verify_phone"
        : formType === "forgot_password_submit"
        ? "forgot_password"
        : "sign_in";
    dispatch(setFormType({ formType: prevForm }));
  };

  const currentForm =
    formType === "mfa" ? (
      <MfaForm />
    ) : formType === "new_password" ? (
      <NewPasswordForm />
    ) : formType === "verify_email" ? (
      <VerifyContactForm contact="email" />
    ) : formType === "verify_email_submit" ? (
      <VerifyContactSubmitForm contact="email" />
    ) : formType === "verify_phone" ? (
      <VerifyContactForm contact="phone" />
    ) : formType === "verify_phone_submit" ? (
      <VerifyContactSubmitForm contact="phone" />
    ) : formType === "forgot_password" ? (
      <ForgotPasswordForm />
    ) : formType === "forgot_password_submit" ? (
      <ForgotPasswordSubmitForm />
    ) : (
      <SigninForm />
    );

  const containerStyles = {
    height: "100vh",
    width: "100vw",
    overflow: "auto",
    "::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "inherit",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "#7d7d7d",
      borderRadius: "999px",
    },
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={containerStyles}
    >
      <Container maxWidth="sm" disableGutters sx={{ pt: 10 }}>
        <Paper elevation={3} sx={{ my: 5, p: 5, position: "relative" }}>
          {formType !== "sign_in" ? (
            <IconButton
              onClick={onBackBtn}
              title="Back to Signin"
              sx={{ position: "absolute" }}
            >
              <BackIcon color={theme.palette.text.secondary} />
            </IconButton>
          ) : null}
          <Box sx={{ pb: 5, display: "grid", placeItems: "center" }}>
            <img
              src={logo}
              alt="Logo"
              title="SaveCo Online Logo"
              loading="lazy"
            />
          </Box>
          {Boolean(error) ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          ) : null}
          {currentForm}
        </Paper>
      </Container>
    </Grid>
  );
};

export default SigninPage;
