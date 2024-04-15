import { getAllCategories } from "../api/category/functions";
import { getAllProducts } from "../api/product/functions";
import { WasteForm } from "../../components/routes/waste/WasteForm";
import LinkButton from "@/components/ui/LinkButton";
import { AreaChart, ScrollText } from "lucide-react";

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
      <div className={"flex flex-row flex-nowrap w-full my-5 gap-3"}>
        <LinkButton href={"/waste/history"} className="w-full gap-2">
          <ScrollText />
          Histórico
        </LinkButton>
        <LinkButton href={"/waste/dashboard"} className="w-full gap-2">
          <AreaChart />
          Dashboard
        </LinkButton>
      </div>
    </div>
  );
}
