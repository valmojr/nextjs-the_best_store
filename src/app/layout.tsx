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
import { Home, PackageOpen, Trash2 } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Card
            className={cn(
              "flex flex-row lg:flex-col flex-nowrap w-full",
              "lg:w-[320px] h-[150px] lg:h-fit"
            )}
          >
            <CardHeader
              className={cn(
                "flex flex-row lg:flex-col justify-center items-center",
                "lg:w-full p-0 lg:py-2 space-y-0"
              )}
            >
              <Image
                src={"/logo.png"}
                alt="the best"
                className="ml-2"
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
            <CardContent
              className={cn(
                "flex lg:flex-col gap-3 flex-nowrap justify-center items-center",
                "w-full lg:h-fit p-4 my-auto"
              )}
            >
              <LinkButton
                href="/"
                className="w-full gap-1 h-16 lg:h-10 lg:text-[1rem] text-[0rem]"
              >
                <Home />
                Home
              </LinkButton>
              <LinkButton
                href="/waste"
                className="w-full gap-1 h-16 lg:h-10 lg:text-[1rem] text-[0rem]"
              >
                <Trash2 />
                Desperdício
              </LinkButton>
              <LinkButton
                href="/storage"
                className="w-full gap-1 h-16 lg:h-10 lg:text-[1rem] text-[0px]"
              >
                <PackageOpen />
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
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
