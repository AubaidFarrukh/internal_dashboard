import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { CustomModal, LightTooltip } from "../commons";
import {
  useDisableUserMutation,
  useEnableUserMutation,
  useDeleteUserMutation,
} from "../../services/api";
import { useAppDispatch } from "../../context/redux/hooks";
import { setMessage } from "../layout/layoutSlice";
import type { TUser } from "../../types/users";

interface UserStatusActionsProps {
  user: TUser;
}

export const UserStatusActions: FC<UserStatusActionsProps> = ({ user }) => {
  const dispatch = useAppDispatch();

  const fullName = `${user.firstName} ${user.lastName}`;
  const userEnabled = user.enabled;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const navigate = useNavigate();
  const [
    suspendUser,
    {
      isLoading: suspending,
      isSuccess: isSuspendingSuccessful,
      reset: resetDisableMutation,
    },
  ] = useDisableUserMutation();
  const [
    enableUser,
    {
      isLoading: enabling,
      isSuccess: isEnablingSuccessful,
      reset: resetEnableMutation,
    },
  ] = useEnableUserMutation();
  const [
    deleteUser,
    {
      isLoading: deleting,
      isSuccess: isDeletingSuccessful,
      reset: resetDeleteMutation,
    },
  ] = useDeleteUserMutation();

  const openDeleteModal = () => {
    if (userEnabled) return;
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    if (deleting) return;
    setShowDeleteModal(false);
  };

  const handleDeleting = async () => {
    if (deleting || isDeletingSuccessful || userEnabled) return;
    try {
      const res = await deleteUser({ username: user.username }).unwrap();
      resetDeleteMutation();

      if (res.status === "SUCCESS") {
        const message = `${user.firstName} ${user.lastName}'s account has been deleted.`;
        dispatch(setMessage({ success: true, message }));
      } else {
        dispatch(setMessage({ success: false, message: res.message }));
      }

      setShowDeleteModal(false);
      navigate(`/users-and-permissions`);
    } catch (error) {
      dispatch(
        setMessage({ success: false, message: "Something went wrong." })
      );
    }
  };

  const openSuspendModal = () => {
    setShowSuspendModal(true);
  };

  const handleCancelSuspend = () => {
    if (suspending || enabling) return;
    setShowSuspendModal(false);
  };

  const handleSuspending = async () => {
    try {
      if (userEnabled) {
        // Handle suspending logic.
        if (suspending || isSuspendingSuccessful) return;
        const res = await suspendUser({ username: user.username }).unwrap();
        resetDisableMutation();

        if (res.status === "SUCCESS") {
          const message = `${user.firstName} ${user.lastName}'s access has been suspended.`;
          dispatch(setMessage({ success: true, message }));
        } else {
          dispatch(setMessage({ success: false, message: res.message }));
        }
      } else {
        // Handle enabling logic.
        if (enabling || isEnablingSuccessful) return;
        const res = await enableUser({ username: user.username }).unwrap();
        resetEnableMutation();

        if (res.status === "SUCCESS") {
          const message = `${user.firstName} ${user.lastName}'s access has been enabled.`;
          dispatch(setMessage({ success: true, message }));
        } else {
          dispatch(setMessage({ success: false, message: res.message }));
        }
      }

      setShowSuspendModal(false);
    } catch (error) {
      dispatch(
        setMessage({ success: false, message: "Something went wrong." })
      );
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end" mb={3}>
      <LightTooltip title={userEnabled ? "Suspend the user first." : ""}>
        <span>
          <Button
            onClick={openDeleteModal}
            variant="outlined"
            disabled={userEnabled}
            startIcon={<DeleteIcon />}
            sx={{ textTransform: "none", mr: 2 }}
          >
            Delete User
          </Button>
        </span>
      </LightTooltip>
      <CustomModal
        open={showDeleteModal}
        title="Delete User"
        description={`Are you sure deleting user "${fullName}"?`}
        confirmText="Delete"
        actionText="Deleting"
        loading={deleting}
        handleConfirmation={handleDeleting}
        handleCancel={handleCancelDelete}
      />
      <Button
        onClick={openSuspendModal}
        variant="contained"
        startIcon={userEnabled ? <PauseIcon /> : <PlayArrowIcon />}
        sx={{ textTransform: "none" }}
      >
        {userEnabled ? "Suspend" : "Enable"} User
      </Button>
      <CustomModal
        open={showSuspendModal}
        title={`${userEnabled ? "Suspend" : "Enable"} User`}
        description={`Are you sure ${
          userEnabled ? "suspending" : "enabling"
        } user "${fullName}"?`}
        confirmText={userEnabled ? "Suspend" : "Enable"}
        actionText={userEnabled ? "Suspending" : "Enabling"}
        loading={suspending || enabling}
        handleConfirmation={handleSuspending}
        handleCancel={handleCancelSuspend}
      />
    </Box>
  );
};

export default UserStatusActions;
