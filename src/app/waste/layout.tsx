import { Toaster } from "@/components/ui/toaster";
export default function WasteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
