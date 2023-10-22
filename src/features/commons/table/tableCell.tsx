import { Box } from "@mui/material";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import type {
  TAlignmentX,
  TAlignmentY,
  TCellHeight,
  TCellWidth,
  TColDef,
} from "../../../types/table";
import {
  DEFAULT_ROW_HEIGHT,
  DEFAULT_CELL_ALIGNMENT_X,
  DEFAULT_CELL_ALIGNMENT_Y,
  DEFAULT_CELL_PADDING_X,
  DEFAULT_CELL_PADDING_Y,
} from "./tableConstants";

export interface TableCellPropsBase<T extends object> {
  colDef: TColDef<T>[];
  onCellClick?: (p: {
    field: string;
    row: T;
    rowIndex: number;
    colDef: TColDef<T>[];
    colIndex: number;
  }) => void;
  cellStyles?: SxProps<Theme>;
}

export interface TableCellProps<T extends object>
  extends TableCellPropsBase<T> {
  row: T;
  rowIndex: number;
  colIndex: number;
  field: string;
  RenderCell: TColDef<T>["RenderCell"];
  width: TCellWidth;
  height: TCellHeight;
  alignX: TAlignmentX;
  alignY: TAlignmentY;
  cellPaddingX: number;
  cellPaddingY: number;
}

export const TableCell = <T extends object>({
  row,
  field,
  rowIndex,
  colIndex,
  RenderCell,
  colDef,
  onCellClick,
  width,
  height = DEFAULT_ROW_HEIGHT,
  alignX = DEFAULT_CELL_ALIGNMENT_X,
  alignY = DEFAULT_CELL_ALIGNMENT_Y,
  cellPaddingX = DEFAULT_CELL_PADDING_X,
  cellPaddingY = DEFAULT_CELL_PADDING_Y,
  cellStyles,
}: TableCellProps<T>): ReturnType<FC> => {
  const onClick = () => {
    colDef[colIndex].onClick?.({ field, row, rowIndex, colDef, colIndex });
    onCellClick?.({ field, row, rowIndex, colDef, colIndex });
  };

  return (
    <Box
      onClick={onClick}
      width={width}
      height={height}
      display="flex"
      justifyContent={
        alignX === "left"
          ? "flex-start"
          : alignX === "center"
          ? "center"
          : "flex-end"
      }
      alignItems={
        alignY === "top"
          ? "flex-start"
          : alignY === "center"
          ? "center"
          : "flex-end"
      }
      px={cellPaddingX}
      py={cellPaddingY}
      sx={cellStyles}
    >
      <RenderCell row={row} rowIndex={rowIndex} rowHeight={height} />
    </Box>
  );
};

export default TableCell;
