import { Button, CircularProgress, SxProps, Theme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  useGetProductByIdQuery,
  useUpdateProductDetailsMutation,
} from "../../services/api";
import {
  selectEditingMode,
  selectAisleLocation,
  selectCategory,
  selectBarcodes,
  enableEditingMode,
  disableEditingMode,
} from "./productDetailsSlice";
import { setMessage } from "../layout/layoutSlice";
import type { FC } from "react";
import type { TProductDetails } from "../../types/productDetails";

export interface EditProductDetailsProps {
  product: TProductDetails;
  sx?: SxProps<Theme>;
}

export const EditProductDetails: FC<EditProductDetailsProps> = ({
  product,
  sx,
}) => {
  const dispatch = useAppDispatch();
  const isEditingMode = useAppSelector(selectEditingMode);
  const aisleLocationState = useAppSelector(selectAisleLocation);
  const categoryState = useAppSelector(selectCategory);
  const barcodesState = useAppSelector(selectBarcodes);
  const { isFetching: isFetchingProduct } = useGetProductByIdQuery({
    productId: product.id,
  });
  const [updateProduct, { isLoading: isUpdating, reset: resetUpdating }] =
    useUpdateProductDetailsMutation();

  const oldProductDetails = {
    aisleLocation: product.aisleLocation,
    category: product.category,
    barcodes: product.barcode,
  };
  const newProductDetails = {
    aisleLocation: aisleLocationState,
    category: categoryState ?? undefined,
    barcodes: barcodesState,
  };
  const isProductDetailsUpdated =
    JSON.stringify(oldProductDetails) !== JSON.stringify(newProductDetails);

  const isLoading = isUpdating || isFetchingProduct;
  const buttonStartIcon = isLoading ? (
    <CircularProgress size="1rem" />
  ) : isEditingMode ? (
    <SaveIcon />
  ) : (
    <EditIcon />
  );
  const buttonText = isLoading ? "Saving..." : isEditingMode ? "Save" : "Edit";

  const handleUpdatingProduct = async () => {
    if (!isProductDetailsUpdated) {
      const message = `No change in product details.`;
      dispatch(setMessage({ success: true, message }));
      dispatch(disableEditingMode());
      return;
    }

    try {
      const res = await updateProduct({
        variantId: product.id,
        ...newProductDetails,
      }).unwrap();
      resetUpdating();

      if (res.status === "SUCCESS") {
        const message = `Product details updated successfully.`;
        dispatch(setMessage({ success: true, message }));
      } else {
        dispatch(setMessage({ success: false, message: res.message }));
      }
    } catch (error) {
      dispatch(
        setMessage({ success: false, message: "Something went wrong." })
      );
    } finally {
      dispatch(disableEditingMode());
    }
  };

  const toggleEditingMode = async () => {
    isEditingMode
      ? await handleUpdatingProduct()
      : dispatch(
          enableEditingMode({
            aisleLocation: product.aisleLocation,
            category: product.category,
            barcodes: product.barcode,
          })
        );
  };

  return (
    <Button
      variant="contained"
      startIcon={buttonStartIcon}
      onClick={toggleEditingMode}
      disabled={isLoading}
      sx={sx}
    >
      {buttonText}
    </Button>
  );
};

export default EditProductDetails;
