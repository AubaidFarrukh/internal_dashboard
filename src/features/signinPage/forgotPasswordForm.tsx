import { FC } from "react";
import { Formik, Form } from "formik";
import { Grid, Button, CircularProgress } from "@mui/material";
import { FormTextField } from "../commons";
import { forgotPasswordSchema } from "./formSchemas";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  forgotPassword,
  selectLoadingAuth,
  selectForgotPassword,
} from "../../services/auth";
import type { TForgotPasswordFormValues } from "../../types/auth";

export const ForgotPasswordForm: FC = () => {
  const dispatch = useAppDispatch();
  const loadingAuth = useAppSelector(selectLoadingAuth);
  const { username } = useAppSelector(selectForgotPassword);

  const initialValues: TForgotPasswordFormValues = { username: username ?? "" };

  const onSubmit = async (values: TForgotPasswordFormValues) => {
    const { username } = values;
    dispatch(forgotPassword({ username }));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={forgotPasswordSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={12} mb={2}>
              We will send a verification code to the email associated with your
              username.
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="username"
                label="Username"
                fullWidth
                autoFocus
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
                {isSubmitting || loadingAuth ? "Sending..." : "Send Code"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
