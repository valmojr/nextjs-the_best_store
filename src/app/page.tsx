export default async function Home() {
  const getHelloWorldMessage = async () => {
    const response = await fetch("http://localhost:3000/api");

    const data = await response.json();

    return data as { message: string };
  };

  return <main>{(await getHelloWorldMessage()).message}</main>;
}
