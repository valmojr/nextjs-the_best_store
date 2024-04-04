import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubtractProductForm from "./SubtractProductForm";
import { getAllProducts } from "../api/product/functions";
import { getAllCategories } from "../api/category/functions";
import { Skeleton } from "@/components/ui/skeleton";
import { Category } from "@prisma/client";

export default async function StoragePage() {
  async function getProductsFromDatabase() {
    const categories = await getAllCategories();
    const products = await getAllProducts();

    return products.map((product) => {
      const productCategory = categories.filter(
        (category) => category.id == product.categoryId
      )[0];
      return {
        label: `${productCategory.name} - ${product.name}`,
        value: product.id,
      };
    });
  }

  const products = await getProductsFromDatabase();

  return (
    <>
      <CardHeader className="items-center">
        <CardTitle>Controle de Estoque</CardTitle>
        <CardDescription>Retiradas e Controle</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        <SubtractProductForm products={products} />
      </CardContent>
    </>
  );
}
