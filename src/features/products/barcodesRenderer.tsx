import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import type { TBarcodes } from "../../types/products";

const BARCODES_TO_SHOW = 2;

export interface BarcodesRendererProps {
  barcodes: TBarcodes;
  sx?: SxProps<Theme>;
}

export const BarcodesRenderer: FC<BarcodesRendererProps> = ({
  barcodes,
  sx,
}) => {
  return (
    <Box sx={sx}>
      {barcodes.slice(0, BARCODES_TO_SHOW).map(b => (
        <Typography key={b} lineHeight={1.2}>
          {b}
        </Typography>
      ))}
      {barcodes.length > BARCODES_TO_SHOW ? (
        <Typography
          key="count"
          variant="subtitle2"
          lineHeight={1.2}
          color="text.secondary"
        >
          {barcodes.length - BARCODES_TO_SHOW} more...
        </Typography>
      ) : null}
    </Box>
  );
};

export default BarcodesRenderer;
