import { FC, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  Grid,
  Button,
  CircularProgress,
  Link,
  Popper,
  Typography,
} from "@mui/material";
import { FormTextField, PasswordPopover } from "../commons";
import { forgotPasswordSubmitSchema } from "./formSchemas";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  forgotPasswordSubmit,
  selectLoadingAuth,
  forgotPassword,
  selectForgotPassword,
  setError,
} from "../../services/auth";
import type { TForgotPasswordSubmitFormValues } from "../../types/auth";

const initialValues: TForgotPasswordSubmitFormValues = {
  code: "",
  newPassword: "",
  confirmPassword: "",
};

export const ForgotPasswordSubmitForm: FC = () => {
  const dispatch = useAppDispatch();
  const loadingAuth = useAppSelector(selectLoadingAuth);
  const { username, hiddenEmail } = useAppSelector(selectForgotPassword);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [resendTimer, setResendTimer] = useState(60);

  const open = Boolean(anchorEl);
  const id = open ? "password" : undefined;

  const onFocus: React.FocusEventHandler<HTMLInputElement> = e => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const onBlur = () => setAnchorEl(null);

  const onSubmit = async (values: TForgotPasswordSubmitFormValues) => {
    const { code, newPassword } = values;
    if (username) {
      dispatch(forgotPasswordSubmit({ username, code, password: newPassword }));
    } else {
      dispatch(setError({ error: "Something went wrong. Try again" }));
    }
  };

  const resendCode = async () => {
    if (username) {
      dispatch(forgotPassword({ username }));
    } else {
      dispatch(setError({ error: "Something went wrong. Try again" }));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setResendTimer(prev => --prev);
    }, 1000);
  }, [resendTimer]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={forgotPasswordSubmitSchema}
    >
      {({ isSubmitting, isValid, values }) => (
        <Form>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={12} mb={2}>
              We've sent a verification code to {hiddenEmail ?? "your email."}
            </Grid>
            <Grid item xs={12}>
              <FormTextField name="code" label="Code" fullWidth autoFocus />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="newPassword"
                label="New Password"
                type="password"
                onFocus={onFocus}
                onBlur={onBlur}
                fullWidth
              />
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="top-start"
              >
                <PasswordPopover password={values.newPassword} />
              </Popper>
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
              />
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
                {isSubmitting || loadingAuth
                  ? "Updating..."
                  : "Update Password"}
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

export default ForgotPasswordSubmitForm;
