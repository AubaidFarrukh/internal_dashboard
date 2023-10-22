import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { SxProps, Theme } from "@mui/material";
import type { FC } from "react";

interface IsEditingProps {
  sx?: SxProps<Theme>;
}

export const IsEditing: FC<IsEditingProps> = ({ sx }) => {
  return (
    <Typography
      variant="subtitle2"
      color="text.secondary"
      fontWeight={600}
      minWidth={80}
      textAlign="end"
      sx={sx}
      mt={1}
    >
      ...{<EditIcon fontSize="inherit" />} Editing
    </Typography>
  );
};

export default IsEditing;
