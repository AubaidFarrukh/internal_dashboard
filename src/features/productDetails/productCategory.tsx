import {
  Box,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { IsEditing } from "./isEditing";
import { AmbientIcon, BulkIcon, ChilledIcon, FrozenIcon } from "../commons";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  selectEditingMode,
  selectCategory,
  setCategory as setCategoryAction,
} from "./productDetailsSlice";
import type { FC } from "react";
import type { SelectProps } from "@mui/material";
import type { TProductCategory } from "../../types/products";

export interface ProductCategoryProps {
  category: TProductCategory | null;
}

export const ProductCategory: FC<ProductCategoryProps> = ({ category }) => {
  const dispatch = useAppDispatch();
  const isEditingMode = useAppSelector(selectEditingMode);
  const categoryState = useAppSelector(selectCategory);

  const CategoryIcon =
    category === "Ambient"
      ? AmbientIcon
      : category === "Chilled"
      ? ChilledIcon
      : category === "Frozen"
      ? FrozenIcon
      : category === "Bulk"
      ? BulkIcon
      : null;

  const setCategory: SelectProps["onChange"] = e => {
    const category = e.target.value as TCategoryOption["value"];
    dispatch(setCategoryAction({ category }));
  };

  let aisleLocationOptions: TCategoryOption[] = [
    {
      id: "ambient",
      label: "Ambient",
      value: "Ambient",
      icon: <AmbientIcon />,
    },
    {
      id: "chilled",
      label: "Chilled",
      value: "Chilled",
      icon: <ChilledIcon />,
    },
    {
      id: "frozen",
      label: "Frozen",
      value: "Frozen",
      icon: <FrozenIcon />,
    },
    {
      id: "bulk",
      label: "Bulk",
      value: "Bulk",
      icon: <BulkIcon />,
    },
  ];

  return (
    <Paper square sx={{ p: 3 }}>
      <Box display="flex" alignItems="start">
        <Typography variant="h5" component="h2" fontWeight={600}>
          Category
        </Typography>
        {isEditingMode ? <IsEditing sx={{ ml: "auto" }} /> : null}
      </Box>
      {!isEditingMode ? (
        <Box display="flex" alignItems="center" mt={1}>
          {CategoryIcon ? <CategoryIcon sx={{ mr: 1 }} /> : null}
          <Typography>{category ?? "-----"}</Typography>
        </Box>
      ) : (
        <FormControl fullWidth size="small" sx={{ mt: 2, color: "black" }}>
          <InputLabel id="update-category">Location</InputLabel>
          <Select
            labelId="update-category"
            value={categoryState}
            onChange={setCategory}
            fullWidth
            size="small"
          >
            {aisleLocationOptions.map(option => (
              <MenuItem key={option.id} value={option.value}>
                <ListItemIcon>{option.icon}</ListItemIcon>
                <ListItemText sx={{ display: "inline-block" }}>
                  {option.label}
                </ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Paper>
  );
};
export default ProductCategory;

type TCategoryOption = {
  id: string;
  label: NonNullable<TProductCategory>;
  value: NonNullable<TProductCategory>;
  icon: JSX.Element;
};
