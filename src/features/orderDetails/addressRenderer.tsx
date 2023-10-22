import { FC } from "react";
import { Typography } from "@mui/material";
import type { TAddress } from "../../types/orderDetails";

interface AddressRendererProps {
  name: string;
  address: TAddress;
}

export const AddressRenderer: FC<AddressRendererProps> = ({
  name,
  address,
}) => (
  <>
    <Typography variant="h5" component="h2" fontWeight={600} px={3} mb={1}>
      {name}
    </Typography>
    <Typography px={3}>{address.name}</Typography>
    <Typography px={3}>{address.address1}</Typography>
    <Typography px={3}>{address.address2}</Typography>
    <Typography px={3}>{address.city}</Typography>
    <Typography px={3}>{address.zip}</Typography>
    <Typography px={3}>{address.country}</Typography>
    <Typography px={3}>{address.phone}</Typography>
  </>
);

export default AddressRenderer;
