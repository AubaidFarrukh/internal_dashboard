import { FC } from "react";
import {
  Alert,
  AlertColor,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarProps,
  SnackbarCloseReason,
} from "@mui/material";

export interface CustomSnackbarProps {
  open: boolean;
  onClose: (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  severity: AlertColor;
  children: string;
  duration?: number;
  transitionComponent?: SnackbarProps["TransitionComponent"];
}

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="right" />;
};

const DEFAULT_AUTO_HIDE_DURATION = 3000;

export const CustomSnackbar: FC<CustomSnackbarProps> = ({
  open,
  onClose,
  severity,
  children,
  duration = DEFAULT_AUTO_HIDE_DURATION,
  transitionComponent: TransitionComponent = SlideTransition,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      TransitionComponent={TransitionComponent}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
