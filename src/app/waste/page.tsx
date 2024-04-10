import { getAllCategories } from "../api/category/functions";
import { getAllProducts } from "../api/product/functions";
import { WasteForm } from "./WasteForm";

export default async function WastePage() {
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

  return (
    <div className="mt-3">
      <h1 className="text-2xl mb-3">Controle de Desperdício</h1>
      <WasteForm products={await getProductsFromDatabase()} />
    </div>
  );
}
