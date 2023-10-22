import { Box, Typography } from "@mui/material";
import {
  ArrowDown,
  ArrowDownRight,
  AltOverlay,
  ImageRenderer,
  TableRow,
  NotGivenOverlay,
  QuantityAdjustedOverlay,
  TextRenderer,
  UnKnownOverlay,
} from "../commons";
import { gbpFormatter } from "../../utils";
import type { SxProps, Theme } from "@mui/material";
import type { TableRowProps } from "../commons";
import type { TLineItem } from "../../types/orderDetails";
import type { TColDef } from "../../types/table";

const notGivenTextStyles: SxProps<Theme> = {
  color: t => t.palette.text.secondary,
};

export const getColDef = (isSmallScreen: boolean): TColDef<TLineItem>[] => [
  {
    id: "img",
    headerName: "Item Image",
    width: 150,
    RenderCell: p => {
      const isImageAvailable = Boolean(p.row.imageSrc);

      const exactGiven =
        p.row.givenQuantity === p.row.quantity &&
        !p.row.notGivenQuantity &&
        !p.row.altsQuantity;
      const exactNotGiven =
        p.row.notGivenQuantity === p.row.quantity &&
        !p.row.givenQuantity &&
        !p.row.altsQuantity;
      const altsTotal =
        p.row.altItems?.reduce((total, item) => total + +item.total, 0) ?? 0;
      const exactAlted =
        !p.row.givenQuantity &&
        !p.row.notGivenQuantity &&
        (p.row.altsQuantity === p.row.quantity ||
          ((p.row.altsQuantity ?? 0) < p.row.quantity &&
            altsTotal >= +p.row.total));
      const isPartialGivenNotGiven =
        p.row.givenQuantity && p.row.notGivenQuantity;
      const isPartialGivenAlted = p.row.givenQuantity && p.row.altsQuantity;
      const isPartialNotGivenAlted =
        p.row.notGivenQuantity && p.row.altsQuantity;
      const isPartial =
        isPartialGivenNotGiven || isPartialGivenAlted || isPartialNotGivenAlted;
      const isQuantityAdjusted =
        (p.row.altsQuantity ?? 0) > p.row.quantity - (p.row.givenQuantity ?? 0);

      const Overlay = exactGiven
        ? undefined
        : exactNotGiven
        ? NotGivenOverlay
        : exactAlted
        ? AltOverlay
        : isQuantityAdjusted
        ? QuantityAdjustedOverlay
        : isPartial
        ? UnKnownOverlay
        : undefined;

      // Don't render image if image is not available
      // as well as there is no overlay.
      if (!isImageAvailable && !Overlay) return null;

      return (
        <ImageRenderer
          src={p.row.imageSrc}
          alt={p.row.name}
          title={p.row.name}
          height={p.rowHeight}
          overlay={Overlay}
          sx={{
            bgcolor: "white",
            border: theme => `solid 1px ${theme.palette.grey[200]}`,
            borderRadius: 1,
            overflow: "hidden",
          }}
        />
      );
    },
    alignX: "center",
    headerAlignX: "center",
  },
  {
    id: "itemName",
    headerName: "Item Name",
    width: isSmallScreen ? 350 : 550,
    RenderCell: p => {
      const isNotGiven = (p.row.notGivenQuantity ?? 0) === p.row.quantity;
      const sx = isNotGiven ? notGivenTextStyles : {};

      return (
        <Box
          display="flex"
          flexDirection="column"
          onClick={e => {
            e.preventDefault();
            window.open("/products/" + p.row.variant.id, "_blank")?.focus();
          }}
        >
          <TextRenderer maxLines={2} sx={sx}>
            {p.row.name}
          </TextRenderer>
          {p.row.variant.title ? (
            <TextRenderer sx={{ color: t => t.palette.text.secondary }}>
              {p.row.variant.title}
            </TextRenderer>
          ) : null}
        </Box>
      );
    },
  },
  {
    id: "quantity",
    headerName: "Quantity",
    width: 115,
    RenderCell: p => {
      const isNotGiven = (p.row.notGivenQuantity ?? 0) === p.row.quantity;
      const sx = isNotGiven ? notGivenTextStyles : {};

      return <TextRenderer sx={sx}>{`x${p.row.quantity}`}</TextRenderer>;
    },
    alignX: "center",
    headerAlignX: "center",
  },
  {
    id: "price",
    headerName: "Price",
    width: 115,
    RenderCell: p => {
      const isNotGiven = (p.row.notGivenQuantity ?? 0) === p.row.quantity;
      const sx = isNotGiven ? notGivenTextStyles : {};
      return (
        <TextRenderer sx={sx}>{gbpFormatter.format(+p.row.price)}</TextRenderer>
      );
    },
    alignX: "center",
    headerAlignX: "center",
  },
  {
    id: "total",
    headerName: "Total",
    width: 115,
    RenderCell: p => {
      const isNotGiven = (p.row.notGivenQuantity ?? 0) === p.row.quantity;
      const sx = isNotGiven ? notGivenTextStyles : {};
      return (
        <TextRenderer sx={sx}>{gbpFormatter.format(+p.row.total)}</TextRenderer>
      );
    },
    alignX: "center",
    headerAlignX: "center",
  },
];

export const commonRowStyles: SxProps<Theme> = {
  border: t => `solid 1px ${t.palette.grey[200]}`,
  [`&:hover`]: {
    bgcolor: t => t.palette.primary.light,
  },
};
export const ROW_HEIGHT = 80;
export const ROW_PADDING_X = 0;
export const ROW_PADDING_Y = 1;
export const ROW_MIN_WIDTH = 768;

export const RowDetail: TableRowProps<TLineItem>["rowDetail"] = ({
  row,
  colDef,
  minWidth,
}) => {
  if (row.altItems.length === 0) return null;
  const modifiedColDef = colDef.map(col => ({
    ...col,
    width:
      col.id === "img" && typeof col.width === "number"
        ? col.width + 50
        : col.id === "itemName" && typeof col.width === "number"
        ? col.width - 50
        : col.width,
    alignX: col.id === "img" ? "right" : col.alignX,
  }));
  const noAuditData = {
    givenQuantity: null,
    notGivenQuantity: null,
    altsQuantity: null,
    altItems: [],
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        minWidth={minWidth}
        px={5}
        py={0.5}
        sx={{
          border: t => `solid 1px ${t.palette.grey[200]}`,
          bgcolor: t => t.palette.grey[50],
        }}
      >
        <ArrowDownRight />
        <Typography mx={2}>
          {row.altItems.length} Item{row.altItems.length > 1 ? "s" : ""}
        </Typography>
        <ArrowDown />
      </Box>
      {row.altItems.map((alt, index) => (
        <TableRow
          key={alt.id}
          row={{ ...alt, ...noAuditData }}
          rowIndex={index}
          colDef={modifiedColDef}
          rowHeight={ROW_HEIGHT}
          rowPaddingX={ROW_PADDING_X}
          rowPaddingY={ROW_PADDING_Y}
          minWidth={ROW_MIN_WIDTH}
          rowStyles={_ => ({
            ...commonRowStyles,
            bgcolor: t => t.palette.grey[200],
          })}
        />
      ))}
    </Box>
  );
};
