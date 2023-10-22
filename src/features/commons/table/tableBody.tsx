import { Box, Stack, Typography } from "@mui/material";
import { TableHeader } from "./tableHeader";
import { TableRow, TableRowPropsBase } from "./tableRow";
import { LoadingContent } from "../loadingContent";
import type { FC } from "react";
import type { SxProps, Theme } from "@mui/material";
import {
  DEFAULT_ROW_HEIGHT,
  DEFAULT_ID_EXTRACTOR,
  DEFAULT_ROW_PADDING_X,
  DEFAULT_ROW_PADDING_Y,
  DEFAULT_CELL_SPACING,
  DEFAULT_ROW_SPACING,
} from "./tableConstants";

export interface TableBodyProps<T extends object> extends TableRowPropsBase<T> {
  rows: T[];
  isLoading?: boolean;
  rowIdExtractor?: (row: T) => string | number;
  rowSpacing?: number;
  headerContainerStyles?: SxProps<Theme>;
  headerStyles?: SxProps<Theme>;
  bodyStyles?: SxProps<Theme>;
}

export const TableBody = <T extends object>({
  rows,
  colDef,
  isLoading,
  rowIdExtractor = DEFAULT_ID_EXTRACTOR,
  rowHeight = DEFAULT_ROW_HEIGHT,
  rowPaddingX = DEFAULT_ROW_PADDING_X,
  rowPaddingY = DEFAULT_ROW_PADDING_Y,
  rowSpacing = DEFAULT_ROW_SPACING,
  cellSpacing = DEFAULT_CELL_SPACING,
  rowDetail,
  headerContainerStyles,
  headerStyles,
  bodyStyles,
  rowStyles,
  rowContainerStyles,
  onRowClick,
  onCellClick,
  cellStyles,
  minWidth,
}: TableBodyProps<T>): ReturnType<FC> => {
  const NoRows: FC<{ isLoading?: boolean }> = ({ isLoading }) => (
    <Box
      py={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minWidth={minWidth}
      height="100%"
      sx={{ bgcolor: t => t.palette.grey[50] }}
    >
      <Typography>{isLoading ? " " : "No rows to show."}</Typography>
    </Box>
  );

  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden", height: "100%" }}>
      <TableHeader
        colDef={colDef}
        cellSpacing={cellSpacing}
        rowPaddingX={rowPaddingX}
        minWidth={minWidth}
        headerContainerStyles={headerContainerStyles}
        headerStyles={{ py: 1, ...headerStyles }}
      />
      <Stack
        gap={rowSpacing}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          position: "relative",
          minWidth,
          height: "100%",
          ...bodyStyles,
        }}
      >
        {rows.length ? (
          rows.map((row, rowIndex) => (
            <TableRow
              key={rowIdExtractor(row)}
              row={row}
              rowIndex={rowIndex}
              colDef={colDef}
              onRowClick={onRowClick}
              onCellClick={onCellClick}
              rowHeight={rowHeight}
              rowPaddingX={rowPaddingX}
              rowPaddingY={rowPaddingY}
              cellSpacing={cellSpacing}
              rowDetail={rowDetail}
              rowStyles={rowStyles}
              rowContainerStyles={rowContainerStyles}
              cellStyles={cellStyles}
              minWidth={minWidth}
            />
          ))
        ) : (
          <NoRows isLoading={isLoading} />
        )}
        {isLoading ? (
          <LoadingContent
            sx={{
              py: 3,
              position: "absolute",
              width: "100%",
              height: "100%",
              bgcolor: "#fafafa70",
            }}
          />
        ) : null}
      </Stack>
    </Stack>
  );
};

export default TableBody;
