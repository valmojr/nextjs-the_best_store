import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";
import Link from "next/link";
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
        <Card
          className={cn(
            "flex flex-row lg:flex-col flex-nowrap w-full",
            "lg:w-[320px] h-[150px] lg:h-fit"
          )}
        >
          <CardHeader
            className={cn(
              "flex flex-col justify-center items-center",
              "lg:w-full py-0 space-y-0"
            )}
          >
            <Link href={"/"}>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSba8irPFrw5A3IrmfMyRjTAoqZPOqfvxDvRQa7Vwz0g&s"
                alt="the best"
                width={150}
                height={150}
              />
            </Link>
            <CardTitle className="text-[0px] lg:text-2xl">
              The Best Açaí
            </CardTitle>
            <CardDescription className="text-[0px] lg:text-sm">
              Controle Interno POA 01
            </CardDescription>
          </CardHeader>
          <CardContent
            className={cn(
              "flex flex-col gap-3 flex-nowrap justify-center items-center",
              "w-full h-fit p-4 my-auto"
            )}
          >
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
            "flex flex-col border rounded-lg w-full min-h-fit h-full max-h-full items-center justify-start lg:justify-center",
            "lg:w-[600px] lg:h-full"
          )}
        >
          {children}
        </Card>
      </body>
    </html>
  );
}
