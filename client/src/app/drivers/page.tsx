"use client";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Reorder } from "framer-motion";
import AddDriverModal from "../components/AddDriverModal";

export default function Home() {
  const [items, setItems] = useState<Driver[]>([]);

  useEffect(() => {
    getData().then((data) => {
      const sortedData = data.sort((a: Driver, b: Driver) => a.place - b.place);
      setItems(sortedData);
    });
  }, []);

  const handleReorder = (newItems: Driver[]) => {
    const updatedItems = newItems.map((item: Driver, index: number) => {
      return { ...item, place: index + 1 };
    });
    updateData(updatedItems);
    setItems(updatedItems);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 ">
      <AddDriverModal />
      <h1 className="text-4xl font-bold ">DT Drivers</h1>
      <h4 className=" mb-2">Drag and drop to reorder</h4>
      <div className="flex flex-col items-center justify-center w-full max-w-6xl">
        <Reorder.Group axis="y" onReorder={handleReorder} values={items}>
          {items.map((driver: Driver) => (
            <Card key={driver.id} driver={driver} />
          ))}
        </Reorder.Group>
      </div>
    </main>
  );
}

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/drivers`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

// update data
async function updateData(data: Driver[]) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/drivers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update data");
}
