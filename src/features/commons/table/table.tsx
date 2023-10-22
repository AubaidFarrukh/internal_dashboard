import { Stack } from "@mui/material";
import { TableBody, TableBodyProps } from "./tableBody";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import {
  DEFAULT_CELL_SPACING,
  DEFAULT_ID_EXTRACTOR,
  DEFAULT_ROW_HEIGHT,
  DEFAULT_ROW_PADDING_X,
  DEFAULT_ROW_PADDING_Y,
  DEFAULT_ROW_SPACING,
  DEFAULT_TABLE_FOOTER,
  DEFAULT_TABLE_TOOLBAR,
} from "./tableConstants";

interface TableProps<T extends object> extends TableBodyProps<T> {
  tableToolbar?: FC<object>;
  tableFooter?: FC<object>;
  tableStyles?: SxProps<Theme>;
}

export const Table = <T extends object>({
  rows,
  colDef,
  isLoading,
  tableToolbar: TableToolbar = DEFAULT_TABLE_TOOLBAR,
  tableFooter: TableFooter = DEFAULT_TABLE_FOOTER,
  rowIdExtractor,
  rowHeight,
  rowPaddingX,
  rowPaddingY,
  rowSpacing,
  cellSpacing,
  rowDetail,
  headerContainerStyles,
  headerStyles,
  bodyStyles,
  onRowClick,
  onCellClick,
  rowStyles,
  rowContainerStyles,
  cellStyles,
  minWidth,
  tableStyles,
}: TableProps<T>): ReturnType<FC> => {
  return (
    <Stack sx={tableStyles}>
      <TableToolbar />
      <TableBody
        rows={rows}
        colDef={colDef}
        isLoading={isLoading}
        rowIdExtractor={rowIdExtractor ?? DEFAULT_ID_EXTRACTOR}
        rowHeight={rowHeight ?? DEFAULT_ROW_HEIGHT}
        rowPaddingX={rowPaddingX ?? DEFAULT_ROW_PADDING_X}
        rowPaddingY={rowPaddingY ?? DEFAULT_ROW_PADDING_Y}
        rowSpacing={rowSpacing ?? DEFAULT_ROW_SPACING}
        cellSpacing={cellSpacing ?? DEFAULT_CELL_SPACING}
        rowDetail={rowDetail}
        headerContainerStyles={headerContainerStyles}
        headerStyles={headerStyles}
        bodyStyles={bodyStyles}
        onRowClick={onRowClick}
        onCellClick={onCellClick}
        rowContainerStyles={rowContainerStyles}
        rowStyles={rowStyles}
        cellStyles={cellStyles}
        minWidth={minWidth}
      />
      <TableFooter />
    </Stack>
  );
};

export default Table;
