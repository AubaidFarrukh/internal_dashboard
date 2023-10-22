import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Stack,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { CustomModal } from "../commons";
import { useUpdateAttributesMutation } from "../../services/api";
import { useAppDispatch } from "../../context/redux/hooks";
import { setMessage } from "../layout/layoutSlice";
import type { TUser } from "../../types/users";
import type { TTextField } from "../../types/commons";
import { isAny, isEmail, isValidPhoneNumber } from "../../utils";

export interface EditDetailsProps {
  user: TUser;
  sx?: SxProps<Theme>;
}

type TTextFieldId = "firstName" | "lastName" | "email" | "phoneNumber";
type TAttributes = Record<TTextFieldId, string>;

export const EditDetails: FC<EditDetailsProps> = ({ user, sx }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Handle attribute text fields
  const oldAttributes: TAttributes = {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
  };
  const [attributes, setAttributes] = useState(oldAttributes);
  const newFullName = `${attributes.firstName} ${attributes.lastName}`;
  const isAnyAttributeUpdated =
    JSON.stringify(oldAttributes) !== JSON.stringify(attributes);
  const setAttribute = (attr: Partial<TAttributes>) => {
    setAttributes(prev => ({ ...prev, ...attr }));
  };

  // Error handling
  const initialError: TAttributes = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  };
  const [errors, setErrors] = useState(initialError);
  const updateErrors = (e: Partial<TAttributes>) => {
    setErrors(prev => ({ ...prev, ...e }));
  };
  const isAnyError = isAny(...Object.values(errors));

  // Modal handling
  const [showEditModal, setShowEditModal] = useState(false);
  const [
    updateAttributes,
    { isLoading: isEditing, isSuccess: isEditingSuccess, reset: resetEditing },
  ] = useUpdateAttributesMutation();

  const openEditingModal = () => {
    setShowEditModal(true);
  };

  const handleCancelEditing = () => {
    if (isEditing) return;
    setAttributes({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
    setShowEditModal(false);
  };

  const handleEditing = async () => {
    if (isEditing || isEditingSuccess) return;

    try {
      const res = await updateAttributes({
        username: user.username,
        firstName: attributes.firstName,
        lastName: attributes.lastName,
        phoneNumber: attributes.phoneNumber,
        email: attributes.email,
      }).unwrap();
      resetEditing();

      if (res.status === "SUCCESS") {
        const message = `Attributes updated for ${attributes.firstName} ${attributes.lastName}.`;
        dispatch(setMessage({ success: true, message }));
      } else {
        dispatch(setMessage({ success: false, message: res.message }));
      }

      setShowEditModal(false);
      navigate(`/users-and-permissions/${newFullName}:${user.username}`);
    } catch (error) {
      dispatch(
        setMessage({ success: false, message: "Something went wrong." })
      );
    }
  };

  const textFields = [
    {
      id: "firstName",
      name: "First Name",
      required: true,
      value: attributes.firstName,
      onChange: v => setAttribute({ firstName: v }),
      error: errors.firstName,
      checkValidity: v => (v?.trim().length ? "" : "Required"),
      updateError: e => updateErrors({ firstName: e }),
    },
    {
      id: "lastName",
      name: "Last Name",
      required: true,
      value: attributes.lastName,
      onChange: v => setAttribute({ lastName: v }),
      error: errors.lastName,
      checkValidity: v => (v?.trim().length ? "" : "Required"),
      updateError: e => updateErrors({ lastName: e }),
    },
    {
      id: "phoneNumber",
      name: "Mobile Number",
      required: true,
      value: attributes.phoneNumber,
      onChange: v => setAttribute({ phoneNumber: v }),
      error: errors.phoneNumber,
      checkValidity: v => {
        if (v.trim().length <= 0) return "Mobile number is required.";
        else if (v[0] !== "+") return "Mobile number must start with +";
        else if (v.length < 5) return "Mobile number is too short.";
        else if (v.length > 16) return "Mobile number is too long.";
        else if (!isValidPhoneNumber(v))
          return "Mobile number must start with a + and contain digits only.";
        else return "";
      },
      updateError: e => updateErrors({ phoneNumber: e }),
    },
    {
      id: "email",
      name: "Email",
      required: true,
      value: attributes.email,
      onChange: v => setAttribute({ email: v }),
      error: errors.email,
      checkValidity: v => {
        if (v?.trim().length <= 0) return "Email address is required.";
        else if (!isEmail(v)) return "Invalid email address.";
        else return "";
      },
      updateError: e => updateErrors({ email: e }),
    },
  ] as TTextField<TTextFieldId>[];

  return (
    <Box sx={sx}>
      <IconButton onClick={openEditingModal} color="primary" sx={{ mr: 2 }}>
        <EditIcon />
      </IconButton>
      <CustomModal
        open={showEditModal}
        title="Edit User Name"
        confirmText="Update"
        actionText="Updating"
        loading={isEditing}
        disabled={!isAnyAttributeUpdated || isAnyError}
        handleConfirmation={handleEditing}
        handleCancel={handleCancelEditing}
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

export default EditDetails;
