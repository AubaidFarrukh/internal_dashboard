import { FC } from "react";
import { Paper, Typography } from "@mui/material";

interface ProductTypeProps {
  type: string;
}

export const ProductType: FC<ProductTypeProps> = ({ type }) => (
  <Paper square sx={{ p: 3 }}>
    <Typography variant="h5" component="h2" fontWeight={600}>
      Product Type
    </Typography>
    <Typography mt={1}>{type ?? "-----"}</Typography>
  </Paper>
);

export default ProductType;
