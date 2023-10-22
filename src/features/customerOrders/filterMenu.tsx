import { FC, useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
  Paper,
  MenuList,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DoneIcon from "@mui/icons-material/Done";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import {
  selectDeliveryMethod,
  selectHasMeat,
  selectShopStatus,
  selectMeatStatus,
  setDeliveryMethod as setDeliveryMethodAction,
  setHasMeat as setHasMeatAction,
  setShopStatus as setShopStatusAction,
  setMeatStatus as setMeatStatusAction,
} from "./ordersSlice";
import { toTitleCase } from "../../utils";
import type { TDeliveryMethod } from "../../types/orders";
import type { TMeatStatus, TShopStatus } from "../../types/orderDetails";

export interface FilterMenuProps {
  sx: SxProps<Theme>;
}

export const FilterMenu: FC<FilterMenuProps> = ({ sx }) => {
  const dispatch = useAppDispatch();

  // State
  const deliveryMethod = useAppSelector(selectDeliveryMethod);
  const hasMeat = useAppSelector(selectHasMeat);
  const shopStatus = useAppSelector(selectShopStatus);
  const meatStatus = useAppSelector(selectMeatStatus);

  // Menu controls
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const intialChildMenuVisibility = {
    deliveryMethod: false,
    orderContents: false,
    shopStatus: false,
    meatStatus: false,
  } as Record<TMenu, boolean>;
  const [childMenuVisibility, setChildMenuVisibility] = useState(
    intialChildMenuVisibility
  );
  const open = Boolean(menuAnchor);
  const openFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const closeFilterMenu = () => {
    setChildMenuVisibility(intialChildMenuVisibility);
    setMenuAnchor(null);
  };

  let menus = [
    {
      id: "deliveryMethod",
      label: "Delivery Method",
      isChildMenuVisible: childMenuVisibility.deliveryMethod,
      setIsChildMenuVisible: () =>
        setChildMenuVisibility({
          ...intialChildMenuVisibility,
          deliveryMethod: true,
        }),
      closeChildMenu: () => setChildMenuVisibility(intialChildMenuVisibility),
      filterValue: deliveryMethod,
      updateFilter: (newDeliveryMethod: TDeliveryMethod | null) => {
        const newValue =
          newDeliveryMethod === deliveryMethod ? null : newDeliveryMethod;
        dispatch(setDeliveryMethodAction({ deliveryMethod: newValue }));
        closeFilterMenu();
      },
      childMenu: [
        {
          id: "sameday",
          label: "Same Day Delivery",
          value: "Same Day Delivery" as TDeliveryMethod,
        },
        {
          id: "nextday",
          label: "Next Day Delivery",
          value: "Next Day Delivery" as TDeliveryMethod,
        },
        {
          id: "local",
          label: "Local Pickup",
          value: "SaveCo Bradford" as TDeliveryMethod,
        },
        {
          id: "express",
          label: "2-Hour Express Delivery",
          value: "2-hour Express Delivery" as TDeliveryMethod,
        },
      ],
    },
    {
      id: "orderContents",
      label: "Order Contents",
      isChildMenuVisible: childMenuVisibility.orderContents,
      setIsChildMenuVisible: () =>
        setChildMenuVisibility({
          ...intialChildMenuVisibility,
          orderContents: true,
        }),
      closeChildMenu: () => setChildMenuVisibility(intialChildMenuVisibility),
      filterValue: hasMeat,
      updateFilter: () => {
        const newValue = hasMeat ? null : true;
        dispatch(setHasMeatAction({ hasMeat: newValue }));
        closeFilterMenu();
      },
      childMenu: [{ id: "hasMeat", label: "Contains Meat", value: true }],
    },
    {
      id: "shopStatus",
      label: "Shop Status",
      isChildMenuVisible: childMenuVisibility.shopStatus,
      setIsChildMenuVisible: () =>
        setChildMenuVisibility({
          ...intialChildMenuVisibility,
          shopStatus: true,
        }),
      closeChildMenu: () => setChildMenuVisibility(intialChildMenuVisibility),
      filterValue: shopStatus,
      updateFilter: (status: TShopStatus | null) => {
        const newValue = status === shopStatus ? null : status;
        dispatch(setShopStatusAction({ shopStatus: newValue }));
        closeFilterMenu();
      },
      childMenu: [
        {
          id: "readyForPicking",
          label: toTitleCase("Ready for picking" as TShopStatus),
          value: "Ready for picking" as TShopStatus,
        },
        {
          id: "picking",
          label: toTitleCase("Picking in progress" as TShopStatus),
          value: "Picking in progress" as TShopStatus,
        },
        {
          id: "readyForDelivery",
          label: toTitleCase("Ready for delivery" as TShopStatus),
          value: "Ready for delivery" as TShopStatus,
        },
        {
          id: "readyForCollection",
          label: toTitleCase("Ready for collection" as TShopStatus),
          value: "Ready for collection" as TShopStatus,
        },
        {
          id: "dispatched",
          label: toTitleCase("Dispatched" as TShopStatus),
          value: "Dispatched" as TShopStatus,
        },
        {
          id: "fulfilled",
          label: toTitleCase("Fulfilled" as TShopStatus),
          value: "Fulfilled" as TShopStatus,
        },
        {
          id: "cancelled",
          label: toTitleCase("Cancelled" as TShopStatus),
          value: "Cancelled" as TShopStatus,
        },
        {
          id: "hold",
          label: toTitleCase("On-hold" as TShopStatus),
          value: "On-hold" as TShopStatus,
        },
      ],
    },
    {
      id: "meatStatus",
      label: "Meat Status",
      isChildMenuVisible: childMenuVisibility.meatStatus,
      setIsChildMenuVisible: () =>
        setChildMenuVisibility({
          ...intialChildMenuVisibility,
          meatStatus: true,
        }),
      closeChildMenu: () => setChildMenuVisibility(intialChildMenuVisibility),
      filterValue: meatStatus,
      updateFilter: (status: TMeatStatus | null) => {
        const newValue = status === meatStatus ? null : status;
        dispatch(setMeatStatusAction({ meatStatus: newValue }));
        closeFilterMenu();
      },
      childMenu: [],
    },
  ] as TMenuStructure[];
  menus[3].childMenu = menus[2].childMenu;

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
        title="Apply filters on orders."
        sx={sx}
      >
        <FilterAltIcon />
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={menuAnchor}
        open={open}
        onClose={closeFilterMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
        sx={{
          "& .overflow": {
            overflow: "visible",
            position: "relative",
            width: "180px",
          },
        }}
        classes={{ paper: "overflow" }}
      >
        {menus.map((menu, iii) => (
          <Box key={menu.id}>
            <MenuItem
              onMouseEnter={menu.setIsChildMenuVisible}
              onClick={menu.setIsChildMenuVisible}
              href="#"
            >
              <ListItemText>{menu.label}</ListItemText>
              <ArrowRightIcon />
            </MenuItem>
            {menu.isChildMenuVisible ? (
              <Paper
                sx={{ position: "absolute", top: 36 * iii + 2, left: "100%" }}
              >
                <MenuList>
                  {menu.childMenu.map(childMenu => (
                    <MenuItem
                      key={childMenu.id}
                      onClick={() => menu.updateFilter(childMenu.value)}
                    >
                      <ListItemIcon>
                        {menu.filterValue === childMenu.value && (
                          <DoneIcon color="success" />
                        )}
                      </ListItemIcon>
                      <ListItemText>{childMenu.label}</ListItemText>
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            ) : null}
          </Box>
        ))}
      </Menu>
    </>
  );
};

type TMenu = "deliveryMethod" | "orderContents" | "shopStatus" | "meatStatus";
type TMenuStructure = {
  id: TMenu;
  label: string;
  isChildMenuVisible: boolean;
  setIsChildMenuVisible: () => void;
  closeChildMenu: () => void;
  filterValue: any;
  updateFilter: (value: any) => void;
  childMenu: { id: string; label: string; value: any }[];
};

export default FilterMenu;
