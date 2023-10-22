import { FC, useState } from "react";
import {
  Alert,
  Box,
  Divider,
  InputLabel,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { UploadImage } from "./uploadImage";
import { SelectRole } from "./selectRole";
import { PasswordPopover } from "../commons";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  selectAttributes,
  setFirstName,
  setLastName,
  setEmail,
  setMobile,
  setUsername,
  setTemporaryPassword,
  selectErrors,
} from "./createUserSlice";
import type { TDetailsForm } from "../../types/users";

export interface UserDetailsFormProps {
  sx?: SxProps<Theme>;
}

export const UserDetailsForm: FC<UserDetailsFormProps> = ({ sx }) => {
  const dispatch = useAppDispatch();
  const attributes = useAppSelector(selectAttributes);
  const { username, firstName, lastName, email } = attributes;
  const { mobile, temporaryPassword } = attributes;
  const errors = useAppSelector(selectErrors);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "password" : undefined;

  const onFocus: React.FocusEventHandler<HTMLInputElement> = e => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const onBlur = () => setAnchorEl(null);

  const textFields = [
    {
      id: "firstName",
      name: "First Name *",
      required: true,
      value: firstName,
      onChange: v => dispatch(setFirstName({ firstName: v })),
      error: errors.firstName,
    },
    {
      id: "lastName",
      name: "Last Name *",
      required: true,
      value: lastName,
      onChange: v => dispatch(setLastName({ lastName: v })),
      error: errors.lastName,
    },
    {
      id: "email",
      name: "Email *",
      required: true,
      value: email,
      onChange: v => dispatch(setEmail({ email: v })),
      error: errors.email,
    },
    {
      id: "mobile",
      name: "Mobile *",
      required: true,
      value: mobile,
      onChange: v => dispatch(setMobile({ mobile: v })),
      error: errors.mobile,
    },
    {
      id: "username",
      name: "Username *",
      required: true,
      value: username,
      onChange: v => dispatch(setUsername({ username: v })),
      error: errors.username,
    },
    {
      id: "temporaryPassword",
      name: "Temporary Password *",
      required: true,
      value: temporaryPassword,
      onChange: v => dispatch(setTemporaryPassword({ temporaryPassword: v })),
      error: errors.temporaryPassword,
    },
  ] as TTextField[];

  return (
    <Paper square sx={sx}>
      <Box
        px={3}
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight={600}>Staff Details</Typography>
      </Box>
      <Divider variant="fullWidth" sx={{ mb: 3 }} />
      {errors.profilePicture && (
        <Alert severity="error" sx={{ mx: 3, my: 3 }}>
          {errors.profilePicture}
        </Alert>
      )}
      <Box display="flex" alignItems="flex-start" px={3} mb={3}>
        <UploadImage sx={{ mr: 6 }} />
        <SelectRole sx={{ width: 300, mt: 0.8 }} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ px: 3, mb: 3 }}
      >
        {textFields.map(field => (
          <Box key={field.id} width="48%" mb={3} sx={{ position: "relative" }}>
            <Box>
              <InputLabel htmlFor={field.id} sx={{ mb: 2.25, fontWeight: 600 }}>
                {field.name}
              </InputLabel>
              <TextField
                id={field.id}
                name={field.id}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                error={!!field.error}
                helperText={field.error ?? undefined}
                required={field.required}
                onFocus={field.id === "temporaryPassword" ? onFocus : undefined}
                onBlur={field.id === "temporaryPassword" ? onBlur : undefined}
                fullWidth
              />
              {field.id === "temporaryPassword" && (
                <Popper
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  placement="top-start"
                >
                  <PasswordPopover password={temporaryPassword} />
                </Popper>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default UserDetailsForm;

type TTextFieldId = keyof Pick<
  TDetailsForm,
  | "firstName"
  | "lastName"
  | "email"
  | "mobile"
  | "username"
  | "temporaryPassword"
>;

type TTextField = {
  id: TTextFieldId;
  name: string;
  required: boolean;
  value: string;
  onChange: (value: string) => void;
  error: string | null;
};
