import { FC, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  BackBtn,
  LoadingContent,
  JsonViewer,
  NotFound,
  ToggleJsonJsx,
} from "../commons";
import { ProductTitle } from "./productTitle";
import { Details } from "./details";
import { ProductDescription } from "./description";
import { Inventory } from "./inventory";
import { AisleLocation } from "./aisleLocation";
import { ProductCategory } from "./productCategory";
import { Vendor } from "./vendor";
import { ProductType } from "./productType";
import { ProductBarcodes } from "./productBarcodes";
import { ChangeLogs } from "./changeLogs";
import { EditProductDetails } from "./editProductDetails";
import { useGetProductByIdQuery } from "../../services/api";

export const ProductDetails: FC = () => {
  const location = useLocation();
  const productId = +location.pathname.split("/").slice(-1)[0];
  const { isLoading, data: product } = useGetProductByIdQuery({ productId });

  const [showJson, setShowJson] = useState(false);
  const toggleShowJson = () => setShowJson(prev => !prev);

  // Show loading sign if product is being fetched.
  if (isLoading) return <LoadingContent />;

  // If no data is found for the given product
  if (!product) {
    return (
      <NotFound message="Product could not be found. Make sure the product id is correct." />
    );
  }

  return (
    <>
      <BackBtn path="/products" />
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <ToggleJsonJsx
          showJson={showJson}
          toggleShowJson={toggleShowJson}
          sx={{ mr: 1 }}
        />
        {!showJson ? (
          <EditProductDetails product={product} sx={{ width: 150 }} />
        ) : null}
      </Box>

      {showJson && <JsonViewer json={product} />}
      {!showJson && (
        <Box pb={10}>
          <Grid container columns={60} justifyContent="space-between">
            <Grid item sm={45}>
              <Stack spacing={3}>
                <ProductTitle title={product.title} />
                <Details product={product} />
                <ProductDescription description={product.description} />
              </Stack>
            </Grid>
            <Grid item sm={14}>
              <Stack spacing={3}>
                <Inventory count={product.inventory} />
                <AisleLocation location={product.aisleLocation} />
                <ProductCategory category={product.category} />
                <Vendor vendor={product.vendor} />
                <ProductType type={product.type} />
                <ProductBarcodes barcodes={product.barcode} />
                <ChangeLogs variantId={productId} />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;
