import { Box, Divider, Stack } from "@mui/material";
import { AccountingLine } from "./accountingLine";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import type { TOrderDetails } from "../../types/orderDetails";

interface TableFooterProps {
  order: TOrderDetails;
  sx?: SxProps<Theme>;
}

export const TableFooter: FC<TableFooterProps> = ({ order, sx }) => {
  const originalTotal = +order.financialValues.total;
  const pendingRefund = order.lineItems.reduce(
    (prev, curr) => prev + (curr.notGivenQuantity ?? 0) * +curr.price,
    0
  );
  const altAdjustment = order.lineItems.reduce(
    (prev, curr) => {
      if (
        curr.givenQuantity === null &&
        curr.notGivenQuantity === null &&
        curr.altsQuantity === null
      )
        return prev + 0;
      return (
        prev +
        curr.altItems.reduce(
          (prev, curr) => prev + curr.quantity * +curr.price,
          0
        ) -
        (curr.quantity -
          (curr.givenQuantity ?? 0) -
          (curr.notGivenQuantity ?? 0)) *
          +curr.price
      );
    },

    0
  );
  const newTotal = originalTotal - pendingRefund + altAdjustment;

  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      justifyContent="flex-end"
      pt={2}
      borderTop="1px solid rgba(0, 0, 0, 0.1)"
      sx={sx}
    >
      <Stack width="500px" spacing={2} mr={4}>
        <AccountingLine
          label="Subtotal"
          description={`${order.lineItems.length} items`}
          value={+order.financialValues.orderValue}
        />
        <AccountingLine
          label="Shipping"
          description={`${order.deliveryMethod} (${(
            order.totalWeight / 1000
          ).toFixed(2)} kg)`}
          value={+order.financialValues.shippingCost}
        />
        <AccountingLine
          label="Tax"
          description="GB VAT 20% (included)"
          value={+order.financialValues.tax}
        />
        <AccountingLine
          label="Tip"
          value={+order.financialValues.total_tip_received}
        />
        <Divider variant="fullWidth" sx={{ my: 2, height: 3 }} />

        <AccountingLine
          label="Original Paid Total"
          value={originalTotal}
          bold={true}
        />
        <AccountingLine label="Pending Refund" value={-pendingRefund} />
        <AccountingLine
          label="Alt Adjustment (Not Payable)"
          value={altAdjustment}
        />
        <Divider variant="fullWidth" sx={{ my: 2, height: 3 }} />

        <AccountingLine label="New Total" value={newTotal} bold={true} />
      </Stack>
    </Box>
  );
};
export default TableFooter;
