import { getAllProducts } from "../api/product/functions";
import { ComboboxForm } from "./testCombo";
import { WasteForm } from "./WasteForm";

export default async function WastePage() {
  const availableProducts = (await getAllProducts()).map((product) => {
    return {
      label: product.name,
      value: product.id,
    };
  });

  return (
    <div className="mt-3">
      <WasteForm products={availableProducts} />
    </div>
  );
}
