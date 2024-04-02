import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubtractProductForm from "./SubtractProductForm";
import { getAllProducts } from "../api/product/functions";

export default async function StorageLoadingPage() {
  const products = await getAllProducts();

  return (
    <>
      <CardHeader className="items-center">
        <CardTitle>Controle de Estoque</CardTitle>
        <CardDescription>Retiradas e Controle</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        <Card></Card>
      </CardContent>
    </>
  );
}
