import { getAllCategories } from "@/app/api/category/functions";
import { getAllProducts } from "@/app/api/product/functions";
import { getAllWastes } from "@/app/api/waste/functions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Waste, Product } from "@prisma/client";
import { randomUUID } from "crypto";
import { any } from "zod";

export default async function WasteHistoryTablePage() {
  const categories = await getAllCategories();
  const products = await getAllProducts();
  const wastesInDatabase = await getAllWastes();

  const productsIds = products.map((product) => product.id);

  const joinByDatesAndProductIds = (data: Waste[]): Waste[] => {
    const joinedData: Waste[] = [];
    for (const item of data) {
      const found = joinedData.find(
        (joinedItem) =>
          joinedItem.date.getTime() === item.date.getTime() &&
          joinedItem.productId === item.productId
      );
      if (found) {
        found.weight += item.weight;
      } else {
        joinedData.push({ ...item });
      }
    }
    return joinedData;
  };

  const filteredWastes = joinByDatesAndProductIds(wastesInDatabase);

  function formatDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${day}/${month}`;
  }

  function transformData(data: Waste[]): any[] {
    const result: any[] = [];

    for (const item of data) {
      const { date, productId, weight } = item;

      let dateObject: any;
      dateObject = result.find((obj) => obj.date.getTime() === date.getTime());
      if (!dateObject) {
        dateObject = { date };
        result.push(dateObject);
      }

      dateObject[productId] = weight;
    }

    return result;
  }

  const tableData = transformData(filteredWastes);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            {products.map((product) => {
              const category = categories.filter(
                (category) => category.id === product.categoryId
              )[0];
              return (
                <TableHead
                  key={product.id || ""}
                >{`${product.name}`}</TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((waste) => {
            return (
              <TableRow key={waste.date.getTime()}>
                <TableCell>{formatDate(waste.date)}</TableCell>
                {products.map((product) => {
                  return (
                    <TableCell key={product.id}>{waste[product.id]}</TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
