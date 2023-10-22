import { FC, useState } from "react";
import { Formik, Form } from "formik";
import { Grid, Button, CircularProgress, Popper } from "@mui/material";
import { FormTextField, PasswordPopover } from "../commons";
import { newPasswordFormSchema } from "./formSchemas";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  newPassword as newPasswordAction,
  selectLoadingAuth,
  selectUserObj,
  setError,
  setFormType,
} from "../../services/auth";
import type { TNewPasswordFormValues } from "../../types/auth";

const initialValues: TNewPasswordFormValues = {
  newPassword: "",
  confirmPassword: "",
};

export const NewPasswordForm: FC = () => {
  const dispatch = useAppDispatch();
  const loadingAuth = useAppSelector(selectLoadingAuth);
  const userObj = useAppSelector(selectUserObj);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "password" : undefined;

  const onFocus: React.FocusEventHandler<HTMLInputElement> = e => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const onBlur = () => setAnchorEl(null);

  const onSubmit = async (values: TNewPasswordFormValues) => {
    const { newPassword } = values;
    if (userObj) {
      dispatch(newPasswordAction({ user: userObj, newPassword }));
    } else {
      dispatch(setError({ error: "Something went wrong. Try again" }));
      dispatch(setFormType({ formType: "sign_in" }));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={newPasswordFormSchema}
    >
      {({ isSubmitting, isValid, values }) => (
        <Form>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={12} mb={2}>
              You need to change your password.
            </Grid>
            <Grid item xs={12} mb={1}>
              <FormTextField
                name="newPassword"
                label="New Password"
                onFocus={onFocus}
                onBlur={onBlur}
                fullWidth
                type="password"
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
                {isSubmitting || loadingAuth
                  ? "Updating..."
                  : "Update Password"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default NewPasswordForm;
