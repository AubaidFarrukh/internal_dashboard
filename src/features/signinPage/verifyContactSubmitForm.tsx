import { FC, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  Grid,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import { FormTextField } from "../commons";
import { verifyCodeSchema } from "./formSchemas";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  verifyCode,
  selectLoadingAuth,
  sendVerificationCode,
  selectUserObj,
  setError,
  selectSendingCode,
} from "../../services/auth";
import type { TContactType, TVerifyCodeFormValues } from "../../types/auth";

const initialValues: TVerifyCodeFormValues = { code: "" };

export interface VerifyContactSubmitFormProps {
  contact: TContactType;
}

export const VerifyContactSubmitForm: FC<VerifyContactSubmitFormProps> = ({
  contact,
}) => {
  const dispatch = useAppDispatch();
  const loadingAuth = useAppSelector(selectLoadingAuth);
  const sendingCode = useAppSelector(selectSendingCode);
  const userObj = useAppSelector(selectUserObj);
  const resendTimerStartValue = 60; // seconds;
  const [resendTimer, setResendTimer] = useState(resendTimerStartValue);

  const onSubmit = async (values: TVerifyCodeFormValues) => {
    const { code } = values;
    if (userObj) {
      dispatch(verifyCode({ userObj, code, contact }));
    } else {
      dispatch(setError({ error: "Something went wrong. Try again" }));
    }
  };

  const resendCode = async () => {
    if (userObj) {
      dispatch(sendVerificationCode({ userObj, contact }));
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
      validationSchema={verifyCodeSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={12} mb={2}>
              A verification code has been sent to your {contact}.
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
                  ? "Resending Code..."
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

export default VerifyContactSubmitForm;
