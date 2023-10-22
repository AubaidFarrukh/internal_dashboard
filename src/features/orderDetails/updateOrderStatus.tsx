import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CustomModal } from "../commons";
import { useAppDispatch, useAppSelector } from "../../context/redux/hooks";
import { selectCurrentUser } from "../../services/auth";
import { setMessage } from "../layout/layoutSlice";
import { useUpdateOrderStatusAdminMutation } from "../../services/api";
import { useGetOrderByIdQuery } from "../../services/api";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import type {
  TMeatStatus,
  TShopStatus,
  TUpdateDirective,
} from "../../types/orderDetails";
import { isAll } from "../../utils";
import { meatStatusProgress, shopStatusProgress } from "../../constants";

export interface UpdateOrderStatusProps {
  orderNumber: number;
  shopStatus: TShopStatus | null;
  meatStatus: TMeatStatus | null;
  sx?: SxProps<Theme>;
}

export const UpdateOrderStatus: FC<UpdateOrderStatusProps> = ({
  orderNumber,
  shopStatus,
  meatStatus,
  sx,
}) => {
  const dispatch = useAppDispatch();
  const { isFetching } = useGetOrderByIdQuery({ orderNumber });
  const user = useAppSelector(selectCurrentUser);
  const username = user?.username ?? "";
  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`;
  const initialDirective = {
    directive: "" as TUpdateDirective | "",
    modalTitle: "",
    comment: "",
  };
  const [updateDirective, setUpdateDirective] = useState(initialDirective);
  const isValid = isAll(...Object.values(updateDirective));
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusAdminMutation();

  // Menu status
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(menuAnchor);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) =>
    setMenuAnchor(event.currentTarget);
  const handleCloseMenu = () => setMenuAnchor(null);

  const shopStatusNumber =
    shopStatus && shopStatusProgress[shopStatus.toLowerCase()]
      ? shopStatusProgress[shopStatus.toLowerCase()]
      : 0;
  const meatStatusNumber =
    meatStatus && meatStatusProgress[meatStatus.toLowerCase()]
      ? meatStatusProgress[meatStatus.toLowerCase()]
      : 0;

  // Options for updating order status.
  const updateStateOptions = [
    {
      id: "onhold",
      value: "On-hold",
      disabled:
        (!meatStatusNumber && [1, 2, 6].includes(shopStatusNumber)) ||
        (!shopStatusNumber && [1, 2, 6].includes(meatStatusNumber)) ||
        ([1, 2, 6].includes(shopStatusNumber) &&
          [1, 2, 6].includes(meatStatusNumber)),
    },
    {
      id: "fulfilled",
      value: "Fulfilled",
      disabled:
        (!meatStatusNumber && [1, 2, 6].includes(shopStatusNumber)) ||
        (!shopStatusNumber && [1, 2, 6].includes(meatStatusNumber)) ||
        ([1, 2, 6].includes(shopStatusNumber) &&
          [1, 2, 6].includes(meatStatusNumber)),
    },
    {
      id: "cancel",
      value: "Cancel",
      disabled:
        (!meatStatusNumber && [1, 6].includes(shopStatusNumber)) ||
        (!shopStatusNumber && [1, 6].includes(meatStatusNumber)) ||
        ([1, 6].includes(shopStatusNumber) &&
          [1, 6].includes(meatStatusNumber)),
    },
    {
      id: "reset",
      value: "Reset",
      disabled:
        (!meatStatusNumber && [3].includes(shopStatusNumber)) ||
        (!shopStatusNumber && [3].includes(meatStatusNumber)) ||
        ([3].includes(shopStatusNumber) && [3].includes(meatStatusNumber)),
    },
  ] as { id: string; value: TUpdateDirective; disabled: boolean }[];

  // Cancelling update.
  const handleCancelStatusUpdate = () => {
    setShowUpdateStatusModal(false);
    setUpdateDirective(initialDirective);
  };

  // Handling selecting update option.
  const handleSelect = (directive: TUpdateDirective) => {
    let modalTitle: string;
    let comment: string;
    if (directive === "On-hold") {
      modalTitle = "Place the Order On-Hold";
      comment = `${fullName} placed the order on-hold.`;
    } else if (directive === "Cancel") {
      modalTitle = "Cancel the Order";
      comment = `${fullName} marked the order as cancelled.`;
    } else if (directive === "Fulfilled") {
      modalTitle = "Mark the Order as Fulfilled";
      comment = `${fullName} marked the order as fulfilled.`;
    } else {
      modalTitle = "Reset the Order";
      comment = `${fullName} has reset the order.`;
    }
    setUpdateDirective({ directive, modalTitle, comment });
    handleCloseMenu();
    setShowUpdateStatusModal(true);
  };

  // Updating order status.
  const handleStatusUpdate = async () => {
    if (!isValid || isUpdating || !updateDirective.directive) return;
    try {
      const res = await updateStatus({
        username,
        orderNumber,
        oldShopStatus: shopStatus,
        oldMeatStatus: meatStatus,
        updateDirective: updateDirective.directive,
        comment: updateDirective.comment,
      }).unwrap();

      if (res.status === "SUCCESS") {
        const message = `Order status updated.`;
        dispatch(setMessage({ success: true, message }));
      } else {
        dispatch(setMessage({ success: false, message: res.error ?? null }));
      }

      setUpdateDirective(initialDirective);
      setShowUpdateStatusModal(false);
    } catch (error) {
      dispatch(
        setMessage({ success: false, message: "Something went wrong." })
      );
    }
  };

  return (
    <Box sx={sx}>
      <Button
        id="status-options-button"
        aria-controls={isMenuOpen ? "status-options-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleOpenMenu}
        endIcon={
          isFetching ? (
            <CircularProgress size="1rem" />
          ) : (
            <KeyboardArrowDownIcon />
          )
        }
        disabled={isFetching}
        sx={{ textTransform: "none" }}
      >
        Update Status
      </Button>
      <Menu
        id="status-options-menu"
        MenuListProps={{ "aria-labelledby": "status-options-button" }}
        anchorEl={menuAnchor}
        open={isMenuOpen}
        onClose={handleCloseMenu}
      >
        {updateStateOptions.map(option => (
          <MenuItem
            key={option.id}
            value={option.value}
            disabled={option.disabled}
            onClick={() => handleSelect(option.value)}
            sx={{ width: 140 }}
          >
            {option.value}
          </MenuItem>
        ))}
      </Menu>
      <CustomModal
        open={showUpdateStatusModal}
        title={updateDirective.modalTitle}
        confirmText="Update Status"
        actionText="Updating..."
        loading={isUpdating}
        disabled={!isValid}
        handleConfirmation={handleStatusUpdate}
        handleCancel={handleCancelStatusUpdate}
      >
        <TextField
          value={updateDirective.comment}
          onChange={e =>
            setUpdateDirective(prev => ({ ...prev, comment: e.target.value }))
          }
          error={!updateDirective.comment}
          helperText={!updateDirective.comment ? "Required" : ""}
          required
          fullWidth
          multiline
          rows={5}
        />
      </CustomModal>
    </Box>
  );
};

export default UpdateOrderStatus;
