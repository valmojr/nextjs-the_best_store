import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import LinkButton from "@/components/ui/LinkButton";
import { Card } from "@radix-ui/themes";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Best Açaí",
  description: "Next.js App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex flex-col lg:flex-row flex-nowrap items-start justify-start lg:justify-center w-full h-screen p-4 gap-3"
        )}
      >
        <Card className={"w-full border rounded-md lg:w-[320px]"}>
          <CardHeader className="flex flex-col justify-center items-center">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSba8irPFrw5A3IrmfMyRjTAoqZPOqfvxDvRQa7Vwz0g&s"
              alt="the best"
              width={100}
              height={100}
            />
            <CardTitle className="text-[0px] lg:text-2xl">
              The Best Açaí
            </CardTitle>
            <CardDescription className="text-[0px] lg:text-sm">
              Controle Interno POA 01
            </CardDescription>
          </CardHeader>
          <CardContent className={"space-y-3"}>
            <LinkButton href="/waste" className="w-full">
              Desperdício
            </LinkButton>
            <LinkButton href="/storage" className="w-full">
              Estoque
            </LinkButton>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "flex flex-col border rounded-lg w-full min-h-fit h-[460px] max-h-full items-center justify-start lg:justify-center",
            "lg:w-[600px] lg:h-full"
          )}
        >
          {children}
        </Card>
      </body>
    </html>
  );
}
