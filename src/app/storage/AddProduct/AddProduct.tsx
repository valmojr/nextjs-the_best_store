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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";

export default function AddProduct({ categories }: { categories: Category[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"}>Cadastrar Produto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de Produto</DialogTitle>
          <DialogDescription>Cadastro de Produto</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Nome
            </Label>
            <Input id="nome" defaultValue="" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Adicionar Produto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
