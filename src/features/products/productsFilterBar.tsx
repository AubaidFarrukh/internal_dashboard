import { FC, useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { ProductSearchBar } from "./productSearchBar";
import { FilterMenu } from "./filterMenu";
import { AppliedFiltersList } from "./appliedFiltersList";
import { useAppSelector } from "../../context/redux/hooks";
import { selectProductTitle } from "./productsSlice";
import type { TProductTitle } from "../../types/products";

export const ProductsFilterBar: FC = () => {
  // Local state for product title filter.
  const productTitle = useAppSelector(selectProductTitle);
  const [productTitleLocal, setProductTitleLocal] =
    useState<TProductTitle>(productTitle);
  const resetProductTitleFilterLocal = () => setProductTitleLocal(null);

  const buttonsCommonStyles: SxProps<Theme> = {
    display: "flex",
    alignItems: "stretch",
    mr: theme => theme.spacing(1),
    textTransform: "capitalize",
    width: "fit-content",
    "&": { alignItems: "center" },
  };

  return (
    <Box display="flex" flexDirection="column" m={0} p={0}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        sx={{ mb: 2, overflow: "visible" }}
      >
        <ProductSearchBar
          productTitleLocal={productTitleLocal}
          setProductTitleLocal={setProductTitleLocal}
          sx={buttonsCommonStyles}
        />
        <FilterMenu sx={buttonsCommonStyles} />
      </Box>
      <AppliedFiltersList
        resetProductTitleFilterLocal={resetProductTitleFilterLocal}
      />
    </Box>
  );
};

export default ProductsFilterBar;
