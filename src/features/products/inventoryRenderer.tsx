import { FC } from "react";
import { Typography, useTheme } from "@mui/material";

interface InventoryRendererProps {
  count: number | null;
}

export const InventoryRenderer: FC<InventoryRendererProps> = ({ count }) => {
  const theme = useTheme();

  const content =
    count !== null ? `${count} in stock` : "Inventory not tracked";
  const color =
    count === null
      ? theme.palette.grey[500]
      : count < 10
      ? theme.palette.error.main
      : theme.palette.text.primary;

  return <Typography color={color}>{content}</Typography>;
};
