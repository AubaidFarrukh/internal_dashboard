import { FC } from "react";
import { Paper, Typography } from "@mui/material";

interface ProductDescriptionProps {
  description: string | null;
}

export const ProductDescription: FC<ProductDescriptionProps> = ({
  description,
}) => (
  <Paper square sx={{ p: 3 }}>
    <Typography variant="h5" component="h2" fontWeight={600}>
      Description
    </Typography>
    <Typography mt={2} sx={{ "& ul": { pl: 3, py: 2 } }}>
      {description ? (
        <span dangerouslySetInnerHTML={{ __html: description }} />
      ) : (
        "N/A"
      )}
    </Typography>
  </Paper>
);

export default ProductDescription;
