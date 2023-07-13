import Cards from "../components/Cards";

export const revalidate = 0;

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 ">
      <h1 className="text-4xl font-bold ">DT Drivers</h1>
      <h4 className=" mb-2">Drag and drop to reorder</h4>
      <div className="flex flex-col items-center justify-center w-full max-w-6xl"></div>
      <Cards items={data} />
    </main>
  );
}

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/drivers`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();
  const sortedData = data.sort((a: Driver, b: Driver) => a.place - b.place);

  return sortedData;
}
