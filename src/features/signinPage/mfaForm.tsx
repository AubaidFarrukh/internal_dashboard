import { FC, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  Grid,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import { FormTextField } from "../commons";
import { confirmSigninFormSchema } from "./formSchemas";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  confirmSignIn,
  selectUserObj,
  selectLoadingAuth,
  setError,
  signIn,
  selectUsername,
  selectPassword,
  selectSendingCode,
} from "../../services/auth";
import type { TMfaFormValues } from "../../types/auth";

const initialValues: TMfaFormValues = { code: "" };

export const MfaForm: FC = () => {
  const dispatch = useAppDispatch();
  const loadingAuth = useAppSelector(selectLoadingAuth);
  const sendingCode = useAppSelector(selectSendingCode);
  const userObj = useAppSelector(selectUserObj);
  const username = useAppSelector(selectUsername);
  const password = useAppSelector(selectPassword);
  const codeDestination =
    userObj?.challengeParam?.CODE_DELIVERY_DESTINATION ?? "your phone number.";
  const resendTimerStartValue = 60; // seconds;
  const [resendTimer, setResendTimer] = useState(resendTimerStartValue);

  const onSubmit = async (values: TMfaFormValues) => {
    const { code } = values;
    if (userObj) {
      dispatch(confirmSignIn({ userObj, code }));
    } else {
      dispatch(setError({ error: "Something went wrong. Try again" }));
    }
  };

  const resendCode = async () => {
    if (userObj && username && password) {
      dispatch(signIn({ username, password }));
      setResendTimer(resendTimerStartValue);
    } else {
      dispatch(setError({ error: "Something went wrong. Try again" }));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setResendTimer(prev => --prev), 1000);
    return () => clearTimeout(timeout);
  }, [resendTimer]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={confirmSigninFormSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={12} mb={2}>
              A verification code has been sent to {codeDestination}.
            </Grid>
            <Grid item xs={12}>
              <FormTextField name="code" label="Code" fullWidth autoFocus />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                startIcon={
                  isSubmitting || loadingAuth ? (
                    <CircularProgress size="1rem" />
                  ) : null
                }
                disabled={!isValid || isSubmitting || loadingAuth}
                sx={{ textTransform: "none" }}
              >
                {sendingCode
                  ? "Resending code..."
                  : isSubmitting || loadingAuth
                  ? "Verifying..."
                  : "Verify Code"}
              </Button>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Link
                onClick={resendCode}
                component={Button}
                disabled={resendTimer > 0 || isSubmitting || loadingAuth}
                disableRipple
                disableElevation
                disableTouchRipple
                disableFocusRipple
                sx={{
                  textTransform: "none",
                  ":hover": {
                    bgcolor: theme => theme.palette.background.paper,
                  },
                }}
              >
                Resend Code
              </Link>
              {resendTimer > 0 ? (
                <Typography sx={{ display: "inline" }}>
                  after {resendTimer} seconds.
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default MfaForm;
