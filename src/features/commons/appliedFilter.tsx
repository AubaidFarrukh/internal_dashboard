import type { FC } from "react";
import { Button, Fade, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LightTooltip } from ".";

interface AppliedFilterProps {
  title: string;
  onClick: () => void;
  tooltip: string;
}

export const AppliedFilter: FC<AppliedFilterProps> = ({
  title,
  onClick,
  tooltip,
}) => {
  return (
    <LightTooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      title={tooltip}
    >
      <Button
        variant="outlined"
        startIcon={<CloseIcon />}
        sx={{
          borderStyle: "dashed",
          borderRadius: 1000,
          mr: 1,
          textTransform: "none",
        }}
        onClick={onClick}
      >
        <Typography
          sx={{
            maxWidth: 300,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
      </Button>
    </LightTooltip>
  );
};

export default AppliedFilter;
