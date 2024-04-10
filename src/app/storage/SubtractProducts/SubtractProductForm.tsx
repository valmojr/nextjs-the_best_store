"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export default function SubtractProductForm({
  products,
}: {
  products: { label: string; value: string }[];
}) {
  const FormSchema = z.object({
    productId: z.string().uuid({ message: "ID de produto inválido" }),
    quantity: z.number().min(1, { message: "quantidade mínima" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = () => {};

  return (
    <Card
      className={cn(
        "flex flex-col lg:w-[500px] w-[400px] justify-center items-center"
      )}
    >
      <CardHeader>
        <CardTitle>Abertura de Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                      type={"number"}
                    />
                  </FormControl>
                  <FormDescription className="text-[0px] lg:text-sm">
                    Quantidade
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Produto</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? products.find(
                                (product) => product.value === field.value
                              )?.label
                            : "Select product"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Procurar produto..." />
                        <CommandList>
                          <CommandEmpty>No product found.</CommandEmpty>
                          <CommandGroup>
                            {products.map((product) => (
                              <CommandItem
                                value={product.label}
                                key={product.value}
                                onSelect={() => {
                                  form.setValue("productId", product.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    product.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {product.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className={"text-[0px]"}>
                    Produto desperdiçado.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type={"submit"}>
              Retirar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
