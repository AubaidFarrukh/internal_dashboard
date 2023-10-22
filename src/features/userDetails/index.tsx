import { FC } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { StaffDetails } from "./staffDetails";
import { StaffPermissions } from "./staffPermissions";
import { UserStatusActions } from "./userStatusActions";
import { LoadingContent, NotFound } from "../commons";
import { useGetAllUsersQuery } from "../../services/api";

export const UserDetailsPage: FC = () => {
  const { data: users, isLoading, isFetching, error } = useGetAllUsersQuery({});
  const { name } = useParams();

  const username = name?.split(":")[1] ?? "";
  const user = users?.filter(u => u.username === username)[0];

  if (isLoading || isFetching) {
    return <LoadingContent />;
  }

  if (error || !user) {
    return <NotFound message="User data not found" />;
  }

  return (
    <>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: -2.5, mb: 3 }}
      >
        View or change your staff members permissions.
      </Typography>
      <StaffDetails user={user} />
      <StaffPermissions user={user} />
      <UserStatusActions user={user} />
    </>
  );
};

export default UserDetailsPage;
