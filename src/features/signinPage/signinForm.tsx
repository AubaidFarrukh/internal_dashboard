import { FC } from "react";
import { Formik, Form } from "formik";
import { Grid, Button, CircularProgress, Link } from "@mui/material";
import { FormTextField } from "../commons";
import { signinFormSchema } from "./formSchemas";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { signIn, selectLoadingAuth, setFormType } from "../../services/auth";
import type { TSigninFormValues } from "../../types/auth";

const initialValues: TSigninFormValues = { username: "", password: "" };

export const SigninForm: FC = () => {
  const loadingAuth = useAppSelector(selectLoadingAuth);
  const dispatch = useAppDispatch();

  const onSubmit = async (values: TSigninFormValues) => {
    const { username, password } = values;
    dispatch(signIn({ username, password }));
  };

  const onForgotPassword = async () => {
    dispatch(setFormType({ formType: "forgot_password" }));
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={signinFormSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={12} mb={1}>
              <FormTextField
                name="username"
                label="Username"
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="password"
                label="Password"
                fullWidth
                type="password"
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
                {isSubmitting || loadingAuth ? "Signing In..." : "Sign In"}
              </Button>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Link
                onClick={onForgotPassword}
                component={Button}
                disabled={isSubmitting || loadingAuth}
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
                Forgot Password
              </Link>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SigninForm;
