import { FC } from "react";
import { IconButton } from "@mui/material";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";

export interface TickRendererProps {
  onClick?: () => void;
}

export const TickRenderer: FC<TickRendererProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <DoneSharpIcon color="success" fontSize="medium" />
    </IconButton>
  );
};

export default TickRenderer;
