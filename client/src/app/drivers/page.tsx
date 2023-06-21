import Card from "../components/Card";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/drivers`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const sortedData = data.sort((a: Driver, b: Driver) => a.place - b.place);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 ">
      <h1 className="text-4xl font-bold mb-8">DT Click to overtake</h1>
      <div className="flex flex-col items-center justify-center w-full max-w-6xl">
        {sortedData.map((driver: Driver) => (
          <Card key={driver.id} {...driver} />
        ))}
      </div>
    </main>
  );
}
