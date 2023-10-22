import { FC, ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";

interface MuiCalenderProviderProps {
  children: ReactNode;
}

export const MuiCalenderProvider: FC<MuiCalenderProviderProps> = ({
  children,
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    {children}
  </LocalizationProvider>
);
