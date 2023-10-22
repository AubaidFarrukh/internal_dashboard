import { FC } from "react";
import { Paper, Typography } from "@mui/material";

interface OrderNoteProps {
  note: string | null;
}

export const OrderNote: FC<OrderNoteProps> = ({ note }) => (
  <Paper square sx={{ p: 3 }}>
    <Typography variant="h5" component="h2" fontWeight={600}>
      Order Note
    </Typography>
    <Typography mt={1}>{note || "None"}</Typography>
  </Paper>
);

export default OrderNote;
