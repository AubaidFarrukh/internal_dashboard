import { FC } from "react";
import { Paper, Typography, useTheme } from "@mui/material";

interface InventoryProps {
  count: number | null;
}

export const Inventory: FC<InventoryProps> = ({ count }) => {
  const theme = useTheme();

  const content =
    count !== null ? `${count} in stock` : "Inventory not tracked";
  const color =
    count === null
      ? theme.palette.grey[500]
      : count < 10
      ? theme.palette.error.main
      : theme.palette.text.primary;

  return (
    <Paper square sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" fontWeight={600}>
        Inventory
      </Typography>
      <Typography mt={1} color={color}>
        {content}
      </Typography>
    </Paper>
  );
};

export default Inventory;
