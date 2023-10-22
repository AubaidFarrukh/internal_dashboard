import { FC, ReactNode } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

interface CustomModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  confirmIcon?: ReactNode | null;
  actionText?: string;
  actionIcon?: ReactNode | null;
  cancelText?: string;
  cancelIcon?: ReactNode | null;
  loading?: boolean;
  disabled?: boolean;
  error?: string | ReactNode;
  handleConfirmation: () => void;
  handleCancel: () => void;
  children?: ReactNode | null;
  sx?: SxProps<Theme>;
}

export const CustomModal: FC<CustomModalProps> = ({
  open,
  title,
  description,
  confirmText = "Submit",
  confirmIcon = null,
  actionText = "Submitting",
  actionIcon = <CircularProgress size="1rem" />,
  cancelText = "Cancel",
  cancelIcon = null,
  loading = false,
  disabled = false,
  error,
  handleConfirmation,
  handleCancel,
  children = null,
  sx,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ border: "none" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: theme => theme.spacing(1),
          ...sx,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {Boolean(error) && (
          <Alert severity="error" sx={{ my: 1 }}>
            {error}
          </Alert>
        )}
        {Boolean(description) && (
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {description}
          </Typography>
        )}
        {children && <Box py={2}>{children}</Box>}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCancel}
            startIcon={cancelIcon}
            sx={{ width: "48%", textTransform: "none" }}
          >
            {cancelText}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmation}
            startIcon={loading ? actionIcon : confirmIcon}
            disabled={loading || disabled || Boolean(error)}
            sx={{ width: "48%", textTransform: "none" }}
          >
            {loading ? actionText : confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
