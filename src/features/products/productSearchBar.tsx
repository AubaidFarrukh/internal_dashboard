import { FC } from "react";
import { Button, SxProps, Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBar } from "../commons";
import { useAppDispatch } from "../../context/redux/hooks";
import { setProductTitle as setProductTitleAction } from "./productsSlice";
import type { TProductTitle } from "../../types/products";

interface ProductSearchBarProps {
  productTitleLocal: TProductTitle;
  setProductTitleLocal: (productTitle: TProductTitle) => void;
  sx: SxProps<Theme>;
}

export const ProductSearchBar: FC<ProductSearchBarProps> = ({
  productTitleLocal,
  setProductTitleLocal,
  sx,
}) => {
  const dispatch = useAppDispatch();

  const onValueChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    // Update value if the input is a valid number.
    if (e.target.value === "") return setProductTitleLocal(null);
    setProductTitleLocal(e.target.value);
  };

  // Redux store state.
  const clearInput = () => {
    setProductTitleLocal(null);
    dispatch(setProductTitleAction({ productTitle: null }));
  };

  const updateState = () => {
    dispatch(setProductTitleAction({ productTitle: productTitleLocal }));
  };

  const onPressEnter: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === "Enter") updateState();
  };

  return (
    <>
      <SearchBar
        placeholder="Product Name..."
        variant="outlined"
        value={productTitleLocal ?? ""}
        onChange={onValueChange}
        onKeyDown={onPressEnter}
        clearInput={clearInput}
      />
      <Button
        onClick={updateState}
        variant="contained"
        color="primary"
        title="Search product by name, variant ID, product ID or barcode."
        sx={sx}
      >
        <SearchIcon sx={{ fill: "#ffffff" }} />
      </Button>
    </>
  );
};

export default ProductSearchBar;
