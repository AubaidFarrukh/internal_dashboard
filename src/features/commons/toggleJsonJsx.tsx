import { FC } from "react";
import { Button, SxProps, Theme } from "@mui/material";
import DataObjectIcon from "@mui/icons-material/DataObject";

interface ToggleJsonJsxProps {
  showJson: boolean;
  toggleShowJson: () => void;
  sx?: SxProps<Theme>;
}

export const ToggleJsonJsx: FC<ToggleJsonJsxProps> = ({
  showJson,
  toggleShowJson,
  sx,
}) => {
  return (
    <Button
      onClick={toggleShowJson}
      variant="outlined"
      startIcon={<DataObjectIcon />}
      sx={{ textTransform: "none", ...sx }}
    >
      {showJson ? "Hide" : "Show"} JSON
    </Button>
  );
};

export default ToggleJsonJsx;
