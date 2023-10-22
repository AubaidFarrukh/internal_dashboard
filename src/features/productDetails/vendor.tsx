import { FC } from "react";
import { Paper, Typography } from "@mui/material";

interface VendorProps {
  vendor: string;
}

export const Vendor: FC<VendorProps> = ({ vendor }) => (
  <Paper square sx={{ p: 3 }}>
    <Typography variant="h5" component="h2" fontWeight={600}>
      Vendor
    </Typography>
    <Typography mt={1}>{vendor ?? "-----"}</Typography>
  </Paper>
);

export default Vendor;
