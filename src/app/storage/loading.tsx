import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubtractProductForm from "./SubtractProductForm";
import { getAllProducts } from "../api/product/functions";
import { Skeleton } from "@/components/ui/skeleton";

export default async function StorageLoadingPage() {
  const products = await getAllProducts();

  return (
    <>
      <CardHeader className="items-center">
        <CardTitle>Controle de Estoque</CardTitle>
        <CardDescription>Retiradas e Controle</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        <Card>
          <Skeleton className="h-[125px] w-[350px] rounded-xl" />
          <div className="space-y-8 mt-12">
            <Skeleton className="h-[40px] w-[350px]" />
            <Skeleton className="h-[40px] w-[320px]" />
          </div>
        </Card>
      </CardContent>
    </>
  );
}
