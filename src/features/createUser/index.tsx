import { FC } from "react";
import { Typography } from "@mui/material";
import { UserDetailsForm } from "./userDetailsForm";
import { UserPermissionsForm } from "./userPermissionsForm";
import { ActionButtons } from "./actionButtons";

export const CreateUser: FC = () => {
  return (
    <>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: -2.5, mb: 3 }}
      >
        Create a new staff member and set their permissions.
      </Typography>
      <UserDetailsForm sx={{ mb: 3.5 }} />
      <UserPermissionsForm sx={{ mb: 3.5 }} />
      <ActionButtons sx={{ mb: 3 }} />
    </>
  );
};

export default CreateUser;
