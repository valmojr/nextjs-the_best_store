import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubtractProductForm from "./SubtractProducts/SubtractProductForm";
import { getAllProducts } from "../api/product/functions";
import { getAllCategories } from "../api/category/functions";
import LinkButton from "@/components/ui/LinkButton";

export default async function StoragePage() {
  const categories = await getAllCategories();
  const products = await getAllProducts();

  async function getProductsFromDatabase() {
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

  const productLabels = await getProductsFromDatabase();

  return (
    <>
      <CardHeader className="items-center">
        <CardTitle>Controle de Estoque</CardTitle>
        <CardDescription>Retiradas e Controle</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        <div className="flex flex-row pb-3">
          <LinkButton href={"/storage/CheckStorage"}>Contar Estoque</LinkButton>
        </div>
        <SubtractProductForm products={productLabels} />
      </CardContent>
    </>
  );
}
