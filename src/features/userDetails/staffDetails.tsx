import { FC } from "react";
import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import { EditDetails } from "./editDetails";
import { ResetPassword } from "./resetPassword";
import { dateFormatter } from "../../utils";
import type { TUser } from "../../types/users";

interface StaffDetailsProps {
  user: TUser;
}

export const StaffDetails: FC<StaffDetailsProps> = ({ user }) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const lastLoginInfo = user.lastLogin
    ? `Last login was ${dateFormatter(
        new Date(user.lastLogin * 1000).toISOString()
      )}`
    : `Last login information not available.`;

  return (
    <Paper square sx={{ mb: 3.5 }}>
      <Box px={3} py={2} display="flex" alignItems="center">
        <Typography fontWeight={600} mr="auto">
          Staff Details
        </Typography>
        <EditDetails user={user} />
        <ResetPassword user={user} />
      </Box>
      <Divider variant="fullWidth" />
      <Box px={3} py={2} display="flex">
        <Avatar
          src={user.profilePicture ?? fullName}
          alt={fullName}
          title={fullName}
          sx={{ width: 56, height: 56 }}
        />
        <Box
          display="flex"
          width="100%"
          height="100%"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: theme => theme.spacing(0.5, 5) }}
        >
          <Box>
            <Typography fontWeight={500}>{fullName}</Typography>
            <Typography>{user.email}</Typography>
          </Box>
          <Typography color="text.secondary">{lastLoginInfo}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default StaffDetails;
