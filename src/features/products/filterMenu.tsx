import { FC, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SxProps,
  Theme,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DoneIcon from "@mui/icons-material/Done";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { selectVendor, setVendor as setVendorAction } from "./productsSlice";
import { EVendor } from "../../types/products";

interface FilterMenuProps {
  sx: SxProps<Theme>;
}

export const FilterMenu: FC<FilterMenuProps> = ({ sx }) => {
  const dispatch = useAppDispatch();

  // Menu controls
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const openFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeFilterMenu = () => setAnchorEl(null);

  // Vendor state management.
  const vendor = useAppSelector(selectVendor);
  const updateVendor = (newVendor: EVendor) => {
    const newValue = newVendor === vendor ? null : newVendor;
    dispatch(setVendorAction({ vendor: newValue }));
    closeFilterMenu();
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        id="filter-button"
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={openFilterMenu}
        title="Apply filters on products."
        sx={sx}
      >
        <FilterAltIcon />
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeFilterMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        <ListSubheader>Vendor</ListSubheader>
        {Object.values(EVendor).map(_vendor => (
          <MenuItem key={_vendor} onClick={() => updateVendor(_vendor)}>
            <ListItemIcon>
              {vendor === _vendor && <DoneIcon color="success" />}
            </ListItemIcon>
            <ListItemText>{_vendor}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FilterMenu;
