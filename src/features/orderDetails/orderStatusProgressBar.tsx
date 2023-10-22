import { Badge, Box, Stack, Avatar, useTheme } from "@mui/material";
import {
  ArrowLeft,
  ArrowRight,
  BoxChecked,
  ChickenIcon,
  CustomTooltip,
  ShopIcon,
  ShoppingBag,
  DispatchedIcon,
  DispatchedIconMeat,
  TruckIcon,
} from "../commons";
import {
  EMeatStatuses,
  EShopStatuses,
  meatStatusProgress,
  shopStatusProgress,
} from "../../constants";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import type { TPicker } from "../../types/orders";

export interface OrderStatusProgressBarInterface {
  shopStatus: string | null;
  meatStatus: string | null;
  shopPicker: TPicker | null;
  meatPicker: TPicker | null;
  shopItemsCount: number;
  meatItemsCount: number;
  sx?: SxProps<Theme>;
}

export const OrderStatusProgressBar: FC<OrderStatusProgressBarInterface> = ({
  shopStatus,
  meatStatus,
  shopPicker,
  meatPicker,
  shopItemsCount,
  meatItemsCount,
  sx,
}) => {
  const theme = useTheme();
  const shopPickerName =
    shopPicker?.firstName && shopPicker.lastName
      ? `${shopPicker.firstName} ${shopPicker.lastName}`
      : undefined;
  const shopPickerPic = shopPicker?.profilePicture;
  const meatPickerName =
    meatPicker?.firstName && meatPicker.lastName
      ? `${meatPicker.firstName} ${meatPicker.lastName}`
      : undefined;
  const meatPickerPic = meatPicker?.profilePicture;
  const avatarSize = 35;
  const activeColor = theme.palette.primary.main;
  const notActiveColor = "#DBDBDB";

  const shopStatusNumber =
    shopStatus && shopStatusProgress[shopStatus.toLowerCase()]
      ? shopStatusProgress[shopStatus.toLowerCase()]
      : 0;
  const meatStatusNumber =
    meatStatus && meatStatusProgress[meatStatus.toLowerCase()]
      ? meatStatusProgress[meatStatus.toLowerCase()]
      : 0;

  const badgeStyles: SxProps<Theme> = {
    height: 20,
    width: 20,
    border: t =>
      `2px solid ${
        shopStatusNumber >= 3 ? t.palette.primary.main : "rgb(219, 219, 219)"
      }`,
    color: t =>
      shopStatusNumber >= 3 ? t.palette.primary.main : "rgb(219, 219, 219)",
    bgcolor: "white",
    mt: -0.5,
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        minWidth={768}
        py={2}
        mb={1}
        sx={sx}
      >
        <Box sx={{ "& .badge": { ...badgeStyles, ml: -0.5 } }}>
          <CustomTooltip title={EShopStatuses.READY_FOR_PICKING}>
            <Badge
              badgeContent={shopItemsCount}
              overlap="circular"
              classes={{ badge: "badge" }}
              anchorOrigin={{ horizontal: "left", vertical: "top" }}
              sx={{ ml: shopItemsCount ? 1.5 : 0 }}
            >
              <ShopIcon
                color={shopStatusNumber >= 3 ? activeColor : undefined}
              />
            </Badge>
          </CustomTooltip>
        </Box>

        <ArrowRight color={shopStatusNumber >= 4 ? activeColor : undefined} />

        <CustomTooltip
          title={
            shopPickerName || shopPicker?.username
              ? `Picker: ${shopPickerName ?? shopPicker?.username}`
              : "Shop Picker"
          }
        >
          <Avatar
            src={shopPickerPic}
            alt={shopPickerName}
            sx={{
              bgcolor:
                shopStatusNumber >= 4 && !shopPickerPic
                  ? activeColor
                  : notActiveColor,
              height: avatarSize,
              width: avatarSize,
            }}
          >
            {shopPickerName
              ?.split(" ")
              .map(_ => _[0])
              .join("") ?? shopPicker?.username[0]}
          </Avatar>
        </CustomTooltip>

        <ArrowRight color={shopStatusNumber >= 5 ? activeColor : undefined} />

        <CustomTooltip title={EShopStatuses.PICKED}>
          <ShoppingBag
            color={shopStatusNumber >= 5 ? activeColor : undefined}
          />
        </CustomTooltip>

        <ArrowRight color={shopStatusNumber >= 6 ? activeColor : undefined} />

        <CustomTooltip title={EShopStatuses.READY_FOR_DELIVERY}>
          <BoxChecked color={shopStatusNumber >= 6 ? activeColor : undefined} />
        </CustomTooltip>

        <ArrowRight color={shopStatusNumber >= 7 ? activeColor : undefined} />

        <CustomTooltip title={EShopStatuses.DISPATCHED}>
          <DispatchedIcon
            color={shopStatusNumber >= 7 ? activeColor : undefined}
          />
        </CustomTooltip>

        <ArrowRight color={shopStatusNumber >= 8 ? activeColor : undefined} />

        <CustomTooltip title={EShopStatuses.FULFILLED}>
          <TruckIcon
            color={
              (shopStatusNumber >= 8 && meatStatusNumber === 0) ||
              (shopStatusNumber === 0 && meatStatusNumber >= 8) ||
              (shopStatusNumber >= 8 && meatStatusNumber >= 8)
                ? activeColor
                : undefined
            }
          />
        </CustomTooltip>

        <ArrowLeft color={meatStatusNumber >= 8 ? activeColor : undefined} />

        <CustomTooltip title={EShopStatuses.DISPATCHED}>
          <DispatchedIconMeat
            color={meatStatusNumber >= 7 ? activeColor : undefined}
          />
        </CustomTooltip>

        <ArrowLeft color={meatStatusNumber >= 7 ? activeColor : undefined} />

        <CustomTooltip title={EMeatStatuses.READY_FOR_DELIVERY}>
          <BoxChecked color={meatStatusNumber >= 6 ? activeColor : undefined} />
        </CustomTooltip>

        <ArrowLeft color={meatStatusNumber >= 6 ? activeColor : undefined} />

        <CustomTooltip title={EMeatStatuses.PICKED}>
          <ShoppingBag
            color={meatStatusNumber >= 5 ? activeColor : undefined}
          />
        </CustomTooltip>

        <ArrowLeft color={meatStatusNumber >= 5 ? activeColor : undefined} />

        <CustomTooltip
          title={
            meatPickerName || meatPicker?.username
              ? `Picker: ${meatPickerName ?? meatPicker?.username}`
              : "Meat Picker"
          }
        >
          <Avatar
            src={meatPickerPic}
            alt={meatPickerName}
            sx={{
              bgcolor:
                meatStatusNumber >= 4 && !meatPickerPic
                  ? activeColor
                  : notActiveColor,
              height: avatarSize,
              width: avatarSize,
            }}
          >
            {meatPickerName
              ?.split(" ")
              .map(_ => _[0])
              .join("") ?? meatPicker?.username[0]}
          </Avatar>
        </CustomTooltip>

        <ArrowLeft color={meatStatusNumber >= 4 ? activeColor : undefined} />

        <Box sx={{ "& .badge": { ...badgeStyles, mr: -0.5 } }}>
          <CustomTooltip title={EMeatStatuses.READY_FOR_PICKING}>
            <Badge
              badgeContent={meatItemsCount}
              overlap="circular"
              classes={{ badge: "badge" }}
              sx={{ mr: meatItemsCount ? 1.5 : 0 }}
            >
              <ChickenIcon
                color={meatStatusNumber >= 3 ? activeColor : undefined}
              />
            </Badge>
          </CustomTooltip>
        </Box>
      </Stack>
    </Box>
  );
};
export default OrderStatusProgressBar;
