import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { CustomModal } from "../commons";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  selectErrors,
  validateForm as validateFormAction,
  selectAttributes,
  selectProfilePicture,
  selectRole,
  selectDashboardPermissions,
  selectPickingAppPermissions,
  clearForm as clearFormAction,
  setErrors,
} from "./createUserSlice";
import { setMessage } from "../layout/layoutSlice";
import {
  useUploadAvatarMutation,
  useCreateUserMutation,
  useLazyIsUsernameAvailableQuery,
} from "../../services/api";
import { isAnyKey } from "../../utils";

interface ActionButtonsProps {
  sx?: SxProps<Theme>;
}

export const ActionButtons: FC<ActionButtonsProps> = ({ sx }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const errors = useAppSelector(selectErrors);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const isFormValid = !isAnyKey(errors);
  const base64Image = useAppSelector(selectProfilePicture);
  const role = useAppSelector(selectRole);
  const attributes = useAppSelector(selectAttributes);
  const dashboardPermissions = useAppSelector(selectDashboardPermissions);
  const pickingAppPermissions = useAppSelector(selectPickingAppPermissions);
  const [uploadAvatar, { isLoading: isUploading, reset: resetUploading }] =
    useUploadAvatarMutation();
  const [createUser, { isLoading: isCreating, reset: resetCreating }] =
    useCreateUserMutation();
  const [isUsernameAvailable, { isLoading: isCheckingAvailability }] =
    useLazyIsUsernameAvailableQuery();

  const loading = isUploading || isCreating || isCheckingAvailability;

  const validateForm = () => dispatch(validateFormAction());
  const clearForm = () => dispatch(clearFormAction());

  const openCreateModal = () => {
    validateForm();
    setShowCreateModal(true);
  };

  const handleCancelCreating = () => {
    if (loading) return;
    setShowCreateModal(false);
  };

  const handleCreating = async () => {
    // User is already being created or created successfully.
    if (loading) return;

    // Invalid form data.
    if (!isFormValid || !base64Image || !role) {
      setShowCreateModal(false);
      dispatch(
        setMessage({
          success: false,
          message: `Invalid form data. Please, remove all the errors first.`,
        })
      );
      return;
    }

    try {
      const isAvailable = await isUsernameAvailable({
        username: attributes.username,
      }).unwrap();

      if (!isAvailable) {
        const message = `Username not available.`;
        setShowCreateModal(false);
        dispatch(setErrors({ username: message }));
        dispatch(setMessage({ success: false, message }));
        return;
      }

      const { url } = await uploadAvatar({
        base64Image,
        username: attributes.username,
        mime: "image/jpeg",
      }).unwrap();

      await createUser({
        firstName: attributes.firstName,
        lastName: attributes.lastName,
        email: attributes.email,
        phoneNumber: attributes.mobile,
        username: attributes.username,
        temporaryPassword: attributes.temporaryPassword,
        profilePicture: url,
        role,
        permissions: { ...dashboardPermissions, ...pickingAppPermissions },
      });

      clearForm();
      resetUploading();
      resetCreating();
      dispatch(
        setMessage({
          success: true,
          message: `User ${attributes.username} created successfully.`,
        })
      );
      const fullName = `${attributes.firstName} ${attributes.lastName}`;
      navigate(`/users-and-permissions/${fullName}:${attributes.username}`);
    } catch (error) {
      dispatch(
        setMessage({
          success: false,
          message: `Something went wrong. Try again.`,
        })
      );
      console.log(`Error: ${JSON.stringify(error)}`);
    }
    setShowCreateModal(false);
  };

  const openCancelModal = () => {
    setShowCancelModal(true);
  };

  const handleCancelCancel = () => {
    setShowCancelModal(false);
  };

  const handleCancelling = () => {
    setShowCancelModal(false);
    navigate(`/users-and-permissions`);
  };

  return (
    <Box display="flex" justifyContent="flex-end" sx={sx}>
      <Button
        onClick={openCancelModal}
        variant="outlined"
        startIcon={<CloseIcon />}
        sx={{ textTransform: "none", mr: 2 }}
      >
        Cancel
      </Button>
      <CustomModal
        open={showCancelModal}
        title="Cancel Creating User"
        description={`Are you sure cancel creating this user? All the data will be lost.`}
        confirmText="Cancel"
        cancelText="Back to Form"
        handleConfirmation={handleCancelling}
        handleCancel={handleCancelCancel}
      />
      <Button
        onClick={openCreateModal}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ textTransform: "none" }}
      >
        Create User
      </Button>
      <CustomModal
        open={showCreateModal}
        title={"Create User"}
        description={`This will create a new user. Make sure all the data entered is correct.`}
        confirmText="Create"
        actionText="Creating"
        cancelText="Back to Form"
        loading={loading}
        handleConfirmation={handleCreating}
        handleCancel={handleCancelCreating}
      />
    </Box>
  );
};

export default ActionButtons;
