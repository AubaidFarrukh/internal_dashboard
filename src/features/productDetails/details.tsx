import {
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ProductImage } from "./productImage";
import { gbpFormatter } from "../../utils";
import type { FC } from "react";
import type { TProductDetails } from "../../types/productDetails";

interface DetailsProps {
  product: TProductDetails;
}

export const Details: FC<DetailsProps> = ({ product }) => {
  const size1400 = useMediaQuery("(max-width:1400px)");
  const size1600 = useMediaQuery("(max-width:1600px)");

  const details = [
    {
      name: "Price",
      value: gbpFormatter.format(product.price),
      colSpans: !size1400 && size1600 ? 6 : 4,
    },
    {
      name: "Cost Price",
      value: product.cost ? gbpFormatter.format(product.cost) : "-----",
      colSpans: !size1400 && size1600 ? 6 : 4,
    },
    {
      name: "Compare at Price",
      value: product.compareAt
        ? gbpFormatter.format(product.compareAt)
        : "-----",
      colSpans: !size1400 && size1600 ? 12 : 4,
    },
    {
      name: "Weight",
      value: `${product.weight.value} ${product.weight.unit}`,
      colSpans: !size1400 && size1600 ? 6 : 4,
    },
    {
      name: "Variant",
      value: product.variantName ?? "-----",
      colSpans: !size1400 && size1600 ? 6 : 8,
    },
    {
      name: "Barcode",
      value: product.barcode?.[0] ?? "-----",
      colSpans: !size1400 && size1600 ? 6 : 4,
    },
    {
      name: "SKU",
      value: product.sku ?? "-----",
      colSpans: !size1400 && size1600 ? 6 : 8,
    },
    {
      name: "VAT Applicable",
      value: product.taxable ? "Yes" : "No",
      colSpans: 12,
    },
  ];

  return (
    <Paper
      square
      sx={{ display: "flex", flexDirection: size1400 ? "column" : "row" }}
    >
      <ProductImage src={product.img.src} alt={product.img.alt} height={350} />
      <Divider flexItem orientation={size1400 ? "horizontal" : "vertical"} />
      <Box px={5} py={4} width="100%" height="100%">
        <Typography variant="h5" component="h2" fontWeight={600} mb={3}>
          Product Details
        </Typography>
        <Grid container>
          {details.map(detail => (
            <Grid item xs={detail.colSpans} mb={3} key={detail.name}>
              <Typography variant="h6" component="h3" fontWeight={600} mb={1}>
                {detail.name}
              </Typography>
              <Typography mt={1}>{detail.value}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default Details;
