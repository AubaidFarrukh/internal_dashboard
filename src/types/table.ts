import { FC } from "react";

export type TRowParams<T extends object> = {
  rowIndex: number;
  row: T;
  rowHeight: number;
};

export type TAlignmentX = "left" | "center" | "right";
export type TAlignmentY = "top" | "center" | "bottom";
export type TCellWidth = number | string;
export type TCellHeight = number;
export type TRowHeight = TCellHeight;

export type TColDef<T extends object> = {
  id: string;
  headerName: string;
  width: TCellWidth;
  RenderCell: FC<TRowParams<T>>;
  alignX?: TAlignmentX;
  alignY?: TAlignmentY;
  cellPaddingX?: number;
  cellPaddingY?: number;
  headerAlignX?: TAlignmentX;
  headerRenderer?: FC<{ headerName: string }>;
  headerHeight?: number;
  onClick?: (p: {
    field: string;
    row: T;
    rowIndex: number;
    colDef: TColDef<T>[];
    colIndex: number;
  }) => void;
};
