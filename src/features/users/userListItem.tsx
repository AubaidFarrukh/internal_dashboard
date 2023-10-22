import { FC } from "react";
import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { dateFormatter, isAllKey } from "../../utils";
import type { TUser } from "../../types/users";

interface UserListItemProps {
  user: TUser;
}

export const UserListItem: FC<UserListItemProps> = ({ user }) => {
  const navigate = useNavigate();

  const fullName = `${user.firstName} ${user.lastName}`;
  const fullAccess = isAllKey({
    ...user.dashboardPermissions,
    ...user.pickingAppPermissions,
  });

  const lastLoginInfo = user.lastLogin
    ? `Last login was ${dateFormatter(
        new Date(user.lastLogin * 1000).toISOString()
      )}`
    : `Last login information not available.`;

  const navigateToUserDetails = () => {
    navigate(`/users-and-permissions/${fullName}:${user.username}`);
  };
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          src={user.profilePicture ?? fullName}
          alt={fullName}
          sx={{ width: 56, height: 56 }}
        />
      </ListItemAvatar>
      <ListItemText>
        <Box
          display="flex"
          width="100%"
          height="100%"
          alignItems="center"
          sx={{ p: theme => theme.spacing(0.5, 5) }}
        >
          <Box mr="auto">
            <Typography fontWeight={500}>{fullName}</Typography>
            <Typography variant="caption">{lastLoginInfo}</Typography>
          </Box>
          {user.role !== "admin" && (
            <Box width="40%" display="flex">
              <Typography color="text.secondary" mr="auto">
                {fullAccess ? "Full" : "Limited"} Permissions
              </Typography>
              <IconButton color="primary" onClick={navigateToUserDetails}>
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </ListItemText>
    </ListItem>
  );
};

export default UserListItem;
