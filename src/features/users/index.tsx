import { FC } from "react";
import { Typography } from "@mui/material";
import { UsersFilterBar } from "./usersFilterBar";
import { AllUsers } from "./allUsers";

export const UsersPage: FC = () => {
  return (
    <>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: -2.5, mb: 3 }}
      >
        See your existing users, manage their permissions or add a new user.
      </Typography>
      <UsersFilterBar />
      <AllUsers />
    </>
  );
};

export default UsersPage;
