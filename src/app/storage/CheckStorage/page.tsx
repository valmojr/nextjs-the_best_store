import { getAllCategories } from "@/app/api/category/functions";
import { getAllProducts } from "@/app/api/product/functions";
import { Product } from "@prisma/client";
import StorageTable from "./StorageTable";

export type StorageCount = {
  product: Product;
  count: number;
}[];

export default async function CheckStoragePage() {
  const categories = await getAllCategories();
  const products = await getAllProducts();

  return (
    <>
      <StorageTable categories={categories} products={products} />
    </>
  );
}
