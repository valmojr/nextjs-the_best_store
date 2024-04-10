"use client";

import { useState } from "react";
import { StorageCount } from "./page";
import { Product } from "@prisma/client";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProductCheck({
  product,
  storageCounter,
}: {
  product: Product;
  storageCounter: StorageCount;
}) {
  const [count, setCount] = useState<number>(0);
  return (
    <div className={cn("flex flex-row flex-nowrap border w-full bg-slate-300")}>
      <h3>{product.name}</h3>
      <h3>{count}</h3>
      <PlusCircle onClick={() => setCount(count + 1)} />
      <MinusCircle
        onClick={() => {
          if (count > 0) {
            setCount(count - 1);
          }
        }}
      />
    </div>
  );
}
