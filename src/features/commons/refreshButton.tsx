import { FC } from "react";
import { Button, SxProps, Theme } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface RefreshButtonProps {
  onClick: () => void;
  loading: boolean;
  sx: SxProps<Theme>;
}

export const RefreshButton: FC<RefreshButtonProps> = ({
  loading,
  onClick,
  sx,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      color="primary"
      variant="outlined"
      startIcon={<RefreshIcon />}
      sx={sx}
    >
      Refresh
    </Button>
  );
};

export default RefreshButton;
