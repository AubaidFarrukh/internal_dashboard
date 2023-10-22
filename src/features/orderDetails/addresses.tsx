import { FC } from "react";
import { Divider, Paper, Typography } from "@mui/material";
import { AddressRenderer } from "./addressRenderer";
import type { TAddress } from "../../types/orderDetails";

interface AddressesProps {
  shippingAddress: TAddress;
  billingAddress: TAddress;
}

export const Addresses: FC<AddressesProps> = ({
  shippingAddress,
  billingAddress,
}) => (
  <Paper square sx={{ py: 3 }}>
    <AddressRenderer name="Shipping Address" address={shippingAddress} />
    <Divider variant="fullWidth" sx={{ my: 1 }} />
    {JSON.stringify(shippingAddress) !== JSON.stringify(billingAddress) ? (
      <AddressRenderer name="Billing Address" address={billingAddress} />
    ) : (
      <>
        <Typography variant="h5" component="h2" fontWeight={600} px={3} mb={1}>
          Billing Address
        </Typography>
        <Typography px={3} mt={1}>
          Same as shipping address.
        </Typography>
      </>
    )}
  </Paper>
);

export default Addresses;
