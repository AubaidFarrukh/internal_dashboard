import { FC } from "react";
import { Button, CircularProgress, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  sendVerificationCode,
  selectLoadingAuth,
  selectUserObj,
  setError,
} from "../../services/auth";
import type { TContactType } from "../../types/auth";

export interface VerifyContactFormProps {
  contact: TContactType;
}

export const VerifyContactForm: FC<VerifyContactFormProps> = ({ contact }) => {
  const dispatch = useAppDispatch();
  const loadingAuth = useAppSelector(selectLoadingAuth);
  const userObj = useAppSelector(selectUserObj);

  const onSubmit = async () => {
    if (userObj) {
      dispatch(sendVerificationCode({ userObj, contact }));
    } else {
      dispatch(setError({ error: "Something went wrong. Try again" }));
    }
  };

  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item xs={12} mb={2}>
        We need to verify your {contact} through a verification code.
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={onSubmit}
          startIcon={loadingAuth ? <CircularProgress size="1rem" /> : null}
          disabled={loadingAuth}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ textTransform: "none" }}
        >
          {loadingAuth ? "Sending..." : "Send Code"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default VerifyContactForm;
