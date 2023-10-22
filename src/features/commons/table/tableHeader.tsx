import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import {
  DEFAULT_CELL_PADDING_X,
  DEFAULT_CELL_SPACING,
  DEFAULT_ROW_PADDING_X,
} from "./tableConstants";
import { TableRowProps } from "./tableRow";

type TableHeaderPropsBase<T extends object> = Pick<
  TableRowProps<T>,
  "colDef" | "cellSpacing" | "rowPaddingX" | "minWidth"
>;

export interface TableHeaderProps<T extends object>
  extends TableHeaderPropsBase<T> {
  headerContainerStyles?: SxProps<Theme>;
  headerStyles?: SxProps<Theme>;
}

export const TableHeader = <T extends object>({
  colDef,
  cellSpacing = DEFAULT_CELL_SPACING,
  rowPaddingX = DEFAULT_ROW_PADDING_X,
  minWidth,
  headerContainerStyles,
  headerStyles,
}: TableHeaderProps<T>): ReturnType<FC> => {
  return (
    <Box sx={headerContainerStyles}>
      <Stack
        direction="row"
        spacing={cellSpacing}
        px={rowPaddingX}
        minWidth={minWidth}
        sx={headerStyles}
      >
        {colDef.map(col => {
          const HeaderRenderer = col.headerRenderer;
          return (
            <Box
              key={col.id}
              width={col.width}
              height={col.headerHeight}
              display="flex"
              justifyContent={
                col.headerAlignX === "right"
                  ? "flex-end"
                  : col.headerAlignX === "center"
                  ? "center"
                  : "flex-start"
              }
              alignItems="center"
              px={col.cellPaddingX ?? DEFAULT_CELL_PADDING_X}
            >
              {HeaderRenderer ? (
                <HeaderRenderer headerName={col.headerName} />
              ) : (
                <Typography fontWeight={500}>{col.headerName}</Typography>
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default TableHeader;
