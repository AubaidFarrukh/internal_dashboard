import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, SxProps, Theme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { productsTableColumns } from "./productsTableConfig";
import { LoadingContent, NotFound, Offset } from "../commons";
import { useAppSelector, useAppDispatch } from "../../context/redux/hooks";
import {
  selectCursor,
  selectPage,
  selectPageSize,
  selectProductTitle,
  selectVendor,
  setCursor,
  setPage,
  setPageSize,
} from "./productsSlice";
import {
  useLazyGetAllProductsQuery,
  useGetProductsCountQuery,
} from "../../services/api";
import type { TProduct } from "../../types/products";

export const ProductsTable: FC = () => {
  const cursor = useAppSelector(selectCursor);
  const page = useAppSelector(selectPage);
  const pageSize = useAppSelector(selectPageSize);
  const productTitle = useAppSelector(selectProductTitle);
  const vendor = useAppSelector(selectVendor);
  const [trigger, result] = useLazyGetAllProductsQuery();
  const {
    isLoading: loadingProducts,
    isFetching: fetchingProducts,
    data: productsData,
  } = result;

  useEffect(() => {
    if (!productTitle) return;
    trigger({ cursor, pageSize, productTitle, vendor }, true);
  }, [trigger, cursor, pageSize, productTitle, vendor]);

  const { data: productsCount } = useGetProductsCountQuery(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = loadingProducts || fetchingProducts;

  const onPageChange = (newPage: number) => {
    // We want to go to next page, but no more results exist; so, do nothing.
    if (newPage > page && !productsData?.cursor) return;

    // Change the page number.
    dispatch(setPage({ page: newPage }));

    // No need to save the cursor for next page if it doesn't exist.
    if (!productsData?.cursor) return;
    dispatch(
      setCursor({
        cursor: productsData.cursor,
        page: page + 1,
        pageSize,
        productTitle,
        vendor,
      })
    );
  };

  const onPageSizeChange = (newPageSize: number) => {
    if (newPageSize === pageSize) return;
    dispatch(setPageSize({ pageSize: newPageSize }));
  };

  const getRowsCount = () => {
    // Return the count unchanged if
    // 1. productsData is being fetched
    // 2. Or cursor for next page exists (as we don't know how may products are there).
    if (!productsData || productsData.cursor) return productsCount;

    // Now, we can calculate the products count.
    return pageSize * page + productsData.products.length;
  };

  const productsTableStyles: SxProps<Theme> = {
    height: "100%",
    "& .custom-table-styles": {
      backgroundColor: "#ffffff",
    },
    "& .custom-row-styles": {
      border: "black none 0px",
      cursor: "pointer",
    },
  };

  return (
    <Box sx={productsTableStyles}>
      {!productTitle && (
        <NotFound message="Use the search bar to find matching products." />
      )}
      {loading && productTitle && !productsData && <LoadingContent />}
      {productTitle && productsData && (
        <>
          <DataGrid
            loading={loading}
            columns={productsTableColumns}
            rows={productsData.products}
            rowCount={getRowsCount() ?? 0}
            pagination
            paginationMode="server"
            page={page}
            onPageChange={onPageChange}
            pageSize={pageSize}
            onPageSizeChange={onPageSizeChange}
            rowsPerPageOptions={[10, 20, 30, 40, 50]}
            disableSelectionOnClick
            onRowClick={({ row }: { row: TProduct }) => {
              navigate(`/products/${row.id}`);
            }}
            className="custom-table-styles"
            rowHeight={90}
            autoHeight
            getRowClassName={p => "custom-row-styles"}
            disableColumnMenu
          />
          <Offset />
          <Offset />
        </>
      )}
    </Box>
  );
};

export default ProductsTable;
