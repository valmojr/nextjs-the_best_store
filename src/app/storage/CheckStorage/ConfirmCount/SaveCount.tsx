import { createStorage } from "@/app/api/storagecount/functions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";

export async function SaveCountDialog({
  storageCount,
}: {
  storageCount: { product: Product; count: number }[];
}) {
  function onSubmit() {
    createStorage(storageCount);

    redirect("/storage");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{"Salvar Contagem"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar Contagem</DialogTitle>
          <DialogDescription>{"Contagem de Estoque"}</DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Produto</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storageCount.map((storage) => {
              return (
                <TableRow key={storage.product.id}>
                  <TableCell className="text-left">
                    {storage.product.name}
                  </TableCell>
                  <TableCell className="text-right">{storage.count}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <DialogFooter>
          <Button type="submit" onClick={() => onSubmit()}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
