import { FC } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import PhoneIcon from "@mui/icons-material/Phone";
import { formatPhoneNumber } from "../../utils";

interface CustomerDetailsProps {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}

export const CustomerDetails: FC<CustomerDetailsProps> = ({
  name,
  email,
  phone,
}) => (
  <Paper square sx={{ py: 3 }}>
    <Typography variant="h5" component="h2" fontWeight={600} px={3}>
      Customer
    </Typography>
    <Typography px={3} mt={1}>
      {name ?? "N/A"}
    </Typography>
    <Divider variant="fullWidth" sx={{ my: 1 }} />
    <Typography variant="h5" component="h2" fontWeight={600} px={3}>
      Contact Information
    </Typography>
    <Box px={3} mt={1} display="flex" alignItems="center">
      <LocalPostOfficeIcon sx={{ mr: 1 }} />
      <Typography>{email ?? "N/A"}</Typography>
    </Box>
    <Box px={3} mt={1} display="flex" alignItems="center">
      <PhoneIcon sx={{ mr: 1 }} />
      <Typography>{phone ? formatPhoneNumber(phone) : "N/A"}</Typography>
    </Box>
  </Paper>
);

export default CustomerDetails;
