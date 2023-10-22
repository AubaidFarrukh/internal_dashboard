import { FC } from "react";
import { ProductsFilterBar } from "./productsFilterBar";
import { ProductsTable } from "./productsTable";

export const Products: FC = () => {
  return (
    <>
      <ProductsFilterBar />
      <ProductsTable />
    </>
  );
};

export default Products;
