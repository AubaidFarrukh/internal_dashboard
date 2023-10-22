import { FC, useState } from "react";
import { Box, Button, Stack, SxProps, TextField, Theme } from "@mui/material";
import { CustomModal } from "../commons";
import { useResetPasswordMutation } from "../../services/api";
import { useAppDispatch } from "../../context/redux/hooks";
import { setMessage } from "../layout/layoutSlice";
import { isAny } from "../../utils";
import type { TTextField } from "../../types/commons";
import type { TUser } from "../../types/users";

interface ResetPasswordProps {
  user: TUser;
  sx?: SxProps<Theme>;
}

type TTextFieldId = "newPassword" | "retypePassword";
type TPasswordFields = Record<TTextFieldId, string>;

export const ResetPassword: FC<ResetPasswordProps> = ({ user, sx }) => {
  const dispatch = useAppDispatch();
  const username = user.username;

  // Handle password text fields
  const newPasswordObj: TPasswordFields = {
    newPassword: "",
    retypePassword: "",
  };
  const [newPassword, setNewPassword] = useState(newPasswordObj);
  const updateNewPassword = (pw: Partial<TPasswordFields>) => {
    setNewPassword(prev => ({ ...prev, ...pw }));
  };

  // Error handling
  const initialError: typeof newPasswordObj = {
    newPassword: "",
    retypePassword: "",
  };
  const [errors, setErrors] = useState(initialError);
  const isAnyError =
    !newPassword.newPassword?.trim() ||
    !newPassword.retypePassword?.trim() ||
    isAny(...Object.values(errors));
  const updateErrors = (e: Partial<TPasswordFields>) => {
    setErrors(prev => ({ ...prev, ...e }));
  };

  // Modal handling
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [
    resetPassword,
    {
      isLoading: isResettingPassword,
      isSuccess: isResettingSuccess,
      reset: resetResetting,
    },
  ] = useResetPasswordMutation();

  const openResetPasswordModal = () => {
    setShowResetPasswordModal(true);
  };

  const handleCancelResettingPassword = () => {
    if (isResettingPassword) return;
    setNewPassword(newPasswordObj);
    setErrors(initialError);
    setShowResetPasswordModal(false);
  };

  const handleResettingPassword = async () => {
    if (isResettingPassword || isResettingSuccess) return;

    try {
      const res = await resetPassword({
        username: username,
        newPassword: newPassword.newPassword,
      }).unwrap();
      resetResetting();

      if (res.status === "SUCCESS") {
        const message = `Password reset for ${user.firstName} ${user.lastName}.`;
        dispatch(setMessage({ success: true, message }));
      } else {
        dispatch(setMessage({ success: false, message: res.message }));
      }

      setShowResetPasswordModal(false);
    } catch (error) {
      dispatch(
        setMessage({ success: false, message: "Something went wrong." })
      );
    }
  };

  const textFields = [
    {
      id: "newPassword",
      name: "New Password",
      required: true,
      value: newPassword.newPassword,
      onChange: v => updateNewPassword({ newPassword: v }),
      error: errors.newPassword,
      checkValidity: v => {
        if (!Boolean(v)) return "Required";
        else if (!Boolean(v.match(/[a-z]+/)))
          return "Must have atleast one lower case letter.";
        else if (!Boolean(v.match(/[A-Z]+/)))
          return "Must have atleast one upper case letter.";
        else if (!Boolean(v.match(/\d+/)))
          return "Must have atleast one number.";
        else if (!Boolean(v.match(/[!@#$%&]+/)))
          return "Must have atleast one symbol (!, @, #, $, %, &).";
        else if (v.length < 8) return "Must be atleast 8 characters long.";
        else return "";
      },
      updateError: e => updateErrors({ newPassword: e }),
    },
    {
      id: "retypePassword",
      name: "Re-Type Password",
      required: true,
      value: newPassword.retypePassword,
      onChange: v => updateNewPassword({ retypePassword: v }),
      error: errors.retypePassword,
      checkValidity: v =>
        newPassword.newPassword === v ? "" : "Passwords must match.",
      updateError: e => updateErrors({ retypePassword: e }),
    },
  ] as TTextField<TTextFieldId>[];

  return (
    <Box sx={sx}>
      <Button
        onClick={openResetPasswordModal}
        variant="outlined"
        sx={{ textTransform: "none" }}
      >
        Reset Password
      </Button>
      <CustomModal
        open={showResetPasswordModal}
        title="Reset Password"
        confirmText="Reset"
        actionText="Resetting"
        disabled={isAnyError}
        loading={isResettingPassword}
        handleConfirmation={handleResettingPassword}
        handleCancel={handleCancelResettingPassword}
      >
        <Stack gap={2}>
          {textFields.map(t => (
            <TextField
              key={t.id}
              label={t.name}
              value={t.value}
              onChange={e => {
                const newValue = e.target.value;
                t.onChange(newValue);
                t.updateError(t.checkValidity(newValue));
              }}
              error={Boolean(t.error)}
              helperText={t.error}
              required={t.required}
              fullWidth
            />
          ))}
        </Stack>
      </CustomModal>
    </Box>
  );
};

export default ResetPassword;
