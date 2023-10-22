import { Box, Stack } from "@mui/material";
import { TableCell, TableCellPropsBase } from "./tableCell";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import type { TColDef, TRowHeight } from "../../../types/table";
import {
  DEFAULT_ROW_HEIGHT,
  DEFAULT_CELL_ALIGNMENT_X,
  DEFAULT_CELL_ALIGNMENT_Y,
  DEFAULT_CELL_PADDING_X,
  DEFAULT_CELL_PADDING_Y,
  DEFAULT_ROW_PADDING_X,
  DEFAULT_ROW_PADDING_Y,
  DEFAULT_CELL_SPACING,
} from "./tableConstants";

export interface TableRowPropsBase<T extends object>
  extends TableCellPropsBase<T> {
  onRowClick?: (p: { row: T; index: number; colDef: TColDef<T>[] }) => void;
  rowHeight?: TRowHeight;
  rowPaddingX?: number;
  rowPaddingY?: number;
  cellSpacing?: number;
  rowDetail?: React.JSXElementConstructor<{
    row: T;
    colDef: TColDef<T>[];
    minWidth?: number;
  }>;
  rowContainerStyles?: (row: T, index: number) => SxProps<Theme> | undefined;
  rowStyles?: (row: T, index: number) => SxProps<Theme> | undefined;
  minWidth?: number;
}

export interface TableRowProps<T extends object> extends TableRowPropsBase<T> {
  row: T;
  rowIndex: number;
}

export const TableRow = <T extends object>({
  row,
  rowIndex,
  colDef,
  onRowClick,
  onCellClick,
  rowHeight = DEFAULT_ROW_HEIGHT,
  rowPaddingX = DEFAULT_ROW_PADDING_X,
  rowPaddingY = DEFAULT_ROW_PADDING_Y,
  cellSpacing = DEFAULT_CELL_SPACING,
  rowDetail,
  rowContainerStyles,
  rowStyles,
  cellStyles,
  minWidth,
}: TableRowProps<T>): ReturnType<FC> => {
  const RowDetail = rowDetail;

  return (
    <Box sx={rowContainerStyles?.(row, rowIndex)}>
      <Stack
        onClick={() => onRowClick?.({ row, index: rowIndex, colDef })}
        direction="row"
        gap={cellSpacing}
        px={rowPaddingX}
        py={rowPaddingY}
        sx={rowStyles?.(row, rowIndex)}
        minWidth={minWidth}
      >
        {colDef.map((col, colIndex) => (
          <TableCell
            key={col.id}
            field={col.id}
            row={row}
            rowIndex={rowIndex}
            colIndex={colIndex}
            colDef={colDef}
            onCellClick={onCellClick}
            RenderCell={col.RenderCell}
            width={col.width}
            height={rowHeight}
            alignX={col.alignX ?? DEFAULT_CELL_ALIGNMENT_X}
            alignY={col.alignY ?? DEFAULT_CELL_ALIGNMENT_Y}
            cellPaddingX={col.cellPaddingX ?? DEFAULT_CELL_PADDING_X}
            cellPaddingY={col.cellPaddingY ?? DEFAULT_CELL_PADDING_Y}
            cellStyles={cellStyles}
          />
        ))}
      </Stack>
      {RowDetail ? (
        <RowDetail row={row} colDef={colDef} minWidth={minWidth} />
      ) : null}
    </Box>
  );
};

export default TableRow;
