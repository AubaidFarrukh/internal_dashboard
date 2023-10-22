import { FC } from "react";
import { Stack } from "@mui/material";
import { AppliedFilter } from "../commons";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectProductTitle,
  selectVendor,
  setProductTitle,
  setVendor,
} from "./productsSlice";

interface AppliedFiltersListProps {
  resetProductTitleFilterLocal: () => void;
}

export const AppliedFiltersList: FC<AppliedFiltersListProps> = ({
  resetProductTitleFilterLocal,
}) => {
  const dispatch = useAppDispatch();
  const productTitle = useAppSelector(selectProductTitle);
  const vendor = useAppSelector(selectVendor);

  const hasProductTitleFilter = !!productTitle;
  const hasVendorFilter = !!vendor;
  const hasAnyFilter = hasProductTitleFilter || hasVendorFilter;

  const removeProductTitleFilter = () => {
    dispatch(setProductTitle({ productTitle: null }));
    resetProductTitleFilterLocal();
  };
  const removeVendorFilter = () => dispatch(setVendor({ vendor: null }));

  return (
    <Stack direction="row" mb={hasAnyFilter ? 3 : 1}>
      {productTitle && (
        <AppliedFilter
          title={`Product: ${productTitle}`}
          onClick={removeProductTitleFilter}
          tooltip="Remove product title filter."
        />
      )}
      {vendor && (
        <AppliedFilter
          title={`Vendor: ${vendor}`}
          onClick={removeVendorFilter}
          tooltip="Remove vendor filter."
        />
      )}
    </Stack>
  );
};

export default AppliedFiltersList;
