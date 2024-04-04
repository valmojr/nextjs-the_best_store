import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const getHelloWorldMessage = async () => {
    const response = await fetch("http://localhost:3000/api");

    const data = await response.json();

    return data as { message: string };
  };

  return (
    <>
      <CardHeader className="justify-center items-center">
        <div className={"flex flex-col items-end"}>
          <CardTitle className={"italic text-2xl"}>
            &quot;O Sucesso não aceita preguiça&quot;
          </CardTitle>
          <CardDescription className={"mx-4 text-lg"}>
            João Adibe
          </CardDescription>
        </div>
      </CardHeader>
    </>
  );
}
