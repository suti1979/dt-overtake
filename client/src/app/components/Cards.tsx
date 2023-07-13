"use client";

import { useState } from "react";
import AddDriverModal from "./AddDriverModal";
import Card from "./Card";
import { Reorder } from "framer-motion";

export default function Cards({ items: initialItems }: { items: Driver[] }) {
  const [items, setItems] = useState(initialItems);

  const handleReorder = (newItems: Driver[]) => {
    const updatedItems = newItems.map((item: Driver, index: number) => {
      return { ...item, place: index + 1 };
    });
    updateData(updatedItems);
    setItems(updatedItems);
  };

  return (
    <>
      <AddDriverModal setItems={setItems} />
      <Reorder.Group axis="y" onReorder={handleReorder} values={items}>
        {items.map((driver: Driver) => (
          <Card key={driver.id} driver={driver} />
        ))}
      </Reorder.Group>
    </>
  );
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
