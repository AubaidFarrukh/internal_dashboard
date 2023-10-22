import { FC } from "react";
import { Paper, Typography } from "@mui/material";

interface ProductTitleProps {
  title: string;
}

export const ProductTitle: FC<ProductTitleProps> = ({ title }) => (
  <Paper square sx={{ p: 3 }}>
    <Typography variant="h5" component="h2" fontWeight={600}>
      Title
    </Typography>
    <Typography mt={1}>{title ?? "-----"}</Typography>
  </Paper>
);

export default ProductTitle;
