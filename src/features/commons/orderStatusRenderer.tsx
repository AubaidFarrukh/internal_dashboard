import { Box, Typography } from "@mui/material";
import { toTitleCase } from "../../utils";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import type { TShopStatus } from "../../types/orderDetails";

export interface OrderStatusRendererProps {
  status: TShopStatus;
  sx?: SxProps<Theme>;
}

export const OrderStatusRenderer: FC<OrderStatusRendererProps> = ({
  status,
  sx,
}) => {
  let colorScheme = { font: "#000", bg: "#fff", border: "#000" };
  switch (status) {
    case "Ready for picking":
      colorScheme = { font: "#0d669e", bg: "#edf5ff", border: "#83a5d6" };
      break;
    case "Picking in progress":
      colorScheme = { font: "#0d9e14", bg: "#edffee", border: "#83d687" };
      break;
    case "Ready for delivery":
    case "Ready for collection":
      colorScheme = { font: "#5d0d9e", bg: "#faedff", border: "#b683d6" };
      break;
    case "Dispatched":
      colorScheme = { font: "#206667", bg: "#beebe7", border: "#52a2a2" };
      break;
    case "Fulfilled":
      colorScheme = { font: "#fafafa", bg: "#a09f9f", border: "#fff" };
      break;
    case "On-hold":
      colorScheme = { font: "#9e9a0d", bg: "#fffeed", border: "#ebd48f" };
      break;
    case "Cancelled":
      colorScheme = { font: "#cf1322", bg: "#fff1f0", border: "#ffa39e" };
      break;
  }

  return (
    <Box
      sx={{
        display: "inline-block",
        bgcolor: colorScheme.bg,
        border: `1px solid ${colorScheme.border}`,
        borderRadius: "5px",
        p: 0.5,
        width: 150,
        ...sx,
      }}
    >
      <Typography
        color={colorScheme.font}
        fontSize={14}
        fontWeight="bold"
        textAlign="center"
      >
        {toTitleCase(status)}
      </Typography>
    </Box>
  );
};

export default OrderStatusRenderer;
