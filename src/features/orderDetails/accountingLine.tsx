import { Box, Typography } from "@mui/material";
import { gbpFormatter } from "../../utils";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";

export interface AccountingLineProps {
  label: string;
  labelWidth?: number;
  description?: string;
  descriptionWidth?: number;
  value: number;
  valueWidth?: number;
  bold?: boolean;
  sx?: SxProps<Theme>;
}

export const AccountingLine: FC<AccountingLineProps> = ({
  label,
  labelWidth = 150,
  description,
  descriptionWidth = 250,
  value,
  valueWidth = 100,
  bold,
  sx,
}) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent={description ? undefined : "space-between"}
    sx={sx}
  >
    <Typography
      width={description ? `${labelWidth}px` : undefined}
      fontWeight={bold ? 600 : undefined}
    >
      {label}
    </Typography>
    {description ? (
      <Typography width={`${descriptionWidth}px`}>{description}</Typography>
    ) : null}
    <Typography
      width={description ? `${valueWidth}px` : undefined}
      textAlign="right"
      color={value < 0 ? "error" : undefined}
      fontWeight={bold ? 600 : undefined}
    >
      {value < 0 ? "- " : ""}
      {gbpFormatter.format(Math.abs(value))}
    </Typography>
  </Box>
);

export default AccountingLine;
