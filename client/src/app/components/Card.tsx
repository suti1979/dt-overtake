"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Card(driver: Driver) {
  const router = useRouter();

  async function overtake(id: number) {
    const res = await fetch(`http://localhost:4000/overtake/${id}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to overtake");
    router.refresh();
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-56 h-20 bg-gray-200 rounded-lg text-black m-2 cursor-pointer"
      onClick={() => overtake(driver.id)}
    >
      <div>ID: {driver.id}</div>
      <div>
        Name: {driver.firstname} {driver.lastname}
      </div>
      <div>Place: {driver.place}</div>
    </div>
  );
}
