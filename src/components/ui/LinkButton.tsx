import Link from "next/link";
import { Button, ButtonProps, buttonVariants } from "./button";
import { cn } from "@/lib/utils";

export default function LinkButton(
  props: ButtonProps & {
    href: string;
    variant?:
      | "link"
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | "ghost"
      | null
      | undefined;
  }
) {
  return (
    <Link
      href={props.href}
      className={cn(
        buttonVariants({ variant: props.variant ? props.variant : "default" }),
        props.className
      )}
    >
      {props.children}
    </Link>
  );
}
