"use client";

import { Button } from "@/components/ui/button";
import LinkButton from "@/components/ui/LinkButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Category, Product } from "@prisma/client";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { SaveCountDialog } from "./ConfirmCount/SaveCount";

export default function StorageTable({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  const [storageCount, setStorageCount] = useState<
    { product: Product; count: number }[]
  >(
    products.map((product) => {
      return { product, count: 0 };
    })
  );

  function onHandleAddButton(productId: string) {
    const updatedStorageCount = storageCount.map((item) => {
      if (item.product.id === productId) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setStorageCount(updatedStorageCount);
  }

  function onHandleSubtractButton(productId: string) {
    const updatedStorageCount = storageCount.map((item) => {
      if (item.product.id === productId && item.count > 0) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    setStorageCount(updatedStorageCount);
  }

  function onSubmitStorageCount() {
    return storageCount;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Produto</TableHead>
            <TableHead className="text-center">Quantidade</TableHead>
            <TableHead className="w-[20px] text-left">Menos</TableHead>
            <TableHead className="w-[20px] text-right">Mais</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.categoryId === category.id
            );

            return categoryProducts.map((product) => {
              const count = storageCount.filter(
                (count) => count.product.id === product.id
              )[0]?.count;

              return (
                <TableRow key={category.id}>
                  <TableCell className="font-medium text-left">
                    {`${category.name} - ${product.name}`}
                  </TableCell>
                  <TableCell className="text-center">{count}</TableCell>
                  <TableCell className="text-left">
                    <MinusCircle
                      className="cursor-pointer"
                      onClick={() => onHandleSubtractButton(product.id)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <PlusCircle
                      className="cursor-pointer"
                      onClick={() => onHandleAddButton(product.id)}
                    />
                  </TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
      <SaveCountDialog storageCount={storageCount} />
    </>
  );
}
