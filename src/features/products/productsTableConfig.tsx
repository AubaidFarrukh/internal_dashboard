import { GridColDef } from "@mui/x-data-grid";
import { ImageRenderer } from "../commons";
import { InventoryRenderer } from "./inventoryRenderer";
import { BarcodesRenderer } from "./barcodesRenderer";
import type { TProduct } from "../../types/products";

export const productsTableColumns: GridColDef<TProduct>[] = [
  {
    field: "img",
    headerName: "Image",
    width: 90,
    renderCell: params => {
      if (!params.row.img.src) return " ";
      return (
        <ImageRenderer
          src={params.row.img.src}
          alt={params.row.img.alt ?? ""}
          title={params.row.img.alt ?? ""}
          height={70}
          sx={{
            border: theme => `solid 1px ${theme.palette.grey[300]}`,
            borderRadius: 1,
            overflow: "hidden",
          }}
        />
      );
    },
    sortable: false,
    filterable: false,
  },
  {
    field: "title",
    headerName: "Product Name",
    width: 400,
    valueGetter: params => params.row.title,
    sortable: false,
    filterable: false,
  },
  {
    field: "variant",
    headerName: "Variant Name",
    width: 200,
    valueGetter: params => params.row.variantName,
    sortable: false,
    filterable: false,
  },
  {
    field: "inventory",
    headerName: "Inventory",
    width: 200,
    renderCell: params => <InventoryRenderer count={params.row.inventory} />,
    sortable: false,
    filterable: false,
  },
  {
    field: "type",
    headerName: "Type",
    width: 250,
    valueGetter: params => params.row.type,
    sortable: false,
    filterable: false,
  },
  {
    field: "vendor",
    headerName: "Vendor",
    width: 230,
    valueGetter: params => params.row.vendor,
    sortable: false,
    filterable: false,
  },
  {
    field: "barcodes",
    headerName: "Barcodes",
    width: 150,
    renderCell: params => <BarcodesRenderer barcodes={params.row.barcode} />,
    sortable: false,
    filterable: false,
  },
];

export default productsTableColumns;
